# 💘 Real-Time Dating Application - Backend Documentation

A modern, professional documentation for the real-time dating application backend built with **Express.js**, **MongoDB**, and **Socket.IO**. This backend provides comprehensive APIs for authentication, user management, real-time messaging, and friend connections.

## 🎯 Project Overview

This real-time dating application backend provides robust APIs and WebSocket support for:

- User authentication with JWT tokens and secure password management
- Profile creation and management with photo uploads to Cloudinary
- Friend request system with real-time notifications
- Real-time messaging with Socket.IO
- OTP-based password reset with email verification
- Online user tracking and typing indicators
- Comprehensive notification system

The backend implements a modular architecture with clear separation of concerns, middleware for security and validation, and Socket.IO integration for real-time features.

---

## ✨ Key Features

### Authentication & Security

- ✅ User registration with email validation
- ✅ Secure login with JWT token generation
- ✅ OTP-based password reset via email
- ✅ Session management with access and refresh tokens
- ✅ Secure logout with cookie clearing
- ✅ Password hashing with Bcrypt
- ✅ Rate limiting on sensitive endpoints
- ✅ CORS protection and security headers

### Profile Management

- ✅ User profile creation and updates
- ✅ Profile picture uploads to Cloudinary
- ✅ Retrieve current user information
- ✅ Profile data persistence in MongoDB

### Friend System

- ✅ Send friend requests to other users
- ✅ Accept or reject incoming friend requests
- ✅ Cancel sent friend requests
- ✅ View list of accepted friends
- ✅ Browse available users (non-friends)
- ✅ Real-time notifications for friend requests
- ✅ View pending friendship requests

### Real-Time Messaging

- ✅ Send text messages with optional images
- ✅ Receive messages in real-time via Socket.IO
- ✅ Fetch complete chat history
- ✅ Typing indicator notifications
- ✅ Online/offline user status
- ✅ Message persistence in MongoDB
- ✅ Media attachments support

### Notifications System

- ✅ Receive notifications for friend requests
- ✅ Receive notifications for new messages
- ✅ Mark notifications as read
- ✅ View all notifications with filtering
- ✅ Real-time notification delivery
- ✅ Persistent notification storage

---

## 🛠 Tech Stack

### Backend Technologies

| Technology         | Purpose                          | Version |
| ------------------ | -------------------------------- | ------- |
| Node.js            | JavaScript runtime environment   | 16+     |
| Express.js         | REST API framework               | Latest  |
| TypeScript         | Type-safe JavaScript             | Latest  |
| MongoDB            | NoSQL document database          | Latest  |
| Mongoose           | MongoDB object modeling          | Latest  |
| Socket.IO          | Real-time communication protocol | Latest  |
| JWT                | Token-based authentication       | Latest  |
| Bcrypt             | Password hashing library         | Latest  |
| Nodemailer         | Email service for OTP delivery   | Latest  |
| Cloudinary         | Cloud image hosting and storage  | Latest  |
| Multer             | File upload middleware           | Latest  |
| Express Rate Limit | API rate limiting                | Latest  |
| Zod                | Schema validation library        | Latest  |
| CORS               | Cross-Origin Resource Sharing    | Latest  |

---

## 🚀 Installation & Setup

### Prerequisites

Before setting up the project, ensure you have:

- Node.js version 16.x or higher
- npm or pnpm package manager
- MongoDB installed locally or MongoDB Atlas account
- Cloudinary account for image hosting
- Gmail account with app-specific password
- Git for version control
- Postman or similar tool for API testing

### Installation Steps

1. **Clone the Repository**

   - Fork the project
   - Clone it locally
   - Navigate into the project folder

2. **Install Dependencies**

   - Run your package manager install command
   - Wait for installation to finish

3. **Configure Environment Variables**

   - Copy `.env.example` to `.env`
   - Add all required environment values
   - Ensure `.env` is excluded from Git

4. **Set Up Database**

   - Start MongoDB
   - Create a database if needed
   - Test the connection

5. **Set Up External Services**

   - Add Cloudinary credentials
   - Configure email service (Gmail App Password / SMTP)
   - Add any other required API keys

6. **Start Development Server**
   - Run the development server
   - Confirm it starts without errors
   - Server is now ready for requests

## 🔐 Environment Variables

### Backend Configuration

The application requires the following environment variables to be configured in `.env` file:

**Server Configuration**

- `NODE_ENV`: Application environment (development, production)
- `PORT`: Port number for server (default: 5000)
- `FRONTEND_URL`: Frontend application URL for CORS

**Database Configuration**

- `MONGODB_URI`: MongoDB connection string (local or Atlas)

**Authentication Configuration**

- `JWT_ACCESS_SECRET`: Secret key for access token generation

**Email Configuration**

- `USER_EMAIL`: Gmail address for sending emails
- `USER_PASSWORD`: Gmail app-specific password (not regular password)

**Cloud Storage Configuration**

- `CLOUDINARY_CLOUD_NAME`: Cloudinary account cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

**Rate Limiting Configuration**

- `RATE_LIMIT_WINDOW_MS`: Time window for rate limiting in milliseconds
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests allowed in time window

### Frontend Configuration

Create `.env` in frontend directory:

**API Configuration**

- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_SOCKET_URL`: Socket.IO server URL

**Feature Flags**

- `NEXT_PUBLIC_ENABLE_DEBUG_MODE`: Enable debug logging

---

## 🤝 Contributing

### Contribution Process

We welcome contributions from developers. Follow this process to contribute:

**1. Fork and Clone**

- Fork repository on GitHub
- Clone your forked repository locally
- Add upstream remote to stay updated

**2. Create Feature Branch**

- Create new branch with descriptive name
- Use format: feature/feature-name or fix/bug-name
- Branch should be based on latest dev branch

**3. Development Guidelines**

- Use TypeScript for all new code
- Follow existing project structure
- Keep functions small and focused
- Write meaningful variable names
- Add comments for complex logic
- Ensure code follows ESLint rules

**4. Commit Changes**

- Write clear, descriptive commit messages
- Use conventional commit format
- Example formats:
  - `feat: add real-time typing indicator`
  - `fix: resolve Socket.IO connection timeout`
  - `docs: update API documentation`
  - `refactor: improve error handling`

**5. Testing**

- Test new features thoroughly
- Verify existing tests still pass
- Test across browsers if applicable
- Check mobile responsiveness
- Verify Socket.IO events work correctly

**6. Submit Pull Request**

- Push changes to your fork
- Create pull request to main/dev branch
- Provide detailed description of changes
- Reference related GitHub issues
- Wait for code review and feedback

**7. Address Feedback**

- Review feedback from maintainers
- Make requested changes
- Test updated code
- Push changes to PR
- Maintainers will merge when approved

### Coding Standards

**TypeScript Usage**

- Use TypeScript for all new files
- Avoid using `any` type
- Define proper interfaces for objects
- Use strict null checks
- Enable strict mode in tsconfig.json

**Function Documentation**

- Add JSDoc comments for all functions
- Document parameters and return types
- Include usage examples for complex functions
- Explain complex logic with comments

**Error Handling**

- Use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases
- Return proper HTTP status codes

**Naming Conventions**

- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names (avoid single letters)
- Avoid abbreviations unless standard

### Testing New Features

**Manual Testing Checklist**

- Register and login functionality
- Profile upload and updates
- Friend request system
- Real-time messaging
- Notification delivery
- OTP password reset
- Offline functionality
- Mobile responsiveness

**API Testing with Postman**

- Test all endpoints with sample data
- Verify response status codes
- Check response data format
- Test error scenarios
- Verify authentication requirements
