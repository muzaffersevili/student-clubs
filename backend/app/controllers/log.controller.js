const db = require("../models");
const Log = db.log;
const Op = db.Sequelize.Op;

// Create and Save a new Log
exports.create = (req, res) => {

  // Validate request
  if (!req.body.message) {
    res.status(400).send({
      message: "Message can not be empty!"
    });
    return;
  }

  // Create a Log
  const log = {
    timestamp: req.body.timestamp,
    level: req.body.level,
    message: req.body.message
  };

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
  const message = req.query.message;
  var condition = message ? { message: { [Op.like]: `%${message}%` } } : null;

  Log.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Log."
      });
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

// Update a Log by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Log.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Log was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Log with id=${id}. Maybe Log was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Log with id=" + id
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
      res.send({ message: `${nums} Log were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Logs."
      });
    });
};