const express = require("express");
const router = express.Router();

const { addBus } = require("../controllers/buses");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.post("/", isAuthorizedAdmin, addBus);
module.exports = router;
