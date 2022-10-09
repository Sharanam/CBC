const { name, distance } = require("../rigidData/busStands");
const priceFor = require("../utils/priceCalculator");
exports.busStands = function (_, res) {
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

  return res.json(name);
};
