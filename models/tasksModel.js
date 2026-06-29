const tasks = [
    {
        id: 1,
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the task manager API',
        completed: false,
        priority: 'high',
        createdAt: new Date('2026-06-29').toISOString()
    },
    {
        id: 2,
        title: 'Implement CRUD operations',
        description: 'Create, Read, Update, Delete operations for tasks',
        completed: false,
        priority: 'high',
        createdAt: new Date('2026-06-28').toISOString()
    },
    {
        id: 3,
        title: 'Add input validation',
        description: 'Implement validation middleware for all endpoints',
        completed: false,
        priority: 'medium',
        createdAt: new Date('2026-06-27').toISOString()
    }
];

module.exports = { tasks };
