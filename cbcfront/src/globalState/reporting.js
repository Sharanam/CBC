import axios from "axios";

const reportingsModel = {
  addReporting: async (payload) => {
    try {
      const result = await axios.post("/reporting", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  editReporting: async (payload) => {
    try {
      const result = await axios.put("/reporting", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  deleteReporting: async (payload) => {
    try {
      const result = await axios.delete("/reporting", { data: payload });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getAllReportings: async (page) => {
    try {
      const result = await axios.get(`/reporting/page/${page || 0}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getInstanceOfReporting: async (id) => {
    try {
      const result = await axios.get(`/reporting/${id}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getBusSpecificReportings: async (bus) => {
    try {
      const result = await axios.get(`/reporting/with/${bus}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getRouteSpecificReportings: async (route) => {
    try {
      const result = await axios.get(`/reporting/on/${route}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getRouteBusReportings: async (route, bus) => {
    try {
      const result = await axios.get(`/reporting/on/${route}/with/${bus}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default reportingsModel;
