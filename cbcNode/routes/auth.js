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
} = require("../controllers/auth");
const { getUser } = require("../utils/getUser");

router.post("/signup", signup);
router.post("/signin", signin);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
// router.get("/resetPassword/:id/:token", resetPassword);
// router.post("/savePassword", savePassword);

router.post("/confirmToken", confirmToken);
router.post("/resendToken", resendToken);

router.get("/profile", getUser, getProfile);

router.delete("/deleteUser", getUser, deleteUser);

module.exports = router;
