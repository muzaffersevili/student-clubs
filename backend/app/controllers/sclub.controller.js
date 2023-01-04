const db = require("../models");
const Sclub = db.sclub;
const Op = db.Sequelize.Op;

// Create and Save a new Sclub
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Sclub
  const sclub = {
    name: req.body.name,
    description: req.body.description,
    isActive: req.body.isActive ? req.body.isActive : false
  };

  // Save Sclub in the database
  Sclub.create(sclub)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sclub."
      });
    });
};

// Retrieve all Sclubs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Sclub.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sclubs."
      });
    });
};

// Find a single Sclub with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sclub.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Sclub with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Sclub with id=" + id
      });
    });
};

// Update a Sclub by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sclub.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sclub was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Sclub with id=${id}. Maybe Sclub was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Sclub with id=" + id
      });
    });
};

// Delete a Sclub with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sclub.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Sclub was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Sclub with id=${id}. Maybe Sclub was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Sclub with id=" + id
      });
    });
};

// Delete all Sclubs from the database.
exports.deleteAll = (req, res) => {
  Sclub.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sclubs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sclubs."
      });
    });
};

// find all active Sclub
exports.findAllActive = (req, res) => {
  Sclub.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sclubs."
      });
    });
};