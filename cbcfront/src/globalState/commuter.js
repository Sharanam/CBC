import axios from "axios";

const commutersModel = {
  stops: null,
  getMyContribution: async () => {
    try {
      const result = await axios.get("/commuter/contribution");
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
