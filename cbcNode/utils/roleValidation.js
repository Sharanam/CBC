const jwt = require("jsonwebtoken");
const User = require("../models/User");

function auth(req, res, next, regex) {
  let jwtPayload = req.header("Authorization");
  if (!jwtPayload) return res.status(401).send("Unauthorized");
  jwtPayload = jwtPayload.slice(7);
  jwt.verify(jwtPayload, process.env.secretOrKey, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");
    User.findById(decoded.userId)
      .then((user) => {
        if (user) {
          if (user.isVerified && regex.test(user.type)) {
            return next();
          } else {
            return res.status(200).send({
              success: false,
              msg: "Please verify your account...",
            });
          }
        } else {
          return res.status(401).send("Unauthorized");
        }
      })
      .catch((e) => {
        console.error(e.message);
        res.status(500).send("Something went wrong");
      });
  });
}

function isAuthorizedAdmin(req, res, next) {
  return auth(req, res, next, /^a/i);
}
function isAuthorizedCommuter(req, res, next) {
  return auth(req, res, next, /^c/i);
}

module.exports = {
  isAuthorizedAdmin,
  isAuthorizedCommuter,
};
