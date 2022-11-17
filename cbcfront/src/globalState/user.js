import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import modelParser from "../utils/modelParser";

const user = { isAuthenticated: false, errors: null },
  userDetails = {};

window.sessionStorage.setItem("user", JSON.stringify(user));
window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));

const userModel = {
  user,
  userDetails,
  signUp: async (act, payload) => {
    try {
      const result = await axios.post("/auth/signup", payload);
      if (result.data.success) {
        act.clearErrors();
        return { success: true, message: result.data.msg };
      }
      act.setErrors(result.data.errors);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  signIn: async (act, payload) => {
    try {
      const result = await axios.post("/auth/signin", payload);
      if (result.data.success) {
        localStorage.setItem("jwtToken", result.data.access_token);
        setAuthToken(result.data.access_token);
        const decoded = jwtDecode(result.data.access_token);
        act.setFavorites(result?.data?.user?.favorites);
        // act.setCurrentUser({ ...decoded, ...result.data.user });
        return { ...decoded, ...result.data };
      }
      act.setErrors(result.data.errors);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  signOut: (act) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    act.setCurrentUser(false);
  },
  setFavorites: (f) => {
    window.sessionStorage.setItem("favorites", JSON.stringify(f));
  },
  getFavorites: () => {
    return modelParser("favorites");
  },
  updateFavorites: async (payload) => {
    try {
      console.table(payload);
      const result = await axios.put("/commuter/favorites", {
        task: payload.task,
        route: payload.routeId,
      });

      if (result.data.success) {
        const newFavorites = result.data.favorites;
        window.sessionStorage.setItem(
          "favorites",
          JSON.stringify(newFavorites)
        );
        return { success: true, message: result.data.msg };
      }
      return result.data.success;
    } catch (err) {
      console.log(err);
      // alert(err.message);
      return { error: "Server down" };
    }
  },
  setCurrentUser: (payload) => {
    if (payload) {
      window.sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...modelParser("user"),
          isAuthenticated: true,
        })
      );
      window.sessionStorage.setItem(
        "userDetails",
        JSON.stringify({
          ...payload,
        })
      );
    } else {
      window.sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...modelParser("user"),
          isAuthenticated: false,
        })
      );
      window.sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  },
  setErrors: (payload) => {
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...modelParser("user"),
        errors: payload,
      })
    );
  },
  clearErrors: () => {
    window.sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...modelParser("user"),
        errors: null,
      })
    );
  },
  deleteAccount: async () => {
    try {
      const { data } = await axios.delete("/auth/deleteUser");
      alert(data.msg);
      return data.success || false;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  forgotPassword: async (payload) => {
    try {
      const { data } = await axios.post("/auth/forgotPassword", payload);
      alert(data.msg);
      return data.success || false;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  resetPassword: async (payload) => {
    try {
      const { data } = await axios.post("/auth/resetPassword", payload);
      alert(data.msg);
      return data.success || false;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  resendToken: async (payload) => {
    try {
      const { data } = await axios.post("/auth/resendToken", payload);
      alert(data.msg);
      return data.success || false;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  confirmToken: async (payload) => {
    try {
      const { data } = await axios.post("/auth/confirmToken", payload);
      alert(data.msg);
      return data.success || false;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  getMyProfile: async () => {
    try {
      const { data } = await axios.get("/auth/profile");
      if (data.success) return data.user;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  updateMyProfile: async (payload) => {
    try {
      const { data } = await axios.post("/auth/profile", payload);
      if (data.msg) alert(data.msg);
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  getProfileOf: async (userId) => {
    try {
      const { data } = await axios.get(`/auth/profile/${userId}`);
      if (data.success) return data.user;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  getMyHistory: async () => {
    try {
      const { data } = await axios.get("/commuter/history");
      if (data.success) {
        window.sessionStorage.setItem("history", JSON.stringify(data.history));
      }
      return data.success;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  removeFromHistory: async (payload) => {
    try {
      const { data } = await axios.delete("/commuter/history", {
        data: payload,
      });
      if (data.success) {
        let his = modelParser("history");
        if (payload?.type === "route") {
          his.route = his?.route.filter((r) => r._id !== payload?.historyId);
        } else if (payload?.type === "bus") {
          his.bus = his?.bus.filter((r) => r._id !== payload?.historyId);
        }
        window.sessionStorage.setItem("history", JSON.stringify(his));
      }
      if (data.msg) alert(data.msg);
      return data.success;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  getHistory: () => {
    return modelParser("history") || {};
  },
};
export default userModel;
