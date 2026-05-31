import ArticleCard from './ArticleCard';
import styles from './ArticleGrid.module.css';

function ArticleGrid({ articles, isLoading = false, error = null }) {
   if (isLoading) {
      return (
         <div className={styles.loading} role="status" aria-live="polite">
            <div className={styles.spinner}></div>
            <p>Loading articles...</p>
         </div>
      );
   }

   if (error) {
      return (
         <div className={styles.error} role="alert">
            <h2>Error loading articles</h2>
            <p>{error}</p>
         </div>
      );
   }

   if (!articles || articles.length === 0) {
      return (
         <div className={styles.empty} role="status">
            <h2>No articles found</h2>
            <p>Try adjusting your search or filters</p>
         </div>
      );
   }

   return (
      <div className={styles.grid}>
         {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
         ))}
      </div>
   );
}

export default ArticleGrid;
