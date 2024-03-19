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
router.get('/:id', middleware.checkProjectExists, async (req, res, next) => {
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
    const newProject = await Projects.insert(req.body); 
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', middleware.checkProjectExists, async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    // Check if any of the required fields are missing in the request body
    if (name === undefined || description === undefined || completed === undefined) {
      return res.status(400).json({ message: 'Missing required name, description, or completed field' });
    }

    // Proceed with updating the project since all required fields are present
    const updatedProject = await Projects.update(req.params.id, { name, description, completed });
    
    if (updatedProject) {
      res.json(updatedProject); // Respond with the updated project
    } else {
    
      res.status(500).json({ message: 'Failed to update the project' });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', middleware.checkProjectExists, async (req, res, next) => {
  try {
    const success = await Projects.remove(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
  });

  router.get('/:id/actions', middleware.checkProjectExists, async (req, res, next) => {
    try {
      const actions = await Projects.getProjectActions(req.params.id);
      res.json(actions);
    } catch (err) {
      next(err);
    }
    });

module.exports = router;
