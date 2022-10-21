const { isMongoId } = require("validator");
const User = require("../models/User");

async function getProfileOf(user) {
  let result;
  try {
    if (isMongoId(user)) {
      result = await User.findOne({ _id: user }).select(
        "name bio social public"
      );

      if (result.public) result = { success: true, user: result };
      else
        result = {
          success: true,
          user: { name: result.name, bio: "", social: "" },
        };
    } else result = { msg: "Please Enter valid Id" };
  } catch (err) {
    result = err.message;
  } finally {
    return result;
  }
}
module.exports = { getProfileOf };
