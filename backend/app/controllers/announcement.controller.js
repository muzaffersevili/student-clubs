const db = require("../models");
const Announcement = db.announcement;
const Op = db.Sequelize.Op;

// Create and Save a new Announcement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!"
    });
    return;
  }

  // Create an Announcement
  const announcement = {
    title: req.body.title,
    description: req.body.description,
    isActive: req.body.isActive ? req.body.isActive : false
  };

  // Save Announcement in the database
  Announcement.create(announcement)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Announcement."
      });
    });
};

// Retrieve all Announcement from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Announcement.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Announcements."
      });
    });
};

// Find a single Announcement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Announcement.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Announcement with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Announcement with id=" + id
      });
    });
};

// Update an Announcement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Announcement.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Announcement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Announcement with id=${id}. Maybe Announcement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Announcement with id=" + id
      });
    });
};

// Delete an Announcement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Announcement.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Announcement was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Announcement with id=${id}. Maybe Announcement was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Announcement with id=" + id
      });
    });
};

// Delete all Announcements from the database.
exports.deleteAll = (req, res) => {
    Announcement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Announcement were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Announcements."
      });
    });
};

// find all active Announcement
exports.findAllActive = (req, res) => {
    Announcement.findAll({ where: { isActive: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Announcements."
      });
    });
};