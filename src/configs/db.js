const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db/database.sqlite'),
  logging: false,
});

async function syncDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database Connection successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, syncDB };
