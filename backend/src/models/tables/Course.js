const { STRING } = require('sequelize');
const sequelize = require('../sequelize.js');

const Course = sequelize.define('courses', {
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: STRING,
    defaultValue: null
  },
  tags: {
    type: STRING,
    defaultValue: null,
  }
});

module.exports = Course;
