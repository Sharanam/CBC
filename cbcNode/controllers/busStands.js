const Route = require("../models/Route");
const { name } = require("../rigidData/busStands");
// const { name, distance } = require("../rigidData/busStands");
// const priceFor = require("../utils/priceCalculator");
exports.busStandNames = function (_, res) {
  // const result = [];
  // for (let i = 0; i < name.length; i++) {
  //   for (let j = 0; j < name.length; j++) {
  //     const from = name[i];
  //     const to = name[j];
  //     if (from !== to) {
  //       const dist = distance[i][j];
  //       const price = priceFor(dist);
  //       result.push({ from, to, distance: dist, price });
  //     }
  //   }
  // }

  try {
    return res.json(name);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
};

exports.relatedRoutesTo = async function (req, res) {
  try {
    const { standName } = req.params;
    let routes = [];
    routes = await Route.find({
      stops: { $regex: new RegExp(`^${standName.toString().trim()}$`, "i") },
    });
    res.json({ success: true, routes });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
};
