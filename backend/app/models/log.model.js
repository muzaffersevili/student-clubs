module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define("logs", {
        timestamp: {
            type: Sequelize.DATE
        },
        message: {
            type: Sequelize.TEXT
        }
    });
  
    return Log;
};