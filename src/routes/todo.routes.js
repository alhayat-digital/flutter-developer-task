const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, todoController.createTodo);
router.get('/', authMiddleware, todoController.getAllTodos);
router.get('/:id', authMiddleware, todoController.getTodoById);
router.put('/:id', authMiddleware, todoController.updateTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
