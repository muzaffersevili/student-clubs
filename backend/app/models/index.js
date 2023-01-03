const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        port: 3306,
        operatorsAliases: 0,
        dialectOptions: config.dialectOptions,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
/*
//Checking connection status
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
*/
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.sclub = require("../models/sclub.model.js")(sequelize, Sequelize);
db.announcement = require("../models/announcement.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.log = require("../models/log.model.js")(sequelize, Sequelize);

/*
With through, foreignKey, otherKey, we’re gonna have a new table user_roles
as connection between users and roles table via their primary key as foreign keys.

To change associations visit the following page. https://sequelize.org/docs/v6/core-concepts/assocs/
*/

// Many To Many USER and ROLE relation (Every user has at least one role.)
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// Many To Many STUDENT and STUDENT CLUB relation
db.sclub.belongsToMany(db.user, {
    through: "membership",
    foreignKey: "sclubId",
    otherKey: "studentId"
});
db.user.belongsToMany(db.sclub, {
    through: "membership",
    foreignKey: "studentId",
    otherKey: "sclubId"
});

// One To One COUNSELOR and STUDENT CLUB relation (add a user column to the sclub)
db.sclub.hasOne(db.user, {
    foreignKey: 'counselorId'
});
db.user.belongsTo(db.sclub);


// Many To One CHAIRPERSON and STUDENT CLUB relation
db.sclub.hasMany(db.user, {
    foreignKey: 'chairedSclubId'
});
db.user.belongsTo(db.sclub);

// Many To Many EVENT and STUDENT CLUB relation (Every user has at least one role.)
db.event.belongsToMany(db.sclub, {
    through: "club_events",
    foreignKey: "eventId",
    otherKey: "sclubId"
});
db.sclub.belongsToMany(db.event, {
    through: "club_events",
    foreignKey: "sclubId",
    otherKey: "eventId"
});

// Many To One ANNOUNCEMENT and STUDENT CLUB relation
db.sclub.hasMany(db.announcement, {
    foreignKey: 'sclubId'
});
db.announcement.belongsTo(db.sclub);

// Many To One ANNOUNCEMENT and USER relation
db.user.hasMany(db.announcement, {
    foreignKey: 'announcerId'
});
db.announcement.belongsTo(db.user);


db.ROLES = ["admin", "student", "chairperson", "counselor"];

module.exports = db;
