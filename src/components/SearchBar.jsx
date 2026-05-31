import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch, selectedCategory = 'all' }) {
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault();
         if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
            if (onSearch) {
               onSearch(searchQuery, selectedCategory);
            }
         }
      },
      [searchQuery, selectedCategory, navigate, onSearch]
   );

   return (
      <form className={styles.searchForm} onSubmit={handleSubmit} role="search">
         <div className={styles.inputWrapper}>
            <input
               type="search"
               className={styles.input}
               placeholder="Search articles..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               aria-label="Search articles"
            />
            <button type="submit" className={styles.button} aria-label="Search">
               <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
               </svg>
            </button>
         </div>
      </form>
   );
}

export default SearchBar;
