/**
 * Database Reset Script
 * Xóa toàn bộ database và chạy lại migrations + seed (CHỈ DÙNG CHO DEV)
 *
 * Usage:
 *   node src/backend/database/reset.js
 *   node src/backend/database/reset.js --confirm  (bỏ qua xác nhận)
 */

const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const resetDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('✗ FORBIDDEN: Cannot reset database in production!');
    process.exit(1);
  }

  const client = await pool.connect();

  try {
    console.log('⚠️  Resetting database (DROP all tables)...\n');

    await client.query('BEGIN');

    // Drop views
    await client.query(`DROP VIEW IF EXISTS v_published_articles CASCADE`);
    await client.query(`DROP VIEW IF EXISTS v_article_stats CASCADE`);

    // Drop tables theo thứ tự (foreign key dependencies)
    const tables = [
      'article_tags',
      'bookmarks',
      'notifications',
      'comments',
      'editor_stats',
      'system_logs',
      'articles',
      'tags',
      'categories',
      'users',
      'migrations',
    ];

    for (const table of tables) {
      await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      console.log(`  ✓ Dropped table: ${table}`);
    }

    // Drop functions
    await client.query(`DROP FUNCTION IF EXISTS fn_update_updated_at() CASCADE`);
    await client.query(`DROP FUNCTION IF EXISTS fn_generate_slug(TEXT) CASCADE`);
    await client.query(`DROP FUNCTION IF EXISTS fn_update_article_search_vector() CASCADE`);
    await client.query(`DROP FUNCTION IF EXISTS fn_update_category_count() CASCADE`);
    await client.query(`DROP FUNCTION IF EXISTS fn_update_tag_count() CASCADE`);
    await client.query(`DROP FUNCTION IF EXISTS fn_update_editor_stats() CASCADE`);

    await client.query('COMMIT');
    console.log('\n✓ All tables dropped successfully.\n');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('✗ Reset failed:', err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

if (require.main === module) {
  const skipConfirm = process.argv.includes('--confirm');

  if (!skipConfirm) {
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(
      '⚠️  This will DELETE ALL DATA. Are you sure? (yes/no): ',
      async (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
          await resetDatabase();
          console.log('💡 Now run: npm run db:setup');
        } else {
          console.log('Cancelled.');
        }
        process.exit(0);
      }
    );
  } else {
    resetDatabase().then(() => {
      console.log('💡 Now run: npm run db:setup');
      process.exit(0);
    });
  }
}

module.exports = { resetDatabase };
