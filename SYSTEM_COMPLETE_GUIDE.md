# Báo Rồng Vàng - Complete System Guide

## 📋 Project Overview

Báo Rồng Vàng is a complete news website platform with full backend and frontend support for multiple user roles.

### Key Features
✅ User authentication with JWT  
✅ Role-based access control (Guest, Author, Editor, Admin)  
✅ Article management system with workflow (draft → pending → approved → published)  
✅ Editor review workflow  
✅ Admin dashboard with system management  
✅ Real-time data synchronization  
✅ SQLite database with comprehensive schema  

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /Users/longnguyen/Documents/BaoProject
npm install
```

### 2. Create Environment File
The `.env` file has been created. Verify it contains:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
DB_PATH=./src/backend/Data/database.sqlite
CORS_ORIGIN=http://localhost:5173
```

### 3. Start Development Environment
```bash
npm run dev
```

This starts both:
- **Backend**: http://localhost:5000 (Express API)
- **Frontend**: http://localhost:3003 (React app)

### 4. Login with Test Account
```
Email: author1@baorong.com
Password: password123
```

## 📁 Project Structure

```
BaoProject/
├── src/
│   ├── backend/
│   │   ├── config/
│   │   │   ├── database.js         ← Database schema & initialization
│   │   │   └── seed.js             ← Sample data (test accounts)
│   │   ├── Middleware/
│   │   │   └── auth.js             ← JWT & role verification
│   │   ├── Repositories/
│   │   │   ├── userRepository.js
│   │   │   ├── articleRepository.js
│   │   │   └── categoryRepository.js
│   │   ├── routes/
│   │   │   ├── auth.js             ← Login/Register
│   │   │   ├── articles-public.js  ← Public article viewing
│   │   │   ├── articles-author.js  ← Author functions
│   │   │   ├── articles-editor.js  ← Editor review
│   │   │   └── admin.js            ← Admin management
│   │   └── Data/
│   │       └── database.sqlite     ← SQLite database
│   ├── server/
│   │   └── app.js                  ← Express app setup
│   ├── client/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── author/AuthorDashboard.jsx
│   │   │   ├── editor/EditorDashboard.jsx
│   │   │   └── admin/AdminDashboard.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── hooks/
│   │   └── useApi.js               ← React API hooks
│   ├── utils/
│   │   └── api.js                  ← API client
│   ├── index.jsx
│   └── index.js
├── .env                            ← Configuration
├── package.json
├── BACKEND_API_GUIDE.md            ← API documentation
├── BACKEND_QUICK_START.md          ← Backend setup
├── INTEGRATION_GUIDE.md            ← Backend-frontend integration
├── FRONTEND_INTEGRATION.md         ← Component API usage
└── README.md
```

## 🔐 User Roles & Workflows

### 1️⃣ Guest (Default Role)
**What they can do:**
- Read published articles
- Search articles
- Browse by category
- View article details

**Login:** Not required

---

### 2️⃣ Author
**What they can do:**
- Create draft articles
- Edit draft articles
- Submit articles for review
- Delete draft articles
- View rejection reasons

**Dashboard:** `/author`

**Workflow:**
```
1. Write article (saved as draft)
   ↓
2. Edit & improve
   ↓
3. Submit for review (status changes to pending)
   ↓
4. Wait for editor feedback
   ↓
5. If approved → Admin can publish
   If rejected → Edit and resubmit
```

**Test Account:**
```
Email: author1@baorong.com
Password: password123
```

---

### 3️⃣ Editor
**What they can do:**
- Review pending articles
- Approve articles
- Reject articles (with reason)
- Suggest edits
- View statistics

**Dashboard:** `/editor`

**Workflow:**
```
1. View pending articles
   ↓
2. Read article details
   ↓
3. Decide: Approve ✅ or Reject ❌
   ↓
4. Update statistics
   ↓
5. Track approval rate
```

**Test Account:**
```
Email: editor1@baorong.com
Password: password123
```

---

### 4️⃣ Admin
**What they can do:**
- Full system access
- Publish approved articles
- Delete articles
- Manage users (change roles, suspend/activate)
- Manage categories
- View system statistics
- Access audit logs

**Dashboard:** `/admin`

**Workflow:**
```
1. View all articles (all statuses)
   ↓
2. Publish approved articles
   ↓
3. Manage users
   ↓
4. Manage categories
   ↓
5. Monitor system activity
```

**Test Account:**
```
Email: admin@baorong.com
Password: password123
```

---

## 📊 Article Status Lifecycle

```
┌─────────┐     ┌─────────┐      ┌──────────┐      ┌─────────┐      ┌───────────┐
│  Draft  │────→│ Pending │─────→│ Approved │─────→│Published│      │ Rejected  │
└─────────┘     └─────────┘      └──────────┘      └─────────┘      └───────────┘
  (Author)      (Editor)      (Admin decides)        (Public)        (Author edits)
  Created       Submits for    Reviews &                              & resubmits
  & edited      review         approves
```

**Status Details:**
- **draft**: Initial state, only author can edit/delete
- **pending**: Waiting for editor review
- **approved**: Editor approved, waiting for admin to publish
- **rejected**: Editor rejected with reason, author can resubmit
- **published**: Live on website, visible to public

## 🔌 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/register          Create account
POST   /api/auth/login             Login
GET    /api/auth/me                Get current user
PUT    /api/auth/me                Update profile
```

### Public Articles
```
GET    /api/articles               All published articles
GET    /api/articles/{id}          Get article details
GET    /api/articles/category/{cat} Articles by category
GET    /api/articles/search/{q}    Search articles
```

### Author Articles
```
POST   /api/author/articles                        Create article
GET    /api/author/articles/my-articles           Get my articles
GET    /api/author/articles/{id}                  Get my article
PUT    /api/author/articles/{id}                  Edit article
POST   /api/author/articles/{id}/submit           Submit for review
DELETE /api/author/articles/{id}                  Delete article
```

### Editor Articles
```
GET    /api/editor/articles/pending               Get pending articles
GET    /api/editor/articles/approved              Get approved articles
GET    /api/editor/articles/rejected              Get rejected articles
POST   /api/editor/articles/{id}/approve          Approve article
POST   /api/editor/articles/{id}/reject           Reject article
POST   /api/editor/articles/{id}/suggest-edit     Suggest edit
GET    /api/editor/articles/stats/me              Get my stats
```

### Admin
```
GET    /api/admin/articles/all                    All articles
POST   /api/admin/articles/{id}/publish           Publish article
DELETE /api/admin/articles/{id}                   Delete article
POST   /api/admin/categories                      Create category
GET    /api/admin/categories                      Get categories
PUT    /api/admin/categories/{id}                 Update category
DELETE /api/admin/categories/{id}                 Delete category
GET    /api/admin/users                           Get users
GET    /api/admin/users/role/{role}              Get users by role
PUT    /api/admin/users/{id}/role                Change user role
PUT    /api/admin/users/{id}/suspend             Suspend user
PUT    /api/admin/users/{id}/activate            Activate user
GET    /api/admin/stats                          Dashboard statistics
GET    /api/admin/logs                           System audit logs
```

## 💻 Using the API in React Components

### Example 1: Login
```jsx
import { useAuth } from '../hooks/useApi';

function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login('author1@baorong.com', 'password123');
      // Success - user is now logged in
    } catch (err) {
      console.error('Login failed:', err.message);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}
```

### Example 2: Create Article (Author)
```jsx
import { useAuthorArticles } from '../hooks/useApi';

function AuthorDashboard() {
  const { createArticle, submitArticle } = useAuthorArticles();

  const handleCreateArticle = async () => {
    try {
      const response = await createArticle({
        title: 'My First Article',
        excerpt: 'Short summary',
        content: 'Full article content...',
        category: 'Technology'
      });
      console.log('Article created:', response);
    } catch (err) {
      console.error('Failed:', err.message);
    }
  };

  return (
    <button onClick={handleCreateArticle}>Write Article</button>
  );
}
```

### Example 3: Review Articles (Editor)
```jsx
import { useEditorArticles } from '../hooks/useApi';

function EditorDashboard() {
  const { articles, approveArticle, rejectArticle } = useEditorArticles();

  const handleApprove = async (articleId) => {
    try {
      await approveArticle(articleId);
      console.log('Article approved');
    } catch (err) {
      console.error('Failed:', err.message);
    }
  };

  const handleReject = async (articleId, reason) => {
    try {
      await rejectArticle(articleId, reason);
      console.log('Article rejected');
    } catch (err) {
      console.error('Failed:', err.message);
    }
  };

  return (
    <div>
      {articles.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          <button onClick={() => handleApprove(article.id)}>Approve</button>
          <button onClick={() => handleReject(article.id, 'Needs revision')}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Admin Publish
```jsx
import { useAdmin } from '../hooks/useApi';

function AdminDashboard() {
  const { getAllArticles, publishArticle } = useAdmin();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const data = await getAllArticles();
    setArticles(data);
  };

  const handlePublish = async (articleId) => {
    try {
      await publishArticle(articleId);
      await loadArticles(); // Refresh
    } catch (err) {
      console.error('Failed:', err.message);
    }
  };

  return (
    <div>
      {articles
        .filter(a => a.status === 'approved')
        .map(article => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <button onClick={() => handlePublish(article.id)}>
              Publish
            </button>
          </div>
        ))}
    </div>
  );
}
```

## 🧪 Testing the System

### Test Scenario 1: Create & Publish Article

1. **Login as Author**
   ```
   Email: author1@baorong.com
   Password: password123
   ```

2. **Go to Author Dashboard** (`/author`)

3. **Create Article**
   - Click "Write Article"
   - Fill in title, content, category
   - Save as draft

4. **Submit for Review**
   - Find your draft article
   - Click "Submit"
   - Status changes to "pending"

5. **Login as Editor**
   ```
   Email: editor1@baorong.com
   Password: password123
   ```

6. **Go to Editor Dashboard** (`/editor`)

7. **Review Article**
   - See pending article
   - Click "Approve"
   - Status changes to "approved"

8. **Login as Admin**
   ```
   Email: admin@baorong.com
   Password: password123
   ```

9. **Go to Admin Dashboard** (`/admin`)

10. **Publish Article**
    - Find approved article
    - Click "Publish"
    - Status changes to "published"

11. **View Published Article**
    - Go to Home page (`/`)
    - Article now visible to public

### Test Scenario 2: Reject & Resubmit

1. Follow steps 1-4 above (Create & Submit)

2. **Login as Editor** and go to dashboard

3. **Reject Article**
   - Click "Reject"
   - Add rejection reason

4. **Login as Author**

5. **View Rejected Article**
   - See rejection reason
   - Status back to draft
   - Can edit and resubmit

## 📱 Frontend Pages

### Public Pages (No Login Required)
- **Home** (`/`) - Browse published articles
- **Article Detail** (`/article/:id`) - Read full article
- **Search** (`/search?q=keyword`) - Search articles
- **Category** (`/category/:category`) - Browse by category
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Create account

### Protected Pages (Login Required)
- **Author Dashboard** (`/author`) - Write & manage articles
- **Editor Dashboard** (`/editor`) - Review & approve articles
- **Admin Dashboard** (`/admin`) - System management
- **Profile** (`/profile`) - Edit user profile

## 🗄️ Database

### Tables
- **users** - User accounts with roles
- **articles** - News articles with status
- **categories** - Article categories
- **comments** - User comments (future feature)
- **editor_stats** - Editor performance metrics
- **system_logs** - Audit trail of admin actions

### Pre-loaded Data (On First Run)
- 5 test users (authors, editors, admin)
- 5 categories (Technology, Lifestyle, Business, Sports, Education)
- Empty system ready for articles

## 🔒 Security Features

✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ Role-based access control  
✅ Request validation middleware  
✅ Database foreign keys  
✅ CORS protection  
✅ Environment variable separation  

## 📚 Documentation Files

1. **BACKEND_API_GUIDE.md** - Complete API documentation
2. **BACKEND_QUICK_START.md** - Backend setup & commands
3. **INTEGRATION_GUIDE.md** - Backend-frontend integration details
4. **FRONTEND_INTEGRATION.md** - How to use API in React components

## ⚙️ Commands Reference

```bash
# Install dependencies
npm install

# Start both frontend & backend
npm run dev

# Start backend only
npm run dev:server

# Start frontend only
npm run dev:client

# Build for production
npm run build
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -ti:5000 | xargs kill -9

# Try different port
PORT=5001 npm run dev:server
```

### Frontend can't reach backend
- Check `.env` file has correct `CORS_ORIGIN`
- Verify backend is running on port 5000
- Check browser console for CORS errors

### Login not working
- Use correct test account credentials
- Check token is being stored in localStorage
- Check browser DevTools → Application → Local Storage

### Database issues
- Delete `src/backend/Data/database.sqlite` to reset
- Restart server to recreate database

## 🚀 Next Steps

### Phase 2: Enhanced Features
- [ ] Email notifications
- [ ] Image upload & CDN
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced search & filters
- [ ] User comments system
- [ ] Article versioning

### Phase 3: Production
- [ ] Deploy to production server
- [ ] Set up SSL/HTTPS
- [ ] Configure database backups
- [ ] Implement caching
- [ ] Add monitoring & alerting
- [ ] Set up CI/CD pipeline

### Phase 4: Performance
- [ ] Database indexing optimization
- [ ] API response caching
- [ ] CDN for static assets
- [ ] Full-text search optimization
- [ ] Rate limiting

## 📞 Support

For questions about:
- **Backend API** - See `BACKEND_API_GUIDE.md`
- **Backend Setup** - See `BACKEND_QUICK_START.md`
- **Integration** - See `INTEGRATION_GUIDE.md`
- **React Usage** - See `FRONTEND_INTEGRATION.md`

---

## ✨ Key Achievements

✅ **Full Backend System**
- Express.js API with 5 route modules
- SQLite database with 6 tables
- JWT authentication
- Role-based access control
- Repository pattern for clean data access

✅ **Complete Frontend**
- 3 dashboard implementations (Author, Editor, Admin)
- Public article browsing
- Search functionality
- User authentication UI
- Responsive design

✅ **Integration Ready**
- React hooks for all API calls
- API client with token management
- Error handling throughout
- Loading states
- Type-safe patterns

✅ **Production Ready**
- Environment configuration
- Database seeding
- Error handling
- CORS setup
- Audit logging

---

**Báo Rồng Vàng is ready for use! 🎉**

Start with: `npm run dev` and open http://localhost:3003
