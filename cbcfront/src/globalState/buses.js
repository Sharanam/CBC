import axios from "axios";

const busessModel = {
  addBus: async (payload) => {
    try {
      const result = await axios.get("/busess", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default busessModel;
