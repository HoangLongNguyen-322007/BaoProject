import { Link } from 'react-router-dom';
import { MOCK_ARTICLES, getTimeAgo } from '../../utils/mockData';
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
   // Data slices
   const heroArticle = MOCK_ARTICLES[0];
   const midArticles = MOCK_ARTICLES.slice(1, 5);
   const latestNews = MOCK_ARTICLES.slice(0, 5);
   const thoisuArticles = MOCK_ARTICLES.filter((a) => a.category === 'thoisu').slice(0, 4);
   const techFeatured = MOCK_ARTICLES.find((a) => a.techFeatured);
   const techSmall = MOCK_ARTICLES.filter((a) => a.category === 'technology' && !a.techFeatured).slice(0, 2);

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
                           src={heroArticle.image}
                           alt={heroArticle.title}
                           className={styles.heroImage}
                        />
                        <div className={styles.heroOverlay}>
                           <span className={styles.hotBadge}>NỔI BẬT</span>
                           <h2 className={styles.heroTitle}>{heroArticle.title}</h2>
                           <p className={styles.heroExcerpt}>{heroArticle.excerpt}</p>
                           <div className={styles.heroMeta}>
                              <TimeAgo date={heroArticle.date} />
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
                              src={article.image}
                              alt={article.title}
                              className={styles.midImage}
                              loading="lazy"
                           />
                           <div className={styles.midContent}>
                              <h3 className={styles.midTitle}>{article.title}</h3>
                              <div className={styles.midMeta}>
                                 <TimeAgo date={article.date} />
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
                              <TimeAgo date={article.date} />
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
                                 src={article.image}
                                 alt={article.title}
                                 className={styles.thoisuImg}
                                 loading="lazy"
                              />
                              <div className={styles.thoisuContent}>
                                 <h3 className={styles.thoisuTitle}>{article.title}</h3>
                                 <p className={styles.thoisuExcerpt}>{article.excerpt}</p>
                                 <div className={styles.thoisuMeta}>
                                    <TimeAgo date={article.date} />
                                    <CatBadge categoryId={article.category} small />
                                 </div>
                              </div>
                           </Link>
                        ))}
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
                     {techFeatured && (
                        <Link
                           to={`/article/${techFeatured.id}`}
                           className={styles.techBig}
                           id="tech-featured"
                        >
                           <img
                              src={techFeatured.image}
                              alt={techFeatured.title}
                              className={styles.techBigImg}
                              loading="lazy"
                           />
                           <div className={styles.techBigOverlay}>
                              <h3 className={styles.techBigTitle}>{techFeatured.title}</h3>
                              <TimeAgo date={techFeatured.date} />
                           </div>
                        </Link>
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
                                 src={article.image}
                                 alt={article.title}
                                 className={styles.techSmallImg}
                                 loading="lazy"
                              />
                              <div className={styles.techSmallContent}>
                                 <h4 className={styles.techSmallTitle}>{article.title}</h4>
                                 <TimeAgo date={article.date} />
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
