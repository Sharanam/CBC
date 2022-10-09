const express = require("express");
const router = express.Router();

const { busStands } = require("../controllers/busStands");

router.get("/", busStands);
module.exports = router;
