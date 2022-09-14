const express = require("express");
const router = express.Router();
const { getUsers, getUser } = require("../controllers/admin");
const { isAuthorizedAdmin } = require("../utils/roleValidation");

router.get("/getUsers", isAuthorizedAdmin, getUsers);
router.get("/getUser/:id", isAuthorizedAdmin, getUser);

module.exports = router;
