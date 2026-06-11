# System Architecture & Data Flow Diagrams

## 📊 Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                      React Application                        │   │
│  │  ┌──────────────────────────────────────────────────────┐    │   │
│  │  │  Pages:                                              │    │   │
│  │  │  • HomePage      • LoginPage      • SearchPage       │    │   │
│  │  │  • ArticleDetail • Register       • CategoryPage     │    │   │
│  │  │  • AuthorDash    • EditorDash     • AdminDash        │    │   │
│  │  └──────────────────────────────────────────────────────┘    │   │
│  │                           ↓                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐    │   │
│  │  │  React Hooks (useApi.js)                             │    │   │
│  │  │  • useAuth()      • useArticles()                     │    │   │
│  │  │  • useAuthorArticles()    • useEditorArticles()       │    │   │
│  │  │  • useAdmin()                                        │    │   │
│  │  └──────────────────────────────────────────────────────┘    │   │
│  │                           ↓                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐    │   │
│  │  │  API Client (api.js)                                │    │   │
│  │  │  • authAPI     • articlesAPI                         │    │   │
│  │  │  • authorAPI   • editorAPI      • adminAPI           │    │   │
│  │  └──────────────────────────────────────────────────────┘    │   │
│  │                           ↓                                   │   │
│  │  ┌──────────────────────────────────────────────────────┐    │   │
│  │  │  Token Storage                                       │    │   │
│  │  │  • localStorage (JWT Token)                          │    │   │
│  │  │  • localStorage (User Info)                          │    │   │
│  │  └──────────────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  HTTP Requests with Authorization Header                            │
│  ↓                                                                   │
└─────────────────────────────────────────────────────────────────────┘
                            ↓ HTTP/CORS ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      EXPRESS API SERVER                             │
│  (Running on http://localhost:5000)                                │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Middleware Layer                                            │  │
│  │  • CORS Middleware        • Body Parser                      │  │
│  │  • Morgan (Logging)       • Error Handler                    │  │
│  │  • Auth Middleware        • Role Middleware                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                           ↓                                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Route Modules (5 routers)                                  │  │
│  │  ┌────────────────────────────────────────────────────────┐ │  │
│  │  │ /auth              (Register, Login, Profile)          │ │  │
│  │  │ /articles          (Public - Browse & Search)          │ │  │
│  │  │ /author/articles   (Create, Edit, Submit)              │ │  │
│  │  │ /editor/articles   (Review, Approve, Reject)           │ │  │
│  │  │ /admin             (All management functions)          │ │  │
│  │  └────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                           ↓                                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Repository Layer (Data Access)                            │  │
│  │  • userRepository      • articleRepository                  │  │
│  │  • categoryRepository                                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                           ↓                                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Database Layer                                            │  │
│  │  SQLite Database (database.sqlite)                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication & Authorization Flow

```
┌─────────────────────┐
│  User Credentials   │
│ (email, password)   │
└──────────┬──────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│         POST /api/auth/login                     │
│  ┌────────────────────────────────────────────┐  │
│  │ 1. Receive email & password                │  │
│  │ 2. Look up user in database                │  │
│  │ 3. Compare password (bcrypt.compare)       │  │
│  │ 4. If valid:                               │  │
│  │    - Generate JWT token                    │  │
│  │    - Return token + user data              │  │
│  │ 5. If invalid: Return 401 Unauthorized     │  │
│  └────────────────────────────────────────────┘  │
└──────────┬───────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│  Frontend stores in localStorage                 │
│  • auth_token: "eyJhbGc..."                      │
│  • user: { id, email, fullName, role }           │
└──────────┬───────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│  Protected API Request                           │
│  ┌────────────────────────────────────────────┐  │
│  │ GET /api/author/articles/my-articles       │  │
│  │ Header: Authorization: Bearer eyJhbGc...   │  │
│  └────────────────────────────────────────────┘  │
└──────────┬───────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│  Backend Middleware                              │
│  ┌────────────────────────────────────────────┐  │
│  │ authMiddleware:                            │  │
│  │ 1. Extract token from header               │  │
│  │ 2. Verify token signature (JWT.verify)     │  │
│  │ 3. Decode token → req.user = { id, role }  │  │
│  │ 4. Pass to roleMiddleware                  │  │
│  └────────────────────────────────────────────┘  │
└──────────┬───────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│  roleMiddleware                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ Check: req.user.role === 'author'?         │  │
│  │ ✓ If yes: Proceed to handler               │  │
│  │ ✗ If no: Return 403 Forbidden              │  │
│  └────────────────────────────────────────────┘  │
└──────────┬───────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────────┐
│  Route Handler                                   │
│  Execute: return author's articles               │
└──────────────────────────────────────────────────┘
```

## 📰 Article Workflow State Machine

```
                    ┌─────────────────────────────────────────┐
                    │ Only Author                             │
                    │ Can Create & Edit                       │
                    └────────┬────────────────────────────────┘
                             │
                    ┌────────▼──────────┐
                    │    DRAFT          │
              ┌─────│ (Saved, Private)  │────┐
              │     └──────────────────┘     │
              │                              │
      Author │                              │ Author
      Edits  │                              │ Submits
              │                              │
              └────────┬──────────────────┬──┘
                       │                  │
           Delete ◄────┘                  └────► Submit for Review
              │                                  │
              │     ┌──────────────────┐         │
              │     │ PENDING          │         │
              │     │ (Waiting Review) │◄────────┘
              │     └──────────────────┘
              │            │
              │            │ Editor Reviews
              │            │
              │     ┌──────▼──────────┐
              │     │  APPROVED       │
              │     │ (Ready to Post) │
              │     └──────────────────┘
              │            │
              │            │ Admin Publishes
              │            │
              │     ┌──────▼────────────┐
              │     │  PUBLISHED        │
              │     │ (Live on Website) │
              │     └───────────────────┘
              │
              │     ┌──────────────────┐
              └────►│  REJECTED        │
                    │ (Failed Review)  │
                    └──────────────────┘
                           │
                           │ Author
                           │ Edits &
                           │ Resubmits
                           │
                           └─────────────► Back to DRAFT

              Status Transitions:
              ✓ draft → pending (Author submits)
              ✓ pending → approved (Editor approves)
              ✓ pending → rejected (Editor rejects)
              ✓ rejected → draft (Author edits)
              ✓ approved → published (Admin publishes)
              ✓ (any) → deleted (Admin)
```

## 👥 Role-Based Access Control (RBAC)

```
┌────────────┬──────────┬──────────┬────────┬───────┐
│ Action     │ Author   │ Editor   │ Admin  │ Guest │
├────────────┼──────────┼──────────┼────────┼───────┤
│ Read       │          │          │        │       │
│ • Public   │    ✓     │    ✓     │   ✓    │   ✓   │
│ • Own      │    ✓     │    -     │   ✓    │   -   │
│            │          │          │        │       │
│ Create     │          │          │        │       │
│ • Draft    │    ✓     │    -     │   -    │   -   │
│            │          │          │        │       │
│ Edit       │          │          │        │       │
│ • Own      │    ✓*    │    -     │   -    │   -   │
│ • Any      │    -     │    -     │   ✓    │   -   │
│            │          │          │        │       │
│ Delete     │          │          │        │       │
│ • Draft    │    ✓*    │    -     │   -    │   -   │
│ • Any      │    -     │    -     │   ✓    │   -   │
│            │          │          │        │       │
│ Submit     │          │          │        │       │
│ • Review   │    ✓*    │    -     │   -    │   -   │
│            │          │          │        │       │
│ Review     │          │          │        │       │
│ • Approve  │    -     │    ✓     │   -    │   -   │
│ • Reject   │    -     │    ✓     │   -    │   -   │
│ • Suggest  │    -     │    ✓     │   -    │   -   │
│            │          │          │        │       │
│ Publish    │    -     │    -     │   ✓    │   -   │
│ • Articles │          │          │        │       │
│            │          │          │        │       │
│ Manage     │    -     │    -     │   ✓    │   -   │
│ • Users    │          │          │        │       │
│ • Categories          │          │        │       │
│ • System   │          │          │        │       │
└────────────┴──────────┴──────────┴────────┴───────┘

✓  = Allowed
-  = Not Allowed
✓* = Only for own items or specific statuses
```

## 🗄️ Database Relationship Diagram

```
┌──────────────────┐         ┌──────────────────┐
│     USERS        │         │    CATEGORIES    │
├──────────────────┤         ├──────────────────┤
│ id (PK)          │         │ id (PK)          │
│ email            │         │ name (UNIQUE)    │
│ password         │         │ slug (UNIQUE)    │
│ fullName         │         │ description      │
│ role             │         │ color            │
│ avatar           │         │ icon             │
│ bio              │         └──────────────────┘
│ phone            │                  △
│ status           │                  │
│ createdAt        │                  │ (has many)
│ updatedAt        │                  │
└──────────────────┘                  │
       △  △                           │
       │  │                           │
       │  └─────────┐                 │
       │            │                 │
(author_id)  (editor_id)         category
       │            │                 │
       │            └───┐             │
       │                │             │
       ├────────────────┼─────────────┤
       │                │             │
       └────────────────┼─────────────▼
                        │         ┌──────────────────┐
                        │         │    ARTICLES      │
                        │         ├──────────────────┤
                        │         │ id (PK)          │
                        │         │ title            │
                        │         │ excerpt          │
                        │         │ content          │
                        │         │ category (FK)    │
                        │         │ author_id (FK)   │
                        │         │ editor_id (FK)   │
                        └────────►│ status           │
                                  │ image            │
                                  │ readTime         │
                                  │ views            │
                                  │ publishedAt      │
                                  │ rejectionReason  │
                                  │ createdAt        │
                                  │ updatedAt        │
                                  └──────────────────┘
                                           △
                                           │
                                           │ (has many)
                                           │
                                  ┌────────┴──────────┐
                                  │                   │
                        ┌─────────────────┐  ┌────────────────┐
                        │    COMMENTS     │  │ EDITOR_STATS   │
                        ├─────────────────┤  ├────────────────┤
                        │ id (PK)         │  │ id (PK)        │
                        │ article_id (FK) │  │ editor_id (FK) │
                        │ user_id (FK)    │  │ articlesReview │
                        │ content         │  │ articlesAppr   │
                        │ status          │  │ articlesRej    │
                        │ createdAt       │  │ approvalRate   │
                        └─────────────────┘  │ updatedAt      │
                                             └────────────────┘
```

## 🔄 Data Flow: Create & Publish Article

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 1: AUTHOR CREATES ARTICLE                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Frontend (React)                Backend (Express)                  │
│  ┌──────────────────┐            ┌────────────────────────────┐    │
│  │ AuthorDashboard  │   POST     │ /api/author/articles       │    │
│  │                  ├───────────►│                            │    │
│  │ Form Submit      │ {          │ ✓ Check token (JWT)        │    │
│  │ title            │   title,   │ ✓ Check role (author)      │    │
│  │ content          │   content, │ ✓ Validate input           │    │
│  │ category         │   category │ ✓ Generate ID              │    │
│  └──────────────────┘ }          │ ✓ Save to DB (status=draft)│    │
│                                   │ ✓ Return success           │    │
│                                   └────────────────────────────┘    │
│                                                                      │
│  Result: Article created with status="draft"                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ STEP 2: AUTHOR SUBMITS FOR REVIEW                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Frontend (React)                Backend (Express)                  │
│  ┌──────────────────┐            ┌────────────────────────────┐    │
│  │ AuthorDashboard  │   POST     │ /api/author/articles/{id}  │    │
│  │                  ├───────────►│ /submit                    │    │
│  │ Click Submit     │            │                            │    │
│  │ Button           │            │ ✓ Check token              │    │
│  └──────────────────┘            │ ✓ Check role (author)      │    │
│                                   │ ✓ Check status=draft       │    │
│                                   │ ✓ Update status=pending    │    │
│                                   │ ✓ Return success           │    │
│                                   └────────────────────────────┘    │
│                                                                      │
│  Result: Article status changed to "pending"                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ STEP 3: EDITOR REVIEWS & APPROVES                                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Frontend (React)                Backend (Express)                  │
│  ┌──────────────────┐            ┌────────────────────────────┐    │
│  │ EditorDashboard  │   GET      │ /api/editor/articles/      │    │
│  │                  ├───────────►│ pending                    │    │
│  │ Load Pending     │            │                            │    │
│  │ Articles         │ ◄──────────┤ Returns: [ article1, ... ] │    │
│  │                  │            └────────────────────────────┘    │
│  │ [Article List]   │                                              │
│  │                  │            ┌────────────────────────────┐    │
│  │ Click Approve    │   POST     │ /api/editor/articles/{id}  │    │
│  │ Button           ├───────────►│ /approve                   │    │
│  │                  │            │                            │    │
│  └──────────────────┘            │ ✓ Check token              │    │
│                                   │ ✓ Check role (editor)      │    │
│                                   │ ✓ Update status=approved   │    │
│                                   │ ✓ Update editor_id         │    │
│                                   │ ✓ Update editor_stats      │    │
│                                   │ ✓ Return success           │    │
│                                   └────────────────────────────┘    │
│                                                                      │
│  Result: Article status changed to "approved"                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ STEP 4: ADMIN PUBLISHES                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Frontend (React)                Backend (Express)                  │
│  ┌──────────────────┐            ┌────────────────────────────┐    │
│  │ AdminDashboard   │   GET      │ /api/admin/articles/all    │    │
│  │                  ├───────────►│                            │    │
│  │ Load Articles    │            │ Returns: [ all articles ]  │    │
│  │                  │ ◄──────────┤ (Filter status=approved)   │    │
│  │ [Article List]   │            └────────────────────────────┘    │
│  │                  │                                              │
│  │ Click Publish    │            ┌────────────────────────────┐    │
│  │ Button           │   POST     │ /api/admin/articles/{id}   │    │
│  │                  ├───────────►│ /publish                   │    │
│  │                  │            │                            │    │
│  └──────────────────┘            │ ✓ Check token              │    │
│                                   │ ✓ Check role (admin)       │    │
│                                   │ ✓ Check status=approved    │    │
│                                   │ ✓ Update status=published  │    │
│                                   │ ✓ Set publishedAt          │    │
│                                   │ ✓ Log action               │    │
│                                   │ ✓ Return success           │    │
│                                   └────────────────────────────┘    │
│                                                                      │
│  Result: Article status changed to "published"                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ STEP 5: PUBLIC READS ARTICLE                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Frontend (React)                Backend (Express)                  │
│  ┌──────────────────┐            ┌────────────────────────────┐    │
│  │ HomePage         │   GET      │ /api/articles              │    │
│  │                  ├───────────►│                            │    │
│  │ Display Articles │            │ Returns: Published only    │    │
│  │                  │ ◄──────────┤ [article1, article2, ...]  │    │
│  │ [Article List]   │            └────────────────────────────┘    │
│  │                  │                                              │
│  │ Click Article    │            ┌────────────────────────────┐    │
│  │                  │   GET      │ /api/articles/{id}         │    │
│  └──────────────────┤───────────►│                            │    │
│                                   │ ✓ Increment views counter  │    │
│  ArticleDetailPage │ ◄──────────┤ Returns: Full article      │    │
│                  │                │ with author info          │    │
│  [Article Detail]   │            └────────────────────────────┘    │
│  Title, Content,    │                                              │
│  Author, Stats      │                                              │
│                  │                                                  │
│  └──────────────────┘                                              │
│                                                                      │
│  Result: Article visible to all users                              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

This comprehensive workflow ensures:
✓ Only authors create articles
✓ Editors review before publication
✓ Admins control publishing
✓ Public only sees published articles
✓ Each step is validated and logged
