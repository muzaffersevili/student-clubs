module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        surname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        personalEmail: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
  
    return User;
};