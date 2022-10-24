import axios from "axios";

const busesModel = {
  addBus: async (payload) => {
    try {
      const result = await axios.post("/bus", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getBus: async (busNumber) => {
    try {
      const result = await axios.get(`/bus/${busNumber}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getLiveBus: async (busNumber, payload = {}) => {
    try {
      const result = await axios.get(`/bus/${busNumber}`, { params: payload });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getBuses: async (route) => {
    try {
      const result = await axios.get(`/bus/on/${route}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  viewBuses: async (payload) => {
    try {
      const result = await axios.get(`/bus/page/${payload?.page || 0}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  editBus: async (payload) => {
    try {
      const result = await axios.put("/bus", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  deleteBus: async (payload) => {
    try {
      const result = await axios.delete("/bus", {
        data: payload,
      });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default busesModel;
