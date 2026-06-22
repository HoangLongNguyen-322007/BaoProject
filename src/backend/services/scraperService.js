const { pool } = require('../config/database');
const Parser = require('rss-parser');
const cheerio = require('cheerio');

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
  { slug: 'travel', url: 'https://vnexpress.net/rss/du-lich.rss' },
  { slug: 'khoahoc', url: 'https://vnexpress.net/rss/khoa-hoc.rss' },
  { slug: 'phapluat', url: 'https://vnexpress.net/rss/phap-luat.rss' },
  { slug: 'xe', url: 'https://vnexpress.net/rss/oto-xe-may.rss' },
  { slug: 'doisong', url: 'https://vnexpress.net/rss/gia-dinh.rss' },
  { slug: 'tamsu', url: 'https://vnexpress.net/rss/tam-su.rss' },
  { slug: 'ykien', url: 'https://vnexpress.net/rss/y-kien.rss' }
];

async function scrapeFullContent(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    const html = await res.text();
    const $ = cheerio.load(html);
    
    let contentHtml = '';
    
    // We want paragraphs and figures
    $('.fck_detail').children().each((i, el) => {
      const tag = $(el).prop('tagName').toLowerCase();
      if (tag === 'p' && $(el).hasClass('Normal')) {
        contentHtml += `<p>${$(el).html()}</p>\n`;
      } else if (tag === 'figure') {
        const imgMeta = $(el).find('meta[itemprop="url"]').attr('content');
        let caption = $(el).find('figcaption').text().trim();
        // Fallback for caption if not in figcaption
        if (!caption) caption = $(el).find('.Image').text().trim();
        
        if (imgMeta) {
          contentHtml += `
            <figure style="margin: 1.5rem 0; text-align: center;">
              <img src="${imgMeta}" alt="${caption}" style="max-width: 100%; border-radius: 8px;" />
              ${caption ? `<figcaption style="font-size: 0.9rem; color: #888; margin-top: 0.5rem;">${caption}</figcaption>` : ''}
            </figure>\n`;
        }
      } else if (tag === 'ul' || tag === 'ol') {
         contentHtml += `<${tag}>${$(el).html()}</${tag}>\n`;
      }
    });

    if (!contentHtml) {
      // Fallback
      $('article.fck_detail p').each((i, el) => {
        contentHtml += `<p>${$(el).text().trim()}</p>\n`;
      });
    }

    return contentHtml;
  } catch (err) {
    console.error(`Failed to scrape ${url}:`, err.message);
    return '';
  }
}

async function runScraper() {
  console.log('[Auto-Scraper] Bắt đầu tự động cào dữ liệu từ VnExpress...');
  
  try {
    const userRes = await pool.query(`SELECT id FROM users WHERE role = 'admin' LIMIT 1`);
    if (userRes.rows.length === 0) {
      console.warn('[Auto-Scraper] Không tìm thấy user admin. Hủy cào dữ liệu.');
      return;
    }
    const adminId = userRes.rows[0].id;

    let totalAdded = 0;
    for (const cat of CATEGORIES) {
      try {
        const feed = await parser.parseURL(cat.url);
        const items = feed.items.slice(0, 10); // Lấy 10 bài mới nhất mỗi lần quét
        
        let added = 0;
        const newArticleIds = [];
        for (const item of items) {
          try {
            const sourceUrl = item.link;
            // Kiểm tra trùng lặp sẽ được xử lý tự động bằng rào cản DB (ON CONFLICT)
            let image = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800';
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
              image = imgMatch[1];
            }
            
            let excerpt = item.contentSnippet || '';
            excerpt = excerpt.replace(/<[^>]*>?/gm, '').trim();
            if (excerpt.length > 200) excerpt = excerpt.substring(0, 197) + '...';
            
            let content = await scrapeFullContent(item.link);
            if (!content) {
              content = `<p>${excerpt}</p><p><em>(Nội dung lấy từ VnExpress)</em></p>`;
            }

            const views = Math.floor(Math.random() * 1000) + 50;
            // Lượt thích tích lũy luôn nhiều hơn lượt xem (1.2x — 3.0x)
            const likes = Math.floor(views * (Math.random() * 1.8 + 1.2));
            const readTime = Math.max(3, Math.ceil(content.length / 1000));
            
            // Xử lý thời gian
            const publishedAt = new Date(item.pubDate || Date.now());

            const insertRes = await pool.query(
              `INSERT INTO articles 
              (title, excerpt, content, category, author_id, editor_id, image, "readTime", status, views, likes, "publishedAt", "createdAt", source_url)
              VALUES ($1, $2, $3, $4, $5, $5, $6, $7, 'published', $8, $9, $10, NOW(), $11)
              ON CONFLICT (source_url) DO NOTHING
              RETURNING id`,
              [item.title, excerpt, content, cat.slug, adminId, image, readTime, views, likes, publishedAt, sourceUrl]
            );
            
            if (insertRes.rows.length > 0) {
              newArticleIds.push(insertRes.rows[0].id);
              added++;
            }
          } catch (itemErr) {
            console.error(`[Auto-Scraper] Lỗi bài viết:`, itemErr.message);
          }
        }
        if (added > 0) {
          console.log(`[Auto-Scraper] Đã thêm ${added} bài viết mới cho chuyên mục ${cat.slug}`);
          totalAdded += added;
        }
      } catch (catErr) {
        console.error(`[Auto-Scraper] Lỗi feed ${cat.url}:`, catErr.message);
      }
    }
    console.log(`[Auto-Scraper] ✅ Cập nhật tin tức thành công! Tổng cộng: ${totalAdded} bài viết mới.`);
    
    // Cleanup old articles to save DB space
    try {
      await pool.query(`
        WITH RankedArticles AS (
          SELECT id, ROW_NUMBER() OVER(PARTITION BY category ORDER BY "createdAt" DESC) as rn
          FROM articles
        )
        DELETE FROM articles
        WHERE id IN (
          SELECT id FROM RankedArticles WHERE rn > 10
        )
      `);
      console.log('[Auto-Scraper] Đã dọn dẹp DB (chỉ giữ lại 10 bài mới nhất cho mỗi chuyên mục).');
    } catch (cleanupErr) {
      console.error('[Auto-Scraper] Lỗi dọn dẹp DB:', cleanupErr.message);
    }

  } catch (err) {
    console.error('[Auto-Scraper] Lỗi tổng:', err.message);
  }
}

function startScraperService() {
  // Chạy lần đầu sau 10 giây khi server start
  setTimeout(() => {
    runScraper();
  }, 10000);

  // Sau đó lặp lại mỗi 30 phút (30 * 60 * 1000 ms)
  setInterval(() => {
    runScraper();
  }, 30 * 60 * 1000);
}

module.exports = { startScraperService, runScraper };
