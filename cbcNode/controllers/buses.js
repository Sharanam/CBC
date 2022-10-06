const { isMongoId } = require("validator");
const Bus = require("../models/Bus");
const handleError = require("../utils/handleError");

exports.addBus = (req, res) => {
  try {
    const { registrationNumber, serviceType, status, route } = req.body;
    new Bus({ registrationNumber, serviceType, status, route })
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
exports.editBus = (req, res) => {
  try {
    const { busId, registrationNumber, serviceType, status, route } = req.body;
    Bus.findOne({ _id: busId }, (_, bus) => {
      if (!bus) return res.json({ msg: "bus not found" });
      bus.registrationNumber = registrationNumber;
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
        res.send({ success: true, msg: "Updated successfully !!" });
      });
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.deleteBus = (req, res) => {
  try {
    const { busId } = req.body;
    if (!isMongoId(busId)) return res.json({ msg: "invalid bus id" });
    Bus.findByIdAndDelete(busId, async (err) => {
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

exports.getBus = (req, res) => {
  try {
    const { busId } = req.params;
    Bus.findOne(
      {
        _id: busId,
      },
      (err, bus) => {
        if (err) return res.status(500).send(err.message);
        res.json({ success: true, bus });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getBuses = (req, res) => {
  try {
    const routeId = req.params.route;
    Bus.find({ route: routeId }).then((buses) => {
      if (buses)
        return res.json({
          success: true,
          buses,
          msg: `${buses.length} found for given route.`,
        });
      res.json({ success: false, msg: "No bus for given route." });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.viewBuses = (req, res) => {
  try {
    const pageNumber = req.params.page;
    // use page number is pagination is needed

    Bus.find().then((buses) => {
      if (buses)
        return res.json({
          success: true,
          buses,
          msg: `${buses.length} buses found in the system.`,
        });
      res.json({ success: false, msg: "No bus for given route." });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
