const User = require("../models/User");

async function historyLogger({ user, id, forCollection }) {
  try {
    const userInDb = await User.findOne({
      _id: user,
    });
    if (!userInDb) return;
    if (forCollection === "route") {
      if (
        userInDb.history.route[
          userInDb.history.route.length - 1
        ]?.routeId.toString() === id.toString()
      ) {
        userInDb.history.route.pop();
      }
      userInDb.history.route.push({ routeId: id });
    } else if (forCollection === "bus") {
      if (
        userInDb.history.bus[
          userInDb.history.bus.length - 1
        ]?.busId.toString() === id.toString()
      ) {
        userInDb.history.bus.pop();
      }
      userInDb.history.bus.push({ busId: id });
    } else {
      return;
    }
    userInDb.save();
  } catch (error) {
    console.error("history logger: ", error.message);
  }
}

module.exports = historyLogger;
