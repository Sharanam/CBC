const express = require("express");
const {
  makeContribution,
  getMyContribution,
  getMyPasses,
} = require("../controllers/commuter");
const router = express.Router();
// const { newFeedback, updateFeedback } = require("../controllers/commuter");
const { getUser } = require("../utils/getUser");
const { isAuthorizedCommuter } = require("../utils/roleValidation");
// router.post("/feedback", isAuthorizedCommuter, getUser, newFeedback);
// router.put("/feedback", isAuthorizedCommuter, getUser, updateFeedback);

router.post("/contribution", getUser, makeContribution);
router.get("/contribution", isAuthorizedCommuter, getUser, getMyContribution);
router.get("/pass", isAuthorizedCommuter, getUser, getMyPasses);

module.exports = router;
