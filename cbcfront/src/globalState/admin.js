import axios from "axios";

const adminModel = {
  getUsers: async (payload) => {
    try {
      const { data } = await axios.get("/admin/getUsers", { params: payload });
      return data;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  getUser: async ({ userId }) => {
    try {
      const { data } = await axios.get(`/admin/getUser/${userId}`);
      return data;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  blacklistUser: async ({ userId, blacklist }) => {
    try {
      const { data } = await axios.post(`/admin/blacklist/${userId}`, {
        blacklist,
      });
      alert(data.msg);
      return data.success;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  setAdmin: async ({ userId, admin }) => {
    try {
      const { data } = await axios.post(`/admin/setAdmin/${userId}`, {
        admin,
      });
      alert(data.msg);
      return data;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
  issuePass: async (payload) => {
    try {
      const { data } = await axios.post(`/admin/issuePass/`, payload);
      return data;
    } catch (e) {
      alert("server down");
      return false;
    }
  },
};
export default adminModel;
