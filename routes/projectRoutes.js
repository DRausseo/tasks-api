const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const validateProject = require('../middleware/validateProject');
const ensureAuth = require('../middleware/ensureAuth');

// Todas las rutas protegidas por login
router.get('/', ensureAuth, projectController.getAllProjects);
router.get('/:id', ensureAuth, projectController.getProjectById);
router.post('/', ensureAuth, validateProject, projectController.createProject);
router.put('/:id', ensureAuth, validateProject, projectController.updateProject);
router.delete('/:id', ensureAuth, projectController.deleteProject);

module.exports = router;
