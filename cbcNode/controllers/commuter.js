const Feedback = require("../models/Feedback");
const Contribution = require("../models/Contribution");
const Pass = require("../models/Pass");
const User = require("../models/User");
const Route = require("../models/Route");

exports.makeContribution = async (req, res) => {
  try {
    let user = req.user?.userId;
    let { message, stop, bus, route, createdAfter } = req.body;

    // preprocessing
    if (!user)
      return res.json({
        success: false,
        msg: "you are either unverified user or admin may have blocked you !!!",
      });
    route = await Route.findOne({ _id: route });
    if (
      !route?.stops
        ?.map((v) => v.toString().toLowerCase())
        .includes(stop.toString().toLowerCase())
    )
      return res.json({
        success: false,
        msg: "stop is invalid",
      });

    // already done or not
    const c = await Contribution.findOne({
      bus,
      route,
      createdAfter,
      user,
      stop,
    });
    if (c) {
      if (c.message === message)
        return res.json({ success: false, msg: "you have already done this" });
      c.message = message;
      // edit message, if it has been done already
      await c.save();
      return res.json({
        success: true,
        contribution: c,
      });
    }

    // actual work
    let cont = await new Contribution({
      user,
      message,
      stop,
      bus,
      route,
      createdAfter,
    }).save();
    return res.json({ success: true, contribution: cont });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.editContribution = async (req, res) => {
  try {
    // preprocessing
    let user = req.user?.userId;
    let { _id, message } = req.body;

    // preprocessing
    if (!user)
      return res.json({
        success: false,
        msg: "you are either unverified user or admin may have blocked you !!!",
      });

    // actual work
    const contribution = await Contribution.findById(_id);
    console.log(contribution.message, user);
    if (contribution.user?.toString() !== user?.toString())
      return res.json({
        success: false,
        msg: "do not try to be a malicious user unless you want to get blocked by an administrator.",
      });
    contribution.message = message;
    const result = await contribution.save();
    return res.json({ success: true, contribution });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getContributionsFor = async (req, res) => {
  let user = req.user?.userId;
  let { bus, route, createdAfter } = req.query;
  try {
    const contributions = await Contribution.find({
      bus,
      route,
      createdAfter,
    }).select("-bus -route -createdAfter -createdAt");

    return res.json({
      success: true,
      // contributions: { ...cont, user: cont.user === user ? cont.user : null },
      contributions: contributions.map((cont) => {
        return {
          ...cont._doc,
          user: cont.user?.toString() === user?.toString() ? cont.user : null,
        };
      }),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getMyContributions = (req, res) => {
  try {
    const user = req.user?.userId;
    Contribution.find({ user })
      .select("-user -createdAt")
      .populate("route", "identifier")
      .populate("bus", "registrationNumber serviceType")
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
    const user = req.user?.userId;

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
