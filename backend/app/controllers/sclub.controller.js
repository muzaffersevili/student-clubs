const db = require("../models");
const Sclub= db.user;
const Op=db.Sequalize.Op;

exports.create =(req,res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
}}

const sclub = {
    name: req.body.name,
    chairperson: req.body.chairperson,
    counsellor: req.body.counsellor,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
};

Sclub.create(sclub)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student Club."
      });
    });

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
                err.message || "Some error occurred while retrieving Student Clubs."
            });
          });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Sclub.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student Club with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Student Club with id=" + id
        });
      });
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Sclub.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student Club was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Student Club with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student Club with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Sclub.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student Club was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Student Club with id=${id}. Maybe Student Club was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student Club with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Sclub.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Student Clubs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Student Clubs."
        });
      });
  };

  exports.findAllPublished = (req, res) => {
    Sclub.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Student Clubs."
        });
      });
  };