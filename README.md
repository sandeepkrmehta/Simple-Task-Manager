# Simple Task Manager - Configuration Fix

## What was Fixed

This fix addresses configuration issues that prevented the Task Manager application from running properly in development environments.

### Issues Resolved

1. **CORS Configuration**: Updated backend to use environment variables for frontend URL instead of hardcoded production URL
2. **API URL Configuration**: Made frontend API URL configurable via environment variables
3. **Development Setup**: Added proper environment variable defaults for local development
4. **Package Scripts**: Fixed script references in root package.json for concurrent execution
5. **Missing Dependencies**: Added nodemon as dev dependency for backend development

### Key Changes

- **Backend (`backend/index.js`)**: CORS origin now uses `process.env.FRONTEND_URL` with fallback to `http://localhost:3000`
- **Frontend (`frontend/src/utils.js`)**: API_URL now uses `process.env.REACT_APP_API_URL` with fallback to `http://localhost:8080`
- **Environment Files**: Added `.env` files with development defaults and `.env.example` templates
- **Dependencies**: Added nodemon for backend development

### Running the Application

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev

# Or run individually:
npm run client  # Frontend only
npm run server  # Backend only
```

### Environment Configuration

Copy `.env.example` files to `.env` in respective directories and update values as needed:

- **Backend**: Configure `DB_URL`, `JWT_SECRET`, and `FRONTEND_URL`
- **Frontend**: Configure `REACT_APP_API_URL`

The application now works out of the box for local development with sensible defaults.