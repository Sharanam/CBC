async function createAnnouncement(req, res) {
    try {
        const { title, description } = req.body;
        const newAnnouncement = new Announcement({
            title,
            description,
        });

        newAnnouncement
            .save()
            .then((announcement) => {
                res.json({ success: true, announcement });
            })
            .catch((error) => {
                res.json({ success: false, ...handleError(error) });
            });
    } catch (e) {
        res.status(500).send("something went wrong");
    }
}
async function getAnnouncements(req, res) {
    try {
        const result = await Announcement.find().sort().exec();
        return res.json({
            success: true,
            announcements: result
        })
    } catch (e) {
        res.status(500).send("something went wrong");
    }
}
async function deleteAnnouncement(req, res) {
    try {
        const result = await Announcement.findByIdAndDelete(
            req.body.announcementId
        ).exec();

        if (result) {
            res.json({ success: true, msg: "announcement deleted successfully" });
        } else { res.json({ success: false, msg: "wrong id" }); }
    } catch (e) {
        res.status(500).send("something went wrong");
    }
}

module.exports = { createAnnouncement, getAnnouncements, deleteAnnouncement }