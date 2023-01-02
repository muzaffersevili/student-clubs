module.exports = (sequelize, Sequelize) => {
    const Sclub = sequelize.define("sclub", {
      name: {
        type: Sequelize.STRING
      },
      chairperson: {
        type: Sequelize.STRING
      },
      counsellor: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Sclub;
  };