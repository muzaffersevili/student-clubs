const db = require("../models");
const Log = db.log;
const Op = db.Sequelize.Op;

// Create and Save a new Log
exports.create = (req, res) => {

  // Create a Log
  const log = {
    messageType: req.body.messageType,
    message: req.body.message,
    timeStamp: ""
  };
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  log.timeStamp = date+' '+time;
  console.log(log);
  // Save Log in the database
  Log.create(log)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Log."
      });
    });
};

// Retrieve all Logs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Log.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      /*res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Logs."
      });*/
    });
};

// Find a single Log with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Log.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Log with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Log with id=" + id
      });
    });
};

// Delete a Log with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Log.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Log with id=${id}. Maybe Log was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Log with id=" + id
      });
    });
};

// Delete all Logs from the database.
exports.deleteAll = (req, res) => {
  Log.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Logs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logs."
      });
    });
};