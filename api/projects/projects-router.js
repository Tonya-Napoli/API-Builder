const express = require('express');
const router = express.Router();
const Projects = require('./projects-model'); // Ensure this path is correct
const middleware = require('./projects-middleware'); // Ensure this path is correct

// GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET a project by ID
// Notice: You don't need to declare this route twice, middleware.checkProjectExists can handle checking
router.get('/:id', middleware.checkProjectExists, async (req, res, next) => {
  // Since middleware.checkProjectExists may already retrieve the project,
  // you could adjust its implementation to attach the project to `req` (like req.project)
  // and simply use that here, avoiding another DB call. Otherwise:
  try {
    const project = await Projects.get(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST a new project
router.post('/', middleware.validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body); // Assuming insert is the correct method as per your model
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// Similarly adjust PUT, DELETE, and other endpoints to use the correct model functions

// Export only the router
module.exports = router;


