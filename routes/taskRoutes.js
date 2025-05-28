const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const validateTask = require('../middleware/validateTask');
const ensureAuth = require('../middleware/ensureAuth');

// Todas las rutas están protegidas por login
router.get('/', ensureAuth, taskController.getAllTasks);
router.get('/:id', ensureAuth, taskController.getTaskById);
router.post('/', ensureAuth, validateTask, taskController.createTask);
router.put('/:id', ensureAuth, validateTask, taskController.updateTask);
router.delete('/:id', ensureAuth, taskController.deleteTask);

module.exports = router;
