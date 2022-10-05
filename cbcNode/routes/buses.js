const express = require("express");
const router = express.Router();

const {
  addBus,
  editBus,
  deleteBus,
  getBus,
  getBuses,
  viewBuses
} = require("../controllers/buses");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addBus);
router.get("/:busId", getBus);
router.get("/on/:route", getBuses);
router.get("/page/:page", viewBuses);
router.put("/", isAuthorizedAdmin, editBus);
router.delete("/", isAuthorizedAdmin, deleteBus);
module.exports = router;
