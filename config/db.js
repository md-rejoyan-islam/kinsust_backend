const { Sequelize } = require("sequelize");
const devConsole = require("../helper/devConsole");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    sequelize.sync(); // sync all models with database

    // sequelize.sync({ force: true }); // sync all models with database and force to drop all tables

    await sequelize.authenticate(); // test connection

    const config = await sequelize.connectionManager.config;

    devConsole(
      `MySQL connected successfully on ${config.host}\nDatabase name: ${config.database}`
    );
  } catch (error) {
    devConsole("Unable to connect to the database:", error);
  }
};

// export
module.exports = {
  sequelize,
  connectDB,
};
