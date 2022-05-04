const { STRING } = require('sequelize');
const sequelize = require('../sequelize.js');

const Task = sequelize.define('tasks', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: STRING,
    defaultValue: null
  },
});

module.exports = Task;
