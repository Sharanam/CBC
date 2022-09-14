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
            route,
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
