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
        return { message: result.data.msg };
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
};
export default userModel;
