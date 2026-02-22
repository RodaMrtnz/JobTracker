# JobTracker

JobTracker is a full-stack web application designed to manage job applications in a structured and scalable way.
It allows users to register, authenticate, and track their applications with status control and company management.

This project was built to apply real-world backend architecture concepts beyond academic exercises, including layered structure, authentication, validation, and error handling.

Tech Stack
Backend

Node.js

Express

Sequelize

SQLite

JWT Authentication

bcrypt

dotenv

CORS

Frontend

Next.js

React

Fetch API

CSS

Features

User registration and login

JWT-based authentication

Protected routes

CRUD operations for job applications

Company management

Status tracking (e.g., Pending, Interview, Rejected, Accepted)

Input validation middleware

Centralized error handling

Backup route for data export

Project Structure
JobTracker/
│
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
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
└── README.md

The backend follows a layered architecture:

Route → Controller → Service → Model

This separation improves maintainability and scalability.

Authentication Flow

User logs in with email and password.

Password is hashed using bcrypt.

JWT token is generated.

Token is sent in the Authorization header using:

Authorization: Bearer <token>

Middleware verifies the token before allowing access to protected routes.

Environment Variables

Create a .env file inside the backend folder:

PORT=3000
JWT_SECRET=your_secret_key
Installation
Backend
cd backend
npm install
npm run dev

The server will start on:

http://localhost:3000
Frontend
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:3001
API Overview
Auth

POST /auth/register
POST /auth/login

Applications

GET /applications
GET /applications/:id
POST /applications
PUT /applications/:id
DELETE /applications/:id

Backup

GET /backup

Architectural Decisions

Layered architecture for separation of concerns

JWT stateless authentication

Centralized error middleware

Validation middleware before controller logic

Services contain business logic (not controllers)

SQLite used for simplicity and portability

What I Learned

While similar technologies were covered academically, building this independently required:

Designing folder structure intentionally

Implementing proper token handling

Structuring middlewares correctly

Managing error flow across layers

Handling real debugging scenarios

This project helped bridge academic knowledge and practical backend architecture.

Future Improvements

Role-based access control (RBAC)

Pagination and filtering

Deployment (Docker / Cloud)

UI improvements

Refresh token implementation

Si querés, ahora hacemos una versión:

más corta y más directa (más recruiter-friendly)

o una más técnica estilo documentación

o una versión híbrida optimizada para LinkedIn / portfolio

Decime qué estilo querés mostrar.
