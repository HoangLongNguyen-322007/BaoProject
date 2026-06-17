import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articlesAPI, recommendationAPI, tokenStorage } from '../../utils/api';
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
   if (diffMs < 60000) return 'Vừa xong';
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

// ---- Reusable Category Section with Featured + List layout ----
function CategorySection({ title, icon, slug, articles, accentColor }) {
   if (!articles || articles.length === 0) return null;
   const featured = articles[0];
   const list = articles.slice(1, 5);

   return (
      <div className={styles.categorySection} style={{ '--section-accent': accentColor }}>
         <div className={styles.sectionHead}>
            <div className={styles.sectionHeadLeft}>
               <span className={styles.sectionIcon}>{icon}</span>
               <h2 className={styles.sectionName}>{title}</h2>
            </div>
            <Link to={`/category/${slug}`} className={styles.viewAll} id={`btn-view-all-${slug}`}>
               Xem tất cả →
            </Link>
         </div>
         <div className={styles.catSectionBody}>
            {/* Featured big card */}
            <Link to={`/article/${featured.id}`} className={styles.catFeatured} id={`${slug}-featured`}>
               <img
                  src={featured.image || 'https://via.placeholder.com/600x400?text=No+Image'}
                  alt={featured.title}
                  className={styles.catFeaturedImg}
                  loading="lazy"
               />
               <div className={styles.catFeaturedOverlay}>
                  <h3 className={styles.catFeaturedTitle}>{featured.title}</h3>
                  <p className={styles.catFeaturedExcerpt}>{featured.excerpt}</p>
                  <TimeAgo date={featured.publishedAt || featured.createdAt} />
               </div>
            </Link>
            {/* List of small articles */}
            {list.length > 0 && (
               <div className={styles.catList}>
                  {list.map((article) => (
                     <Link key={article.id} to={`/article/${article.id}`} className={styles.catListItem}>
                        <img
                           src={article.image || 'https://via.placeholder.com/150x100?text=No+Image'}
                           alt={article.title}
                           className={styles.catListImg}
                           loading="lazy"
                        />
                        <div className={styles.catListContent}>
                           <h4 className={styles.catListTitle}>{article.title}</h4>
                           <TimeAgo date={article.publishedAt || article.createdAt} />
                        </div>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}

// ---- Horizontal article strip for a category ----
function HorizontalSection({ title, icon, slug, articles, accentColor }) {
   if (!articles || articles.length === 0) return null;

   return (
      <div className={styles.horizSection}>
         <div className={styles.sectionHead}>
            <div className={styles.sectionHeadLeft}>
               <span className={styles.sectionIcon}>{icon}</span>
               <h2 className={styles.sectionName}>{title}</h2>
            </div>
            <Link to={`/category/${slug}`} className={styles.viewAll} id={`btn-view-all-${slug}`}>
               Xem tất cả →
            </Link>
         </div>
         <div className={styles.horizGrid}>
            {articles.slice(0, 8).map((article) => (
               <Link key={article.id} to={`/article/${article.id}`} className={styles.horizCard}>
                  <div className={styles.horizImgWrap}>
                     <img
                        src={article.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                        alt={article.title}
                        className={styles.horizImg}
                        loading="lazy"
                     />
                     <CatBadge categoryId={article.category} small />
                  </div>
                  <div className={styles.horizContent}>
                     <h3 className={styles.horizTitle}>{article.title}</h3>
                     <p className={styles.horizExcerpt}>{article.excerpt}</p>
                     <TimeAgo date={article.publishedAt || article.createdAt} />
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}

function HomePage() {
   const [articles, setArticles] = useState([]);
   const [recommendations, setRecommendations] = useState([]);
   const [dailyHighlights, setDailyHighlights] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const loggedInUser = tokenStorage.getUser();

   useEffect(() => {
      const fetchArticles = async () => {
         try {
            const data = await articlesAPI.getAll(60, 0);
            setArticles(data);

            // Fetch personalized recommendations or popular
            try {
               if (loggedInUser) {
                  const recs = await recommendationAPI.getRecommendations(8);
                  setRecommendations(recs);
               } else {
                  const popular = await recommendationAPI.getPopular(8);
                  setRecommendations(popular);
               }
            } catch (recErr) {
               console.error('Recommendations error:', recErr);
            }

            // Fetch daily highlights
            try {
               const daily = await recommendationAPI.getDaily(8);
               setDailyHighlights(daily);
            } catch (dailyErr) {
               console.error('Daily highlights error:', dailyErr);
            }

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
   const latestNews = articles.slice(0, 8);

   // Category filters
   const byCat = (cat) => articles.filter((a) => a.category === cat);
   const thoisuArticles = byCat('thoisu');
   const techArticles = byCat('technology');
   const sportsArticles = byCat('sports');
   const entertainmentArticles = byCat('entertainment');
   const businessArticles = byCat('business');
   const theGioiArticles = byCat('thegioi');
   const healthArticles = byCat('health');
   const educationArticles = byCat('education');
   const travelArticles = byCat('travel');

   return (
      <motion.div 
         className={styles.homeWrap}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.6 }}
      >
         {/* ========== HERO SECTION (LATEST NEWS) ========== */}
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
                  </aside>
               </div>
            </div>
         </section>

         {/* ========== TIÊU ĐIỂM TRONG NGÀY (DAILY HIGHLIGHTS) ========== */}
         {dailyHighlights && dailyHighlights.length > 0 && (
            <div className={styles.container} style={{ marginTop: '3rem' }}>
               <HorizontalSection
                  title="🔥 Tiêu Điểm Trong Ngày"
                  icon=""
                  slug=""
                  articles={dailyHighlights}
                  accentColor="#FF4757"
               />
            </div>
         )}

         {/* ========== RECOMMENDED FOR YOU ========== */}
         <div className={styles.divider} />

         {/* ========== ĐỀ XUẤT CHO BẠN (AI Recommendations) ========== */}
         {recommendations.length > 0 && (
            <motion.section 
               className={styles.mainSections} aria-label="Đề xuất cho bạn"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5 }}
            >
               <div className={styles.container}>
                  <div className={styles.recSection}>
                     <div className={styles.sectionHead}>
                        <div className={styles.sectionHeadLeft}>
                           <span className={styles.sectionIcon}>✨</span>
                           <h2 className={styles.sectionName}>
                              {loggedInUser ? 'ĐỀ XUẤT CHO BẠN' : 'ĐANG THỊNH HÀNH'}
                           </h2>
                           {loggedInUser && (
                              <span className={styles.aiBadge}>AI</span>
                           )}
                        </div>
                     </div>
                     <div className={styles.recGrid}>
                        {recommendations.slice(0, 8).map((article) => (
                           <Link key={article.id} to={`/article/${article.id}`} className={styles.recCard}>
                              <div className={styles.recImgWrap}>
                                 <img
                                    src={article.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                                    alt={article.title}
                                    className={styles.recImg}
                                    loading="lazy"
                                 />
                                 <CatBadge categoryId={article.category} small />
                              </div>
                              <div className={styles.recContent}>
                                 <h3 className={styles.recTitle}>{article.title}</h3>
                                 <p className={styles.recExcerpt}>{article.excerpt}</p>
                                 <div className={styles.recMeta}>
                                    <TimeAgo date={article.publishedAt || article.createdAt} />
                                    {article.views > 0 && (
                                       <span className={styles.recViews}>👁 {article.views}</span>
                                    )}
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.section>
         )}

         <div className={styles.divider} />

         {/* ========== ROW 1: THỜI SỰ + CÔNG NGHỆ ========== */}
         <motion.section 
            className={styles.mainSections} aria-label="Tin tức theo chuyên mục"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <div className={styles.sectionsGrid}>
                  <CategorySection
                     title="THỜI SỰ" icon="📰" slug="thoisu"
                     articles={thoisuArticles} accentColor="#E53E3E"
                  />
                  <CategorySection
                     title="CÔNG NGHỆ" icon="💻" slug="technology"
                     articles={techArticles} accentColor="#4299E1"
                  />
               </div>
            </div>
         </motion.section>

         <div className={styles.divider} />

         {/* ========== ROW 2: KINH DOANH (full width horizontal) ========== */}
         <motion.section 
            className={styles.mainSections}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <HorizontalSection
                  title="KINH DOANH" icon="💰" slug="business"
                  articles={businessArticles} accentColor="#D4AF37"
               />
            </div>
         </motion.section>

         <div className={styles.divider} />

         {/* ========== ROW 3: THỂ THAO + GIẢI TRÍ ========== */}
         <motion.section 
            className={styles.mainSections}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <div className={styles.sectionsGrid}>
                  <CategorySection
                     title="THỂ THAO" icon="⚽" slug="sports"
                     articles={sportsArticles} accentColor="#38A169"
                  />
                  <CategorySection
                     title="GIẢI TRÍ" icon="🎬" slug="entertainment"
                     articles={entertainmentArticles} accentColor="#805AD5"
                  />
               </div>
            </div>
         </motion.section>

         <div className={styles.divider} />

         {/* ========== ROW 4: THẾ GIỚI (full width horizontal) ========== */}
         <motion.section 
            className={styles.mainSections}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <HorizontalSection
                  title="THẾ GIỚI" icon="🌍" slug="thegioi"
                  articles={theGioiArticles} accentColor="#3182CE"
               />
            </div>
         </motion.section>

         <div className={styles.divider} />

         {/* ========== ROW 5: SỨC KHỎE + GIÁO DỤC ========== */}
         <motion.section 
            className={styles.mainSections}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <div className={styles.sectionsGrid}>
                  <CategorySection
                     title="SỨC KHỎE" icon="🏥" slug="health"
                     articles={healthArticles} accentColor="#DD6B20"
                  />
                  <CategorySection
                     title="GIÁO DỤC" icon="📚" slug="education"
                     articles={educationArticles} accentColor="#B7791F"
                  />
               </div>
            </div>
         </motion.section>

         <div className={styles.divider} />

         {/* ========== ROW 6: DU LỊCH (full width horizontal) ========== */}
         <motion.section 
            className={styles.mainSections}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
         >
            <div className={styles.container}>
               <HorizontalSection
                  title="DU LỊCH" icon="✈️" slug="travel"
                  articles={travelArticles} accentColor="#2C7A7B"
               />
            </div>
         </motion.section>

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
      </motion.div>
   );
}

export default HomePage;
