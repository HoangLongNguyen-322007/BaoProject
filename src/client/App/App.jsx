import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
import SearchPage from '../pages/SearchPage';
import CategoryPage from '../pages/CategoryPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileEditPage from '../pages/ProfileEditPage';
import AuthorDashboard from '../pages/author/AuthorDashboard';
import EditorDashboard from '../pages/editor/EditorDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { tokenStorage } from '../../utils/api';
import './App.css';

// Auth routes that should NOT show the header
const AUTH_ROUTES = ['/login', '/register'];

// Route Guard Component
function ProtectedRoute({ children, allowedRoles }) {
   const user = tokenStorage.getUser();

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   if (allowedRoles && !allowedRoles.includes(user.role)) {
      return (
         <div style={{ maxWidth: '1280px', margin: '6rem auto', padding: '3rem 2rem', color: 'var(--text-primary)', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: '8px' }}>
            <h1 style={{ color: '#ff4757', marginBottom: '1rem' }}>🚫 Quyền truy cập bị từ chối</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Tài khoản của bạn không có quyền xem trang này.</p>
            <a href="/" style={{ display: 'inline-block', padding: '0.6rem 1.5rem', background: 'var(--gold-primary)', color: 'var(--text-white)', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px' }}>
               Quay lại Trang chủ
            </a>
         </div>
      );
   }

   return children;
}

function AppLayout() {
   const location = useLocation();
   const isAuthPage = AUTH_ROUTES.includes(location.pathname);

   return (
      <div id="app-shell">
         {!isAuthPage && <Header />}
         <main>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/article/:id" element={<ArticleDetailPage />} />
               <Route path="/search" element={<SearchPage />} />
               <Route path="/category/:category" element={<CategoryPage />} />

               <Route
                  path="/profile"
                  element={
                     <ProtectedRoute>
                        <ProfileEditPage />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/author"
                  element={
                     <ProtectedRoute allowedRoles={['author']}>
                        <AuthorDashboard />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/editor"
                  element={
                     <ProtectedRoute allowedRoles={['editor']}>
                        <EditorDashboard />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/admin"
                  element={
                     <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                     </ProtectedRoute>
                  }
               />

               <Route
                  path="*"
                  element={
                     <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', color: 'var(--text-primary)' }}>
                        <h1>404 - Không tìm thấy trang</h1>
                     </div>
                  }
               />
            </Routes>
         </main>
      </div>
   );
}

function App() {
   return (
      <Router>
         <AppLayout />
      </Router>
   );
}

export default App;
