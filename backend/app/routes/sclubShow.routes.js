module.exports = app => {
    const sclubs = require("../controllers/sclubShow.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all sclubs
    router.get("/", sclubs.findAll);
  
    // Retrieve all active sclubs
    router.get("/isActive", sclubs.findAllActive);
  
    // Retrieve a single Student Club with id
    router.get("/:id", sclubs.findOne);
  
    app.use('/api/sclubss', router);
  };