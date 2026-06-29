const express = require('express');
const { validateTask, validatePriority } = require('../middlewares/validationMiddleware');
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/tasksController');

const router = express.Router();

// GET /api/v1/tasks - Get all tasks with optional filtering and sorting
router.get('/', (req, res) => {
    try {
        const allTasks = getAllTasks();
        
        // Apply filters if provided
        let filteredTasks = [...allTasks];
        
        // Filter by completed status
        if (req.query.completed !== undefined) {
            const completedFilter = req.query.completed === 'true';
            filteredTasks = filteredTasks.filter(task => 
                task.completed === completedFilter
            );
        }
        
        // Filter by priority
        if (req.query.priority) {
            filteredTasks = filteredTasks.filter(task => 
                task.priority === req.query.priority
            );
        }
        
        // Sort by creation date
        if (req.query.sort === 'date') {
            const sortOrder = req.query.order === 'desc' ? -1 : 1;
            filteredTasks.sort((a, b) => sortOrder * (new Date(a.createdAt) - new Date(b.createdAt)));
        }
        
        res.send({
            success: true,
            count: filteredTasks.length,
            data: filteredTasks
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: 'Failed to retrieve tasks'
        });
    }
});

// GET /api/v1/tasks/:id - Get a single task by ID
router.get('/:id', (req, res) => {
    try {
        const task = getTaskById(req.params.id);
        
        if (!task) {
            return res.status(404).json({
                success: false,
                error: `Task with ID ${req.params.id} not found`
            });
        }
        
        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve task'
        });
    }
});

// GET /api/v1/tasks/priority/:level - Retrieve tasks by priority level
router.get('/priority/:level', (req, res) => {
    try {
        const allTasks = getAllTasks();
        const priorityLevel = req.params.level;

        if (validatePriority(priorityLevel, res)) {
            return;
        }

        const filteredTasks = allTasks.filter(task =>
            task.priority === priorityLevel
        );

        res.json({
            success: true,
            count: filteredTasks.length,
            data: filteredTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve tasks by priority'
        });
    }
});

// POST /api/v1/tasks - Create a new task
router.post('/', validateTask, (req, res) => {
    try {
        const newTask = createTask(req.body);
        
        res.status(201).json({
            success: true,
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create task'
        });
    }
});

// PUT /api/v1/tasks/:id - Update an existing task
router.put('/:id', validateTask, (req, res) => {
    try {
        const updatedTask = updateTask(req.params.id, req.body);
        
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                error: `Task with ID ${req.params.id} not found`
            });
        }
        
        res.json({
            success: true,
            data: updatedTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update task'
        });
    }
});

// DELETE /api/v1/tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
    try {
        const deletedTask = deleteTask(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                error: `Task with ID ${req.params.id} not found`
            });
        }
        
        res.json({
            success: true,
            message: 'Task deleted successfully',
            data: deletedTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete task'
        });
    }
});

module.exports = router;
