const User = require("../models/User");

exports.getUsers = (req, res) => {
  try {
    User.aggregate(
      [
        {
          $match: {
            $and: [
              { email: { $regex: req.body.email, $options: "i" } },
              { name: { $regex: req.body.name, $options: "i" } },
            ],
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
