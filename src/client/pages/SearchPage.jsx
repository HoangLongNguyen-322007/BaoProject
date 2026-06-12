import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ArticleGrid from '../components/ArticleGrid';
import { articlesAPI } from '../../utils/api';
import { CATEGORIES } from '../../constant/global';
import styles from './SearchPage.module.css';

function SearchPage() {
   const [searchParams, setSearchParams] = useSearchParams();
   const query = searchParams.get('q') || '';
   const categoryFilter = searchParams.get('category') || 'all';
   
   const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
   const [results, setResults] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchResults = async () => {
         setLoading(true);
         try {
            const cat = selectedCategory === 'all' ? null : selectedCategory;
            const data = await articlesAPI.getAll(50, 0, cat, query);
            setResults(data);
         } catch (err) {
            console.error('Failed to fetch search results:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchResults();
   }, [query, selectedCategory]);

   const handleCategoryChange = (categoryId) => {
      setSelectedCategory(categoryId);
      const newParams = new URLSearchParams(searchParams);
      if (categoryId === 'all') {
         newParams.delete('category');
      } else {
         newParams.set('category', categoryId);
      }
      setSearchParams(newParams);
   };

   return (
      <div className={styles.searchPage}>
         <div className={styles.container}>
            {/* Search Header */}
            <header className={styles.header}>
               <h1>Kết quả tìm kiếm</h1>
               {query && (
                  <p className={styles.searchQuery}>
                     Kết quả cho: <strong>"{query}"</strong>
                     <span className={styles.resultCount}>
                        ({results.length} kết quả)
                     </span>
                  </p>
               )}
            </header>

            {/* Filter Section */}
            <section className={styles.filters} aria-label="Filter results">
               <h2 className={styles.filterTitle}>Lọc theo chuyên mục</h2>
               <div className={styles.filterButtons} role="tablist">
                  <button
                     className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                     onClick={() => handleCategoryChange('all')}
                     role="tab"
                     aria-selected={selectedCategory === 'all'}
                  >
                     Tất cả chuyên mục
                  </button>
                  {CATEGORIES.map((category) => (
                     <button
                        key={category.id}
                        className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                        style={selectedCategory === category.id ? { backgroundColor: category.color, color: 'white' } : {}}
                        role="tab"
                        aria-selected={selectedCategory === category.id}
                     >
                        {category.name}
                     </button>
                  ))}
               </div>
            </section>

            {/* Results */}
            <section className={styles.results} aria-label="Search results" aria-live="polite">
               {loading ? (
                  <div className="loading-spinner" style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--gold-primary)' }}>
                     Đang tìm kiếm...
                  </div>
               ) : (
                  query && results.length === 0 ? (
                     <div className={styles.noResults}>
                        <h2>Không tìm thấy bài viết nào</h2>
                        <p>Vui lòng thử tìm kiếm bằng các từ khóa khác hoặc duyệt tất cả bài viết.</p>
                        <Link to="/" className={styles.link}>
                           Duyệt tất cả bài viết
                        </Link>
                     </div>
                  ) : (
                     <ArticleGrid articles={results} />
                  )
               )}
            </section>
         </div>
      </div>
   );
}

export default SearchPage;
