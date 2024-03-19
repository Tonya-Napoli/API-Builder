// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model'); // This should be your data access layer
const middleware = require('./actions-middlware'); // This should be your middleware layer

router.post('/', [middleware.validateAction, middleware.validateProjectId], async (req, res, next) => {
    try {
        const newAction = await Actions.create(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.findAll();
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res, next) => {
    try {
        const action = await Actions.findById(req.params.id);
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

// [POST] /api/actions
router.post('/', async (req, res, next) => {
    try {
        const { project_id, description, notes } = req.body; // Assume these are the required fields
        if (!project_id || !description || !notes) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Optionally, verify project_id exists in projects table/database
        const newAction = await Actions.create(req.body);
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

// [PUT] /api/actions/:id
router.put('/:id', async (req, res, next) => {
    try {
        const { project_id, description, notes } = req.body; // Assume these are the required fields
        if (!project_id || !description || !notes) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const updatedAction = await Actions.update(req.params.id, req.body);
        if (updatedAction) {
            res.json(updatedAction);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

// [DELETE] /api/actions/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const success = await Actions.remove(req.params.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

