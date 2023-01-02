  module.exports = app => {
    const sclubs = require("../controllers/sclub.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Student Club
    router.post("/", sclubs.create);
  
    // Retrieve all sclubs
    router.get("/", sclubs.findAll);
  
    // Retrieve all published sclubs
    router.get("/published", sclubs.findAllActive);
  
    // Retrieve a single Student Club with id
    router.get("/:id", sclubs.findOne);
  
    // Update a Student Club with id
    router.put("/:id", sclubs.update);
  
    // Delete a Student Club with id
    router.delete("/:id", sclubs.delete);
  
    // Delete all sclubs
    router.delete("/", sclubs.deleteAll);
  
    app.use('/api/sclubs', router);
  };