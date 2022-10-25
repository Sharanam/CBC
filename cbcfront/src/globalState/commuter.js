import axios from "axios";

const commutersModel = {
  getMyContributions: async () => {
    try {
      const result = await axios.get("/commuter/contribution");
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  makeContribution: async (payload) => {
    try {
      const result = await axios.post("/commuter/makeContribution", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  editContribution: async (payload) => {
    try {
      const result = await axios.put("/commuter/makeContribution", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getContributionsFor: async (payload) => {
    try {
      const result = await axios.get("/commuter/makeContribution/for", {
        params: payload,
      });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getMyPasses: async () => {
    try {
      const result = await axios.get("/commuter/pass");
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default commutersModel;
