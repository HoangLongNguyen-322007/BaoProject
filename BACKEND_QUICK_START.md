# Quick Start Guide - Backend Setup

## Prerequisites
- Node.js (v14+)
- npm or yarn

## Installation

### 1. Install Dependencies
```bash
cd /Users/longnguyen/Documents/BaoProject
npm install
```

### 2. Create Environment File
Create `.env` in project root:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
DB_PATH=./src/backend/Data/database.sqlite
CORS_ORIGIN=http://localhost:5173
```

## Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (React with Vite)
- **Backend**: http://localhost:5000 (Express API)

### Backend Only
```bash
npm run dev:server
```

### Frontend Only
```bash
npm run dev:client
```

## Project Structure

```
src/
├── backend/
│   ├── config/
│   │   └── database.js              # Database initialization and schema
│   ├── Middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── Repositories/
│   │   ├── userRepository.js        # User database operations
│   │   ├── articleRepository.js     # Article database operations
│   │   └── categoryRepository.js    # Category database operations
│   ├── routes/
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── articles-public.js       # Public article endpoints
│   │   ├── articles-author.js       # Author-specific endpoints
│   │   ├── articles-editor.js       # Editor-specific endpoints
│   │   └── admin.js                 # Admin endpoints
│   └── Data/
│       └── database.sqlite          # SQLite database (auto-created)
├── server/
│   └── app.js                        # Express app entry point
├── client/
│   ├── App/
│   ├── components/
│   ├── pages/
│   └── ...
├── utils/
│   └── api.js                        # Frontend API client
├── hooks/
│   └── useApi.js                     # React hooks for API calls
└── ...
```

## User Roles & Permissions

### 1. Guest (Default)
- Read published articles
- Browse by category
- Search articles
- View article details
- Register to become author

### 2. Author
- Create and edit draft articles
- Submit articles for review
- View article status
- Delete draft articles
- View rejection reasons
- Manage own profile

### 3. Editor
- Review pending articles
- Approve/reject articles
- Suggest edits to authors
- View approval statistics
- Access editor dashboard

### 4. Admin
- Full system access
- Manage all articles (publish, delete)
- Manage categories
- Manage users and roles
- View system statistics
- Access audit logs
- System configuration

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile

### Public Articles
- `GET /api/articles` - Get all published articles
- `GET /api/articles/{id}` - Get article details
- `GET /api/articles/category/{category}` - Get by category
- `GET /api/articles/search/{query}` - Search articles

### Author Articles
- `POST /api/author/articles` - Create article
- `GET /api/author/articles/my-articles` - Get my articles
- `GET /api/author/articles/{id}` - Get my article
- `PUT /api/author/articles/{id}` - Update article
- `POST /api/author/articles/{id}/submit` - Submit for review
- `DELETE /api/author/articles/{id}` - Delete article

### Editor Articles
- `GET /api/editor/articles/pending` - Get pending articles
- `GET /api/editor/articles/approved` - Get approved articles
- `GET /api/editor/articles/rejected` - Get rejected articles
- `POST /api/editor/articles/{id}/approve` - Approve article
- `POST /api/editor/articles/{id}/reject` - Reject article
- `POST /api/editor/articles/{id}/suggest-edit` - Suggest edit
- `GET /api/editor/articles/stats/me` - Get my stats

### Admin
- `GET /api/admin/articles/all` - All articles
- `POST /api/admin/articles/{id}/publish` - Publish article
- `DELETE /api/admin/articles/{id}` - Delete article
- `POST /api/admin/categories` - Create category
- `GET /api/admin/categories` - Get categories
- `PUT /api/admin/categories/{id}` - Update category
- `DELETE /api/admin/categories/{id}` - Delete category
- `GET /api/admin/users` - Get users
- `GET /api/admin/users/role/{role}` - Get users by role
- `PUT /api/admin/users/{id}/role` - Update user role
- `PUT /api/admin/users/{id}/suspend` - Suspend user
- `PUT /api/admin/users/{id}/activate` - Activate user
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/logs` - System logs

## Testing the Backend

### 1. Check Server Health
```bash
curl http://localhost:5000/api/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "author@test.com",
    "password": "test123",
    "fullName": "Test Author",
    "role": "author"
  }'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "author@test.com",
    "password": "test123"
  }'
```

Save the returned token and use it in subsequent requests.

### 4. Get Current User
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/auth/me
```

### 5. Get Published Articles
```bash
curl http://localhost:5000/api/articles?limit=10&offset=0
```

## Frontend API Integration

### Using React Hooks
```jsx
import { useAuth, useAuthorArticles } from '../hooks/useApi';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { articles, createArticle, submitArticle } = useAuthorArticles();

  const handleCreateArticle = async () => {
    await createArticle({
      title: 'My Article',
      content: 'Article content',
      category: 'Technology'
    });
  };

  return (
    <div>
      {user && <p>Welcome, {user.fullName}!</p>}
      <button onClick={handleCreateArticle}>Create Article</button>
    </div>
  );
}
```

### Direct API Calls
```jsx
import { authorAPI, tokenStorage } from '../utils/api';

// Create article
const response = await authorAPI.createArticle({
  title: 'My Article',
  content: 'Article content',
  category: 'Technology'
});

// Access token
const token = tokenStorage.getToken();

// Clear session
tokenStorage.clearToken();
tokenStorage.clearUser();
```

## Database

### SQLite Database
- Location: `src/backend/Data/database.sqlite`
- Auto-created on first run
- Tables: users, articles, categories, comments, editor_stats, system_logs

### View Database
Using SQLite CLI:
```bash
sqlite3 src/backend/Data/database.sqlite
# Then use SQL queries
sqlite> SELECT * FROM users;
```

## Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV=production
- [ ] Configure database path for production
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS for your domain
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Add request logging
- [ ] Set up monitoring and alerting
- [ ] Configure backups for database
- [ ] Add error reporting (Sentry, etc.)
- [ ] Implement caching strategy
- [ ] Set up CI/CD pipeline

## Troubleshooting

### Port 5000 Already in Use
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
# Or use different port
PORT=5001 npm run dev:server
```

### Database Connection Error
```bash
# Check database path in .env
# Ensure Data directory exists
mkdir -p src/backend/Data
```

### CORS Errors
- Check CORS_ORIGIN in .env matches frontend URL
- Verify Authorization header format: `Bearer TOKEN`

### JWT Token Expired
- User needs to login again
- Token expiry set in JWT_EXPIRE (default: 7d)

## Next Steps

1. **Customize** database schema in `src/backend/config/database.js`
2. **Add validation** using joi or yup package
3. **Implement** email notifications
4. **Add** file upload functionality
5. **Set up** real-time features with WebSocket
6. **Create** advanced search and filtering
7. **Deploy** to production server

## Support

For detailed API documentation, see: `BACKEND_API_GUIDE.md`
