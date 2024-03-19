// add middlewares here related to projects
const Projects = require('./projects-model'); // Adjust the path as necessary

// Middleware to check if a project exists
async function checkProjectExists(req, res, next) {
    try {
        const project = await Projects.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        req.project = project; // Optionally pass the project forward
        next();
    } catch (err) {
        next(err);
    }
}

// Middleware to validate project data on creation or update
function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Missing required name or description field' });
    }
    next();
}

module.exports = {
    checkProjectExists,
    validateProject
};
