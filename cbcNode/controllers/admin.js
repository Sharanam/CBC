const User = require("../models/User");

exports.getUsers = (req, res) => {
  try {
    User.aggregate(
      [
        {
          $match: {
            $and: [
              { email: { $regex: req.query.email || "", $options: "i" } },
              { name: { $regex: req.query.name || "", $options: "i" } },
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

        console.log(
          req
          // `email:${req.body.email} name:${req.body.name}`,
          // JSON.stringify(users)
        );
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

exports.setAdminPrivilege = (req, res) => {
  // e.g., http://localhost:8000/api/admin/setAdmin/63276274dc0319342809014c?admin=false
  try {
    User.findOne(
      {
        _id: req.params.userId,
      },
      (_, user) => {
        if (!user) return res.json({ msg: "User not found" });
        if (!user.isVerified) return res.json({ msg: "User is not verified" });
        user.type = req.query.admin === "true" ? "a" : "c";
        console.log(user.type, req.query.admin);
        user.save((error) => {
          if (error) {
            return res.status(500).json({
              msg: error.message,
            });
          }
          res.send({ success: true, msg: "Task finished successfully." });
        });
      }
    );
  } catch (e) {
    res.status(500).send(e.message);
  }
};
