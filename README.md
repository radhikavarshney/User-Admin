


# Express Backend API with User Authentication

This repository contains an Express backend server that provides APIs for user authentication, user management, and admin functionalities. The backend uses MongoDB for data storage and includes endpoints for user signup, login, profile management, and admin operations.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- multer for file uploads

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Install dependencies:**

   ```bash
   cd your-repo
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Define the following variables:

     ```plaintext
     MONGO_URL=your-mongodb-connection-string
     JWT_SECRET=your-secret-key-for-jwt
     ```
   - Ensure to replace `your-mongodb-connection-string` with your actual MongoDB connection string and `your-secret-key-for-jwt` with your preferred secret key for JWT token generation.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`.

## Endpoints

### Authentication

- `POST /api/r1/signup`: Register a new user with profile image upload.
- `POST /api/r1/login`: User login.

### User Routes

- `PUT /api/r2/:id`: Update user details (requires authentication).
- `DELETE /api/r2/:id`: Delete user account (requires authentication).
- `GET /api/r2/:id`: Get user details (requires authentication).

### Admin Routes

- `PUT /api/r3/modifyOwn/:id`: Update admin profile (requires admin privileges).
- `PUT /api/r3/modifyUser/:id`: Update user details by admin (requires admin privileges).
- `DELETE /api/r3/delete/:id`: Delete user account by admin (requires admin privileges).
- `GET /api/r3/viewAllUsers/:id`: View all users (requires admin privileges).

## Folder Structure

- `index.js`: Main entry point of the application.
- `routes/`: Contains route handlers for different functionalities.
- `models/`: Includes MongoDB schema models for user data.
- `JWT/`: Contains JWT utility functions.
- `middleware/`: Includes middleware for authentication and authorization.

