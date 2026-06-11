import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import ArticleDetailPage from '../pages/ArticleDetailPage';
import SearchPage from '../pages/SearchPage';
import CategoryPage from '../pages/CategoryPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfileEditPage from '../pages/ProfileEditPage';
import './App.css';

// Auth routes that should NOT show the header
const AUTH_ROUTES = ['/login', '/register'];

function AppLayout() {
   const location = useLocation();
   const isAuthPage = AUTH_ROUTES.includes(location.pathname);

   return (
      <>
         {!isAuthPage && <Header />}
         <main>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage />} />
               <Route path="/article/:id" element={<ArticleDetailPage />} />
               <Route path="/search" element={<SearchPage />} />
               <Route path="/category/:category" element={<CategoryPage />} />
               <Route path="/profile" element={<ProfileEditPage />} />
               <Route
                  path="*"
                  element={
                     <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', color: '#E8E8E8' }}>
                        <h1>404 - Không tìm thấy trang</h1>
                     </div>
                  }
               />
            </Routes>
         </main>
      </>
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
