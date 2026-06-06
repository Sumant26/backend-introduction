# Backend Introduction

A Node.js and Express backend that demonstrates a simple REST API with MongoDB persistence. The project currently contains user authentication-style routes and basic post CRUD routes, organized with controllers, routes, models, and database configuration.

## Project Overview

This backend is built around these main features:

- User registration, login, and logout route handlers.
- Password hashing with `bcrypt` before storing user passwords.
- MongoDB database access through `mongoose`.
- Post creation, retrieval, update, and deletion endpoints.
- JSON request parsing with Express middleware.
- Environment-based configuration for the server port and MongoDB connection string.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- dotenv

## Folder Structure

```text
backend/
  README.md
  src/
    app.js
    index.js
    config/
      constants.js
      database.js
    controllers/
      post.controller.js
      user.controller.js
    models/
      posts.model.js
      user.model.js
    routes/
      post.route.js
      user.route.js
```

## Important Files

### `src/index.js`

Application entry point. It loads environment variables, connects to MongoDB, and starts the Express server.

### `src/app.js`

Creates the Express app, enables JSON body parsing, imports route files, and mounts the API routes:

- `/api/v1/users`
- `/api/v1/posts`

### `src/config/database.js`

Contains the `connectDB` function, which connects the app to MongoDB using `process.env.MONGODB_URI`.

### `src/models/user.model.js`

Defines the user schema with:

- `username`
- `email`
- `password`
- timestamps

The user model hashes passwords before saving and includes a password comparison method.

### `src/models/posts.model.js`

Defines the post schema with:

- `name`
- `description`
- `age`
- timestamps

### `src/controllers/user.controller.js`

Contains handlers for:

- registering a user
- logging in a user
- logging out a user

### `src/controllers/post.controller.js`

Contains handlers for:

- creating a post
- fetching all posts
- updating a post by id
- deleting a post by id

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/backend-introduction
```

Use your own MongoDB connection string if you are using MongoDB Atlas or another hosted database.

## Installation

From the project root:

```bash
npm install
```

The source code imports `express`, `mongoose`, and `dotenv`, so make sure these dependencies are installed:

```bash
npm install express mongoose dotenv bcrypt
```

## Running the Project

The current `package.json` does not define a start script yet. You can run the backend directly with:

```bash
node backend/src/index.js
```

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "start": "node backend/src/index.js",
    "dev": "nodemon backend/src/index.js"
  }
}
```

If you add the scripts above, install `nodemon` for development:

```bash
npm install --save-dev nodemon
```

Then run:

```bash
npm run dev
```

## API Base URL

When running locally, the default base URL is:

```text
http://localhost:8000
```

If `PORT` is set in `.env`, use that port instead.

## User Routes

Base route:

```text
/api/v1/users
```

### Register User

```http
POST /api/v1/users/register
```

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

Success response:

```json
{
  "message": "User registered",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "username": "john"
  }
}
```

### Login User

```http
POST /api/v1/users/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout User

```http
POST /api/v1/users/logout
```

Request body:

```json
{
  "email": "john@example.com"
}
```

## Post Routes

Base route:

```text
/api/v1/posts
```

### Create Post

```http
POST /api/v1/posts/create
```

Request body:

```json
{
  "name": "Sample post",
  "description": "This is a sample post",
  "age": 25
}
```

### Get All Posts

```http
GET /api/v1/posts/getPosts
```

### Update Post

```http
PATCH /api/v1/posts/update/:id
```

Request body:

```json
{
  "name": "Updated post",
  "description": "Updated description",
  "age": 30
}
```

### Delete Post

```http
DELETE /api/v1/posts/delete/:id
```

## Testing with Postman or Thunder Client

1. Start MongoDB locally or connect to a hosted MongoDB database.
2. Add the required `.env` values.
3. Start the server.
4. Send requests to `http://localhost:8000/api/v1/...`.
5. Use JSON request bodies and set the `Content-Type` header to `application/json`.

## Current Development Notes

The project is a learning/introduction backend and still needs a few code fixes before every route will run successfully:

- `package.json` should include `express`, `mongoose`, and `dotenv` as dependencies.
- `loginUser` should call `User.findOne`, not `user.findOne`.
- The user model defines `comparePasswords`, while the login controller calls `comparePassword`.
- The login response should use `user._id`, not `user_id`.
- The logout controller has a typo in `res.status(...)`.
- The post model should create a `new Schema(...)`.
- `updatePost` should check `req.body`, not `req.keys`.
- Mongoose methods should be `findByIdAndUpdate` and `findByIdAndDelete`.
- The `status(404)` call in `updatePost` should be `res.status(404)`.

## Future Improvements

- Add authentication with JWT or sessions.
- Add middleware for protected routes.
- Add request validation.
- Add centralized error handling.
- Add proper logging.
- Add tests for controllers and routes.
- Add start and development scripts to `package.json`.
- Add API documentation with example responses for error cases.
