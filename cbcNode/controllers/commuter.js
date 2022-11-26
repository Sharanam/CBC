const { isMongoId } = require("validator");
const Contribution = require("../models/Contribution");
const Pass = require("../models/Pass");
const Route = require("../models/Route");
const User = require("../models/User");

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

exports.getMyPasses = async (req, res) => {
  try {
    let user = req.user?.userId;
    let passes = await User.findOne({ _id: user })
      .select("passes")
      .populate("passes");
    passes = passes.passes;

    res.json({ success: true, passes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.setFavorites = async (req, res) => {
  try {
    let user = req.user?.userId;
    let { task, route } = req.body;
    // task = [add,remove], route = routeID
    user = await User.findById(user);
    if (task === "add") {
      if (user.favorites.includes(route))
        return res.json({ success: false, msg: "already added" });
      user.favorites.push(route);
    } else {
      user.favorites = user.favorites.filter(
        (v) => v.toString() !== route.toString()
      );
    }
    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.getMyHistory = async (req, res) => {
  try {
    const user = req.user?.userId;

    let history = await User.findById(user)
      .select("history")
      .populate("history.route.routeId", "identifier -_id")
      .populate("history.bus.busId", "registrationNumber serviceType -_id")
      .exec();
    history = history.history;
    history.bus = history?.bus.reverse();
    history.route = history?.route.reverse();

    res.json({ success: true, history });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.removeFromHistory = async (req, res) => {
  try {
    const { historyId, type } = req.body;
    if (!isMongoId(historyId)) {
      return res.json({
        success: false,
        msg: "id is invalid.",
      });
    }
    let user = req.user?.userId;
    user = await User.findById(user);
    if (type === "bus") {
      user.history.bus = user.history.bus.filter(
        (v) => v._id.toString() !== historyId.toString()
      );
    } else if (type === "route") {
      user.history.route = user.history.route.filter(
        (v) => v._id.toString() !== historyId.toString()
      );
    }
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
