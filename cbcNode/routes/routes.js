const express = require("express");
const router = express.Router();

const {
  addRoute,
  editRoute,
  deleteRoute,
  getRoute,
  getRoutes,
  getAllRoutes,
} = require("../controllers/routes");
const { getOptionalUser } = require("../utils/getUser");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addRoute);
router.put("/", isAuthorizedAdmin, editRoute);
router.delete("/", isAuthorizedAdmin, deleteRoute);
router.get("/:routeId", getOptionalUser, getRoute);
router.get("/for/stops", getRoutes);
router.get("/view/all", getAllRoutes);
module.exports = router;
