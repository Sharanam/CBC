const Feedback = require("../models/Feedback");
const handleError = require("../utils/handleError");

exports.newFeedback = (req, res) => {
  try {
    const { message } = req.body;
    new Feedback({ user: req.user.userId, message })
      .save()
      .then((feedback) => {
        return res.json({
          success: true,
          feedback,
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.json({
          success: false,
          errors: handleError(error),
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
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
          feedback
            .save()
            .then((fb) => res.json({ feedback: fb }))
            .catch((err) => {
              console.log(err.message);
              res.status(500).send("Something went wrong");
            });
        }
        return res.json({ feedback });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getFeedback = (req, res) => {
  try {
    const { feedbackId } = req.params;
    Feedback.findOne(
      {
        _id: feedbackId,
      },
      (err, feedback) => {
        if (err) return res.status(500).send(err.message);
        if (feedback) return res.json({ success: true, feedback });
        res.json({ success: false, msg: "No feedback for given id." });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};
exports.viewFeedbacks = (req, res) => {
  try {
    const pageNumber = req.params.page;
    // use page number for pagination

    Feedback.find()
      .populate("users")
      .then((feedbacks) => {
        return res.json({
          success: true,
          feedbacks,
          msg: `${feedbacks.length} feedbacks found in the system.`,
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("Something went wrong");
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};
exports.giveReply = (req, res) => {
  try {
    // admin can give reply,
    // which will be stored as a comment
    res.send("Under development");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

// other modules like,
// users can comment, like or dislike the feedback
// user can edit, delete
