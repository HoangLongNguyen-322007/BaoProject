import {
   getArticleById,
   getArticlesByCategory,
   searchArticles,
   getFeaturedArticles,
   getCategoryById,
} from '../utils/mockData';

describe('Article Service', () => {
   describe('getArticleById', () => {
      test('returns article by id', () => {
         const article = getArticleById(1);
         expect(article).toBeDefined();
         expect(article.id).toBe(1);
      });

      test('returns undefined for non-existent article', () => {
         const article = getArticleById(9999);
         expect(article).toBeUndefined();
      });
   });

   describe('getArticlesByCategory', () => {
      test('returns all articles for "all" category', () => {
         const articles = getArticlesByCategory('all');
         expect(articles.length).toBeGreaterThan(0);
      });

      test('returns articles for specific category', () => {
         const articles = getArticlesByCategory('technology');
         articles.forEach((article) => {
            expect(article.category).toBe('technology');
         });
      });
   });

   describe('searchArticles', () => {
      test('searches by query in title', () => {
         const results = searchArticles('Kinh tế');
         expect(results.length).toBeGreaterThan(0);
      });

      test('searches by query in excerpt or content', () => {
         const results = searchArticles('thủy sản');
         expect(results.length).toBeGreaterThan(0);
      });

      test('filters by category and query', () => {
         const results = searchArticles('Quốc hội', 'thoisu');
         expect(results.length).toBeGreaterThan(0);
         results.forEach((article) => {
            expect(article.category).toBe('thoisu');
         });
      });

      test('returns empty array for no matches', () => {
         const results = searchArticles('xyzabc');
         expect(results.length).toBe(0);
      });
   });

   describe('getFeaturedArticles', () => {
      test('returns only featured articles', () => {
         const articles = getFeaturedArticles();
         articles.forEach((article) => {
            expect(article.featured).toBe(true);
         });
      });

      test('returns at least one featured article', () => {
         const articles = getFeaturedArticles();
         expect(articles.length).toBeGreaterThan(0);
      });
   });

   describe('getCategoryById', () => {
      test('returns category by id', () => {
         const category = getCategoryById('technology');
         expect(category).toBeDefined();
         expect(category.id).toBe('technology');
         expect(category.name).toBe('Công Nghệ');
      });

      test('returns undefined for invalid category', () => {
         const category = getCategoryById('invalid');
         expect(category).toBeUndefined();
      });
   });
});
