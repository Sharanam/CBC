const jwt = require("jsonwebtoken");
const User = require("../models/User");

function getUser(req, res, next) {
  let jwtPayload = req.header("Authorization");
  if (!jwtPayload) return res.status(401).send("Unauthorized");
  jwtPayload = jwtPayload.slice(7);
  jwt.verify(jwtPayload, process.env.secretOrKey, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");
    User.findById(decoded.userId)
      .then((user) => {
        if (user) {
          req.user = decoded;
          return next();
        } else {
          return res.status(401).send("Unauthorized");
        }
      })
      .catch((e) => {
        res.status(500).send(e.message);
      });
  });
}

function getOptionalUser(req, res, next) {
  // even if the user is not logged in, it will allow to use the application
  let jwtPayload = req.header("Authorization");
  if (!jwtPayload) {
    req.user = null;
    return next();
  }
  jwtPayload = jwtPayload.slice(7);
  jwt.verify(jwtPayload, process.env.secretOrKey, (err, decoded) => {
    if (err) return res.status(401).send("Unauthorized");
    User.findById(decoded.userId)
      .then((user) => {
        if (user && user.isVerified && !user.isBlacklisted) {
          req.user = decoded;
          return next();
        } else {
          req.user = null;
          return next();
        }
      })
      .catch((e) => {
        res.status(500).send(e.message);
      });
  });
}

module.exports = { getUser, getOptionalUser };
