const { INTEGER } = require('sequelize');
const sequelize = require('../sequelize.js');

const Score = sequelize.define('users_tasksScores', {
  score: {
    type: INTEGER,
    defaultValue: 0
  }
});

module.exports = Score;
