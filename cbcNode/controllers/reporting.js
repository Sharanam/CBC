const { isMongoId } = require("validator");
const Bus = require("../models/Bus");
const Reporting = require("../models/Reporting");
const Route = require("../models/Route");
const handleError = require("../utils/handleError");

exports.addReporting = async (req, res) => {
  try {
    let { bus, route, schedule, passengers } = req.body;
    if (!bus || !route || !passengers || !schedule)
      return res.json({ msg: "Fields are missing" });
    let criteria = {};
    if (!isMongoId(bus)) {
      criteria.registrationNumber = {
        $regex: new RegExp(`^${bus.toString().trim()}$`, "i"),
      };
      bus = await Bus.findOne(criteria);
      if (bus?._id) bus = bus._id;
      else return res.json({ errors: { bus: "No bus found." } });
    }
    criteria = {};
    if (!isMongoId(route)) {
      criteria.identifier = {
        $regex: new RegExp(`^${route.toString().trim()}$`, "i"),
      };
      route = await Route.findOne(criteria);
      if (route?._id) route = route._id;
      else return res.json({ errors: { route: "No route found." } });
    }
    const rep = new Reporting({ bus, route, schedule, passengers });
    rep
      .save()
      .then((reporting) => {
        return res.json({
          success: true,
          reporting,
          msg: "Reporting added successfully",
        });
      })
      .catch((e) => {
        res.json({
          success: false,
          errors: handleError(e),
        });
      });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.editReporting = async (req, res) => {
  try {
    let { _id, bus, route, schedule, passengers } = req.body;
    let criteria = {};
    if (!isMongoId(_id))
      return res.json({ errors: { _id: "Invalid reporting id" } });
    if (!bus || !route || !passengers || !schedule)
      return res.json({ msg: "Fields are missing" });
    if (!isMongoId(bus)) {
      criteria.registrationNumber = {
        $regex: new RegExp(`^${bus.toString().trim()}$`, "i"),
      };
      bus = await Bus.findOne(criteria);
      if (bus?._id) bus = bus._id;
      else return res.json({ errors: { bus: "No bus found." } });
    }
    criteria = {};
    if (!isMongoId(route)) {
      criteria.identifier = {
        $regex: new RegExp(`^${route.toString().trim()}$`, "i"),
      };
      route = await Route.findOne(criteria);
      if (route?._id) route = route._id;
      else return res.json({ errors: { route: "No route found." } });
    }
    const reporting = await Reporting.findOne({ _id });
    if (!reporting) return res.json({ errors: { _id: "No reporting found." } });
    reporting.bus = bus;
    reporting.route = route;
    reporting.schedule = schedule;
    reporting.passengers = passengers;
    await reporting.save();
    return res.json({
      success: true,
      reporting,
      msg: "Reporting updated successfully",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.deleteReporting = async (req, res) => {
  try {
    let { _id } = req.body;
    if (!isMongoId(_id))
      return res.json({ errors: { _id: "Invalid reporting id" } });
    const reporting = await Reporting.findByIdAndDelete(_id);
    return res.json({
      success: true,
      reporting,
      msg: "Reporting deleted successfully",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getAllReportings = async (req, res) => {
  try {
    const reportings = await Reporting.find()
      .populate("bus", "registrationNumber serviceType")
      .populate("route", "identifier");
    return res.json({ success: true, reportings });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getInstanceOfReporting = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!isMongoId(id))
      return res.json({ errors: { id: "Invalid reporting id" } });
    const reporting = await Reporting.findById(id)
      .populate("bus")
      .populate("route");
    return res.json({ success: true, reporting });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getBusSpecificReportings = async (req, res) => {
  try {
    const { bus } = req.params;
    if (!isMongoId(bus)) return res.json({ errors: { bus: "Invalid bus id" } });
    const reportings = await Reporting.find({ bus })
      .populate("bus")
      .populate("route");
    return res.json({ success: true, reportings });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getRouteSpecificReportings = async (req, res) => {
  try {
    const { route } = req.params;
    if (!isMongoId(route))
      return res.json({ errors: { route: "Invalid route id" } });
    const reportings = await Reporting.find({ route })
      .populate("bus")
      .populate("route");
    return res.json({ success: true, reportings });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getRouteBusReportings = async (req, res) => {
  try {
    const { route, bus } = req.params;
    if (!isMongoId(route))
      return res.json({ errors: { route: "Invalid route id" } });
    if (!isMongoId(bus)) return res.json({ errors: { bus: "Invalid bus id" } });

    const reportings = await Reporting.find({ route, bus })
      .populate("bus")
      .populate("route");
    return res.json({ success: true, reportings });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
