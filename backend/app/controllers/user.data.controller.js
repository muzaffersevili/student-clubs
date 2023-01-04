const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
//const mysql = require('mysql2/promise');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const user = {
        name: req.state.name,
        surname: req.state.surname,
        email: req.state.email,
        personalEmail: req.state.personalEmail,
        phone: req.state.phone,
        password: req.state.password,
        roles: req.state.roles
    };

    // Save user in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    console.log("asascasjhakslöş");

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with an id
/*
SELECT r.name
FROM user_roles ur
    JOIN users u ON ur.userId = u.id
    JOIN roles r ON ur.roleId = r.id
    WHERE u.id = ?,
*/
exports.getRoles = (req, res) => {
    console.log("sdasd");
    const id = req.params.id;

    User.findByPk(id, {
        include: [{
            model: Role,
            through: 'user_roles'
        }]
    })
        .then(data => {
            if (data) {
                const roleNames = data.roles.map(role => role.name);
                res.send(roleNames);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};
/*
-- Insert new rows for roles that do not exist
INSERT INTO user_roles (userId, roleId)
VALUES (1, 1), (1, 2)
ON DUPLICATE KEY UPDATE userId = userId;
-- Delete rows for roles that are no longer associated with the user
DELETE FROM user_roles WHERE userId = 1 AND roleId NOT IN (1, 2);
*/
//setRoles method provided by the Sequelize Many-to-Many association
//This method will update the user_roles relation table with the new roles.
exports.updateRoles = (req, res) => {
    const id = req.params.id;
    const newRoles = req.body.roles;

    User.findByPk(id)
      .then(user => {
        if (!user) {
          res.status(404).send({ message: `Cannot find user with id=${id}.` });
        } else {
          user.setRoles(newRoles)
            .then(() => {
              res.send({ message: 'User roles updated successfully.' });
            })
            .catch(err => {
              res.status(500).send({ message: 'Error updating user roles.' });
            });
        }
      })
      .catch(err => {
        res.status(500).send({ message: 'Error retrieving user with id=' + id });
      });
  };



/*
// Find a single user with an id
exports.getRoles = (req, res) => {
    console.log("sdasd");
    const id = req.params.id;
    return getRoles(id);
};
async function getRoles(id) {
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'sclub',
        password: 'myPassword123!',
        database: 'testdb'
      });
  
      const [rows] = await connection.execute(
        `SELECT r.name
         FROM user_roles ur
         JOIN users u ON ur.userId = u.id
         JOIN roles r ON ur.roleId = r.id
         WHERE u.id = ?`,
        [id]
      );
  
      return rows.map(row => row.name);
    } catch (error) {
      console.error(error);
    } finally {
      if (connection) connection.end();
    }
  }*/
// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};