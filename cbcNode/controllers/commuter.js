const Feedback = require("../models/Feedback");
const Contribution = require("../models/Contribution");
const Pass = require("../models/Pass");
const User = require("../models/User");
const Route = require("../models/Route");

exports.makeContribution = async (req, res) => {
  try {
    let user = req.user.userId;
    let { message, stop, bus, route } = req.body;

    user = await User.findOne({ _id: user });
    user.isVerified && !user.isBlacklisted;
    console.log(!user.isVerified || user.isBlacklisted);
    if (!user.isVerified || user.isBlacklisted)
      return res.json({
        success: false,
        msg: "you are either unverified user or admin may have blocked you !!!",
      });
    route = await Route.findOne({ _id: route });
    if (!route?.stops?.includes(stop))
      return res.json({
        success: false,
        msg: "stop is invalid",
      });
    let cont = await new Contribution({
      user: user._id,
      message,
      stop,
      bus,
      route,
    }).save();
    return res.json({ success: true, contribution: cont });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.editContribution = async (req, res) => {
  try {
    let user = req.user.userId;

    // only if the user want to re-declare that the bus has been reached the stop.
    let { _id, message } = req.body;
    let cont = await new Contribution({
      _id,
      user: user,
      message,
    }).save();
    return res.json({ success: true, contribution: cont });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getContributionsFor = (req, res) => {
  let user = req.user.userId;
  let { bus, route, createdAfter } = req.query;
  // createdAfter will provide the time in DATE format,
  // compare that with 'createdAt'
  // ignore the contributions of next round trip by removing them from the result
  try {
    Contribution.find({ bus, route })
      .then((cont) =>
        res.json({
          success: true,
          contributions: {
            ...cont,
            user: cont.user === user ? cont.user : undefined,
          },
        })
      )
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
exports.getMyContributions = (req, res) => {
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
