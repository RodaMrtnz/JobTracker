# JobTracker

JobTracker is a full-stack web application to manage job applications in a structured and scalable way.
It allows users to register, authenticate, and track their applications with status control and company management.

This project was built to apply real-world backend architecture concepts beyond academic exercises, including layered structure, authentication, validation, and error handling.

## Tech Stack

### Backend
- Node.js
- Express
- Sequelize
- SQLite
- JWT Authentication
- bcrypt
- dotenv
- CORS

### Frontend
- Next.js
- React
- Fetch API
- CSS

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- CRUD operations for job applications
- Company management
- Status tracking (Pending, Interview, Rejected, Accepted)
- Input validation middleware
- Centralized error handling
- Protected backup route for database export

## Project Structure

```text
JobTracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
└── README.md
```

The backend follows a layered architecture:

`Route → Controller → Service → Model`

This separation improves maintainability and scalability.

## Authentication Flow

1. User logs in with email and password.
2. Password is hashed using bcrypt.
3. JWT token is generated.
4. Token is sent in the `Authorization` header:

```http
Authorization: Bearer <token>
```

5. Middleware verifies the token before allowing access to protected routes.

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3000
JWT_SECRET=your_secret_key
```

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on:

`http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

`http://localhost:3001`

## API Overview

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Applications
- `GET /applications`
- `GET /applications/:id`
- `POST /applications`
- `PUT /applications/:id`
- `DELETE /applications/:id`

### Backup
- `GET /backup` (protected with JWT, downloads the SQLite database file)

## Architectural Decisions

- Layered architecture for separation of concerns
- JWT stateless authentication
- Centralized error middleware
- Validation middleware before controller logic
- Services contain business logic (not controllers)
- Backup endpoint also follows `Route → Controller → Service`
- SQLite for simplicity and portability

## What I Learned

While similar technologies were covered academically, building this project independently required:

- Designing folder structure intentionally
- Implementing proper token handling
- Structuring middlewares correctly
- Managing error flow across layers
- Handling real debugging scenarios

This project helped bridge academic knowledge and practical backend architecture.

## Future Improvements

- Role-based access control (RBAC)
- Pagination and filtering
- Deployment (Docker / Cloud)
- UI improvements
- Refresh token implementation
