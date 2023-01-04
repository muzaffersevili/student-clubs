module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        messageType: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
        },
        timestamp: {
            type: Sequelize.STRING
        }

    });
    return Log;
};