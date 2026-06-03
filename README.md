# Flutter Developer Technical Assessment

## Introduction

You are required to build a Flutter application that integrates with a provided Task Management REST API.

The application should allow users to authenticate, manage their personal tasks, and interact with the API using modern Flutter development practices.

This assessment is designed to evaluate:

* Flutter development skills
* State management using Cubit/BLoC
* REST API integration using Dio
* Local data persistence
* Error handling and user experience
* Code quality and maintainability

---

# Requirements

## Authentication

Implement a complete authentication flow.

### User Registration

Allow users to create a new account using:

* Name
* Email
* Password

### User Login

Allow users to sign in using:

* Email
* Password

After successful authentication:

* Store the received JWT token locally.
* Automatically include the token in authenticated API requests.
* Redirect the user to the main application.

### User Profile

Retrieve and display the authenticated user's profile information.

---

## Task Management

Authenticated users should be able to manage their own tasks.

### View Tasks

Display all tasks assigned to the currently authenticated user.

### Create Task

Users should be able to create a new task.

Required fields:

* Title
* Description

### Edit Task

Users should be able to update:

* Title
* Description
* Status

### Delete Task

Users should be able to delete their own tasks.

### Task Status

Support the following statuses:

* Pending
* In Progress
* Completed

---

# Technical Requirements

## State Management

Use:

* flutter_bloc
* Cubit

---

## Networking

Use Dio for all API communication.

Recommended setup:

* Single shared Dio instance
* Global authentication header handling
* Centralized error handling

---

## Local Storage

Persist the authentication token using:

* shared_preferences

The user should remain logged in after restarting the application.

---

# Backend API Setup

A Node.js backend API is provided as part of this assessment.

Before running the Flutter application, start the API locally.

## Prerequisites

* Node.js (v18 or higher recommended)
* npm

## Installation

Clone the backend repository and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=24h
DB_PATH=./database.sqlite
```

## Running the API

Start the development server:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000/api
```

## Database

The project uses SQLite.

The database file will be created automatically on first run if it does not already exist.

No additional database installation or configuration is required.

## Verifying the API

Once the server is running, verify it is accessible by calling any endpoint using:

* Postman
* cURL

Example:

```bash
curl http://localhost:3000/api/auth/profile
```

You should receive an authentication error response, confirming the API is running correctly.

## Connecting Flutter

When testing on:

* Android Emulator
* iOS Simulator
* Physical Device

Replace `localhost` with your machine's local network IP address.

Example:

```text
http://192.168.1.100:3000/api
```

Ensure both the Flutter device and the backend server are connected to the same network.

# API Configuration

Base URL:

```text
http://localhost:3000/api
```

> When testing on an emulator or physical device, replace `localhost` with your machine's local IP address.

## Authorization

All protected endpoints require:

```http
Authorization: Bearer <token>
```

---

# User Interface

At minimum, the application should contain the following screens:

### Authentication

* Login Screen
* Registration Screen

### Application

* Task List Screen
* Create/Edit Task Screen
* Profile Screen

---

# Error Handling

Handle API failures gracefully.

Expected server responses include:

| Status Code | Meaning               |
| ----------- | --------------------- |
| 422         | Validation Error      |
| 401         | Unauthorized          |
| 404         | Resource Not Found    |
| 500         | Internal Server Error |

Display appropriate feedback to the user whenever an operation fails.

---

# Expected User Flow

```text
Register Account
      ↓
Login
      ↓
Load User Profile
      ↓
View Tasks
      ↓
Create Task
      ↓
Update Task
      ↓
Delete Task
      ↓
Logout
```

---

# Evaluation Criteria

Submissions will be reviewed based on the following areas:

### Functionality

* Authentication works correctly
* User session persists after app restart
* Task CRUD operations function correctly
* Proper handling of authenticated requests

### State Management

* Effective use of Cubit
* Clear state transitions
* Separation of UI and business logic

### Code Quality

* Clean structure
* Readable code
* Consistent naming conventions
* Maintainable implementation

### User Experience

* Loading indicators
* Error states
* Empty states
* Smooth navigation

### API Integration

* Proper Dio configuration
* Correct request handling
* Reliable error management

---

# Submission Expectations

The final application should:

* Be fully functional
* Compile without errors
* Demonstrate complete API integration
* Follow Flutter best practices
* Provide a clean and intuitive user experience

Focus on delivering a polished, maintainable solution rather than introducing unnecessary architectural complexity.

---

# Recommended Packages

```yaml
dependencies:
  flutter_bloc: ^8.x.x
  dio: ^5.x.x
  shared_preferences: ^2.x.x
```

---

# Time Allocation

Estimated completion time:

**2 Days**

Prioritize correctness, code quality, and user experience.
