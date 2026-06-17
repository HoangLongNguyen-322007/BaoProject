const cheerio = require('cheerio');
(async () => {
  const rssRes = await fetch('https://vnexpress.net/rss/thoi-su.rss');
  const rssText = await rssRes.text();
  // match <link> inside <item>
  const match = rssText.match(/<item>[\s\S]*?<link>(https:\/\/vnexpress\.net\/[^<]+)<\/link>/);
  if(!match) return console.log('no link found');
  const link = match[1];
  console.log('Fetching:', link);
  const articleRes = await fetch(link);
  const html = await articleRes.text();
  const $ = cheerio.load(html);
  
  let detail = $('.fck_detail').html();
  if (detail) console.log(detail.substring(0, 1500));
  else console.log('No .fck_detail found');
})();
