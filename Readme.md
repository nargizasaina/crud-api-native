# User Management API

This is a simple user management API built with Node.js. It allows you to create, read, update, and delete user records. The API is implemented without using any external frameworks.

## Features

- Create a new user
- Retrieve all users or a specific user by ID
- Update an existing user by ID
- Delete a user by ID

## Requirements

- Node.js (version 22.x.x)
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. **Install dependencies:**

   ```bash
   npm i
   ```

3. **To run the application:**
   in development mode
   ```bash
   npm run start:dev
   ```

in production mode

```bash
npm run start:prod
```

4. **Implementation details:**

- get all persons GET api/users
- get user by id GET api/users/{userId}
- create user POST api/users

  - Request Body:

  ```{
    "username": "string", // Required
    "age": number, // Required
    "hobbies": ["string"]
    }
  ```

- edit user by id PUT api/users/{userId}
  - Request Body:
  ```{
    "username": "string", // Required
    "age": number, // Required
    "hobbies": ["string"]
    }
  ```
- delete user by id DELETE api/users/{userId}
