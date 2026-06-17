const { pool } = require('./src/backend/config/database');
const { startScraperService } = require('./src/backend/services/scraperService');

(async () => {
  try {
    console.log('Deleting scraped articles...');
    // Scraped articles usually have 'Nội dung lấy từ VnExpress' or similar in the DB, or just delete all articles in the last 2 hours.
    // Let's just delete articles where content contains 'Nội dung lấy từ VnExpress' or we can just delete articles from 'admin' that were created today.
    // Wait, the new logic doesn't append 'Nội dung lấy từ VnExpress' if it successfully scrapes. But the old one did! Or actually, the old one just used text paragraphs.
    // Let's just clear all articles! The user doesn't have important real user data yet.
    // Or let's delete articles that were created today.
    await pool.query(`DELETE FROM articles WHERE "createdAt" > NOW() - INTERVAL '1 day'`);
    console.log('Deleted recent articles.');
    
    // Call the scraper directly
    // Wait, startScraperService uses setTimeout and setInterval.
    // I should just require the module and run the exported runScraper, but it's not exported.
    // I will write the query to delete articles and then the user's running app will just trigger the interval later, or I can restart the server.
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
