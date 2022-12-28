module.exports = {
    //Below five parameters are for MySQL connection.
    HOST: "localhost",
    USER: "sclub",
    PASSWORD: "myPassword123!",
    DB: "testdb",
    dialect: "mysql",
    dialectOptions: {
        socketPath: '/var/run/mysqld/mysqld.sock', //This variable makes it so that the code only works on my computer with Linux dist.
                                                   //user your own socketPath or delete this option.
        supportBigNumbers: 1,
        bigNumberStrings: 1
      },
    
    //Will be used for Sequelize connection pool configuration:
    pool: {
        max: 5, //number of connection in pool
        min: 0,
        acquire: 30000,       //maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000           //maximum time, in milliseconds, that a connection can be idle before being released
    }
};