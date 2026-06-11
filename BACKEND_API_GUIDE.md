# Backend API Documentation

## Overview
Complete backend system for Báo Rồng Vàng with support for multiple user roles (Guest, Author, Editor, Admin).

## Architecture

### Database Schema
- **Users**: User accounts with roles and status
- **Articles**: Articles with status tracking (draft → pending → approved → published)
- **Categories**: Article categories
- **Comments**: User comments on articles
- **Editor Stats**: Editor performance metrics
- **System Logs**: Audit trail for admin actions

### API Endpoints Structure

```
/api/
├── auth/                    # Authentication
├── articles/                # Public articles
├── author/articles/         # Author operations
├── editor/articles/         # Editor review operations
└── admin/                   # Admin operations
```

## Authentication

### JWT Token
- Token stored in `Authorization: Bearer <token>` header
- Expires in 7 days (configurable in .env)
- Required for all protected routes

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "author@example.com",
  "password": "password123",
  "fullName": "Author Name",
  "role": "author"
}

Response:
{
  "message": "User registered successfully",
  "user": { "id", "email", "fullName", "role" },
  "token": "jwt_token_here"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "author@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { "id", "email", "fullName", "avatar", "role" },
  "token": "jwt_token_here"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "id": "user_id",
  "email": "author@example.com",
  "fullName": "Author Name",
  "avatar": "avatar_url",
  "role": "author",
  "bio": "bio text",
  "phone": "phone",
  "status": "active",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Update Profile
```http
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "New Name",
  "bio": "New bio",
  "phone": "new phone",
  "avatar": "new_avatar_url"
}

Response:
{
  "message": "Profile updated",
  "user": { updated_user_data }
}
```

## Public Articles API

### Get All Published Articles
```http
GET /api/articles?limit=20&offset=0

Response: Array of published articles
```

### Get Article by ID
```http
GET /api/articles/{id}

Response: Full article details with author info
```

### Get Articles by Category
```http
GET /api/articles/category/{category}?limit=20&offset=0

Response: Array of published articles in category
```

### Search Articles
```http
GET /api/articles/search/{query}?limit=20&offset=0

Response: Array of matching published articles
```

## Author API

### Create Article
```http
POST /api/author/articles
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Article Title",
  "excerpt": "Short excerpt",
  "content": "Full content",
  "category": "Technology",
  "image": "image_url",
  "readTime": 5
}

Response:
{
  "message": "Article created successfully",
  "article": { "id", "title", "category", "status": "draft" }
}
```

### Get My Articles
```http
GET /api/author/articles/my-articles?limit=20&offset=0
Authorization: Bearer <token>

Response: Array of author's articles (all statuses)
```

### Get Specific Article
```http
GET /api/author/articles/{id}
Authorization: Bearer <token>

Response: Article details (if author owns it)
```

### Update Article
```http
PUT /api/author/articles/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "category": "New Category"
}

Response:
{
  "message": "Article updated",
  "article": { updated_data }
}

Note: Only draft articles can be edited
```

### Submit Article for Review
```http
POST /api/author/articles/{id}/submit
Authorization: Bearer <token>

Response:
{
  "message": "Article submitted for review"
}

Note: Moves article from 'draft' to 'pending' status
```

### Delete Article
```http
DELETE /api/author/articles/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Article deleted"
}

Note: Only draft articles can be deleted
```

## Editor API

### Get Pending Articles
```http
GET /api/editor/articles/pending?limit=20&offset=0
Authorization: Bearer <token>

Response: Array of pending articles
```

### Get Approved Articles
```http
GET /api/editor/articles/approved?limit=20&offset=0
Authorization: Bearer <token>

Response: Array of articles approved by editors
```

### Get Rejected Articles
```http
GET /api/editor/articles/rejected?limit=20&offset=0
Authorization: Bearer <token>

Response: Array of rejected articles
```

### Approve Article
```http
POST /api/editor/articles/{id}/approve
Authorization: Bearer <token>

Response:
{
  "message": "Article approved successfully"
}

Note: Updates editor stats
```

### Reject Article
```http
POST /api/editor/articles/{id}/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Reason for rejection"
}

Response:
{
  "message": "Article rejected",
  "rejectionReason": "Reason text"
}

Note: Updates editor stats
```

### Suggest Edit
```http
POST /api/editor/articles/{id}/suggest-edit
Authorization: Bearer <token>
Content-Type: application/json

{
  "suggestion": "Edit suggestion text"
}

Response:
{
  "message": "Suggestion saved"
}
```

### Get Editor Stats
```http
GET /api/editor/articles/stats/me
Authorization: Bearer <token>

Response:
{
  "id": "stat_id",
  "editor_id": "editor_id",
  "articlesReviewed": 100,
  "articlesApproved": 85,
  "articlesRejected": 15,
  "approvalRate": 85.0,
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

## Admin API

### Article Management

#### Get All Articles
```http
GET /api/admin/articles/all?limit=50&offset=0
Authorization: Bearer <token>

Response: Array of all articles (all statuses)
```

#### Publish Article
```http
POST /api/admin/articles/{id}/publish
Authorization: Bearer <token>

Response:
{
  "message": "Article published successfully"
}

Note: Only approved articles can be published
```

#### Delete Article
```http
DELETE /api/admin/articles/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Article deleted"
}
```

### Category Management

#### Create Category
```http
POST /api/admin/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "slug": "technology",
  "description": "Tech news",
  "color": "#2196F3",
  "icon": "icon_url"
}

Response:
{
  "message": "Category created",
  "category": { category_data }
}
```

#### Get All Categories
```http
GET /api/admin/categories
Authorization: Bearer <token>

Response: Array of all categories
```

#### Update Category
```http
PUT /api/admin/categories/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "description": "New description"
}

Response:
{
  "message": "Category updated",
  "category": { updated_data }
}
```

#### Delete Category
```http
DELETE /api/admin/categories/{id}
Authorization: Bearer <token>

Response:
{
  "message": "Category deleted"
}
```

### User Management

#### Get All Users
```http
GET /api/admin/users?limit=50&offset=0
Authorization: Bearer <token>

Response: Array of all users
```

#### Get Users by Role
```http
GET /api/admin/users/role/{role}
Authorization: Bearer <token>

Response: Array of users with specific role
```

#### Update User Role
```http
PUT /api/admin/users/{id}/role
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "editor"
}

Response:
{
  "message": "User role updated",
  "user": { updated_user_data }
}

Note: Valid roles: author, editor, admin, guest
```

#### Suspend User
```http
PUT /api/admin/users/{id}/suspend
Authorization: Bearer <token>

Response:
{
  "message": "User suspended"
}
```

#### Activate User
```http
PUT /api/admin/users/{id}/activate
Authorization: Bearer <token>

Response:
{
  "message": "User activated"
}
```

### Dashboard Statistics

#### Get Dashboard Stats
```http
GET /api/admin/stats
Authorization: Bearer <token>

Response:
{
  "totalArticles": 150,
  "publishedArticles": 120,
  "pendingArticles": 10,
  "totalUsers": 50,
  "totalAuthors": 30,
  "totalEditors": 5
}
```

#### Get System Logs
```http
GET /api/admin/logs?limit=50&offset=0
Authorization: Bearer <token>

Response: Array of system audit logs
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Article not found"
}
```

### 409 Conflict
```json
{
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": { error_details }
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install express cors dotenv uuid jsonwebtoken bcryptjs sqlite3 morgan body-parser
```

### 2. Environment Variables
Create `.env` file:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
DB_PATH=./src/backend/Data/database.sqlite
CORS_ORIGIN=http://localhost:5173
```

### 3. Start Server
```bash
npm run dev:server
```

Server will run on `http://localhost:5000`

## Testing

### Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "author@test.com",
    "password": "password123",
    "fullName": "Test Author",
    "role": "author"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "author@test.com",
    "password": "password123"
  }'
```

## Security Notes

1. Change JWT_SECRET in production
2. Use HTTPS in production
3. Implement rate limiting
4. Add input validation (recommended: joi or yup)
5. Use environment-specific configurations
6. Implement CORS properly for production
7. Add request logging and monitoring

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Real-time notifications using WebSockets
- [ ] Image upload and storage
- [ ] Comprehensive input validation
- [ ] Rate limiting
- [ ] API versioning
- [ ] Caching strategy
- [ ] Full-text search optimization
- [ ] Advanced reporting
