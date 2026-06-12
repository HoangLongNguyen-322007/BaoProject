const { pool } = require('./database');
const { generateMultipleMockArticles } = require('../utils/mockArticleGenerator');

const seedMassiveArticles = async (count = 50) => {
   try {
      console.log(`Starting to seed ${count} mock articles...`);

      // Fetch authors and editors from DB
      const usersResult = await pool.query('SELECT id, role FROM users WHERE role IN ($1, $2)', ['author', 'editor']);

      const authorIds = usersResult.rows.filter((u) => u.role === 'author').map((u) => u.id);
      const editorIds = usersResult.rows.filter((u) => u.role === 'editor').map((u) => u.id);

      if (authorIds.length === 0 || editorIds.length === 0) {
         console.log('Authors or Editors missing. Please run the base seed first.');
         return;
      }

      const articles = generateMultipleMockArticles(count, authorIds, editorIds);
      let insertedCount = 0;

      for (const article of articles) {
         try {
            await pool.query(
               `INSERT INTO articles (title, excerpt, content, category, author_id, editor_id, status, image, "readTime", views, "publishedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
               [
                  article.title,
                  article.excerpt,
                  article.content,
                  article.category,
                  article.author_id,
                  article.editor_id,
                  article.status,
                  article.image,
                  article.readTime,
                  article.views || 0,
                  article.publishedAt || null,
               ]
            );
            insertedCount++;
         } catch (err) {
            console.error('Error inserting article:', err.message);
         }
      }

      console.log(`✓ Successfully seeded ${insertedCount} massive mock articles.`);
      process.exit(0);
   } catch (error) {
      console.error('Error seeding massive articles:', error.message);
      process.exit(1);
   }
};

// If run directly
if (require.main === module) {
   const count = process.argv[2] ? parseInt(process.argv[2], 10) : 50;
   seedMassiveArticles(count);
}

module.exports = { seedMassiveArticles };
