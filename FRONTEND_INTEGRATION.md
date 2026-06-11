# Frontend Integration - Updating Components

## Overview
This guide shows how to update existing frontend components to use the backend API instead of mock data.

## Key Files to Update

### 1. HomePage.jsx - Display Real Articles

**Current (Mock Data):**
```jsx
import { MOCK_ARTICLES } from '../utils/mockData';

export default function HomePage() {
  const articles = MOCK_ARTICLES;
  // ...
}
```

**Updated (Using API):**
```jsx
import { useState, useEffect } from 'react';
import { useArticles } from '../hooks/useApi';

export default function HomePage() {
  const { articles, loading, error, getAll } = useArticles();

  useEffect(() => {
    getAll(20, 0);
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

---

### 2. SearchPage.jsx - Search Real Articles

**Current (Mock Data):**
```jsx
export default function SearchPage() {
  const query = useSearchParams()[0].get('q');
  // Search mock data
}
```

**Updated (Using API):**
```jsx
import { useState, useEffect } from 'react';
import { useArticles } from '../hooks/useApi';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { articles, loading, error, search } = useArticles();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query]);

  if (loading) return <div>Đang tìm kiếm...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h1>Kết quả tìm kiếm: {query}</h1>
      {articles.length > 0 ? (
        articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <p>Không tìm thấy bài viết</p>
      )}
    </div>
  );
}
```

---

### 3. ArticleDetailPage.jsx - Get Real Article

**Current (Mock Data):**
```jsx
export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = MOCK_ARTICLES.find(a => a.id === id);
}
```

**Updated (Using API):**
```jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useArticles } from '../hooks/useApi';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { loading, error, getById } = useArticles();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getById(id);
        setArticle(data);
      } catch (err) {
        console.error('Failed to fetch article:', err);
      }
    };
    
    fetchArticle();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!article) return <div>Không tìm thấy bài viết</div>;

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
      <div>{article.content}</div>
    </article>
  );
}
```

---

### 4. LoginPage.jsx - Real Authentication

**Current (Mock):**
```jsx
export default function LoginPage() {
  const handleLogin = () => {
    // Mock login
  };
}
```

**Updated (Using API):**
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useApi';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
```

---

### 5. RegisterPage.jsx - Real Registration

**Updated (Using API):**
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useApi';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'guest'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(
        formData.email,
        formData.password,
        formData.fullName,
        formData.role
      );
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <div className="error">{error}</div>}
      
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Họ tên"
        required
      />
      
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Mật khẩu"
        required
      />
      
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="guest">Bạn đọc</option>
        <option value="author">Tác giả</option>
      </select>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
    </form>
  );
}
```

---

### 6. AuthorDashboard.jsx - Real Article Management

**Key Updates:**
```jsx
import { useEffect, useState } from 'react';
import { useAuthorArticles } from '../hooks/useApi';

export default function AuthorDashboard() {
  const { 
    articles, 
    createArticle, 
    submitArticle, 
    updateArticle, 
    deleteArticle,
    getMyArticles
  } = useAuthorArticles();

  useEffect(() => {
    getMyArticles();
  }, []);

  const handleCreateArticle = async () => {
    try {
      const response = await createArticle({
        title: 'New Article',
        content: 'Content here...',
        category: 'Technology'
      });
      // Refresh list
      getMyArticles();
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  const handleSubmitArticle = async (id) => {
    try {
      await submitArticle(id);
      getMyArticles();
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteArticle(id);
      getMyArticles();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div>
      <h1>Tác giả Dashboard</h1>
      <button onClick={handleCreateArticle}>Viết bài mới</button>
      
      <div>
        {articles.map(article => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <p>Trạng thái: {article.status}</p>
            
            {article.status === 'draft' && (
              <>
                <button onClick={() => handleSubmitArticle(article.id)}>
                  Gửi duyệt
                </button>
                <button onClick={() => handleDeleteArticle(article.id)}>
                  Xóa
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 7. EditorDashboard.jsx - Real Review Workflow

**Key Updates:**
```jsx
import { useEffect } from 'react';
import { useEditorArticles } from '../hooks/useApi';

export default function EditorDashboard() {
  const { 
    articles, 
    getPendingArticles,
    approveArticle,
    rejectArticle,
    getStats
  } = useEditorArticles();

  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    if (activeTab === 'pending') {
      getPendingArticles();
    }
  }, [activeTab]);

  const handleApprove = async (id) => {
    try {
      await approveArticle(id);
      getPendingArticles();
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  const handleReject = async (id, reason) => {
    try {
      await rejectArticle(id, reason);
      getPendingArticles();
    } catch (error) {
      console.error('Failed to reject:', error);
    }
  };

  return (
    <div>
      <h1>Biên tập viên Dashboard</h1>
      
      <button onClick={() => setActiveTab('pending')}>
        Bài chờ duyệt
      </button>
      
      {activeTab === 'pending' && (
        <div>
          {articles.map(article => (
            <div key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              
              <button 
                onClick={() => handleApprove(article.id)}
              >
                Duyệt
              </button>
              
              <button 
                onClick={() => {
                  const reason = prompt('Lý do từ chối:');
                  if (reason) handleReject(article.id, reason);
                }}
              >
                Từ chối
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 8. AdminDashboard.jsx - Real System Management

**Key Updates:**
```jsx
import { useEffect, useState } from 'react';
import { useAdmin } from '../hooks/useApi';

export default function AdminDashboard() {
  const { 
    getAllArticles,
    publishArticle,
    getUsers,
    getStats,
    updateUserRole
  } = useAdmin();

  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [articlesData, usersData, statsData] = await Promise.all([
          getAllArticles(50, 0),
          getUsers(50, 0),
          getStats()
        ]);
        
        setArticles(articlesData);
        setUsers(usersData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };

    loadData();
  }, []);

  const handlePublish = async (id) => {
    try {
      await publishArticle(id);
      // Refresh
      const updated = await getAllArticles();
      setArticles(updated);
    } catch (error) {
      console.error('Failed to publish:', error);
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      // Refresh
      const updated = await getUsers();
      setUsers(updated);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {stats && (
        <div>
          <p>Tổng bài viết: {stats.totalArticles}</p>
          <p>Bài đã xuất bản: {stats.publishedArticles}</p>
          <p>Tổng người dùng: {stats.totalUsers}</p>
        </div>
      )}

      <h2>Bài viết</h2>
      {articles.map(article => (
        <div key={article.id}>
          <h3>{article.title}</h3>
          {article.status === 'approved' && (
            <button onClick={() => handlePublish(article.id)}>
              Xuất bản
            </button>
          )}
        </div>
      ))}

      <h2>Người dùng</h2>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.fullName} ({user.role})</p>
          <select 
            value={user.role}
            onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
          >
            <option value="guest">Bạn đọc</option>
            <option value="author">Tác giả</option>
            <option value="editor">Biên tập</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}
```

---

## Common Patterns

### 1. Loading State
```jsx
const { articles, loading, error, getAll } = useArticles();

if (loading) return <LoadingSpinner />;
if (error) return <ErrorAlert message={error} />;
```

### 2. Error Handling
```jsx
const handleAction = async () => {
  try {
    const response = await someAPI();
    // Success
  } catch (error) {
    setErrorMessage(error.message);
    // Show error to user
  }
};
```

### 3. Refresh After Action
```jsx
const handleCreate = async (data) => {
  try {
    await createArticle(data);
    await getMyArticles(); // Refresh list
  } catch (error) {
    console.error(error);
  }
};
```

### 4. Pagination
```jsx
const handleLoadMore = async () => {
  const newArticles = await getAll(20, offset + 20);
  setArticles([...articles, ...newArticles]);
  setOffset(offset + 20);
};
```

### 5. Conditional Rendering
```jsx
{user && user.role === 'admin' && (
  <AdminPanel />
)}

{article.status === 'draft' && (
  <button onClick={() => submitArticle(article.id)}>
    Gửi duyệt
  </button>
)}
```

## Testing the Integration

### 1. Start Development Environment
```bash
npm run dev
```

### 2. Test Login (Use seeded account)
```
Email: author1@baorong.com
Password: password123
```

### 3. Create Article (Author)
1. Login as author
2. Go to `/author`
3. Write article
4. Submit for review

### 4. Review Article (Editor)
1. Login as editor
2. Go to `/editor`
3. View pending articles
4. Approve or reject

### 5. Publish Article (Admin)
1. Login as admin
2. Go to `/admin`
3. Publish approved articles

## Best Practices

1. **Always use hooks** for API calls
2. **Handle errors gracefully** with user-friendly messages
3. **Show loading states** for better UX
4. **Refresh data** after mutations
5. **Validate inputs** before sending
6. **Use try-catch** for async operations
7. **Clear sensitive data** on logout
8. **Test with real data** before production

## Common Issues & Solutions

### Issue: "Token not found" error
**Solution:** User needs to login first
```jsx
const { user } = useAuth();
if (!user) return <Redirect to="/login" />;
```

### Issue: API returns 403 Forbidden
**Solution:** User doesn't have required role
```jsx
// Verify user role before action
if (user.role !== 'editor') {
  return <p>Access denied</p>;
}
```

### Issue: Data not refreshing
**Solution:** Call refresh function after mutation
```jsx
await createArticle(data);
await getMyArticles(); // Always refresh
```

### Issue: Slow performance
**Solution:** Add pagination and caching
```jsx
const [articles, setArticles] = useState([]);
useEffect(() => {
  getAll(20, 0); // Only load first 20
}, []);
```
