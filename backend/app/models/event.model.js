module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.DATE
      },
      startDate: {
        type: Sequelize.DATE
      },
    });
  
    return Event;
  };