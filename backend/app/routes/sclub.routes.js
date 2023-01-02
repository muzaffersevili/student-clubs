module.exports = app => {
    const sclubs = require("../controllers/sclub.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", sclubs.create);
  
    // Retrieve all Tutorials
    router.get("/", sclubs.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", sclubs.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", sclubs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", sclubs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", sclubs.delete);
  
    // Delete all Tutorials
    router.delete("/", sclubs.deleteAll);
  
    app.use('/api/sclubs', router);
  };