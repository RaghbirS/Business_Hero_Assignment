# Task Management System

This project implements a user authentication system, user management routes, and task management features. The system allows users to register, log in, manage their tasks (add, update, fetch, and delete), and manage user data such as fetching user information and deleting the user and their tasks.

## Table of Contents

- [Installation](#installation)
- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)
- [Task Routes](#task-routes)
- [Controllers](#controllers)
  - [AuthController](#authcontroller)
  - [UserController](#usercontroller)
  - [TaskController](#taskcontroller)
- [Environment Variables](#environment-variables)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory with the following contents:

   ```env
   JWT_SECRET=<your-jwt-secret>
   MONGO_URI = <mongodb-uri>
   ```

   Note - MongoDb URI should be only base URL.

5. Start the server:
   ```bash
   npm start
   ```

## Authentication Routes

The authentication system provides two main routes:

### POST `/register`

Registers a new user.

- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "userName": "user123",
    "password": "password123"
  }
  ```
- **Response**:
  - `201 Created` if registration is successful.
  - `400 Bad Request` if the user already exists.

### POST `/login`

Logs in an existing user and generates a JWT token.

- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK` with a JWT token and user details if the credentials are valid.
  - `404 Not Found` if the user does not exist.
  - `400 Bad Request` if the credentials are invalid.

## User Routes

The user management system provides routes for retrieving user data and deleting a user.

### GET `/getUser`

Fetches the authenticated user's data.

- **Response**:
  - `200 OK` with user details.

### DELETE `/:id`

Deletes a user and all of their tasks.

- **Response**:
  - `200 OK` if the user and their tasks are successfully deleted.
  - `404 Not Found` if the user does not exist.

## Task Routes

The task management system provides routes for performing CRUD operations on tasks.

### GET `/`

Fetches all tasks for the authenticated user.

- **Response**:
  - `200 OK` with a list of tasks.

### GET `/:id`

Fetches a single task by its ID.

- **Response**:
  - `200 OK` with the task details.
  - `404 Not Found` if the task does not exist.

### POST `/`

Adds a new task for the authenticated user.

- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "status": "pending"
  }
  ```
- **Response**:
  - `201 Created` if the task is successfully created.

### PATCH `/:id`

Updates an existing task by its ID.

- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "completed"
  }
  ```
- **Response**:
  - `200 OK` if the task is successfully updated.
  - `404 Not Found` if the task does not exist.

### DELETE `/:id`

Deletes a task by its ID.

- **Response**:
  - `200 OK` if the task is successfully deleted.
  - `404 Not Found` if the task does not exist.

### POST `/bulkDelete`

Deletes multiple tasks by their IDs (does not follow REST pattern).

- **Request Body**:
  ```json
  {
    "ids": ["taskId1", "taskId2", "taskId3"]
  }
  ```
- **Response**:
  - `200 OK` if tasks are successfully deleted.
  - `400 Bad Request` if the IDs array is empty or invalid.

## Controllers

### AuthController

The `AuthController` class handles the logic for user registration and login.

#### `registerUser`

- Hashes the user's password using bcrypt.
- Checks if the email is already registered.
- Creates a new user in the database and returns a success message.

#### `loginUser`

- Verifies that the user exists in the database.
- Compares the provided password with the stored hashed password using bcrypt.
- Generates a JWT token if the credentials are valid and returns it to the user.

### UserController

The `UserController` class manages user-related operations, including fetching user data and deleting the user and their tasks.

#### `getUserDataWithToken`

Fetches the authenticated user's data using the JWT token.

#### `deleteUser`

Deletes the user from the database and removes all tasks associated with the user.

### TaskController

The `TaskController` class manages CRUD operations for tasks.

#### `getAllTasks`

Fetches all tasks created by the authenticated user.

#### `getTask`

Fetches a single task by ID for the authenticated user.

#### `addNewTask`

Creates a new task for the authenticated user.

#### `updateTask`

Updates an existing task by ID for the authenticated user.

#### `deleteTask`

Deletes a task by ID for the authenticated user.

#### `bulkDelete`

Deletes multiple tasks for the authenticated user based on an array of task IDs.

## Environment Variables

Make sure to add the following environment variable in the `.env` file:

- `JWT_SECRET`: The secret key used to sign the JWT token. It should be kept secure and not exposed publicly.

## Error Handling

The application uses custom error codes for better API response management. The `HttpStatusCodes` utility is used to handle different HTTP status codes such as:

- `200 OK`: Successful request.
- `201 Created`: Successfully created resource.
- `400 Bad Request`: Invalid request (e.g., missing data, invalid credentials).
- `404 Not Found`: Resource not found (e.g., user or task does not exist).
- `500 Internal Server Error`: Server-related errors.

## Postman Collection

```
{
	"info": {
		"_postman_id": "700d9da6-c270-4efd-819d-96d0609a6e89",
		"name": "Task Management Assignment",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "31249115"
	},
	"item": [
		{
			"name": "Register User",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\": \"john@gmail.com\",\r\n    \"userName\": \"Jahn Doe\",\r\n    \"password\": \"password\"\r\n  }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/auth/register",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"auth",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "Login User",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"email\": \"john@gmail.com\",\r\n    \"password\": \"password\"\r\n  }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/auth/login",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"auth",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "Create Task for a User",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDU4MDNjZjMyOTdiNzFkNTIyMWEiLCJpYXQiOjE3MzcwMzMyNjIsImV4cCI6MTczNzAzNjg2Mn0.lvhfo6eFmniPyDcUnFjyC4lSlQcDbCrhV1VDdKca09o",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"title\":\"Task 4\",\r\n    \"description\":\"This is my third task\",\r\n    \"status\":\"inProgress\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get All Tasks of a User",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDU4MDNjZjMyOTdiNzFkNTIyMWEiLCJpYXQiOjE3MzcwMzMyNjIsImV4cCI6MTczNzAzNjg2Mn0.lvhfo6eFmniPyDcUnFjyC4lSlQcDbCrhV1VDdKca09o",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get Task with ID",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks/6788f8ef55dfc685df873328",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks",
						"6788f8ef55dfc685df873328"
					]
				}
			},
			"response": []
		},
		{
			"name": "Update Task",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "PATCH",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"title\":\"Task 1\",\r\n    \"description\":\"This is my first task updated\",\r\n    \"status\":\"inProgress\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks/6788f07f38921e94ba17522c",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks",
						"6788f07f38921e94ba17522c"
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete Task",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks/6788f0bc38921e94ba17522f",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks",
						"6788f0bc38921e94ba17522f"
					]
				}
			},
			"response": []
		},
		{
			"name": "Bulk Delete Tasks",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"ids\":[\"6788f07f38921e94ba17522c\",\"6788f371250f5b4c09ce7f1a\"]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/tasks/bulkDelete",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"tasks",
						"bulkDelete"
					]
				}
			},
			"response": []
		},
		{
			"name": "Get User Data with JWT Token",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/users/getUser",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"users",
						"getUser"
					]
				}
			},
			"response": []
		},
		{
			"name": "Delete User and all its Tasks",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg5MDQyMDNjZjMyOTdiNzFkNTIyMTAiLCJpYXQiOjE3MzcwMzI3NDcsImV4cCI6MTczNzAzNjM0N30.U1kLdmUR8e8bVW6HfpLMCs1Hjm5PritO-laBlBbmakA",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"url": {
					"raw": "https://business-hero-assignment.onrender.com/api/users/6788eef9b859ace564537c1b",
					"protocol": "https",
					"host": [
						"business-hero-assignment",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"users",
						"6788eef9b859ace564537c1b"
					]
				}
			},
			"response": []
		}
	]
}
```
