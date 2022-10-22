const { isMongoId } = require("validator");
const Route = require("../models/Route");
const handleError = require("../utils/handleError");

exports.addRoute = (req, res) => {
  try {
    const { identifier, stops, schedule, tripTime } = req.body;
    new Route({ identifier, stops, schedule, tripTime })
      .save()
      .then((route) => {
        return res.json({
          success: true,
          route: {
            identifier,
            stops,
            schedule,
            tripTime,
            _id: route._id,
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
exports.editRoute = (req, res) => {
  try {
    const { routeId, stops, identifier, schedule, tripTime } = req.body;
    Route.findOne({ _id: routeId }, (_, route) => {
      if (!route) return res.json({ msg: "route not found" });
      route.stops = stops || route.stops;
      route.identifier = identifier || route.identifier;
      route.schedule = schedule || route.schedule;
      route.tripTime = tripTime || route.tripTime;
      route.save((error) => {
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

exports.deleteRoute = (req, res) => {
  try {
    const { routeId } = req.body;
    if (!isMongoId(routeId)) return res.json({ msg: "invalid route id" });
    Route.findByIdAndDelete(routeId, (err) => {
      if (err) return res.status(500).send({ msg: err.message });
      res.json({
        success: true,
        msg: "route deleted successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.getRoute = (req, res) => {
  try {
    const { routeId } = req.params;
    Route.findOne(
      {
        _id: routeId,
      },
      (err, route) => {
        if (err) return res.status(500).send(err.message);
        res.json({ success: true, route });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const { from, to } = req.query;
    let routes = [];
    routes = await Route.find({
      stops: {
        $elemMatch: {
          $regex: new RegExp(`^${from.toString().trim()}$`, "i"),
        },
      },
    });
    routes = routes.filter(
      (route) =>
        route.stops
          .map((v) => v.toString().toUpperCase())
          .includes(to.toString().toUpperCase()) &&
        route.stops
          .map((v) => v.toString().toUpperCase())
          .indexOf(from.toString().toUpperCase()) <
          route.stops
            .map((v) => v.toString().toUpperCase())
            .indexOf(to.toString().toUpperCase())
    );
    res.json({
      success: true,
      msg:
        routes.length === 0 &&
        `No direct bus is available from ${from} to ${to}.`,
      routes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getAllRoutes = (req, res) => {
  try {
    Route.find()
      .select("-__v")
      .then((routes) => {
        if (routes)
          return res.json({
            success: true,
            routes,
            msg: `${routes.length} routes found in the system.`,
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
