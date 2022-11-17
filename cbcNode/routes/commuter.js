const express = require("express");
const {
  makeContribution,
  getMyContributions,
  getMyPasses,
  editContribution,
  getContributionsFor,
  setFavorites,
  getMyHistory,
  removeFromHistory,
} = require("../controllers/commuter");
const router = express.Router();
const { getOptionalUser, getUser } = require("../utils/getUser");

router.post("/contribution", getOptionalUser, makeContribution);
router.put("/contribution", getOptionalUser, editContribution);
router.get("/contribution", getUser, getMyContributions);
router.get("/contribution/for", getOptionalUser, getContributionsFor);
router.get("/pass", getUser, getMyPasses);
router.put("/favorites", getUser, setFavorites);
router.get("/history", getUser, getMyHistory);
router.delete("/history", getUser, removeFromHistory);

module.exports = router;
