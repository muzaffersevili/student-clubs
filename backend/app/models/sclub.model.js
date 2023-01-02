module.exports = (sequelize, Sequelize) => {
    const Sclub = sequelize.define("sclubs", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Sclub;
  };