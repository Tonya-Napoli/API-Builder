const express = require('express');
const server = express();
const actionsRouter = require('../api/actions/actions-router');
const projectsRouter = require('../api/projects/projects-router');

// Middleware
server.use(express.json()); // for parsing application/json
// Additional middleware can go here (e.g., logger, helmet for security, etc.)

// Use Routers
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

// Root route or catch-all route can also be set up here
server.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = server;


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


