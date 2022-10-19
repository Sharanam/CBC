const express = require("express");
const router = express.Router();

const {
  addBus,
  editBus,
  deleteBus,
  getBus,
  getBuses,
} = require("../controllers/buses");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addBus);
router.get("/:busId", getBus);
router.get("/on/:route", getBuses);
router.get("/page/:page", getBuses);
router.put("/", isAuthorizedAdmin, editBus);
router.delete("/", isAuthorizedAdmin, deleteBus);
module.exports = router;
