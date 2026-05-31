import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleGrid from '../components/ArticleGrid';
import CategoryBadge from '../components/CategoryBadge';
import { CATEGORIES, MOCK_ARTICLES, getFeaturedArticles, getArticlesByCategory } from '../utils/mockData';
import styles from './HomePage.module.css';

function HomePage() {
   const [selectedCategory, setSelectedCategory] = useState(null);

   const featuredArticles = getFeaturedArticles();
   const displayArticles = selectedCategory ? getArticlesByCategory(selectedCategory) : MOCK_ARTICLES;

   return (
      <div className={styles.homePage}>
         {/* Featured Section */}
         {featuredArticles.length > 0 && (
            <section className={styles.featured} aria-labelledby="featured-heading">
               <h2 id="featured-heading" className={styles.sectionTitle}>
                  Featured
               </h2>
               <div className={styles.featuredGrid}>
                  {featuredArticles.map((article) => (
                     <Link key={article.id} to={`/article/${article.id}`} className={styles.featuredCard}>
                        <img src={article.image} alt={article.title} className={styles.featuredImage} />
                        <div className={styles.featuredContent}>
                           <h3 className={styles.featuredTitle}>{article.title}</h3>
                           <p className={styles.featuredExcerpt}>{article.excerpt}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            </section>
         )}

         {/* Categories Section */}
         <section className={styles.categories} aria-labelledby="categories-heading">
            <h2 id="categories-heading" className={styles.sectionTitle}>
               Browse by Category
            </h2>
            <div className={styles.categoryGrid} role="tablist">
               <button
                  className={`${styles.categoryButton} ${!selectedCategory ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(null)}
                  style={!selectedCategory ? { backgroundColor: 'black' } : {}}
                  role="tab"
                  aria-selected={!selectedCategory}
               >
                  All Articles
               </button>
               {CATEGORIES.map((category) => (
                  <button
                     key={category.id}
                     className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                     onClick={() => setSelectedCategory(category.id)}
                     style={selectedCategory === category.id ? { backgroundColor: category.color } : {}}
                     role="tab"
                     aria-selected={selectedCategory === category.id}
                  >
                     {category.name}
                  </button>
               ))}
            </div>
         </section>

         {/* Articles Section */}
         <section className={styles.articles} aria-labelledby="articles-heading">
            <h2 id="articles-heading" className={styles.sectionTitle}>
               {selectedCategory
                  ? CATEGORIES.find((c) => c.id === selectedCategory)?.name + ' Articles'
                  : 'All Articles'}
            </h2>
            <ArticleGrid articles={displayArticles} />
         </section>
      </div>
   );
}

export default HomePage;
