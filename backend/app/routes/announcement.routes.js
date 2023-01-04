module.exports = app => {
    const announcements = require("../controllers/announcement.controller.js");

    var router = require("express").Router();

    // Create a new Announcement
    router.post("/", announcements.create);

    // Retrieve all announcements
    router.get("/", announcements.findAll);

    // Retrieve a single announcement with id
    router.get("/:id", announcements.findOne);

    // Delete an announcement with id
    router.delete("/:id", announcements.delete);

    // Delete all announcements
    router.delete("/", announcements.deleteAll);

    app.use('/api/announcements', router);
};
