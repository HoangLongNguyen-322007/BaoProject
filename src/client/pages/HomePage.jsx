import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articlesAPI } from '../../utils/api';
import { CATEGORY_MAP } from '../../constant/global';
import styles from './HomePage.module.css';

// Category badge
function CatBadge({ categoryId, small = false }) {
   const cat = CATEGORY_MAP[categoryId] || { name: categoryId, color: '#888' };
   return (
      <span
         className={`${styles.catBadge} ${small ? styles.catBadgeSmall : ''}`}
         style={{ background: cat.color }}
      >
         {cat.name}
      </span>
   );
}

// Time helper function for fetched dates
const getTimeAgo = (dateStr) => {
   const date = new Date(dateStr);
   const now = new Date();
   const diffMs = now - date;
   const diffMins = Math.floor(diffMs / 60000);
   const diffHours = Math.floor(diffMins / 60);
   if (diffMins < 60) return `${diffMins} phút trước`;
   if (diffHours < 24) return `${diffHours} giờ trước`;
   return `${Math.floor(diffHours / 24)} ngày trước`;
};

// Time display
function TimeAgo({ date }) {
   return (
      <span className={styles.timeAgo}>
         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
         </svg>
         {getTimeAgo(date)}
      </span>
   );
}

function HomePage() {
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchArticles = async () => {
         try {
            const data = await articlesAPI.getAll(20, 0);
            setArticles(data);
            setLoading(false);
         } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            setLoading(false);
         }
      };

      fetchArticles();
   }, []);

   if (loading) {
      return (
         <div className={styles.homePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loading-spinner" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>
               Đang tải bài viết...
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className={styles.homePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'red' }}>
            {error}
         </div>
      );
   }

   if (!articles || articles.length === 0) {
      return (
         <div className={styles.homePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            Chưa có bài viết nào được xuất bản.
         </div>
      );
   }

   // Data slices from real API data
   const heroArticle = articles[0];
   const midArticles = articles.slice(1, 5);
   const latestNews = articles.slice(0, 5);
   const thoisuArticles = articles.filter((a) => a.category === 'thoisu').slice(0, 4);
   
   // We don't have techFeatured in DB, so we just pick the first technology article as featured if available
   const techArticles = articles.filter((a) => a.category === 'technology');
   const techFeatured = techArticles.length > 0 ? techArticles[0] : null;
   const techSmall = techFeatured ? techArticles.slice(1, 3) : techArticles.slice(0, 2);

   return (
      <div className={styles.homePage}>
         {/* ========== HERO SECTION ========== */}
         <section className={styles.heroSection} aria-label="Tin nổi bật">
            <div className={styles.container}>
               <div className={styles.heroGrid}>
                  {/* Left: Hero Card */}
                  <div className={styles.heroLeft}>
                     <Link to={`/article/${heroArticle.id}`} className={styles.heroCard} id="hero-main-article">
                        <img
                           src={heroArticle.image || 'https://via.placeholder.com/800x600?text=No+Image'}
                           alt={heroArticle.title}
                           className={styles.heroImage}
                        />
                        <div className={styles.heroOverlay}>
                           <span className={styles.hotBadge}>NỔI BẬT</span>
                           <h2 className={styles.heroTitle}>{heroArticle.title}</h2>
                           <p className={styles.heroExcerpt}>{heroArticle.excerpt}</p>
                           <div className={styles.heroMeta}>
                              <TimeAgo date={heroArticle.publishedAt || heroArticle.createdAt} />
                              <CatBadge categoryId={heroArticle.category} />
                           </div>
                        </div>
                     </Link>
                  </div>

                  {/* Mid: Article List */}
                  <div className={styles.heroMid}>
                     {midArticles.map((article) => (
                        <Link
                           key={article.id}
                           to={`/article/${article.id}`}
                           className={styles.midCard}
                           id={`mid-article-${article.id}`}
                        >
                           <img
                              src={article.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                              alt={article.title}
                              className={styles.midImage}
                              loading="lazy"
                           />
                           <div className={styles.midContent}>
                              <h3 className={styles.midTitle}>{article.title}</h3>
                              <div className={styles.midMeta}>
                                 <TimeAgo date={article.publishedAt || article.createdAt} />
                                 <CatBadge categoryId={article.category} small />
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>

                  {/* Right: Latest News Sidebar */}
                  <aside className={styles.heroRight} aria-label="Tin mới nhất">
                     <div className={styles.sidebarHeader}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-primary)">
                           <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                        </svg>
                        <h2 className={styles.sidebarTitle}>TIN MỚI NHẤT</h2>
                     </div>
                     <div className={styles.latestList}>
                        {latestNews.map((article, idx) => (
                           <Link
                              key={article.id}
                              to={`/article/${article.id}`}
                              className={styles.latestItem}
                              id={`latest-${idx + 1}`}
                           >
                              <h4 className={styles.latestTitle}>{article.title}</h4>
                              <TimeAgo date={article.publishedAt || article.createdAt} />
                           </Link>
                        ))}
                     </div>
                     <Link to="/latest" className={styles.viewAllBtn} id="btn-view-all-latest">
                        Xem tất cả <span>→</span>
                     </Link>
                  </aside>
               </div>
            </div>
         </section>

         {/* ========== DIVIDER ========== */}
         <div className={styles.divider} />

         {/* ========== MAIN CONTENT SECTIONS ========== */}
         <section className={styles.mainSections} aria-label="Tin tức theo chuyên mục">
            <div className={styles.container}>
               <div className={styles.sectionsGrid}>
                  {/* --- THỜI SỰ --- */}
                  <div className={styles.thoisuSection}>
                     <div className={styles.sectionHead}>
                        <div className={styles.sectionHeadLeft}>
                           <span className={styles.sectionIcon}>📰</span>
                           <h2 className={styles.sectionName}>THỜI SỰ</h2>
                        </div>
                        <Link to="/category/thoisu" className={styles.viewAll} id="btn-view-all-thoisu">
                           Xem tất cả →
                        </Link>
                     </div>
                     <div className={styles.thoisuList}>
                        {thoisuArticles.map((article) => (
                           <Link
                              key={article.id}
                              to={`/article/${article.id}`}
                              className={styles.thoisuItem}
                              id={`thoisu-${article.id}`}
                           >
                              <img
                                 src={article.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                                 alt={article.title}
                                 className={styles.thoisuImg}
                                 loading="lazy"
                              />
                              <div className={styles.thoisuContent}>
                                 <h3 className={styles.thoisuTitle}>{article.title}</h3>
                                 <p className={styles.thoisuExcerpt}>{article.excerpt}</p>
                                 <div className={styles.thoisuMeta}>
                                    <TimeAgo date={article.publishedAt || article.createdAt} />
                                    <CatBadge categoryId={article.category} small />
                                 </div>
                              </div>
                           </Link>
                        ))}
                        {thoisuArticles.length === 0 && (
                           <p style={{ color: '#888' }}>Chưa có bài viết Thời sự nào.</p>
                        )}
                     </div>
                  </div>

                  {/* --- CÔNG NGHỆ --- */}
                  <div className={styles.congngheSection}>
                     <div className={styles.sectionHead}>
                        <div className={styles.sectionHeadLeft}>
                           <span className={styles.sectionIcon}>💻</span>
                           <h2 className={styles.sectionName}>CÔNG NGHỆ</h2>
                        </div>
                        <Link to="/category/technology" className={styles.viewAll} id="btn-view-all-congnghe">
                           Xem tất cả →
                        </Link>
                     </div>
                     {/* Big Tech Card */}
                     {techFeatured ? (
                        <Link
                           to={`/article/${techFeatured.id}`}
                           className={styles.techBig}
                           id="tech-featured"
                        >
                           <img
                              src={techFeatured.image || 'https://via.placeholder.com/600x400?text=No+Image'}
                              alt={techFeatured.title}
                              className={styles.techBigImg}
                              loading="lazy"
                           />
                           <div className={styles.techBigOverlay}>
                              <h3 className={styles.techBigTitle}>{techFeatured.title}</h3>
                              <TimeAgo date={techFeatured.publishedAt || techFeatured.createdAt} />
                           </div>
                        </Link>
                     ) : (
                        <p style={{ color: '#888', marginBottom: '1rem' }}>Chưa có bài viết Công nghệ nào.</p>
                     )}
                     {/* Small Tech Cards */}
                     <div className={styles.techSmallList}>
                        {techSmall.map((article) => (
                           <Link
                              key={article.id}
                              to={`/article/${article.id}`}
                              className={styles.techSmallItem}
                              id={`tech-${article.id}`}
                           >
                              <img
                                 src={article.image || 'https://via.placeholder.com/150x150?text=No+Image'}
                                 alt={article.title}
                                 className={styles.techSmallImg}
                                 loading="lazy"
                              />
                              <div className={styles.techSmallContent}>
                                 <h4 className={styles.techSmallTitle}>{article.title}</h4>
                                 <TimeAgo date={article.publishedAt || article.createdAt} />
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* ========== VALUES STRIP ========== */}
         <footer className={styles.valuesStrip} aria-label="Giá trị cốt lõi">
            <div className={styles.container}>
               <div className={styles.valuesGrid}>
                  {[
                     { icon: '👥', title: 'ĐỘC GIẢ', sub: 'LÀ TRÊN HẾT' },
                     { icon: '🛡️', title: 'TIN CẬY', sub: 'VÀ CHÍNH XÁC' },
                     { icon: '⚡', title: 'NHANH CHÓNG', sub: 'VÀ KỊP THỜI' },
                     { icon: '❤️', title: 'NHÂN VĂN', sub: 'VÀ TRÁCH NHIỆM' },
                  ].map((val, i) => (
                     <div key={i} className={styles.valueItem}>
                        <span className={styles.valueIcon}>{val.icon}</span>
                        <div className={styles.valueText}>
                           <span className={styles.valueTitle}>{val.title}</span>
                           <span className={styles.valueSub}>{val.sub}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </footer>
      </div>
   );
}

export default HomePage;

