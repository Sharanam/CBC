import axios from "axios";

const announcementModel = {
  getAnnouncements: async () => {
    try {
      const result = await axios.get("/announcement/get");
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  createAnnouncement: async (payload) => {
    try {
      const result = await axios.post("/announcement/create", payload); // { title, description }
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  deleteAnnouncement: async (payload) => {
    try {
      const result = await axios.delete("/announcement/delete", {
        data: payload,
      }); //{payload: {announcementId}}
      alert(result.data.msg);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default announcementModel;
