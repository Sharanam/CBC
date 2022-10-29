const Pass = require("../models/Pass");
const User = require("../models/User");
const handleError = require("../utils/handleError");

exports.getUsers = async (req, res) => {
  try {
    let user = await User.aggregate([
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
    ]);

    return res.json(user || {});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("something went wrong");
  }
};

exports.getSpecificUser = (req, res) => {
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
    const { userId } = req.user;
    const { id } = req.params;
    if (userId === id)
      return res.json({
        success: false,
        msg: "You cannot blacklist yourself.",
      });
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
    const { userId } = req.user;
    const { id } = req.params;
    if (userId === id)
      return res.json({
        success: false,
        msg: "You cannot unset yourself as an admin.",
      });
    User.findOne(
      {
        _id: id,
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

exports.issuePass = async (req, res) => {
  try {
    const { user, from, to, date, validity, price } = req.body;
    new Pass({
      user,
      from,
      to,
      date,
      validity,
      price,
    })
      .save()
      .then((pass) => {
        return res.json({
          success: true,
          pass,
          msg: "pass created successfully!",
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.json({ success: false, errors: handleError(error) });
      });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
