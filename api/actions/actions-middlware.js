// add middlewares here related to actions
const Actions = require('./actions-model'); // Adjust path as necessary

// Check if an action exists
async function checkActionExists(req, res, next) {
    try {
        const action = await Actions.findById(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }
        req.action = action; // Pass action forward if needed
        next();
    } catch (err) {
        next(err);
    }
}

// Validate action data
function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: 'Missing required fields: project_id, description, notes' });
    }
    // Optionally, add more validation here
    next();
}

// Ensure the project_id exists (assuming you have a Projects model to check against)
async function validateProjectId(req, res, next) {
    try {
        const project = await Projects.findById(req.body.project_id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkActionExists,
    validateAction,
    validateProjectId
};

