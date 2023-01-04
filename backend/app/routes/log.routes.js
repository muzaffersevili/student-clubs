module.exports = app => {
    const logs = require("../controllers/log.controller.js");

    var router = require("express").Router();

    // Create a new log
    router.post("/", logs.create);

    // Retrieve all logs
    router.get("/", logs.findAll);

    // Retrieve a single log with id
    router.get("/:id", logs.findOne);

    // Delete a log with id
    router.delete("/:id", logs.delete);

    // Delete all logs
    router.delete("/", logs.deleteAll);

    app.use('/api/logs', router);
};