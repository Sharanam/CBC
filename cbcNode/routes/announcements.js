const express = require('express');
const router = express.Router();

const { createAnnouncement, getAnnouncements, updateAnnouncement, deleteAnnouncement } =
require('../controllers/announcements');
const { isAuthorizedAdmin } = require("../utils/roleValidation")

router.get('/announcement', getAnnouncements);
router.post('/announcement', isAuthorizedAdmin, createAnnouncement);
router.delete('/announcement', isAuthorizedAdmin, deleteAnnouncement);
module.exports = router;