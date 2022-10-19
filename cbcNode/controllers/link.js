const { isMongoId } = require("validator");
const Bus = require("../models/Bus");
const Link = require("../models/Link");
const Route = require("../models/Route");
const handleError = require("../utils/handleError");

exports.addLink = async (req, res) => {
  try {
    let { route, bus, schedule } = req.body;
    const criteria = {};
    if (!bus || !route) return res.json({ msg: "Fields are missing" });

    if (!isMongoId(bus)) {
      criteria.registrationNumber = bus;
      bus = await Bus.findOne(criteria);
      if (bus?._id) bus = bus._id;
      else return res.json({ errors: { bus: "No bus found." } });
    }

    if (!isMongoId(route)) {
      criteria.identifier = route;
      route = await Route.findOne(criteria);
      if (route?._id) route = route._id;
      else return res.json({ errors: { route: "No route found." } });
    }
    // const alreadyLinkedBus = await Link.findOne({ bus });
    // if (alreadyLinkedBus) {
    //   return res.json({
    //     success: false,
    //     msg: "Bus has already been assigned to some other route.",
    //   });
    // }

    new Link({ route, bus, schedule })
      .save()
      .then((link) => {
        return res.json({
          success: true,
          link,
          msg: "bus assigned to the route successfully",
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
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.editLink = (req, res) => {
  try {
    const { _id, route, bus, schedule } = req.body;
    Link.findOne({ _id }, (_, link) => {
      if (!link) return res.json({ msg: "instance not found." });
      link.route = route || link.route;
      link.bus = bus || link.bus;
      link.schedule = schedule || link.schedule;
      link.save((error) => {
        if (error)
          return res.json({
            success: false,
            msg: error.message,
          });
        res.json({ success: true, msg: "Updated successfully !!" });
      });
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.deleteLink = (req, res) => {
  try {
    const { _id } = req.body;
    if (!isMongoId(_id)) return res.json({ msg: "invalid instance id" });
    Link.findByIdAndDelete(_id, (err) => {
      if (err) return res.status(500).send({ msg: err.message });
      res.json({
        success: true,
        msg: "link deleted successfully",
      });
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
exports.getLink = (req, res) => {
  try {
    const { linkId, route, page } = req.params;
    if (linkId) {
      Link.findOne({ _id: linkId }, (err, link) => {
        if (err) return res.status(500).send(err.message);
        return res.json({
          success: true,
          link,
        });
      });
    } else if (route) {
      Link.find({ route })
        .then((links) => {
          if (links)
            return res.json({
              success: true,
              links,
            });
          return res.json({
            success: false,
            msg: "No Instance for given route",
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send("Something went wrong");
        });
    } else if (bus) {
      Link.find({ bus })
        .then((links) => {
          if (links)
            return res.json({
              success: true,
              links,
            });
          return res.json({
            success: false,
            msg: "No Instance for given bus",
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send("Something went wrong");
        });
    } else if (page) {
      Link.find()
        .then((links) => {
          if (links)
            return res.json({
              success: true,
              links,
            });
          return res.json({ success: false, msg: "No link instance found." });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.json({ msg: "Nothing to send." });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Something went wrong");
  }
};
