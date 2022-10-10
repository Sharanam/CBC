const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  confirmToken,
  resendToken,
  deleteUser,
  forgotPassword,
  resetPassword,
  // savePassword,
  getProfile,
  getProfileOf,
  updateProfile,
} = require("../controllers/auth");
const { getUser } = require("../utils/getUser");
const { isAuthorizedCommuter } = require("../utils/roleValidation");

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
// router.get("/resetPassword/:id/:token", resetPassword);
// router.post("/savePassword", savePassword);

router.post("/confirmToken", confirmToken);
router.post("/resendToken", resendToken);

router.get("/profile", getUser, getProfile);
router.post("/profile", getUser, updateProfile);
router.get("/profile/:id", getProfileOf);

router.delete("/deleteUser", getUser, deleteUser);

module.exports = router;
