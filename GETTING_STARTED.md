# 🚀 Getting Started - Step by Step

## Step 1: Start the Application

```bash
cd /Users/longnguyen/Documents/BaoProject
npm run dev
```

**Expected Output:**
```
[0] Server is running on port 5000
[1] ➜ Local: http://localhost:3003/
```

**Access Points:**
- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3003

---

## Step 2: Test Backend (Optional)

### Check Server Health
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2024-06-11T10:30:00.000Z"
}
```

### Login with curl
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "author1@baorong.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user-uuid-here",
    "email": "author1@baorong.com",
    "fullName": "Nguyễn Văn An",
    "role": "author"
  },
  "token": "eyJhbGc..."
}
```

Copy the token for testing other endpoints.

---

## Step 3: Login in Frontend

1. **Open** http://localhost:3003
2. **Click** "Login" in header
3. **Enter credentials:**
   ```
   Email: author1@baorong.com
   Password: password123
   ```
4. **Click** "Đăng nhập" (Login)

**You should see:**
- Redirected to home page
- User menu in header shows your name
- Dashboard link available

---

## Step 4: Create Your First Article (As Author)

1. **Click** the "✍️ Author" icon in header (or go to `/author`)
2. **You should see** the Author Dashboard
3. **Fill in the form:**
   - **Title**: "Tin công nghệ mới"
   - **Category**: "Technology"
   - **Content**: "Đây là bài viết test của tôi"
4. **Click** "Write Article" button
5. **In the editor panel:**
   - Type your article content
   - Use formatting tools if desired
6. **Click** "Save as Draft"

**Result:**
- Article saved with status "draft"
- Visible in "My Articles" section
- Only you can see it (private)

---

## Step 5: Submit for Review

1. **In Author Dashboard**, find your draft article
2. **Click** the "Submit" button (📤)
3. **Click** "Confirm"

**Result:**
- Article status changed to "pending"
- Visible to editors for review
- You can't edit it anymore

---

## Step 6: Review as Editor

1. **Logout** from current account
2. **Login** with editor account:
   ```
   Email: editor1@baorong.com
   Password: password123
   ```
3. **Click** "📋 Editor" icon (or go to `/editor`)
4. **You should see:**
   - List of pending articles
   - Your article at the top
5. **Click** on the article to see details
6. **Choose action:**

### Option A: Approve Article
1. **Click** "✅ Approve" button
2. **Article status** changes to "approved"
3. **Your stats** update

### Option B: Reject Article
1. **Click** "❌ Reject" button
2. **Enter reason**: "Article needs more detail"
3. **Click** "Confirm"
4. **Article status** changes to "rejected"
5. **Author** sees rejection reason

---

## Step 7: Publish as Admin

1. **Logout** from editor account
2. **Login** with admin account:
   ```
   Email: admin@baorong.com
   Password: password123
   ```
3. **Click** "⚙️ Admin" icon (or go to `/admin`)
4. **You should see:**
   - System statistics
   - Article management tabs
5. **Click** "Bài đã duyệt" (Approved Articles) tab
6. **Find** your approved article
7. **Click** "Publish" button
8. **Article status** changes to "published"

---

## Step 8: View Published Article

1. **Logout** or **open new browser tab**
2. **Go to** http://localhost:3003
3. **You should see** your published article
4. **Click** on article to read full content

---

## 🔄 Complete Article Workflow Example

### Timeline
```
Time 0:00   Author creates draft article
            ↓
Time 0:30   Author submits for review (status: pending)
            ↓
Time 1:00   Editor reviews and approves (status: approved)
            ↓
Time 1:30   Admin publishes article (status: published)
            ↓
Time 1:31   Article visible to all users
```

### Status Changes
```
draft → pending → approved → published
```

### Actors
| Step | Actor | Action | Result |
|------|-------|--------|--------|
| 1 | Author | Create & edit | status: draft |
| 2 | Author | Submit review | status: pending |
| 3 | Editor | Approve | status: approved |
| 4 | Admin | Publish | status: published |

---

## 🧪 Alternative Test Scenarios

### Scenario 1: Rejection & Resubmit

1. **Follow steps 1-6 above** (Up to Editor Review)
2. **Editor**: Click "❌ Reject"
3. **Author**: Login again
4. **Author Dashboard**: See rejected article with reason
5. **Author**: Click edit icon, modify article
6. **Author**: Submit again
7. **Editor**: Reviews again, approves
8. **Admin**: Publishes

---

### Scenario 2: Multi-Author System

1. **Create multiple articles** as author1
2. **Login as author2**: `author2@baorong.com / password123`
3. **Create articles** as author2
4. **As editor**: Review articles from both authors
5. **As admin**: Publish approved articles
6. **Result**: Multiple authors publishing on same platform

---

### Scenario 3: Search & Browse

1. **Publish 3-4 articles** (following steps 1-8)
2. **On home page** (`/`):
   - See all published articles
   - Use search bar
   - Click category to browse
3. **Search example**: Type "công nghệ"
4. **See results**: All articles with that keyword

---

## 📱 Testing Each User Role

### As GUEST (No Login)
- ✅ Browse home page
- ✅ Read published articles
- ✅ Search articles
- ✅ Browse by category
- ❌ Create articles
- ❌ Access dashboards

### As AUTHOR
- ✅ Create draft articles
- ✅ Edit draft articles
- ✅ Submit for review
- ✅ View article status
- ✅ See rejection reasons
- ❌ Approve articles
- ❌ View other users' drafts
- ❌ Publish articles

### As EDITOR
- ✅ View pending articles
- ✅ Approve articles
- ✅ Reject with reason
- ✅ View approval stats
- ❌ Create articles
- ❌ Delete articles
- ❌ Manage users
- ❌ Publish articles (only admin)

### As ADMIN
- ✅ View all articles
- ✅ Publish articles
- ✅ Delete articles
- ✅ Manage categories
- ✅ Manage users
- ✅ View statistics
- ✅ View system logs
- ✓ Full system access

---

## 🎯 Quick Reference

### Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Author 1 | author1@baorong.com | password123 |
| Author 2 | author2@baorong.com | password123 |
| Editor 1 | editor1@baorong.com | password123 |
| Editor 2 | editor2@baorong.com | password123 |
| Admin | admin@baorong.com | password123 |

### Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3003 |
| Author Dashboard | http://localhost:3003/author |
| Editor Dashboard | http://localhost:3003/editor |
| Admin Dashboard | http://localhost:3003/admin |
| Login | http://localhost:3003/login |
| Search | http://localhost:3003/search?q=keyword |

### Backend API

| Purpose | URL |
|---------|-----|
| Health Check | http://localhost:5000/api/health |
| Login | POST http://localhost:5000/api/auth/login |
| Get Articles | GET http://localhost:5000/api/articles |

---

## ⚠️ Common Issues & Solutions

### Issue: "Cannot reach backend"
**Solution:**
1. Make sure `npm run dev` is running
2. Check backend console shows "Server is running on port 5000"
3. Visit http://localhost:5000/api/health to verify
4. Check `.env` has `CORS_ORIGIN=http://localhost:5173`

### Issue: "Login failed"
**Solution:**
1. Check email & password are correct
2. Use test accounts (listed above)
3. Check database was created (`src/backend/Data/database.sqlite` should exist)

### Issue: "Page not found after login"
**Solution:**
1. Page might not exist - check URL
2. Clear browser cache (Cmd+Shift+R)
3. Check browser console for errors
4. Verify backend is responding

### Issue: "Database locked"
**Solution:**
1. Restart backend: Kill process and run `npm run dev:server` again
2. If error persists, delete database file and restart
   ```bash
   rm src/backend/Data/database.sqlite
   npm run dev:server
   ```

---

## 🔗 Documentation Links

| Document | Purpose |
|----------|---------|
| `SYSTEM_COMPLETE_GUIDE.md` | Overall system overview |
| `BACKEND_QUICK_START.md` | Backend setup & commands |
| `BACKEND_API_GUIDE.md` | Complete API reference |
| `INTEGRATION_GUIDE.md` | Backend-frontend integration |
| `FRONTEND_INTEGRATION.md` | How to update React components |
| `ARCHITECTURE_DIAGRAMS.md` | Visual system architecture |
| `VERIFICATION_REPORT.md` | Project completion report |

---

## 📊 Testing Checklist

- [ ] Backend starts successfully
- [ ] Frontend loads at localhost:3003
- [ ] Can login with test account
- [ ] Author can create article
- [ ] Author dashboard shows article
- [ ] Article status is "draft"
- [ ] Author can submit article
- [ ] Editor can see pending article
- [ ] Editor can approve article
- [ ] Article status changed to "approved"
- [ ] Admin can see approved article
- [ ] Admin can publish article
- [ ] Article status changed to "published"
- [ ] Home page shows published article
- [ ] Article details page works
- [ ] Search function works
- [ ] Category filtering works
- [ ] Can logout and login again
- [ ] Different users see their own data
- [ ] Role permissions enforced

---

## 🎓 What You've Learned

### Backend Concepts
- Express.js routing
- SQLite database
- JWT authentication
- Role-based access control
- RESTful API design

### Frontend Concepts
- React hooks (useEffect, useState)
- API integration
- Token management
- Error handling
- Component lifecycle

### Full-Stack Workflow
- User registration & authentication
- Data flow between frontend-backend
- Article lifecycle management
- Multi-role permission system
- Complete web application

---

## 🚀 Next: Customize & Deploy

### To Customize:
1. Update article categories in database
2. Add more user roles if needed
3. Customize UI/styling in React components
4. Add more fields to articles/users

### To Deploy:
1. Update `.env` with production settings
2. Deploy backend to server (Heroku, DigitalOcean, etc.)
3. Deploy frontend (Vercel, Netlify, etc.)
4. Set up production database
5. Configure HTTPS/SSL
6. Set up monitoring & logging

---

## 📞 Need Help?

1. **Backend issues**: See `BACKEND_API_GUIDE.md`
2. **Frontend issues**: See `FRONTEND_INTEGRATION.md`
3. **Setup issues**: See `BACKEND_QUICK_START.md`
4. **System issues**: See `VERIFICATION_REPORT.md`
5. **Architecture**: See `ARCHITECTURE_DIAGRAMS.md`

---

**Happy coding! 🎉**

The Báo Rồng Vàng news platform is now fully operational and ready for use!
