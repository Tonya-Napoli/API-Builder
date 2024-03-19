const express = require('express');
const router = express.Router();
const Actions = require('./actions-model'); // Assuming this path is correct
const middleware = require('./actions-middlware'); // Make sure this path is also correct


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

router.put('/:id', async (req, res, next) => {
    try {
        // Destructure the expected fields from req.body
        const { notes, description, completed, project_id } = req.body;

        // Check if any of the required fields are missing in the request body
        if (notes === undefined || description === undefined || completed === undefined || project_id === undefined) {
            // If any are missing, respond with a 400 Bad Request status
            return res.status(400).json({ message: 'Missing required fields: notes, description, completed, or project_id' });
        }

        // Proceed with updating the action since all required fields are present
        const updatedAction = await Actions.update(req.params.id, req.body);
        if (updatedAction) {
            res.json(updatedAction); // Respond with the updated action
        } else {
            // If the action cannot be found for updating, respond with a 404 Not Found status
            res.status(404).json({ message: 'Action not found' });
        }
    } catch (err) {
        next(err); // Pass any errors to the error-handling middleware
    }
});
// [POST] /api/actions

router.post('/', [middleware.validateAction], async (req, res, next) => {
    try {
        const { project_id, description, notes } = req.body;
        const newAction = await Actions.insert({ project_id, description, notes }); // Use the insert method from actions-model
        res.status(201).json(newAction);
    }   catch (err) {
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



