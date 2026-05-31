import styles from './CategoryBadge.module.css';
import { getCategoryById } from '../utils/mockData';

function CategoryBadge({ categoryId, onClick }) {
   const category = getCategoryById(categoryId);

   if (!category) return null;

   return (
      <button
         className={styles.badge}
         style={{ backgroundColor: category.color }}
         onClick={onClick}
         aria-label={`Filter by ${category.name} category`}
      >
         {category.name}
      </button>
   );
}

export default CategoryBadge;
