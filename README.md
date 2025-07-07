---


# PH Tour Management System – Server

This is the **backend server** for the **PH Tour Management System**, a tour booking and management platform built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs to handle user registration, authentication, package management, bookings, reviews, and administrative operations.

## ✨ Features

- User registration and login (JWT-based authentication)
- Role-based access control (Admin/User)
- Tour package CRUD operations
- Booking system with validation
- Review system with moderation
- MongoDB database with Mongoose models
- Centralized error handling and response formatting
- Modular, scalable folder structure
- Environment-based configuration

---

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Zod** (validation)
- **TypeScript**
- **ESLint** & **Prettier**
- **dotenv** for environment configuration

---

## 📁 Project Structure

```bash
ph\_tour\_management\_system\_server/
├── src/
│   ├── app/
│   │   ├── config/         # Environment and database config
│   │   ├── middlewares/    # Error handling, auth, validation
│   │   ├── modules/        # Modular structure for each feature (users, tours, bookings, etc.)
│   │   └── utils/          # Helper functions
│   ├── shared/             # Common utilities and constants
│   ├── types/              # Global TypeScript types/interfaces
│   ├── app.ts              # Express app setup
│   └── server.ts           # Entry point – starts the server
├── .env                    # Environment variables
├── .eslintrc.cjs           # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json
├── tsconfig.json
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.x)
- MongoDB (local or cloud)
- Yarn or npm

### Clone the repository

```bash
git clone https://github.com/Sarwarhridoy4/ph_tour_management_system_server.git
cd ph_tour_management_system_server
```

### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/ph-tour
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Run the server

```bash
npm run dev
```

---

## 🧪 API Documentation

Coming soon… (You can use Swagger or Postman collection to document the APIs)

---

## 👨‍💻 Author

**Sarwar Hossain**
GitHub: [@Sarwarhridoy4](https://github.com/Sarwarhridoy4)

---
