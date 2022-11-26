const express = require("express");
const router = express.Router();

const {
  addReporting,
  editReporting,
  deleteReporting,
  getAllReportings,
  getInstanceOfReporting,
  getBusSpecificReportings,
  getRouteSpecificReportings,
  getRouteBusReportings,
} = require("../controllers/reporting");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addReporting);
router.put("/", isAuthorizedAdmin, editReporting);
router.delete("/", isAuthorizedAdmin, deleteReporting);
router.get("/page/:page", isAuthorizedAdmin, getAllReportings);
router.get("/:id", isAuthorizedAdmin, getInstanceOfReporting);
router.get("/with/:bus", isAuthorizedAdmin, getBusSpecificReportings);
router.get("/on/:route", isAuthorizedAdmin, getRouteSpecificReportings);
router.get("/on/:route/with/:bus", isAuthorizedAdmin, getRouteBusReportings);

module.exports = router;
