module.exports = (sequelize, Sequelize) => {
    const Announcement = sequelize.define("announcements", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Announcement;
};