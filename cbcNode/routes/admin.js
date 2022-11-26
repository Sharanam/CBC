const express = require("express");
const router = express.Router();
const {
  getUsers,
  getSpecificUser,
  blacklistUser,
  setAdmin,
  issuePass,
  updatePass,
  deletePass,
} = require("../controllers/admin");
const { getUser } = require("../utils/getUser");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.get("/getUsers", isAuthorizedAdmin, getUsers);
router.get("/getUser/:id", isAuthorizedAdmin, getSpecificUser);
router.post("/blacklist/:id", isAuthorizedAdmin, getUser, blacklistUser);
router.post("/setAdmin/:id", isAuthorizedAdmin, getUser, setAdmin);
router.post("/pass", isAuthorizedAdmin, issuePass);
router.put("/pass", isAuthorizedAdmin, updatePass);
router.delete("/pass", isAuthorizedAdmin, deletePass);

module.exports = router;
