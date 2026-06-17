const cheerio = require('cheerio');
(async () => {
  const articleRes = await fetch('https://vnexpress.net/cau-can-duoc-de-xuat-thay-the-dat-dap-cho-cao-toc-mien-tay-5086687.html');
  const html = await articleRes.text();
  const $ = cheerio.load(html);
  
  console.log('--- .fck_detail figure ---');
  let figures = $('.fck_detail figure').html();
  if (figures) console.log(figures.substring(0, 1500));
  else console.log('No figures found');
})();
