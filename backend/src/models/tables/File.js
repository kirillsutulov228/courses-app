const { STRING } = require('sequelize');
const sequelize = require('../sequelize.js');

const File = sequelize.define('files', {
  name: {
    type: STRING,
    allowNull: false,
  },
  downloadLink: {
    type: STRING,
    allowNull: false,
  },
  type: {
    type: STRING,
    defaultValue: 'material'
  }
});

module.exports = File;
