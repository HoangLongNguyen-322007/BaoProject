import { Link, useParams } from 'react-router-dom';
import { getArticleById, getCategoryName, MOCK_ARTICLES } from '../utils/mockData';
import { formatDate } from '../utils/formatDate';
import CategoryBadge from '../components/CategoryBadge';
import ArticleGrid from '../components/ArticleGrid';
import styles from './ArticleDetailPage.module.css';

function ArticleDetailPage() {
   const { id } = useParams();
   const article = getArticleById(id);

   if (!article) {
      return (
         <div className={styles.notFound}>
            <h1>Article not found</h1>
            <p>Sorry, we couldn't find the article you're looking for.</p>
            <Link to="/" className={styles.link}>
               Back to Home
            </Link>
         </div>
      );
   }

   // Get related articles from same category
   const relatedArticles = MOCK_ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(
      0,
      3
   );

   return (
      <article className={styles.articlePage}>
         <div className={styles.hero}>
            <img src={article.image} alt={article.title} className={styles.heroImage} />
         </div>

         <div className={styles.container}>
            {/* Article Header */}
            <header className={styles.articleHeader}>
               <div className={styles.metadata}>
                  <CategoryBadge categoryId={article.category} />
                  <time dateTime={article.date.toISOString()}>{formatDate(article.date)}</time>
               </div>

               <h1 className={styles.title}>{article.title}</h1>

               <div className={styles.byline}>
                  <span className={styles.author}>By {article.author}</span>
                  <span className={styles.readTime}>{article.readTime} min read</span>
               </div>
            </header>

            {/* Article Content */}
            <main className={styles.articleContent}>
               {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={styles.paragraph}>
                     {paragraph.split('\n').map((line, lineIdx) => (
                        <span key={lineIdx}>
                           {line}
                           {lineIdx < paragraph.split('\n').length - 1 && <br />}
                        </span>
                     ))}
                  </p>
               ))}
            </main>

            {/* Article Footer */}
            <footer className={styles.articleFooter}>
               <Link to="/" className={styles.backLink}>
                  ← Back to Articles
               </Link>
            </footer>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
               <section className={styles.related} aria-labelledby="related-heading">
                  <h2 id="related-heading" className={styles.relatedTitle}>
                     Related Articles in {getCategoryName(article.category)}
                  </h2>
                  <ArticleGrid articles={relatedArticles} />
               </section>
            )}
         </div>
      </article>
   );
}

export default ArticleDetailPage;
