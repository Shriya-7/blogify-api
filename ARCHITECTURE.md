# Blogify API - Module 2 Architecture Documentation

## Overview

This document provides a comprehensive overview of the Blogify API architecture, showcasing the professional structure and patterns implemented during Module 2 of the development process.

## Architecture Structure

### 1. Main Entry Point (`src/index.js`)

The central hub of the application that handles high-level setup:

- **Global Middleware**: CORS, JSON parsing
- **Database Connection**: MongoDB with configurable pool size
- **Main Router**: Central dispatch for all API routes
- **Error Handling**: Centralized error middleware
- **Server Start**: Clean server initialization

```javascript
// Key components:
app.use(cors());                    // Cross-origin resource sharing
app.use(express.json());           // JSON body parsing
app.use("/api/v1", mainRouter);    // Versioned API prefix
app.use(errorHandler);             // Global error handling
```

### 2. Main Index Router (`src/routes/index.js`)

The central dispatch that delegates requests to resource-specific routers:

- **Resource Organization**: Clean separation of concerns
- **Modular Structure**: Easy to extend with new resources
- **Single Point of Entry**: All routes flow through here

```javascript
// Mounts all resource routers
router.use("/posts", postRouter);
router.use("/auth", authRouter);
```

### 3. Resource Routers

#### Posts Router (`src/routes/posts.routes.js`)
- **CRUD Operations**: Complete RESTful endpoints
- **Authentication**: Protected routes using middleware
- **Clean Structure**: No inline logic, only route definitions

#### Auth Router (`src/routes/auth.routes.js`)
- **User Management**: Register, login, logout
- **Security**: Proper authentication flows
- **Cookie-based Sessions**: Secure token storage

### 4. Controllers

#### Posts Controller (`src/controllers/posts.controller.js`)
- **Business Logic**: All route handler logic centralized
- **Error Handling**: Consistent error responses
- **Data Validation**: Input validation and sanitization
- **Population**: Mongoose document population for relationships

#### Auth Controller (`src/controllers/auth.controller.js`)
- **User Authentication**: JWT-based authentication
- **Password Security**: Hashed password storage
- **Session Management**: Cookie-based session handling

### 5. Middleware

#### Error Handler (`src/middlewares/errorHandler.js`)
- **Global Error Handling**: Centralized error processing
- **Error Types**: Specific handling for different error types
- **Consistent Responses**: Standardized error response format

#### Auth Middleware (`src/middlewares/auth.middleware.js`)
- **Authentication**: JWT token verification
- **Authorization**: Resource ownership validation
- **Security**: Protected route enforcement

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST   | `/api/v1/auth/register` | Register new user | No |
| POST   | `/api/v1/auth/login` | Login user | No |
| POST   | `/api/v1/auth/logout` | Logout user | Yes (via cookie) |

### Posts Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET    | `/api/v1/posts` | Get all posts | No |
| GET    | `/api/v1/posts/:id` | Get single post | No |
| POST   | `/api/v1/posts` | Create new post | Yes |
| PUT    | `/api/v1/posts/:id` | Update post | Yes (owner) |
| DELETE | `/api/v1/posts/:id` | Delete post | Yes (owner) |

## Response Format

All API responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## Status Codes

- `200` - OK: Successful request
- `201` - Created: Resource successfully created
- `400` - Bad Request: Invalid input or missing required fields
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `500` - Internal Server Error: Server error

## Key Features

### 1. Modular Architecture
- Clean separation of concerns
- Easy to maintain and extend
- Professional code organization

### 2. Security
- JWT-based authentication
- Password hashing
- Input validation
- CORS protection

### 3. Error Handling
- Centralized error processing
- Specific error types
- Consistent error responses

### 4. Database Integration
- MongoDB with Mongoose ODM
- Connection pooling
- Schema validation
- Document relationships

### 5. API Versioning
- `/api/v1` prefix for version control
- Future-proof for API evolution

## Development Workflow

### 1. Feature Branch
```bash
git checkout -b feat/finalize-module2-architecture
```

### 2. Conventional Commits
```bash
git commit -m "feat: complete module 2 architectural setup with standardized API structure"
```

### 3. Pull Request
- Feature branch to main
- Code review process
- Professional Git workflow

## Testing

### Manual Testing
- All endpoints tested with Postman
- Error scenarios validated
- Authentication flows verified

### Postman Collection
- Comprehensive API documentation
- Example requests and responses
- Environment variables for easy testing

## Next Steps (Module 3)

The current architecture provides a solid foundation for:

1. **Database Integration**: Adding actual data persistence
2. **Advanced Features**: Comments, likes, categories
3. **API Enhancements**: Pagination, filtering, search
4. **Security Improvements**: Rate limiting, input sanitization
5. **Performance Optimization**: Caching, optimization

## Best Practices Implemented

1. **Separation of Concerns**: Routes, controllers, middleware clearly separated
2. **Consistent Error Handling**: Global error middleware for uniform responses
3. **Security First**: Authentication, validation, and sanitization
4. **API Design**: RESTful principles, consistent response format
5. **Code Quality**: Clean, readable, maintainable code
6. **Documentation**: Comprehensive API documentation and architecture overview

## File Structure

```
src/
├── index.js                    # Main application entry point
├── config/                     # Configuration files
│   ├── db.js                  # Database configuration
│   ├── cloudinary.js          # Cloud storage configuration
│   └── multer.js              # File upload configuration
├── controllers/               # Business logic
│   ├── posts.controller.js    # Post management
│   ├── auth.controller.js     # Authentication
│   └── upload.controller.js   # File uploads
├── middlewares/               # Custom middleware
│   ├── auth.middleware.js     # Authentication middleware
│   └── errorHandler.js        # Error handling middleware
├── models/                    # Data models
│   ├── Post.js               # Post model
│   └── User.js               # User model
└── routes/                    # Route definitions
    ├── index.js              # Main router
    ├── posts.routes.js       # Post routes
    ├── auth.routes.js        # Authentication routes
    └── upload.routes.js      # Upload routes
```

This architecture demonstrates professional API development practices and provides a solid foundation for future enhancements and scaling.