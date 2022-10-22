const express = require("express");
const router = express.Router();

const { busStandNames, relatedRoutesTo } = require("../controllers/busStands");

router.get("/", busStandNames);
router.get("/:standName", relatedRoutesTo);
module.exports = router;
