import axios from "axios";

const linksModel = {
  addLink: async (payload) => {
    try {
      const result = await axios.post("/link", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  editLink: async (payload) => {
    try {
      const result = await axios.put("/link", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  deleteLink: async (payload) => {
    try {
      const result = await axios.delete("/link", {
        data: payload,
      });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getAllLinks: async (page) => {
    try {
      const result = await axios.get(`/link/page/${page || 0}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getRouteSpecificLinks: async (route) => {
    try {
      const result = await axios.get(`/link/on/${route}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getBusSpecificLinks: async (bus) => {
    try {
      const result = await axios.get(`/link/with/${bus}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getSpecificLinkInstance: async (id) => {
    try {
      const result = await axios.get(`/link/${id}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default linksModel;
