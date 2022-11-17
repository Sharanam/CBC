const { isMongoId } = require("validator");
const Bus = require("../models/Bus");
const Link = require("../models/Link");
const handleError = require("../utils/handleError");
const historyLogger = require("../utils/historyLogger");

exports.addBus = (req, res) => {
  try {
    const { registrationNumber, serviceType, status, route, capacity } =
      req.body;
    new Bus({ registrationNumber, serviceType, status, route, capacity })
      .save()
      .then((bus) => {
        return res.json({
          success: true,
          bus: {
            registrationNumber,
            serviceType,
            status,
            _id: bus._id,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.json({
          success: false,
          errors: handleError(error),
        });
      });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};
exports.editBus = async (req, res) => {
  try {
    let { busId, registrationNumber, serviceType, status, route } = req.body;
    let criteria = {};
    if (!isMongoId(busId || "")) {
      criteria.registrationNumber = {
        $regex: new RegExp(
          `^${(busId || registrationNumber || "").toString().trim()}$`,
          "i"
        ),
      };
      bus = await Bus.findOne(criteria);
      busId = bus?._id;
    }
    Bus.findOne({ _id: busId }, (_, bus) => {
      if (!bus) return res.json({ msg: "bus not found" });
      bus.registrationNumber = registrationNumber || bus.registrationNumber;
      bus.serviceType = serviceType || bus.serviceType;
      bus.status = status || bus.status;
      bus.route = route || bus.route;
      bus.save((error) => {
        if (error) {
          return res.json({
            success: false,
            msg: error.message,
          });
        }
        res.json({ success: true, msg: "Updated successfully !!" });
      });
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
};

exports.deleteBus = (req, res) => {
  try {
    const { busId } = req.body;
    if (!isMongoId(busId)) return res.json({ msg: "invalid bus id" });
    Bus.findByIdAndDelete(busId, (err) => {
      if (err) return res.status(500).send({ msg: err.message });
      res.json({
        success: true,
        msg: "bus deleted successfully",
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBus = async (req, res) => {
  try {
    const { busId } = req.params;
    let user = req.user?.userId;
    const { live } = req.query;
    if (!busId) return res.json({ success: false, msg: "Id is required." });
    const criteria = {};
    if (isMongoId(busId)) criteria._id = busId;
    else
      criteria.registrationNumber = {
        $regex: new RegExp(`^${(busId || "").toString().trim()}$`, "i"),
      };
    let bus = await Bus.findOne(criteria);
    if (user) {
      await historyLogger({
        user,
        id: criteria._id || bus._id,
        forCollection: "bus",
      });
    }
    if (!bus)
      return res.json({
        success: false,
        bus,
        msg: "No bus with given number found.",
      });
    if (live) {
      let link = await Link.findOne({ bus })
        .populate("route", "identifier stops tripTime")
        .populate("bus", "registrationNumber serviceType capacity status");
      return res.json({
        success: true,
        link,
      });
    } else {
      return res.json({
        success: true,
        bus,
      });
    }

    // Bus.findOne(criteria, (err, bus) => {
    //   if (err) return res.status(500).send(err.message);
    //   return res.json({
    //     success: true,
    //     bus,
    //     msg: !bus ? "No bus with given number found." : null,
    //   });
    // });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getBuses = (req, res) => {
  try {
    const pageNumber = req.params.page;
    // use page number for pagination

    const routeId = req.params.route;
    let criteria = {};
    let msg = "buses found in the system.";
    if (routeId) {
      criteria = { route: routeId };
      msg = `found for given route.`;
    }
    Bus.find(criteria)
      .then((buses) => {
        if (buses)
          return res.json({
            success: true,
            buses,
            msg: `${buses.length} ${msg}`,
          });
        res.json({ success: false, msg: "No bus for given route." });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send("Something went wrong");
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
