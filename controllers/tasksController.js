const { tasks } = require('../models/tasksModel');

const getAllTasks = () => {
    return tasks;
};

const getTaskById = (taskId) => {
    const id = parseInt(taskId);
    if (isNaN(id)) {
        return null;
    }
    const task = tasks.find(t => t.id === id);
    return task || null;
};

const createTask = (taskData) => {
    const newTask = {
        id: tasks.length + 1,
        ...taskData,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
};

const updateTask = (taskId, taskData) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex === -1) {
        return null;
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    return tasks[taskIndex];
};

const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(taskId));
    if (taskIndex === -1) {
        return null;
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    return deletedTask;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
