const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db/database.sqlite'),
  logging: false,
});


async function syncDB() {
  await sequelize.authenticate();
  await sequelize.sync();
}


module.exports = { sequelize, syncDB };
