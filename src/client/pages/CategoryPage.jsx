import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articlesAPI } from '../../utils/api';
import { CATEGORIES, CATEGORY_MAP } from '../../constant/global';
import { apiCache } from '../../utils/cache';
import ArticleGrid from '../components/ArticleGrid';
import styles from './CategoryPage.module.css';

function CategoryPage() {
   const { category } = useParams();
   
   const cacheKey = `GET:/articles/category/${category}?limit=15&offset=0`;
   const cachedData = apiCache.has(cacheKey) ? apiCache.get(cacheKey) : null;

   const [articles, setArticles] = useState(cachedData ? (Array.isArray(cachedData) ? cachedData : []) : []);
   const [loading, setLoading] = useState(!cachedData);
   const [error, setError] = useState(null);
   
   useEffect(() => {
      const fetchArticles = async () => {
         if (!cachedData) setLoading(true);
         setError(null);
         try {
            // Pass the category slug directly to the API
            const data = await articlesAPI.getByCategory(category, 15, 0);
            setArticles(Array.isArray(data) ? data : []);
         } catch (err) {
            console.error('Failed to fetch category articles:', err);
            setError('Không thể tải bài viết. Vui lòng thử lại sau.');
         } finally {
            setLoading(false);
         }
      };

      fetchArticles();
      window.scrollTo(0, 0);
   }, [category]);

   // find the display name from CATEGORY_MAP or CATEGORIES
   const displayCategory = CATEGORY_MAP[category] || CATEGORIES.find(c => c.slug === category) || { name: category };
   const title = displayCategory.name;

   const featuredArticles = articles.slice(0, 2);
   const otherArticles = articles.slice(2);

   if (loading) {
      return (
         <div className={styles.categoryPage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loading-spinner" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>
               Đang tải bài viết...
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className={styles.categoryPage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div style={{ textAlign: 'center', color: '#ff4757' }}>
               <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{error}</p>
               <button
                  onClick={() => window.location.reload()}
                  style={{ padding: '0.5rem 1.5rem', background: 'var(--gold-primary)', color: '#0E0E0E', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
               >
                  Thử lại
               </button>
            </div>
         </div>
      );
   }

   if (articles.length === 0) {
      return (
         <div className={styles.categoryPage}>
            <section className={styles.articles}>
               <h2 className={styles.sectionTitle}>{title}</h2>
               <p style={{ textAlign: 'center', color: '#888', marginTop: '3rem', fontSize: '1.1rem' }}>
                  Chưa có bài viết nào trong chuyên mục này.
               </p>
               <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <Link to="/" style={{ color: 'var(--gold-primary)', textDecoration: 'underline' }}>
                     ← Quay lại Trang chủ
                  </Link>
               </div>
            </section>
         </div>
      );
   }

   return (
      <div className={styles.categoryPage}>
         {/* Featured Section */}
         {featuredArticles.length > 0 && (
            <section className={styles.featured} aria-labelledby="featured-heading">
               <h2 id="featured-heading" className={styles.sectionTitle}>
                  Tiêu điểm - {title}
               </h2>
               <div className={styles.featuredGrid}>
                  {featuredArticles.map((article) => (
                     <Link key={article.id} to={`/article/${article.id}`} className={styles.featuredCard}>
                        <img src={article.image || 'https://via.placeholder.com/800x400'} alt={article.title} className={styles.featuredImage} />
                        <div className={styles.featuredContent}>
                           <h3 className={styles.featuredTitle}>{article.title}</h3>
                           <p className={styles.featuredExcerpt}>{article.excerpt}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            </section>
         )}

         {/* Articles Section */}
         {otherArticles.length > 0 && (
            <section className={styles.articles} aria-labelledby="articles-heading">
               <h2 id="articles-heading" className={styles.sectionTitle}>
                  Mới nhất - {title}
               </h2>
               <ArticleGrid articles={otherArticles} />
            </section>
         )}
      </div>
   );
}

export default CategoryPage;

