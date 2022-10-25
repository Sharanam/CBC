const express = require("express");
const {
  makeContribution,
  getMyContributions,
  getMyPasses,
  editContribution,
  getContributionsFor,
} = require("../controllers/commuter");
const router = express.Router();
const { getUser } = require("../utils/getUser");

router.post("/contribution", getUser, makeContribution);
router.put("/contribution", getUser, editContribution);
router.get("/contribution", getUser, getMyContributions);
router.get("/contribution/for", getUser, getContributionsFor);
router.get("/pass", getUser, getMyPasses);

module.exports = router;
