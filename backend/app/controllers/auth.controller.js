const db = require("../models");
const config = require("../config/auth.config");
const Logger = require("./log.controller");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const email = req.body.email;
    const log = {
        body: {
          messageType: 'SIGNUP',
          message: "",
          timeStamp: ""
        },
      };


    // Save User to Database
    User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    log.body.message = `user with mail ${email} was registered successfully!`;
                    Logger.create(log,res);
                    res.send({ message: "User was registered successfully!" });
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                log.body.message = `user with mail ${email} was registered successfully!`;
                Logger.create(log,res);
                res.send({ message: "User was registered successfully!" });
            });
        }
    }).catch(err => {
        log.body.messageType = "ERROR"
        log.body.message = `user with mail ${email} failed to register!`;
        Logger.create(log,res);
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    const email = req.body.email;

    const log = {
        body: {
          messageType: 'SIGNIN',
          message: "",
          timeStamp: ""
        },
      };
    User.findOne({
        where: {
            email: req.body.email
        },
    }).then(user => {
        if (!user) {
            log.body.message = `user with mail ${email} failed to signin, user not found!`;
            Logger.create(log,res);
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            log.body.messageType = "ERROR";
            log.body.message = `user with mail ${email} failed to signin, invalid password!`;
            Logger.create(log);
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(err => {
        log.body.messageType = "ERROR";
        log.message = `user with mail ${email} failed to signin!`;
        Logger.create(log);
        res.status(500).send({ message: err.message });
    });
};