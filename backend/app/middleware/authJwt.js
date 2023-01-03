const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) 
        return res.status(403).send({message: "No token provided!"});

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({message: "Unauthorized!"});
        
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            console.log("is not admin");
            res.status(403).send({message: "Require Admin Role!"});
            return;
        });
    });
};

isStudent = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "student") {
                    next();
                    return;
                }
            }
            res.status(403).send({message: "Require Student Role!"});
            return;
        });
    });
};

isChairPerson = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "chairperson") {
                    next();
                    return;
                }
            }
            res.status(403).send({message: "Require Chairperson Role!"});
            return;
        });
    });
};

isCounselor = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "counselor") {
                    next();
                    return;
                }
            }
            res.status(403).send({message: "Require Counselor Role!"});
            return;
        });
    });
};

//Role Check with Multiple Roles
/*
isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
                next();
                return;
            }

            if (roles[i].name === "admin") {
                next();
                return;
            }
        }

        res.status(403).send({
            message: "Require Moderator or Admin Role!"
        });
        });
    });
};*/

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isStudent: isStudent,
    isChairPerson: isChairPerson,
    isCounselor: isCounselor
};
module.exports = authJwt;
