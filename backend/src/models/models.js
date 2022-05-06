const User = require('./tables/User.js');
const Course = require('./tables/Course.js');
const Task = require('./tables/Task.js');
const File = require('./tables/File.js');
const Score = require('./tables/Score.js');
const Role = require('./tables/Role.js');

User.hasMany(Course, { as: 'createdCourses', foreignKey: 'authorId' });
Course.belongsTo(User, { as: 'author', foreignKey: 'authorId' });

Course.hasMany(Task);
Task.belongsTo(Course);

Task.hasMany(File);
File.belongsTo(Task);

User.belongsToMany(Task, { through: Score });
Task.belongsToMany(User, { through: Score });
User.hasMany(Score);
Score.belongsTo(User);
Task.hasMany(Score);
Score.belongsTo(Task);

User.belongsToMany(Role, { through: 'users_roles' });
Role.belongsToMany(User, { through: 'users_roles' });

User.belongsToMany(Course, { through: 'users_subscribedCourses', as: 'subscribedCourses' });
Course.belongsToMany(User, { through: 'users_subscribedCourses', as: 'subscribers' });

module.exports = {
  User,
  Course,
  Task,
  File,
  Score
};
