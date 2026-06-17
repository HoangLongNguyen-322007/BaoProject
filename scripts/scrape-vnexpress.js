const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Parser = require('rss-parser');
const cheerio = require('cheerio');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const parser = new Parser({
  customFields: {
    item: ['description']
  }
});

const CATEGORIES = [
  { slug: 'thoisu', url: 'https://vnexpress.net/rss/thoi-su.rss' },
  { slug: 'thegioi', url: 'https://vnexpress.net/rss/the-gioi.rss' },
  { slug: 'business', url: 'https://vnexpress.net/rss/kinh-doanh.rss' },
  { slug: 'technology', url: 'https://vnexpress.net/rss/so-hoa.rss' },
  { slug: 'sports', url: 'https://vnexpress.net/rss/the-thao.rss' },
  { slug: 'entertainment', url: 'https://vnexpress.net/rss/giai-tri.rss' },
  { slug: 'health', url: 'https://vnexpress.net/rss/suc-khoe.rss' },
  { slug: 'education', url: 'https://vnexpress.net/rss/giao-duc.rss' },
  { slug: 'travel', url: 'https://vnexpress.net/rss/du-lich.rss' }
];

// Helper to scrape full article content from VnExpress
async function scrapeFullContent(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // VnExpress content is usually in .fck_detail or article.fck_detail
    let paragraphs = [];
    $('.fck_detail p.Normal').each((i, el) => {
      paragraphs.push($(el).text().trim());
    });
    
    // Fallback if .Normal isn't found
    if (paragraphs.length === 0) {
      $('article.fck_detail p').each((i, el) => {
        paragraphs.push($(el).text().trim());
      });
    }

    if (paragraphs.length === 0) return '';
    
    return paragraphs.map(p => `<p>${p}</p>`).join('\n');
  } catch (err) {
    console.error(`Failed to scrape ${url}:`, err.message);
    return '';
  }
}

async function run() {
  console.log('Bắt đầu crawl dữ liệu từ VnExpress...');
  
  try {
    // Lấy admin ID để làm tác giả
    const userRes = await pool.query(`SELECT id FROM users WHERE role = 'admin' LIMIT 1`);
    if (userRes.rows.length === 0) {
      throw new Error('Không tìm thấy user admin. Vui lòng chạy npm run db:seed trước.');
    }
    const adminId = userRes.rows[0].id;

    for (const cat of CATEGORIES) {
      console.log(`\nĐang cào chuyên mục: ${cat.slug} (${cat.url})`);
      try {
        const feed = await parser.parseURL(cat.url);
        // Lấy 10 bài mới nhất
        const items = feed.items.slice(0, 10);
        
        let added = 0;
        for (const item of items) {
          try {
            // Kiểm tra bài đã tồn tại chưa (dựa theo tiêu đề)
            const check = await pool.query('SELECT id FROM articles WHERE title = $1', [item.title]);
            if (check.rows.length > 0) {
              continue; // Bỏ qua nếu đã có
            }

            // Extract image từ description
            let image = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800'; // Default
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1];
            }
            
            // Extract excerpt
            let excerpt = item.contentSnippet || '';
            excerpt = excerpt.replace(/<[^>]*>?/gm, '').trim();
            if (excerpt.length > 200) excerpt = excerpt.substring(0, 197) + '...';
            
            // Cào nội dung chi tiết
            let content = await scrapeFullContent(item.link);
            if (!content) {
              // Nếu không lấy được chi tiết, dùng tạm excerpt
              content = `<p>${excerpt}</p><p><em>(Nội dung được tự động lấy từ nguồn VnExpress)</em></p>`;
            }

            // Random views, likes
            const views = Math.floor(Math.random() * 5000) + 100;
            const likes = Math.floor(views * (Math.random() * 0.3 + 0.05)); // 5% - 35% views
            const readTime = Math.max(3, Math.ceil(content.length / 1000));
            const publishedAt = new Date(item.pubDate || Date.now());

            await pool.query(
              `INSERT INTO articles 
              (title, excerpt, content, category, author_id, editor_id, image, "readTime", status, views, likes, "publishedAt", "createdAt")
              VALUES ($1, $2, $3, $4, $5, $5, $6, $7, 'published', $8, $9, $10, NOW())`,
              [item.title, excerpt, content, cat.slug, adminId, image, readTime, views, likes, publishedAt]
            );
            
            added++;
            process.stdout.write('.');
          } catch (itemErr) {
            console.error(`\nLỗi bài viết "${item.title}":`, itemErr.message);
          }
        }
        console.log(`\nĐã thêm ${added} bài viết cho chuyên mục ${cat.slug}`);
        
      } catch (catErr) {
        console.error(`Lỗi feed ${cat.url}:`, catErr.message);
      }
    }
    
    console.log('\n✅ Hoàn tất việc crawl dữ liệu và chèn vào database!');
  } catch (err) {
    console.error('Lỗi tổng:', err);
  } finally {
    await pool.end();
  }
}

run();
