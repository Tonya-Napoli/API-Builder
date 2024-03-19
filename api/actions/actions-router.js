const express = require('express');
const router = express.Router();
const Actions = require('./actions-model'); // Assuming this path is correct
const middleware = require('./actions-middlware'); // Make sure this path is also correct

// [POST] /api/actions
router.post('/', [middleware.validateAction, middleware.validateProjectId], async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body); // Use the insert method from your actions-model
        res.status(201).json(newAction);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions
router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get(); // Use the get method without id to fetch all actions
        res.json(actions);
    } catch (err) {
        next(err);
    }
});

// [GET] /api/actions/:id
router.get('/:id', async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id); // Use the get method with id to fetch a specific action
        if (action) {
            res.json(action);
        } else {
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err);
    }
});

// [PUT] /api/actions/:id
router.put('/:id', async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body); // Use the update method
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
        const success = await Actions.remove(req.params.id); // Use the remove method
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



