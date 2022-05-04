const { STRING } = require('sequelize');
const sequelize = require('../sequelize.js');

const Role = sequelize.define('roles', {
  name: {
    type: STRING,
    unique: true,
    defaultValue: 'user'
  },
  description: {
    type: STRING,
    defaultValue: null
  }
});

module.exports = Role;