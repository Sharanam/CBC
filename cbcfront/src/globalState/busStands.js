import axios from "axios";

const busStandsModel = {
  stops: null,
  getStands: async () => {
    try {
      const result = await axios.get("/busStands");
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default busStandsModel;
