const { Sequelize } = require('sequelize');

const Database = new Sequelize({
    use_env_variable: "DATABASE_URL",
    database: "d1bgpj2sea6qss",
    host: "ec2-3-217-68-126.compute-1.amazonaws.com",
    username: "dvawfyzuplqfok",
    password: "b9a2915c8da1403a5f97c47e758b7078a7c7eae952ecc4f476e3dba5d504d57e",
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
});

// check database connections
async function checkConnection() {
    console.log('trying to connect postgre database...');
    try {
        await Database.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database ', error);
        throw (error);
    }
}

module.exports = {
    Database,
    checkConnection
};
