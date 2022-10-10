const Feedback = require("../models/Feedback");
const Contribution = require("../models/Contribution");
const Pass = require("../models/Pass");

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
  // it has been done again in (or let say, moved to)
  // sophisticated feedback page
};

exports.makeContribution = (req, res) => {
  try {
    const user = req.user.userId;
    const { message, stop, bus } = req.body;

    // validation:
    // check the credibility of the stop
    // from where the bus is supposed to run

    new Contribution({ user, message, stop, bus })
      .save()
      .then((cont) => res.json({ success: true, contribution: cont }))
      .catch((err) => {
        console.log(err.message);
        res.json({
          success: false,
          msg: "Something is wrong with the database",
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getMyContribution = (req, res) => {
  try {
    const user = req.user.userId;

    Contribution.find({ user })
      .then((cont) => res.json({ success: true, contributions: cont }))
      .catch((err) => {
        console.log(err.message);
        res.json({
          success: false,
          msg: "Something is wrong with the database",
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getMyPasses = (req, res) => {
  try {
    const user = req.user.userId;

    Pass.find({ user })
      .then((passes) => res.json({ success: true, passes }))
      .catch((err) => {
        console.log(err.message);
        res.json({
          success: false,
          msg: "Something is wrong with the database",
        });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
