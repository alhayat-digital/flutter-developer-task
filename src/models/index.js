const User = require('./user.model');
const Todo = require('./todo.model');

User.hasMany(Todo, { foreignKey: 'user_id', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = { User, Todo };
