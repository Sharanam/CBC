const express = require("express");
const router = express.Router();
const { newFeedback, updateFeedback } = require("../controllers/commuter");
const { getUser } = require("../utils/getUser");
const { isAuthorizedCommuter } = require("../utils/roleValidation");
router.post("/feedback", isAuthorizedCommuter, getUser, newFeedback);
router.put("/feedback", isAuthorizedCommuter, getUser, updateFeedback);

module.exports = router;
