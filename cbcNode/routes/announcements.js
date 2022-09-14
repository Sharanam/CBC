const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
} = require("../controllers/announcements");

const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.get("/get", getAnnouncements);
router.post("/create", isAuthorizedAdmin, createAnnouncement);
router.delete("/delete", isAuthorizedAdmin, deleteAnnouncement);

module.exports = router;
