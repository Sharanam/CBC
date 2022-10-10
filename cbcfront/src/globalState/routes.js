import axios from "axios";

const routesModel = {
  addRoute: async (payload) => {
    try {
      const result = await axios.post("/route", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getRoutes: async (payload) => {
    try {
      const result = await axios.get(`/route`, { params: payload });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getAllRoutes: async () => {
    try {
      const result = await axios.get(`/route/view/all`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  editRoute: async (payload) => {
    try {
      const result = await axios.put("/route", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  deleteRoute: async (payload) => {
    try {
      const result = await axios.delete("/route", {
        data: payload,
      });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default routesModel;
