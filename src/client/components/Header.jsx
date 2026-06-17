import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import { CATEGORIES } from '../../constant/global';

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
   { label: 'Du Lịch', path: '/category/travel', id: 'travel' },
];

function Header() {
   const location = useLocation();
   const [searchQuery, setSearchQuery] = useState('');
   const [suggestions, setSuggestions] = useState({ articles: [], tags: [] });
   const [isLoading, setIsLoading] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const searchRef = useRef(null);

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

   // Handle click outside to close dropdown
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowDropdown(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   // Debounce search
   useEffect(() => {
      const fetchSuggestions = async () => {
         if (!searchQuery.trim()) {
            setSuggestions({ articles: [], tags: [] });
            setShowDropdown(false);
            return;
         }

         setIsLoading(true);
         setShowDropdown(true);

         try {
            const res = await fetch(`/api/articles/search/suggestions/${encodeURIComponent(searchQuery.trim())}`);
            if (res.ok) {
               const data = await res.json();
               setSuggestions(data);
            }
         } catch (err) {
            console.error('Failed to fetch suggestions:', err);
         } finally {
            setIsLoading(false);
         }
      };

      const delayDebounceFn = setTimeout(() => {
         fetchSuggestions();
      }, 300);

      return () => clearTimeout(delayDebounceFn);
   }, [searchQuery]);

   const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
         setShowDropdown(false);
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
                        <img alt="icon" src="../../../logo512.png"></img>
                     </div>
                     <div className={styles.logoText}>
                        <span className={styles.logoTitle}>RỒNG VÀNG</span>
                        <span className={styles.logoSub}>— BÁO ĐIỆN TỬ —</span>
                     </div>
                  </Link>

                  {/* Search */}
                  <div className={styles.searchWrapper} ref={searchRef}>
                     <form className={styles.searchForm} onSubmit={handleSearch} role="search">
                        <input
                           id="header-search"
                           type="search"
                           className={styles.searchInput}
                           placeholder="Tìm kiếm tin tức..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onFocus={() => { if(searchQuery.trim()) setShowDropdown(true); }}
                           aria-label="Tìm kiếm tin tức"
                           autoComplete="off"
                        />
                        <button type="submit" className={styles.searchBtn} aria-label="Tìm kiếm">
                           <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                           >
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.35-4.35" />
                           </svg>
                        </button>
                     </form>

                     {/* Search Suggestions Dropdown */}
                     {showDropdown && (
                        <div className={styles.searchDropdown}>
                           {isLoading ? (
                              <div className={styles.dropdownMessage}>Đang tìm kiếm...</div>
                           ) : suggestions.tags.length === 0 && suggestions.articles.length === 0 ? (
                              <div className={styles.dropdownMessage}>Không tìm thấy kết quả phù hợp</div>
                           ) : (
                              <>
                                 {suggestions.tags.length > 0 && (
                                    <div className={styles.suggestionSection}>
                                       <h4 className={styles.suggestionHeader}>Từ khóa liên quan</h4>
                                       <div className={styles.tagList}>
                                          {suggestions.tags.map((tag, idx) => (
                                             <Link 
                                                key={idx} 
                                                to={`/search?q=${encodeURIComponent(tag)}`}
                                                className={styles.suggestionTag}
                                                onClick={() => { setSearchQuery(tag); setShowDropdown(false); }}
                                             >
                                                # {tag}
                                             </Link>
                                          ))}
                                       </div>
                                    </div>
                                 )}

                                 {suggestions.articles.length > 0 && (
                                    <div className={styles.suggestionSection}>
                                       <h4 className={styles.suggestionHeader}>Bài viết đề xuất</h4>
                                       <div className={styles.articleList}>
                                          {suggestions.articles.map(article => (
                                             <Link 
                                                key={article.id} 
                                                to={`/article/${article.id}`}
                                                className={styles.suggestionArticle}
                                                onClick={() => setShowDropdown(false)}
                                             >
                                                <div className={styles.suggestionImageWrapper}>
                                                   <img src={article.image || 'https://via.placeholder.com/50x50?text=News'} alt={article.title} className={styles.suggestionImage} />
                                                </div>
                                                <div className={styles.suggestionArticleInfo}>
                                                   <span className={styles.suggestionArticleTitle}>{article.title}</span>
                                                   <span className={styles.suggestionArticleCat}>
                                                      {article.category.toUpperCase()}
                                                   </span>
                                                </div>
                                             </Link>
                                          ))}
                                       </div>
                                    </div>
                                 )}
                              </>
                           )}
                        </div>
                     )}
                  </div>

                  {/* Right: Weather + Auth + ThemeToggle */}
                  <div className={styles.topRight}>
                     <ThemeToggle />
                     <div className={styles.weather}>
                        <span className={styles.weatherIcon}>⛅</span>
                        <div className={styles.weatherInfo}>
                           <span className={styles.weatherCity}>Hà Nội</span>
                           <span className={styles.weatherTemp}>28°C</span>
                        </div>
                     </div>
                     {user ? (
                        <div className={styles.userMenu}>
                           <Link to="/profile" className={styles.userInfo} id="header-profile-link">
                              <div className={styles.avatarWrapper}>
                                 {user.avatar ? (
                                    <img src={user.avatar} className={styles.userAvatar} alt="Avatar" />
                                 ) : (
                                    <div className={styles.avatarPlaceholder}>
                                       {user.fullName ? user.fullName.charAt(0) : 'U'}
                                     </div>
                                 )}
                              </div>
                              <span className={styles.userName}>{user.fullName}</span>
                           </Link>
                           
                           {user.role === 'author' && (
                              <Link to="/author" className={styles.authorLink} id="header-author-link" title="Quản lý bài viết">
                                 ✍️
                              </Link>
                           )}
                           {user.role === 'editor' && (
                              <Link to="/editor" className={styles.editorLink} id="header-editor-link" title="Duyệt bài viết">
                                 📋
                              </Link>
                           )}
                           {user.role === 'admin' && (
                              <Link to="/admin" className={styles.adminLink} id="header-admin-link" title="Quản lý hệ thống">
                                 ⚙️
                              </Link>
                           )}
                           
                           <button 
                              onClick={() => {
                                 localStorage.removeItem('auth_token');
                                 localStorage.removeItem('user');
                                 window.location.href = '/';
                              }} 
                              className={styles.btnLogout} 
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                              title="Đăng xuất"
                           >
                              🚪
                           </button>
                        </div>
                     ) : (
                        <>
                           <Link to="/login" className={styles.btnLogin} id="btn-login">
                              Đăng nhập
                           </Link>
                           <Link to="/register" className={styles.btnRegister} id="btn-register">
                              Đăng ký
                           </Link>
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
                     const isActive =
                        location.pathname === item.path ||
                        (item.path !== '/' && location.pathname.startsWith(item.path));
                     return (
                        <Link
                           key={item.id}
                           to={item.path}
                           id={`nav-${item.id}`}
                           className={`${styles.navLink} ${isActive ? styles.navActive : ''}`}
                        >
                           {item.id === 'home' && (
                              <svg
                                 width="14"
                                 height="14"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 style={{ marginRight: '4px', verticalAlign: 'middle' }}
                              >
                                 <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
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
                     <span></span>
                     <span></span>
                     <span></span>
                  </button>
               </div>
            </div>
         </nav>

         {/* Mega Menu Overlay */}
         <div className={`${styles.megaMenuOverlay} ${menuOpen ? styles.megaMenuOpen : ''}`}>
            <div className={styles.megaMenuContainer}>
               <h3 className={styles.megaMenuTitle}>TẤT CẢ CHUYÊN MỤC</h3>
               <div className={styles.megaMenuGrid}>
                  {CATEGORIES.map(cat => (
                     <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className={styles.megaMenuItem}
                        onClick={() => setMenuOpen(false)}
                     >
                        <span className={styles.megaMenuColor} style={{ backgroundColor: cat.color }}></span>
                        {cat.name}
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
