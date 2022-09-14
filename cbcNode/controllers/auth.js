// dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isMongoId } = require("validator");

// models
const User = require("../models/User");
const Token = require("../models/EmailVerificationToken");

// utils
const { isEmpty } = require("../utils/errorGenerator");
const handleError = require("../utils/handleError");
const isStrongPassword = require("../utils/isStrongPassword");
const { sendEmail } = require("../utils/sendEmail");

function sendAccountActivator(user, _, res) {
  jwt.sign(
    { id: user.id, email: user.email, type: user.type },
    process.env.secretOrKey,
    { expiresIn: 3600 },
    (_, jwtToken) => {
      const token = new Token({
        userId: user.id,
        token: jwtToken,
      });

      token.save((error) => {
        if (error) {
          return res.status(500).send({
            message: error.message,
          });
        }
        // here, we will send the email to the user.
        if (sendEmail({ token }))
          res.status(200).json({
            success: true,
            msg: `A verification email has been sent to ${user.email}.`,
          });
      });
    }
  );
}

exports.signup = (req, res, next) => {
  let { name, email, phone, password, confirmPassword } = req.body;
  name = name?.trim() || "";
  email = email?.trim() || "";
  phone = phone?.trim() || "";
  password = password?.trim() || "";
  confirmPassword = confirmPassword?.trim() || "";
  const errors = {};

  if (!isStrongPassword(password))
    errors.password =
      "Password must be 8 characters long and should contain at least one digit, capital letter and special character.";
  if (password === "") errors.password = "Password is required.";
  if (confirmPassword === "")
    errors.confirmPassword = "Confirm password is required.";
  if (password !== confirmPassword)
    errors.confirmPassword = "Confirm password should be same as password.";

  if (!isEmpty(errors)) return res.json({ success: false, errors });

  User.findOne({ email })
    .then((user) => {
      if (user && user.isVerified) {
        return res.json({
          success: false,
          errors: { email: "E-mail already exists." },
        });
      }
      if (user && !user.isVerified) {
        user.remove();
      }
      const newUser = new User({
        name,
        email,
        phone,
        password,
      });
      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(async (USER) => {
              sendAccountActivator(USER, req, res);
            })
            .catch(function (err) {
              res.json({ success: false, errors: { ...handleError(err) } });
            });
        });
      });
    })
    .catch(function (err) {
      res.status(500).json({ errors: err.message });
    });
};

exports.signin = (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, errors: { user: "user not found" } });
      } else {
        bcrypt
          .compare(password, user.password)
          .then(function (isMatch) {
            if (!isMatch) {
              return res.json({
                success: false,
                errors: { password: "password is incorrect" },
              });
            }
            const access_token = jwt.sign(
              { email: user.email, userId: user._id, type: user.type },
              process.env.secretOrKey,
              { expiresIn: 3600 }
            );
            jwt.verify(
              access_token,
              process.env.secretOrKey,
              function (err, decoded) {
                if (err) {
                  res.status(500).json({ errors: err });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    access_token,
                    user: {
                      email: user.email,
                      signedUpTime: user.createdAt,
                      isBlacklisted: user.isBlacklisted,
                      authenticatedCommuter: user.isVerified,
                      name: user.name,
                      phone: user.phone,
                      type: user.type,
                      modifiedDetails: user.updatedAt,
                    },
                  });
                }
              }
            );
          })
          .catch(function (err) {
            res.status(500).json({
              errors: err,
            });
          });
      }
    })
    .catch(function (err) {
      res.status(500).json({
        errors: err,
      });
    });
};

exports.confirmToken = (req, res) => {
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (!token) {
      return res.json({
        success: false,
        msg: "Token not found",
      });
    }
    jwt.verify(token.token, process.env.secretOrKey, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      }
      User.findOne(
        {
          _id: decoded.id,
          email: decoded.email,
          type: decoded.type,
        },
        (_, user) => {
          if (!user) return res.json({ msg: "User not found" });
          if (user.isVerified)
            return res.json({ msg: "User is already verified" });
          user.isVerified = true;
          user.save((error) => {
            if (error) {
              return res.status(500).json({
                msg: err.message,
              });
            }
            token.remove();
            res.send({ success: true, msg: "Congratulations !!!" });
          });
        }
      );
    });
  });
};

exports.resendToken = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user) {
        return res.json({
          success: false,
          msg: "We are unable to find a user with that email.",
        });
      }
      if (user.isVerified) return res.json({ msg: "User is already verified" });
      sendAccountActivator(user, req, res);
    }
  ).catch((err) => {
    res.status(500).send(err.message);
  });
};
exports.deleteUser = (req, res) => {
  try {
    User.findByIdAndDelete(req.user.userId, async (err) => {
      if (err) return res.status(500).send({ msg: err.message });
      res.json({
        success: true,
        msg: "user deleted successfully",
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.resetPassword = (req, res) => {
  try {
    if (isMongoId(req.body.id))
      User.findOne({ _id: req.body.id })
        .then((user) => {
          if (!user) return res.json({ msg: "No user for this id" });
          const secret = `${user.password}-${user.updatedAt}`;
          const password = req.body.password;
          if (!isStrongPassword(password))
            return res.json({
              msg: "Password must be 8 characters long and should contain at least one digit, capital letter and special character.",
            });
          try {
            jwt.verify(req.body.token, secret);
            bcrypt.genSalt(10, (_, salt) => {
              bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                user
                  .save()
                  .then(() => {
                    return res.json({ success: true, msg: "Password changed" });
                  })
                  .catch(function (err) {
                    return res.json({ msg: err.message });
                  });
              });
            });
          } catch (err) {
            return res.json({ msg: err.message });
          }
        })
        .catch((err) => res.json({ msg: err.message }));
    else return res.json({ msg: "Please Enter valid Id" });
  } catch (err) {
    return res.send(err.message);
  }
};
exports.forgotPassword = (req, res) => {
  try {
    const { email } = req.body;
    if (!isEmpty(email)) {
      const payload = {};
      let secret;
      User.findOne({ email }).then((user) => {
        if (!user) {
          return res.json({ msg: "There is no user for this email" });
        }
        if (!user.isVerified) {
          return res.json({ msg: "User is not verified yet" });
        }
        payload.id = user.id;
        payload.email = email;
        payload.type = user.type;

        secret = `${user.password}-${user.updatedAt}`;
        const token = jwt.sign(payload, secret, { expiresIn: 3600 });
        console.log(token);
        const host = req.get("host");
        const url = `/api/auth/resetPassword/${payload.id}/${token}`;
        sendEmail(
          {
            from: process.env.email,
            to: payload.email,
            subject: "Reset Password",
            id: payload.id,
            token,
            html: `<b>Click on this link to reset Password</b><a href=\"${url}\">Link</a>`,
          },
          res
        );
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProfile = (req, res) => {
  try {
    User.findOne(
      {
        _id: req.user.userId,
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
