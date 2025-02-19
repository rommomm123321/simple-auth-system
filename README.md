﻿# Simple Auth API

This is a simple authentication API built with Node.js, Express.js, Sequelize, PostgreSQL, and Redis. It provides basic user authentication functionality including user registration, login, email verification, password reset, and JWT-based authentication.

## Features

- **User Registration & Login**: Users can sign up and log in with their email and password.
- **Email Verification**: After registration, users can verify their email address through a unique token sent to their inbox.
- **Password Reset**: Users can request a password reset and reset their password with a valid token.
- **JWT Authentication**: Secure endpoints are protected using JWT tokens for authenticated users.
- **Redis for Session Management**: Redis is used for caching and managing user sessions.
- **Sequelize ORM**: Simplifies database interaction using PostgreSQL as the database.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **Sequelize**: ORM for working with PostgreSQL and managing database operations.
- **PostgreSQL**: Relational database for storing user data and application information.
- **Redis**: In-memory data store for caching and session management.
- **JWT**: Token-based authentication for securing API routes.
- **Bcrypt.js**: For securely hashing and comparing user passwords.
- **Joi**: For data validation to ensure correct input data from users.

## Endpoints

- **POST** `/sign-up`: Register a new user
- **POST** `/sign-in`: Log in with email and password
- **GET** `/verify-email`: Verify the email using a token
- **POST** `/password-reset/request`: Request a password reset email
- **POST** `/password-reset`: Reset the password with the token
- **GET** `/me`: Get the authenticated user's profile (JWT required)

## Scripts

- **npm start**
- **npm dev**
- **npm migrate**
- **npm migrate:undo**
- **npm migrate:undo:all**
- **npm migration:generate**
