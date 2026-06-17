import { CATEGORIES } from '../constant/global';

// Mock data for development - replace with API calls in Phase 2
/**
 * {
 *    id: number,
 *    title: string,
 *    excerpt: string,
 *    category: category,
 *    author: string,
 *    date: date,
 *    content: string,
 *    image: link,
 *    readTime: number,
 *    featured: boolean,
 * }
 */

export const MOCK_ARTICLES = [
   {
      id: 1,
      title: 'Kinh tế Việt Nam 6 tháng đầu năm 2024: Tăng trưởng vượt kỳ vọng',
      excerpt:
         'GDP 6 tháng đầu năm tăng 6,42%, cao nhất trong cùng kỳ 5 năm qua. Nhiều ngành lĩnh vực ghi nhận mức tăng trưởng tích cực, kinh tế vĩ mô tiếp tục duy trì ổn định.',
      category: 'business',
      subCategory: 'Kinh tế',
      author: 'Minh Anh',
      date: new Date('2024-06-12T08:30:00'),
      content: `Theo số liệu của Tổng cục Thống kê, tổng sản phẩm trong nước (GDP) 6 tháng đầu năm 2024 tăng 6,42% so với cùng kỳ năm trước, cao hơn mức tăng 3,72% của cùng kỳ năm 2023. Đây là mức tăng trưởng cao nhất trong giai đoạn 2019-2024.
      
Các ngành kinh tế chủ lực tăng trưởng tích cực

Trong đó, khu vực nông, lâm nghiệp và thủy sản tăng 3,28%; khu vực công nghiệp và xây dựng tăng 7,51%; khu vực dịch vụ tăng 6,64%. Nhiều ngành công nghiệp chế biến, chế tạo ghi nhận mức tăng trưởng cao, đóng góp lớn vào tăng trưởng chung của nền kinh tế.

"Kết quả này cho thấy sự phục hồi mạnh mẽ và bền vững của nền kinh tế, nhờ vào các chính sách điều hành linh hoạt, kịp thời của Chính phủ, cùng với sự nỗ lực của cộng đồng doanh nghiệp và người dân." — TS. Nguyễn Đức Kiên, Tổ trưởng Tổ tư vấn kinh tế của Thủ tướng`,
      featured: true,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80',
      caption: 'Toàn cảnh TP. Hồ Chí Minh - Trung tâm kinh tế lớn nhất cả nước. Ảnh: Lê Hoàng',
      readTime: 2,
      tags: ['Kinh tế Việt Nam', 'GDP', 'Tăng trưởng', '6 tháng đầu năm 2024', 'Chính sách', 'Doanh nghiệp'],
      contentBlocks: [
         {
            type: 'paragraph',
            text: 'Theo số liệu của Tổng cục Thống kê, tổng sản phẩm trong nước (GDP) 6 tháng đầu năm 2024 tăng 6,42% so với cùng kỳ năm trước, cao hơn mức tăng 3,72% của cùng kỳ năm 2023. Đây là mức tăng trưởng cao nhất trong giai đoạn 2019-2024.'
         },
         {
            type: 'heading',
            text: 'Các ngành kinh tế chủ lực tăng trưởng tích cực'
         },
         {
            type: 'paragraph',
            text: 'Trong đó, khu vực nông, lâm nghiệp và thủy sản tăng 3,28%; khu vực công nghiệp và xây dựng tăng 7,51%; khu vực dịch vụ tăng 6,64%. Nhiều ngành công nghiệp chế biến, chế tạo ghi nhận mức tăng trưởng cao, đóng góp lớn vào tăng trưởng chung của nền kinh tế.'
         },
         {
            type: 'quote',
            text: 'Kết quả này cho thấy sự phục hồi mạnh mẽ và bền vững của nền kinh tế, nhờ vào các chính sách điều hành linh hoạt, kịp thời của Chính phủ, cùng với sự nỗ lực của cộng đồng doanh nghiệp và người dân.',
            author: 'TS. Nguyễn Đức Kiên, Tổ trưởng Tổ tư vấn kinh tế của Thủ tướng'
         }
      ]
   },
   {
      id: 2,
      title: 'Quốc hội thông qua Luật Đất đai (sửa đổi)',
      excerpt: 'Với 432/477 đại biểu tán thành, Quốc hội đã chính thức thông qua Luật Đất đai sửa đổi.',
      category: 'thoisu',
      author: 'Trần Thu Hà',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      content: `Với 432/477 đại biểu tán thành, Quốc hội đã chính thức thông qua Luật Đất đai sửa đổi. Luật sẽ có hiệu lực từ ngày 1/1/2025.

Đây là một trong những luật quan trọng nhất, ảnh hưởng đến hàng triệu hộ gia đình và tổ chức trên cả nước.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1575321729918-87a2a36d2c23?w=400&q=80',
      readTime: 4,
   },
   {
      id: 3,
      title: 'SpaceX phóng thành công tàu vũ trụ Starship lần thứ 4',
      excerpt: 'Lần thứ 4 liên tiếp, tàu Starship của SpaceX đã hoàn thành chuyến bay thử nghiệm thành công.',
      category: 'technology',
      author: 'Lê Văn Khoa',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      content: `Công ty SpaceX của tỷ phú Elon Musk đã phóng thành công tàu vũ trụ Starship trong chuyến bay thử nghiệm lần thứ 4. Đây là cột mốc quan trọng trong hành trình chinh phục sao Hỏa.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&q=80',
      readTime: 3,
   },
   {
      id: 4,
      title: 'ĐT Việt Nam giành chiến thắng thuyết phục trước Indonesia',
      excerpt: 'Với tỷ số 3-1, đội tuyển Việt Nam đã có chiến thắng quan trọng trong vòng loại World Cup 2026.',
      category: 'sports',
      author: 'Phạm Quang Huy',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      content: `Đội tuyển Việt Nam đã có màn trình diễn ấn tượng khi đánh bại Indonesia 3-1 trong trận đấu vòng loại World Cup 2026. Các bàn thắng đến từ Nguyễn Tiến Linh (2 bàn) và Nguyễn Quang Hải.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80',
      readTime: 3,
   },
   {
      id: 5,
      title: 'Taylor Swift xác nhận lưu diễn tại châu Á năm 2025',
      excerpt: 'Siêu sao âm nhạc Taylor Swift công bố sẽ có các chặng dừng tại nhiều quốc gia châu Á trong tour diễn năm 2025.',
      category: 'entertainment',
      author: 'Nguyễn Thảo My',
      date: new Date(Date.now() - 7 * 60 * 60 * 1000),
      content: `Taylor Swift vừa công bố lịch trình tour diễn châu Á năm 2025, bao gồm các điểm dừng tại Tokyo, Seoul, Singapore và Bangkok. Hàng triệu fan hâm mộ tại khu vực đang nóng lòng chờ đợi.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
      readTime: 3,
   },
   // Thời sự
   {
      id: 6,
      title: 'Chính phủ họp phiên thường kỳ tháng 6: Thảo luận nhiều nội dung quan trọng',
      excerpt:
         'Thủ tướng yêu cầu các bộ, ngành tập trung tháo gỡ khó khăn, thúc đẩy tăng trưởng kinh tế, kiểm soát lạm phát, đảm bảo an sinh xã hội.',
      category: 'thoisu',
      author: 'Hoàng Văn Nam',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      content: `Tại phiên họp thường kỳ tháng 6, Chính phủ đã thảo luận về nhiều vấn đề kinh tế - xã hội quan trọng. Thủ tướng nhấn mạnh việc cần đẩy mạnh giải ngân vốn đầu tư công.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80',
      readTime: 4,
   },
   {
      id: 7,
      title: 'Bộ Chính trị cho ý kiến về công tác cán bộ',
      excerpt: 'Bộ Chính trị, Ban Bí thư đã xem xét, cho ý kiến về một số nội dung liên quan đến công tác cán bộ.',
      category: 'thoisu',
      author: 'Lê Đức Minh',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      content: `Tại cuộc họp, Bộ Chính trị đã xem xét và quyết định nhiều vấn đề quan trọng liên quan đến công tác tổ chức, cán bộ theo quy định của Đảng.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=400&q=80',
      readTime: 3,
   },
   {
      id: 8,
      title: 'Mưa lớn diện rộng tại miền Bắc, cảnh báo nguy cơ lũ quét và sạt lở đất',
      excerpt: 'Các tỉnh miền núi phía Bắc đang đối mặt với nguy cơ cao về lũ quét và sạt lở đất do mưa lớn kéo dài.',
      category: 'thoisu',
      author: 'Trịnh Thị Lan',
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      content: `Cơ quan khí tượng thủy văn cảnh báo các tỉnh Lai Châu, Lào Cai, Yên Bái, Hà Giang cần đề cao cảnh giác với lũ quét và sạt lở đất trong những ngày tới.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=400&q=80',
      readTime: 3,
   },
   {
      id: 9,
      title: 'Hà Nội: Điều chỉnh tổ chức giao thông nhiều tuyến đường từ 15/6',
      excerpt:
         'Sở GTVT Hà Nội thông báo điều chỉnh tổ chức giao thông trên một số tuyến đường để phục vụ thi công các công trình trọng điểm.',
      category: 'thoisu',
      author: 'Nguyễn Bảo Long',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      content: `Từ ngày 15/6, Hà Nội sẽ điều chỉnh giao thông trên các tuyến đường Nguyễn Trãi, Lê Văn Lương và một số tuyến phụ để phục vụ thi công metro.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
      readTime: 3,
   },
   // Công nghệ
   {
      id: 10,
      title: 'iPhone 16 Pro Max lộ diện: Nhiều nâng cấp đáng giá về camera và hiệu năng',
      excerpt: 'Các thông tin rò rỉ mới nhất cho thấy iPhone 16 Pro Max sẽ có nhiều cải tiến vượt trội so với thế hệ tiền nhiệm.',
      category: 'technology',
      author: 'Nguyễn Anh Khoa',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000),
      content: `iPhone 16 Pro Max được cho là sẽ được trang bị chip A18 Pro, camera 48MP với khả năng zoom quang học 5x và pin dung lượng lớn hơn đáng kể.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
      readTime: 5,
      techFeatured: true,
   },
   {
      id: 11,
      title: 'Microsoft ra mắt Copilot+ PC: Kỷ nguyên mới của máy tính AI',
      excerpt: 'Microsoft giới thiệu thế hệ PC mới tích hợp AI, hứa hẹn mang lại trải nghiệm hoàn toàn khác biệt.',
      category: 'technology',
      author: 'Vũ Minh Châu',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      content: `Microsoft Copilot+ PC là dòng máy tính mới với chip NPU tích hợp, cho phép chạy các tác vụ AI cục bộ mà không cần kết nối cloud, đảm bảo tính riêng tư.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80',
      readTime: 4,
   },
   {
      id: 12,
      title: 'Google công bố Gemini 1.5: Mạnh hơn, hiểu hơn, nhanh hơn',
      excerpt: 'Phiên bản mới nhất của Gemini mang đến cửa sổ ngữ cảnh 1 triệu token, vượt xa mọi đối thủ.',
      category: 'technology',
      author: 'Đặng Thị Hoa',
      date: new Date(Date.now() - 3 * 60 * 60 * 1000),
      content: `Google Gemini 1.5 với cửa sổ ngữ cảnh khổng lồ 1 triệu token có thể xử lý các tài liệu dài, video và âm thanh trong cùng một cuộc hội thoại.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
      readTime: 4,
   },
   // Sức khỏe
   {
      id: 13,
      title: 'Health Alert: New Wellness Study',
      excerpt: 'Recent research reveals surprising findings about daily habits and long-term health outcomes.',
      category: 'health',
      author: 'Dr. Lisa Wong',
      date: new Date('2026-05-26'),
      content: `A comprehensive study involving over 100,000 participants has revealed important insights about daily habits and health outcomes.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800',
      readTime: 5,
   },
   {
      id: 14,
      title: 'Lifestyle: Travel Trends for Summer',
      excerpt: 'Experts predict popular destinations and travel styles for the upcoming summer season.',
      category: 'travel',
      author: 'James Wilson',
      date: new Date('2026-05-24'),
      content: `As summer approaches, travel experts are already identifying the most popular destinations and emerging travel trends.`,
      featured: false,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      readTime: 4,
   },
   {
      id: 15,
      title: 'Tuyển sinh Đại học 2024: Nhiều điểm mới cần lưu ý',
      excerpt: 'Kỳ thi tuyển sinh năm nay có nhiều thay đổi về phương thức xét tuyển.',
      category: 'education',
      author: 'Nguyễn Văn A',
      date: new Date('2026-05-20'),
      content: 'Bộ GD&ĐT đã công bố quy chế tuyển sinh mới với nhiều điểm đáng chú ý cho các thí sinh.',
      featured: false,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      readTime: 3,
   },
   {
      id: 16,
      title: 'Hội nghị Thượng đỉnh Toàn cầu về Biến đổi Khí hậu',
      excerpt: 'Các nhà lãnh đạo thế giới cam kết giảm phát thải mạnh mẽ hơn.',
      category: 'thegioi',
      author: 'Trần B',
      date: new Date('2026-05-18'),
      content: 'Tại hội nghị, các quốc gia đã đạt được thỏa thuận lịch sử về việc giảm dần sử dụng nhiên liệu hóa thạch.',
      featured: false,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?w=800',
      readTime: 5,
   }
];

export const getArticleById = (id) => {
   return MOCK_ARTICLES.find((article) => article.id === parseInt(id));
};

export const getArticlesByCategory = (categoryId) => {
   if (categoryId === 'all') return MOCK_ARTICLES;
   return MOCK_ARTICLES.filter((article) => article.category === categoryId);
};

export const searchArticles = (query, categoryId) => {
   let results = MOCK_ARTICLES;

   if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
         (article) =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.excerpt.toLowerCase().includes(lowerQuery) ||
            article.content.toLowerCase().includes(lowerQuery)
      );
   }

   if (categoryId && categoryId !== 'all') {
      results = results.filter((article) => article.category === categoryId);
   }

   return results;
};

export const getFeaturedArticles = () => {
   return MOCK_ARTICLES.filter((article) => article.featured);
};

export const getCategoryById = (id) => {
   return CATEGORIES.find((cat) => cat.id === id);
};

export const getCategoryName = (id) => {
   const category = getCategoryById(id);
   return category ? category.name : 'Unknown';
};

// Time helper for Vietnamese format
export const getTimeAgo = (date) => {
   const now = new Date();
   const diffMs = now - date;
   const diffMins = Math.floor(diffMs / 60000);
   const diffHours = Math.floor(diffMins / 60);

   if (diffMins < 60) return `${diffMins} phút trước`;
   if (diffHours < 24) return `${diffHours} giờ trước`;
   return `${Math.floor(diffHours / 24)} ngày trước`;
};
