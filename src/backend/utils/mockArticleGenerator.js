const generateMockArticle = (authorId, editorId) => {
   const categories = ['thoisu', 'technology', 'business', 'sports', 'entertainment', 'health', 'education'];
   const titles = [
      'Phát triển trí tuệ nhân tạo trong tương lai',
      'Chuyển đổi số trong giáo dục đại học',
      'Thị trường bất động sản cuối năm 2024',
      'Khám phá vẻ đẹp tiềm ẩn của du lịch Việt Nam',
      'Công nghệ xanh giải quyết vấn đề biến đổi khí hậu',
      'Chăm sóc sức khỏe tâm lý cho giới trẻ',
      'Giải pháp nâng cao chất lượng nông sản xuất khẩu',
   ];

   const excerpts = [
      'Bài viết phân tích những cơ hội và thách thức trong bối cảnh hiện nay.',
      'Một góc nhìn mới về vấn đề đang được dư luận quan tâm.',
      'Những số liệu mới nhất cho thấy sự thay đổi tích cực trong quý vừa qua.',
      'Cùng tìm hiểu những giải pháp công nghệ mới nhất áp dụng vào thực tiễn.',
      'Khám phá hành trình phát triển và những câu chuyện đằng sau thành công.',
   ];

   const contents = [
      'Trong bài viết này, chúng ta sẽ đi sâu vào phân tích các yếu tố ảnh hưởng đến sự phát triển của lĩnh vực này. Trước tiên, cần nhìn nhận rằng xu hướng công nghệ đóng vai trò then chốt...\n\nTiếp theo, những chính sách hỗ trợ cũng đã tạo đà cho sự tăng trưởng ấn tượng. Tuy nhiên, vẫn còn đó những khó khăn cần khắc phục. Chúng ta hy vọng sẽ thấy được sự bứt phá trong thời gian tới.',
      'Nghiên cứu mới đây cho thấy có sự thay đổi rõ rệt trong hành vi của người tiêu dùng. Việc ứng dụng công nghệ đã giúp tối ưu hóa quy trình...\n\nKhông chỉ vậy, các yếu tố về mặt chính sách cũng đang dần được nới lỏng, tạo điều kiện thuận lợi hơn. Hãy cùng chờ xem những bước phát triển tiếp theo của thị trường này trong những tháng cuối năm.',
      'Cùng với sự phát triển của kinh tế số, nhiều cơ hội mới đã mở ra cho các doanh nghiệp vừa và nhỏ. Việc tận dụng tối đa các công cụ hiện đại là giải pháp tối ưu...\n\nQua đó, chúng ta có thể thấy rõ tầm quan trọng của việc không ngừng đổi mới sáng tạo để bắt kịp xu hướng toàn cầu.',
   ];

   const images = [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
   ];

   const statuses = ['draft', 'pending', 'published', 'rejected'];

   const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

   const status = getRandomItem(statuses);

   return {
      title: `${getRandomItem(titles)} - ${Math.floor(Math.random() * 1000)}`,
      excerpt: getRandomItem(excerpts),
      content: getRandomItem(contents),
      category: getRandomItem(categories),
      author_id: authorId,
      editor_id: editorId,
      status: status,
      image: getRandomItem(images),
      readTime: Math.floor(Math.random() * 10) + 2,
      views: status === 'published' ? Math.floor(Math.random() * 5000) : 0,
      publishedAt:
         status === 'published' ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) : null,
   };
};

const generateMultipleMockArticles = (count, authorIds, editorIds) => {
   const articles = [];
   for (let i = 0; i < count; i++) {
      const authorId = authorIds[Math.floor(Math.random() * authorIds.length)];
      const editorId = editorIds[Math.floor(Math.random() * editorIds.length)];
      articles.push(generateMockArticle(authorId, editorId));
   }
   return articles;
};

module.exports = {
   generateMockArticle,
   generateMultipleMockArticles,
};
