import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articlesAPI } from '../../utils/api';
import { CATEGORIES, CATEGORY_MAP } from '../../constant/global';
import ArticleGrid from '../components/ArticleGrid';
import styles from './CategoryPage.module.css';

function CategoryPage() {
   const { category } = useParams();
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);

   // Map slug from URL to category ID if needed, or use directly
   // Assuming backend expects category ID or slug
   // Actually, the route in backend is /api/articles?category=...
   // We will pass the category parameter.
   
   useEffect(() => {
      const fetchArticles = async () => {
         setLoading(true);
         try {
            // Wait for 100ms just to show loading state nicely
            // Then fetch from backend
            let categoryFilter = category;
            
            // if we need to map slug to ID
            const foundCategory = CATEGORIES.find(c => c.slug === category);
            if (foundCategory) {
               categoryFilter = foundCategory.id;
            }

            const data = await articlesAPI.getAll(50, 0, categoryFilter);
            setArticles(data);
         } catch (err) {
            console.error('Failed to fetch category articles:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchArticles();
      window.scrollTo(0, 0);
   }, [category]);

   // find the display name
   const displayCategory = CATEGORIES.find(c => c.slug === category) || CATEGORY_MAP[category] || { name: category };
   const title = `${displayCategory.name}`;

   const featuredArticles = articles.slice(0, 2); // just take first 2 as featured for now
   const otherArticles = articles.slice(2);

   if (loading) {
      return (
         <div className={styles.homePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loading-spinner" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>
               Đang tải bài viết...
            </div>
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
         <section className={styles.articles} aria-labelledby="articles-heading">
            <h2 id="articles-heading" className={styles.sectionTitle}>
               Mới nhất - {title}
            </h2>
            {otherArticles.length > 0 ? (
               <ArticleGrid articles={otherArticles} />
            ) : (
               <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>Chưa có bài viết nào trong chuyên mục này.</p>
            )}
         </section>
      </div>
   );
}

export default CategoryPage;
