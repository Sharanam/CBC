const express = require("express");
const {
  makeContribution,
  getMyContributions,
  getMyPasses,
  editContribution,
  getContributionsFor,
} = require("../controllers/commuter");
const router = express.Router();
const { getOptionalUser } = require("../utils/getUser");

router.post("/contribution", getOptionalUser, makeContribution);
router.put("/contribution", getOptionalUser, editContribution);
router.get("/contribution", getOptionalUser, getMyContributions);
router.get("/contribution/for", getOptionalUser, getContributionsFor);
router.get("/pass", getOptionalUser, getMyPasses);

module.exports = router;
