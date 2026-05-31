import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import { formatDate } from '../utils/formatDate';
import styles from './ArticleCard.module.css';

function ArticleCard({ article }) {
   return (
      <article className={styles.card}>
         <Link to={`/article/${article.id}`} className={styles.imageLink}>
            <img src={article.image} alt={article.title} className={styles.image} loading="lazy" />
         </Link>

         <div className={styles.content}>
            <div className={styles.metadata}>
               <CategoryBadge categoryId={article.category} />
               <time className={styles.date} dateTime={article.date.toISOString()}>
                  {formatDate(article.date)}
               </time>
            </div>

            <Link to={`/article/${article.id}`} className={styles.titleLink}>
               <h2 className={styles.title}>{article.title}</h2>
            </Link>

            <p className={styles.excerpt}>{article.excerpt}</p>

            <div className={styles.footer}>
               <span className={styles.author}>By {article.author}</span>
               <span className={styles.readTime}>{article.readTime} min read</span>
            </div>
         </div>
      </article>
   );
}

export default ArticleCard;
