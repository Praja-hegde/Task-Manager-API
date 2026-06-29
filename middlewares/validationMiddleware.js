const validatePriority = (priority, res) => {
    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).send({
            success: false,
            error: 'Priority must be one of: low, medium, high'
        });
    }
    return null;
};

const isValidPriority = (priority) => {
    return ['low', 'medium', 'high'].includes(priority);
};

const validateTask = (req, res, next) => {
    const { title, description, completed, priority, dueDate } = req.body;

    // Title validation
    if (!title || title.trim() === '') {
        return res.status(400).send({
            success: false,
            error: 'Title is required and cannot be empty'
        });
    }

    // Description validation (required and not empty)
    if (!description || description.trim() === '') {
        return res.status(400).send({
            success: false,
            error: 'Description is required and cannot be empty'
        });
    }

    // Completed status validation (boolean)
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).send({
            success: false,
            error: 'Completed status must be a boolean value'
        });
    }

    // Priority validation
    if (priority && !isValidPriority(priority)) {
        return validatePriority(priority, res);
    }

    next();
};

module.exports = { validateTask, isValidPriority, validatePriority };
