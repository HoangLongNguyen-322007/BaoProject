import { Link } from 'react-router-dom';
import { CATEGORY_MAP } from '../../constant/global';
import styles from './ArticleCard.module.css';

// Safe date formatting that handles Date objects, ISO strings, and invalid values
function formatDisplayDate(dateVal) {
   if (!dateVal) return '';
   try {
      const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
   } catch {
      return '';
   }
}

function ArticleCard({ article }) {
   // Handle both mock data shape (date, author) and API shape (publishedAt/createdAt, authorName)
   const articleDate = article.publishedAt || article.createdAt || article.date;
   const authorName = article.authorName || article.author || 'Tác giả';
   const category = CATEGORY_MAP[article.category] || { name: article.category || 'Khác', color: '#888' };

   return (
      <article className={styles.card}>
         <Link to={`/article/${article.id}`} className={styles.imageLink}>
            <img
               src={article.image || 'https://via.placeholder.com/400x300?text=No+Image'}
               alt={article.title}
               className={styles.image}
               loading="lazy"
            />
         </Link>

         <div className={styles.content}>
            <div className={styles.metadata}>
               <span
                  className={styles.badge}
                  style={{ backgroundColor: category.color, color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}
               >
                  {category.name}
               </span>
               {articleDate && (
                  <time className={styles.date}>
                     {formatDisplayDate(articleDate)}
                  </time>
               )}
            </div>

            <Link to={`/article/${article.id}`} className={styles.titleLink}>
               <h2 className={styles.title}>{article.title}</h2>
            </Link>

            <p className={styles.excerpt}>{article.excerpt}</p>

            <div className={styles.footer}>
               <span className={styles.author}>Bởi {authorName}</span>
               <span className={styles.readTime}>{article.readTime || article.readtime || 3} phút đọc</span>
            </div>
         </div>
      </article>
   );
}

export default ArticleCard;

