const { isMongoId } = require("validator");
const User = require("../models/User");

function getProfileOf(user) {
  let result;
  if (isMongoId(user))
    User.findOne({ _id: user })
      .select("name bio social public")
      .then((user) => {
        if (user.public) result = { success: true, user };
        else
          result = {
            success: true,
            user: { name: "Anonymous", bio: "", social: "" },
          };
      })
      .catch((err) => (result = { msg: err.message }));
  else result = { msg: "Please Enter valid Id" };
  return result;
}
module.exports = { getProfileOf };
