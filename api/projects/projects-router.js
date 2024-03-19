const express = require('express');
const router = express.Router();
const Projects = require('./projects-model'); // This should be your data access layer
const middleware = require('./projects-middleware'); // This should be your middleware layer

// use middleware in routes
router.get('/:id', middleware.checkProjectExists, (req, res) => {
    res.json(req.project);
});

router.post('/', middleware.validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.create(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.findAllProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/projects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Projects.findProjectById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

// [POST] /api/projects
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.description) { // Assuming these are the required fields
      return res.status(400).json({ message: 'Missing required name or description field' });
    }
    const newProject = await Projects.createProject(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    // Validate presence of 'name' and 'description'
    if (name === undefined || description === undefined || completed === undefined) {
      return res.status(400).json({ message: 'Missing required name or description field' });
    }

    // Construct the update object with fields that can be updated
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed; // Include 'completed' only if it's explicitly provided

    // Attempt to update the project
    const updatedProject = await Projects.update(req.params.id, updateData);

    if (updatedProject) {
      res.json(updatedProject); // Return the updated project
    } else {
      res.status(404).json({ message: 'Project not found' }); // Project with provided ID doesn't exist
    }
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
});

// [DELETE] /api/projects/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const success = await Projects.deleteProject(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

// [GET] /api/projects/:id/actions
router.get('/:id/actions', async (req, res, next) => {
  try {
    const project = await Projects.findProjectById(req.params.id);
    if (project) {
      const actions = await Projects.findProjectActions(req.params.id);
      res.json(actions);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;


