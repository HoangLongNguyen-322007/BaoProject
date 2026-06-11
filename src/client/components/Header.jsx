import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const NAV_ITEMS = [
   { label: 'Trang Chủ', path: '/', id: 'home' },
   { label: 'Thời Sự', path: '/category/thoisu', id: 'thoisu' },
   { label: 'Thế Giới', path: '/category/thegioi', id: 'thegioi' },
   { label: 'Kinh Doanh', path: '/category/business', id: 'business' },
   { label: 'Công Nghệ', path: '/category/technology', id: 'technology' },
   { label: 'Thể Thao', path: '/category/sports', id: 'sports' },
   { label: 'Giải Trí', path: '/category/entertainment', id: 'entertainment' },
   { label: 'Sức Khỏe', path: '/category/health', id: 'health' },
   { label: 'Giáo Dục', path: '/category/education', id: 'education' },
   { label: 'Đời Sống', path: '/category/lifestyle', id: 'lifestyle' },
];

function Header() {
   const location = useLocation();
   const [searchQuery, setSearchQuery] = useState('');
   const [menuOpen, setMenuOpen] = useState(false);
   const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
   });

   useEffect(() => {
      const handleAuthChange = () => {
         const savedUser = localStorage.getItem('user');
         setUser(savedUser ? JSON.parse(savedUser) : null);
      };

      window.addEventListener('auth-change', handleAuthChange);
      return () => {
         window.removeEventListener('auth-change', handleAuthChange);
      };
   }, []);

   const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      }
   };

   return (
      <header className={styles.header}>
         {/* Top Bar */}
         <div className={styles.topBar}>
            <div className={styles.container}>
               <div className={styles.topRow}>
                  {/* Logo */}
                  <Link to="/" className={styles.logo} aria-label="Rồng Vàng - Trang chủ">
                     <div className={styles.logoIcon}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <circle cx="24" cy="24" r="23" stroke="#C9A227" strokeWidth="2" fill="#1A1A1A"/>
                           <text x="24" y="31" textAnchor="middle" fontSize="22" fill="#C9A227" fontFamily="serif" fontWeight="bold">龍</text>
                        </svg>
                     </div>
                     <div className={styles.logoText}>
                        <span className={styles.logoTitle}>RỒNG VÀNG</span>
                        <span className={styles.logoSub}>— BÁO ĐIỆN TỬ —</span>
                     </div>
                  </Link>

                  {/* Search */}
                  <form className={styles.searchForm} onSubmit={handleSearch} role="search">
                     <input
                        id="header-search"
                        type="search"
                        className={styles.searchInput}
                        placeholder="Tìm kiếm tin tức..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Tìm kiếm tin tức"
                     />
                     <button type="submit" className={styles.searchBtn} aria-label="Tìm kiếm">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <circle cx="11" cy="11" r="8"/>
                           <path d="m21 21-4.35-4.35"/>
                        </svg>
                     </button>
                  </form>

                  {/* Right: Weather + Auth */}
                  <div className={styles.topRight}>
                     <div className={styles.weather}>
                        <span className={styles.weatherIcon}>⛅</span>
                        <div className={styles.weatherInfo}>
                           <span className={styles.weatherCity}>Hà Nội</span>
                           <span className={styles.weatherTemp}>28°C</span>
                        </div>
                     </div>
                     {user ? (
                        <Link to="/profile" className={styles.userInfo} id="header-profile-link">
                           <div className={styles.avatarWrapper}>
                              {user.avatar ? (
                                 <img src={user.avatar} className={styles.userAvatar} alt="Avatar" />
                              ) : (
                                 <div className={styles.avatarPlaceholder}>
                                    {user.name ? user.name.charAt(0) : 'U'}
                                  </div>
                              )}
                           </div>
                           <span className={styles.userName}>{user.name}</span>
                        </Link>
                     ) : (
                        <>
                           <Link to="/login" className={styles.btnLogin} id="btn-login">Đăng nhập</Link>
                           <Link to="/register" className={styles.btnRegister} id="btn-register">Đăng ký</Link>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Nav Bar */}
         <nav className={styles.navBar} aria-label="Navigation chính">
            <div className={styles.container}>
               <div className={styles.navRow}>
                  {NAV_ITEMS.map((item) => {
                     const isActive = location.pathname === item.path ||
                        (item.path !== '/' && location.pathname.startsWith(item.path));
                     return (
                        <Link
                           key={item.id}
                           to={item.path}
                           id={`nav-${item.id}`}
                           className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                        >
                           {item.id === 'home' && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '4px', verticalAlign: 'middle'}}>
                                 <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                              </svg>
                           )}
                           {item.label}
                        </Link>
                     );
                  })}
                  <button
                     className={styles.menuToggle}
                     onClick={() => setMenuOpen(!menuOpen)}
                     aria-label="Thêm danh mục"
                     id="btn-menu-toggle"
                  >
                     <span></span><span></span><span></span>
                  </button>
               </div>
            </div>
         </nav>
      </header>
   );
}

export default Header;
