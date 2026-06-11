# Backend & Frontend Integration Guide

## Complete Setup for Báo Rồng Vàng

### Overview
This document explains how the frontend and backend work together for the Báo Rồng Vàng (Dragon Gold News) website.

## Architecture

### Backend (Express.js + SQLite)
- **Port**: 5000
- **Database**: SQLite at `src/backend/Data/database.sqlite`
- **Entry Point**: `src/server/app.js`
- **API Base**: `http://localhost:5000/api`

### Frontend (React + Vite)
- **Port**: 3003 (or next available)
- **Entry Point**: `src/index.jsx`
- **API Client**: `src/utils/api.js`
- **Hooks**: `src/hooks/useApi.js`

## Project Structure

```
BaoProject/
├── src/
│   ├── backend/
│   │   ├── config/
│   │   │   ├── database.js          # DB schema & initialization
│   │   │   └── seed.js              # Sample data
│   │   ├── Middleware/
│   │   │   └── auth.js              # JWT middleware
│   │   ├── Repositories/
│   │   │   ├── userRepository.js    # User DB operations
│   │   │   ├── articleRepository.js # Article DB operations
│   │   │   └── categoryRepository.js # Category DB operations
│   │   ├── routes/
│   │   │   ├── auth.js              # Auth endpoints
│   │   │   ├── articles-public.js   # Public articles
│   │   │   ├── articles-author.js   # Author endpoints
│   │   │   ├── articles-editor.js   # Editor endpoints
│   │   │   └── admin.js             # Admin endpoints
│   │   └── Data/
│   │       └── database.sqlite
│   ├── server/
│   │   └── app.js                   # Express app setup
│   ├── client/
│   │   ├── App/
│   │   │   ├── App.jsx
│   │   │   └── App.css
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ArticleDetailPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── author/
│   │   │   │   └── AuthorDashboard.jsx
│   │   │   ├── editor/
│   │   │   │   └── EditorDashboard.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── hooks/
│   │   └── useApi.js                # React API hooks
│   ├── utils/
│   │   └── api.js                   # API client & storage
│   ├── index.jsx
│   └── index.js
├── .env                             # Environment variables
├── package.json
├── vite.config.js
└── ...
```

## How It Works

### 1. User Registration & Login

#### Frontend Flow:
```
User fills LoginPage.jsx form
    ↓
Calls useAuth().login() hook
    ↓
Hook calls authAPI.login()
    ↓
API sends POST request to /api/auth/login
    ↓
Token + user data stored in localStorage
    ↓
Redirect to dashboard
```

#### Backend Flow:
```
POST /api/auth/login
    ↓
Validate email & password
    ↓
Generate JWT token
    ↓
Return token + user data
```

### 2. Protected Routes

#### Middleware Flow:
```
Frontend request with Bearer token
    ↓
API client adds Authorization header
    ↓
Backend authMiddleware checks token
    ↓
JWT verification
    ↓
If valid: request proceeds
    ↓
If invalid: return 401 Unauthorized
```

### 3. Role-Based Access

#### Author Creating Article:
```
Author fills AuthorDashboard form
    ↓
Calls useAuthorArticles().createArticle()
    ↓
POST /api/author/articles
    ↓
Backend authMiddleware verifies token
    ↓
roleMiddleware checks role === 'author'
    ↓
Article saved to database with status='draft'
```

#### Editor Reviewing Article:
```
Editor views EditorDashboard
    ↓
Calls useEditorArticles().getPendingArticles()
    ↓
GET /api/editor/articles/pending
    ↓
Returns articles with status='pending'
    ↓
Editor clicks approve
    ↓
POST /api/editor/articles/{id}/approve
    ↓
Status changed to 'approved'
    ↓
Editor stats updated
```

#### Admin Publishing Article:
```
Admin views AdminDashboard
    ↓
Sees articles with status='approved'
    ↓
Clicks Publish
    ↓
POST /api/admin/articles/{id}/publish
    ↓
Status changed to 'published'
    ↓
Article visible to public
    ↓
System log created
```

## Authentication Flow

### Token Storage
```javascript
// Storage in localStorage
localStorage.getItem('auth_token')     // JWT token
localStorage.getItem('user')           // User info (JSON)

// Token Structure
{
  id: "user-uuid",
  email: "user@example.com",
  role: "author|editor|admin|guest"
}
```

### Header Format
```
Authorization: Bearer eyJhbGc...token...here
```

### Token Refresh
- Currently: Users must login again when token expires (7 days)
- Future: Implement refresh token mechanism

## Database Schema

### Users Table
```sql
users {
  id: UUID PRIMARY KEY,
  email: STRING UNIQUE,
  password: STRING (hashed),
  fullName: STRING,
  role: ENUM(author, editor, admin, guest),
  bio: TEXT,
  phone: STRING,
  avatar: STRING (URL),
  status: ENUM(active, inactive, suspended),
  createdAt: DATETIME,
  updatedAt: DATETIME
}
```

### Articles Table
```sql
articles {
  id: UUID PRIMARY KEY,
  title: STRING,
  excerpt: TEXT,
  content: TEXT,
  category: STRING,
  author_id: UUID FK → users.id,
  editor_id: UUID FK → users.id,
  status: ENUM(draft, pending, approved, rejected, published),
  image: STRING (URL),
  readTime: INTEGER,
  views: INTEGER,
  likes: INTEGER,
  publishedAt: DATETIME,
  rejectionReason: TEXT,
  createdAt: DATETIME,
  updatedAt: DATETIME
}
```

### Categories Table
```sql
categories {
  id: UUID PRIMARY KEY,
  name: STRING UNIQUE,
  slug: STRING UNIQUE,
  description: TEXT,
  color: STRING,
  icon: STRING,
  createdAt: DATETIME
}
```

## API Call Examples

### Frontend Making Requests

#### 1. Using React Hooks (Recommended)
```jsx
import { useAuth, useAuthorArticles } from '../hooks/useApi';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { articles, createArticle, submitArticle } = useAuthorArticles();

  const handleLogin = async () => {
    try {
      await login('author@test.com', 'password123');
      console.log('Logged in!');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const response = await createArticle({
        title: 'New Article',
        content: 'Article content here...',
        category: 'Technology'
      });
      console.log('Article created:', response);
    } catch (error) {
      console.error('Failed to create article:', error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.fullName}!</p>
          <button onClick={handleCreateArticle}>Create Article</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}

export default MyComponent;
```

#### 2. Direct API Calls
```jsx
import { authorAPI, tokenStorage } from '../utils/api';

async function handleCreateArticle() {
  try {
    // Check if user is logged in
    const token = tokenStorage.getToken();
    if (!token) {
      console.error('User not logged in');
      return;
    }

    // Create article
    const response = await authorAPI.createArticle({
      title: 'My Article',
      content: 'Article content',
      category: 'Technology',
      readTime: 5
    });

    console.log('Article created:', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### Testing with cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "role": "author"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned token, then:

#### Create Article (with token)
```bash
curl -X POST http://localhost:5000/api/author/articles \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Article",
    "excerpt": "Short excerpt",
    "content": "Full article content...",
    "category": "Technology"
  }'
```

## User Roles & Workflows

### 1. Guest (Default)
**Permissions:**
- Browse published articles
- Search articles
- View article details
- Comment on articles (future)

**Dashboard:** None

**Key Pages:**
- Home page
- Article detail page
- Search results
- Category page

---

### 2. Author
**Permissions:**
- Create articles (saved as draft)
- Edit own draft articles
- Submit articles for review
- Delete own draft articles
- View rejection reasons
- View article status

**Dashboard:** `/author`

**Workflow:**
1. Write article (draft)
2. Edit article (draft)
3. Submit for review (status: pending)
4. Wait for editor review
5. If approved → goes to pending publish
6. If rejected → see reason, edit and resubmit

**Key API Calls:**
```javascript
// Create
POST /api/author/articles

// View my articles
GET /api/author/articles/my-articles

// Edit
PUT /api/author/articles/{id}

// Submit
POST /api/author/articles/{id}/submit

// Delete
DELETE /api/author/articles/{id}
```

---

### 3. Editor
**Permissions:**
- Review pending articles
- Approve articles
- Reject articles with reason
- Suggest edits
- View approval statistics

**Dashboard:** `/editor`

**Workflow:**
1. View pending articles
2. Read article details
3. Approve (status: approved) OR
4. Reject with reason (status: rejected)
5. Track approval statistics

**Key API Calls:**
```javascript
// Get pending
GET /api/editor/articles/pending

// Approve
POST /api/editor/articles/{id}/approve

// Reject
POST /api/editor/articles/{id}/reject

// Suggest edit
POST /api/editor/articles/{id}/suggest-edit

// Get stats
GET /api/editor/articles/stats/me
```

---

### 4. Admin
**Permissions:**
- Full system access
- Publish approved articles
- Delete any article
- Manage categories
- Manage users (change roles, suspend/activate)
- View system statistics
- View audit logs

**Dashboard:** `/admin`

**Workflow:**
1. View all articles (all statuses)
2. Publish approved articles (status: published)
3. Delete articles if needed
4. Manage users
5. Manage categories
6. Monitor system activity

**Key API Calls:**
```javascript
// Get all articles
GET /api/admin/articles/all

// Publish
POST /api/admin/articles/{id}/publish

// Delete
DELETE /api/admin/articles/{id}

// Manage users
GET /api/admin/users
PUT /api/admin/users/{id}/role
PUT /api/admin/users/{id}/suspend

// Get stats
GET /api/admin/stats

// View logs
GET /api/admin/logs
```

---

## Data Flow Examples

### Example 1: Article Lifecycle

```
1. AUTHOR CREATES ARTICLE
   └─ POST /api/author/articles
      └─ Article status: 'draft'
      └─ Stored in DB

2. AUTHOR SUBMITS FOR REVIEW
   └─ POST /api/author/articles/{id}/submit
      └─ Article status: 'pending'
      └─ Visible to editors

3. EDITOR REVIEWS
   └─ GET /api/editor/articles/pending
      └─ Editor sees pending articles
      └─ Reads article details

4. EDITOR APPROVES
   └─ POST /api/editor/articles/{id}/approve
      └─ Article status: 'approved'
      └─ Editor stats updated
      └─ Visible to admin

5. ADMIN PUBLISHES
   └─ POST /api/admin/articles/{id}/publish
      └─ Article status: 'published'
      └─ publishedAt timestamp set
      └─ System log created

6. PUBLIC READS
   └─ GET /api/articles
      └─ Article appears in public list
      └─ Views counter incremented
```

### Example 2: User Authentication Flow

```
1. USER REGISTRATION
   └─ POST /api/auth/register
      └─ Password hashed with bcrypt
      └─ User stored in database
      └─ JWT token generated
      └─ Frontend stores token in localStorage

2. USER LOGIN
   └─ POST /api/auth/login
      └─ Email lookup
      └─ Password comparison
      └─ JWT token generated
      └─ Frontend stores token

3. PROTECTED REQUESTS
   └─ Frontend includes header: Authorization: Bearer {token}
      └─ Backend authMiddleware extracts token
      └─ JWT verified
      └─ User data added to request
      └─ Request proceeds or rejected

4. LOGOUT
   └─ Frontend clears localStorage
      └─ Token deleted from client
      └─ No more requests with that token
```

## Error Handling

### Frontend Error Handling
```jsx
import { useAuth } from '../hooks/useApi';

function LoginComponent() {
  const { login, error, loading } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Success
    } catch (error) {
      // Error is in the error state
      console.error(error);
      // Show error to user
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading && <div>Loading...</div>}
      {/* Form */}
    </div>
  );
}
```

### Backend Error Handling
```javascript
// All errors return JSON with message
{
  "message": "Error description",
  "error": { /* detailed error in development */ }
}

// HTTP Status Codes:
// 200 - Success
// 201 - Created
// 400 - Bad Request
// 401 - Unauthorized (not logged in)
// 403 - Forbidden (insufficient permissions)
// 404 - Not Found
// 409 - Conflict (email already exists)
// 500 - Server Error
```

## Testing

### Test Accounts (Pre-seeded)
```
Author 1:
  Email: author1@baorong.com
  Password: password123

Author 2:
  Email: author2@baorong.com
  Password: password123

Editor 1:
  Email: editor1@baorong.com
  Password: password123

Editor 2:
  Email: editor2@baorong.com
  Password: password123

Admin:
  Email: admin@baorong.com
  Password: password123
```

### Running Development Environment
```bash
npm run dev
```

This starts:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3003 (or next available)

### Testing Backend Only
```bash
npm run dev:server
```

Test with cURL or Postman at `http://localhost:5000/api`

### Testing Frontend Only
```bash
npm run dev:client
```

Frontend will try to connect to backend API at `http://localhost:5000`

## Integration Checklist

- [x] Database schema created
- [x] Authentication implemented
- [x] User roles & middleware
- [x] Repository pattern for data access
- [x] API routes for all roles
- [x] Frontend API client
- [x] React hooks for API
- [x] Error handling
- [x] Token storage
- [x] Database seeding
- [ ] Email notifications (future)
- [ ] Image upload (future)
- [ ] Real-time notifications (future)
- [ ] Advanced search (future)
- [ ] Caching layer (future)

## Troubleshooting

### Backend Connection Refused
```
Problem: Frontend can't reach backend
Solution: 
  1. Check backend is running: npm run dev:server
  2. Check port 5000 is available
  3. Check CORS_ORIGIN in .env
```

### Token Expired
```
Problem: 401 Unauthorized after 7 days
Solution: User must login again
Future: Implement refresh token
```

### Database Locked
```
Problem: Database is locked
Solution: Restart server (kills any locked connections)
```

### Port Already in Use
```
Problem: Port 5000 or 3003 in use
Solution: 
  Kill process: lsof -ti:5000 | xargs kill -9
  Or use different port: PORT=5001 npm run dev:server
```

## Performance Tips

1. **API Call Optimization:**
   - Use pagination (limit, offset)
   - Cache results in useState
   - Debounce search requests

2. **Database Optimization:**
   - Add indexes on frequently searched columns
   - Use LIMIT/OFFSET for pagination
   - Archive old articles/logs

3. **Frontend Optimization:**
   - Lazy load components
   - Memoize API calls
   - Use React.memo for expensive components

## Security Reminders

1. Never commit `.env` with production secrets
2. Change JWT_SECRET before deploying
3. Validate all user inputs
4. Use HTTPS in production
5. Implement rate limiting
6. Add CSRF protection
7. Sanitize user-generated content
8. Keep dependencies updated

## Next Steps

1. Customize the database schema for your needs
2. Add input validation (joi, yup)
3. Implement email notifications
4. Add file upload functionality
5. Set up production deployment
6. Configure CDN for static files
7. Implement caching strategy
8. Add monitoring & logging
