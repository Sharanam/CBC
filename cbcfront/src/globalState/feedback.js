import axios from "axios";

const feedbacksModel = {
  newFeedback: async (payload) => {
    try {
      const result = await axios.post("/feedback", payload);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  getFeedback: async (feedbackId) => {
    try {
      const result = await axios.get(`/feedback/${feedbackId}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  viewFeedbacks: async (payload) => {
    try {
      const result = await axios.get(`/feedback/page/${payload?.page || 0}`);
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
  giveReply: async (payload) => {
    try {
      const result = await axios.get(`/feedback/reply/${payload?.feedbackId}`, {
        params: payload,
      });
      return result.data;
    } catch (err) {
      alert(err.message);
      return { error: "Server down" };
    }
  },
};
export default feedbacksModel;
// edit, delete, comment
