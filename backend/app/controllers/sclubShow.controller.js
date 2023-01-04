const db = require("../models");
const Sclub = db.sclub;
const Op = db.Sequelize.Op;


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

// find all published Sclub
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