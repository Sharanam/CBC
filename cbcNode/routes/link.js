const express = require("express");
const router = express.Router();

const {
  addLink,
  editLink,
  deleteLink,
  getLink,
} = require("../controllers/link");
const { getOptionalUser } = require("../utils/getUser");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addLink);
router.get("/:linkId", getLink);
router.get("/on/:route", getOptionalUser, getLink);
router.get("/with/:bus", getOptionalUser, getLink);
router.get("/page/:page", getLink);
router.put("/", isAuthorizedAdmin, editLink);
router.delete("/", isAuthorizedAdmin, deleteLink);
module.exports = router;
