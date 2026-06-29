require('dotenv').config();

const express = require('express');
const tasksRoute = require('./routes/tasksRoute');
const logger = require('./middlewares/loggerMiddleware');

const {RouteMismatchError,errorHandler} = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

// Request logging middleware
app.use(logger);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API',
        version: '1.0.0',
        endpoints: {
            'GET /api/v1/tasks': 'Get all tasks (with optional filters)',
            'GET /api/v1/tasks/:id': 'Get a specific task by ID',
            'POST /api/v1/tasks': 'Create a new task',
            'PUT /api/v1/tasks/:id': 'Update an existing task',
            'DELETE /api/v1/tasks/:id': 'Delete a task'
        }
    });
});

// Mount routes
app.use('/api/v1/tasks', tasksRoute);


app.use(RouteMismatchError);
// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Task Manager API Server running on port ${PORT}`);
});

