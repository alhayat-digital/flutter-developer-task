const { Todo } = require('../models');

function validationError(errors) {
  return {
    message: 'The given data was invalid.',
    errors,
  };
}

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const errors = {};

    if (!title) {
      errors.title = ['The title field is required.'];
    }
    if (!description) {
      errors.description = ['The description field is required.'];
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json(validationError(errors));
    }

    const todo = await Todo.create({
      title,
      description,
      user_id: req.user.id,
    });

    res.status(201).json({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { user_id: req.user.id },
      attributes: ['id', 'title', 'description', 'status', 'created_at'],
    });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    if (todo.user_id !== req.user.id) {
      return res.status(403).json({ message: 'This action is unauthorized.' });
    }

    res.json({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      created_at: todo.created_at,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const errors = {};

    if (!title) {
      errors.title = ['The title field is required.'];
    }
    if (!description) {
      errors.description = ['The description field is required.'];
    }
    if (status && !['pending', 'in_progress', 'completed'].includes(status)) {
      errors.status = ['The selected status is invalid.'];
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json(validationError(errors));
    }

    const todo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    if (todo.user_id !== req.user.id) {
      return res.status(403).json({ message: 'This action is unauthorized.' });
    }

    await todo.update({
      title: title !== undefined ? title : todo.title,
      description: description !== undefined ? description : todo.description,
      status: status !== undefined ? status : todo.status,
    });

    res.json({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Resource not found.' });
    }

    if (todo.user_id !== req.user.id) {
      return res.status(403).json({ message: 'This action is unauthorized.' });
    }

    await todo.destroy();

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
