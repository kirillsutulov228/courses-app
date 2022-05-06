const { STRING } = require('sequelize');
const sequelize = require('../sequelize.js');
const bcrypt = require('bcrypt');
const Role = require('./Role.js');

const User = sequelize.define('users', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false, 
  },
  refreshToken: {
    type: STRING,
    defaultValue: null,
  }
});

async function hashPasword(user) {
  const password = user.getDataValue('password');
  if (password && (user.isNewRecord || user.changed('password'))) {
    user.setDataValue('password', await bcrypt.hash(password, 10))
  }
}

User.addHook('afterCreate', async function (user) {
  const [role] = await Role.findOrCreate({ where: { name: 'user' } });
  await user.addRole(role);
});

User.addHook('beforeCreate', hashPasword);
User.addHook('beforeUpdate', hashPasword);

User.prototype.checkPassword = async function (password) {
  if (!password) return false;
  const hash = this.getDataValue('password');
  return await bcrypt.compare(password, hash);
}

module.exports = User;
