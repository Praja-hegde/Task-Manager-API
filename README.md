# Task Manager API

A RESTful API for managing tasks with Node.js, Express.js, and in-memory data storage.

## Features

- Create, Read, Update, Delete (CRUD) operations for tasks
- Filter tasks by completion status and priority
- Sort tasks by creation date
- Retrieve tasks by priority level
- In-memory data storage
- Request logging middleware
- Error handling middleware
- response format

## Technologies Used

- Node.js
- Express.js
- dotenv (for environment variables)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
PORT=8080
```

## Running the Project

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on port 8080 (or the port specified in `.env` file).

## API Endpoints

### Base URL
```
http://localhost:8080
```

### Endpoints

#### Get All Tasks
```
GET /api/v1/tasks
```

**Query Parameters:**
- `completed` - Filter by completion status (e.g., `?completed=true` or `?completed=false`)
- `priority` - Filter by task priority (e.g., `?priority=high`)
- `sort` - Sort by field (e.g., `?sort=date`)
- `order` - Sort order (e.g., `?order=asc` or `?order=desc`, default is asc)

**Examples:**
- `GET /api/v1/tasks?completed=true` - Get only completed tasks
- `GET /api/v1/tasks?priority=high` - Get high priority tasks
- `GET /api/v1/tasks?sort=date&order=desc` - Get tasks sorted by creation date (newest first)
- `GET /api/v1/tasks?completed=false&priority=high` - Get uncompleted high priority tasks

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-06-29T00:00:00.000Z"
    }
  ]
}
```

#### Get Task by ID
```
GET /api/v1/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task manager API",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-06-29T00:00:00.000Z"
  }
}
```

#### Create Task
```
POST /api/v1/tasks
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "title": "New Task",
    "description": "Task description",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-06-29T12:00:00.000Z"
  }
}
```

#### Update Task
```
PUT /api/v1/tasks/:id
```

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Task Title",
    "description": "Write comprehensive documentation for the task manager API",
    "completed": true,
    "priority": "high",
    "createdAt": "2026-06-29T00:00:00.000Z"
  }
}
```

#### Delete Task
```
DELETE /api/v1/tasks/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the task manager API",
    "completed": false,
    "priority": "high",
    "createdAt": "2026-06-29T00:00:00.000Z"
  }
}
```

#### Get Tasks by Priority Level
```
GET /api/v1/tasks/priority/:level
```

**URL Parameters:**
- `level` - Priority level (low, medium, high)

**Examples:**
- `GET /api/v1/tasks/priority/high` - Get all high priority tasks
- `GET /api/v1/tasks/priority/medium` - Get all medium priority tasks
- `GET /api/v1/tasks/priority/low` - Get all low priority tasks

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive documentation for the task manager API",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-06-29T00:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Implement CRUD operations",
      "description": "Create, Read, Update, Delete operations for tasks",
      "completed": false,
      "priority": "high",
      "createdAt": "2026-06-28T00:00:00.000Z"
    }
  ]
}
```

## Sample Data

The API comes pre-loaded with 3 sample tasks:

1. Complete project documentation (high priority)
2. Implement CRUD operations (high priority)
3. Add input validation (medium priority)

## Error Handling

The API includes error handling for:
- 404: Task not found
- 500: Internal server errors
- Route mismatch errors

