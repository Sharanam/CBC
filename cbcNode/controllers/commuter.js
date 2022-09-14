const User = require("../models/User");
const Feedback = require("../models/Feedback");
const handleError = require("../utils/handleError");

exports.newFeedback = (req, res) => {
  try {
    let { message } = req.body;
    message = (message || "").toString().trim();
    const user = req.user;
    new Feedback({ user: user.userId, message })
      .save()
      .then((feedback) => {
        res.json({
          success: true,
          feedback,
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.json({
          success: false,
          // errors: handleError(err), //handleErrorIssue
          msg: "Something is wrong with database",
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.updateFeedback = (req, res) => {
  try {
    let { message, feedbackId } = req.body;
    message = (message || "").toString().trim();
    const { userId } = req.user;
    Feedback.findOne(
      { _id: feedbackId },

      (err, feedback) => {
        if (err) return res.json({ msg: err.message });
        if (new RegExp(feedback.user).test(userId.toString())) {
          feedback.message = feedback.message + "\n\nEdit: " + message;
          feedback.save().then((fb) => res.json({ feedback: fb }));
        }
        return res.json({ feedback });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
