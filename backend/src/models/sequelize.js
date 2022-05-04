const { Sequelize } = require('sequelize');

const { DB_URI, DB_DIALECT } = process.env;

console.log(DB_URI);

const sequelize = new Sequelize(DB_URI, {
  dialect: DB_DIALECT,
});

module.exports = sequelize;
