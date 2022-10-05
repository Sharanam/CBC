const User = require("../models/User");

exports.getUsers = (req, res) => {
  try {
    User.aggregate(
      [
        {
          $match: {
            $and: [
              { email: { $regex: req.body.email || "", $options: "i" } },
              { name: { $regex: req.body.name || "", $options: "i" } },
            ],
          },
        },
        {
          $project: {
            password: 0,
            __v: 0,
          },
        },
      ],
      (err, users) => {
        if (err)
          return res
            .status(500)
            .send("something went wrong while fetching the users");
        res.json(users || []);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getUser = (req, res) => {
  try {
    User.findOne(
      {
        _id: req.params.id,
      },
      (err, user) => {
        if (err) return res.status(500).send(err.message);
        res.json(user);
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.blacklistUser = (req, res) => {
  try {
    User.findOne(
      {
        _id: req.params.id,
      },
      (err, user) => {
        if (err) return res.status(500).send(err.message);
        user.isBlacklisted = req.body.blacklist ? true : false;
        user.save((error) => {
          if (error)
            return res.status(500).json({
              msg: err.message,
            });

          res.send({
            success: true,
            msg: `${user.name} is ${
              user.isBlacklisted ? "Blacklisted" : "Whitelisted"
            }`,
          });
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
exports.setAdmin = (req, res) => {
  try {
    User.findOne(
      {
        _id: req.params.id,
      },
      (err, user) => {
        if (err) return res.status(500).send(err.message);
        user.type = /^a/.test(req.body.admin) ? "a" : "c";
        user.save((error) => {
          if (error)
            return res.status(500).json({
              msg: err.message,
            });

          res.send({
            success: true,
            type: user.type,
            msg: `Type of ${user.name} is ${
              /^a/i.test(user.type) ? "Admin" : "Commuter"
            }`,
          });
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};
