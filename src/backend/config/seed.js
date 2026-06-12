const { pool } = require('./database');
const bcrypt = require('bcryptjs');

/**
 * Seed the database with initial data
 */
const seedDatabase = async () => {
  try {
    // Sample users
    const usersData = [
      {
        email: 'author1@baorong.com',
        password: 'password123',
        fullName: 'Nguyễn Văn An',
        role: 'author',
        bio: 'Nhà báo chuyên viết về công nghệ và khoa học',
        avatar: 'https://i.pravatar.cc/150?img=1',
        phone: '0912345678'
      },
      {
        email: 'author2@baorong.com',
        password: 'password123',
        fullName: 'Trần Thị Bình',
        role: 'author',
        bio: 'Nhà báo viết về đời sống xã hội',
        avatar: 'https://i.pravatar.cc/150?img=5',
        phone: '0923456789'
      },
      {
        email: 'editor1@baorong.com',
        password: 'password123',
        fullName: 'Phạm Văn Cường',
        role: 'editor',
        bio: 'Biên tập viên kỳ cựu, hơn 10 năm kinh nghiệm',
        avatar: 'https://i.pravatar.cc/150?img=3',
        phone: '0934567890'
      },
      {
        email: 'editor2@baorong.com',
        password: 'password123',
        fullName: 'Lê Thị Hương',
        role: 'editor',
        bio: 'Biên tập viên chuyên mục Kinh tế & Thời sự',
        avatar: 'https://i.pravatar.cc/150?img=10',
        phone: '0945678901'
      },
      {
        email: 'admin@baorong.com',
        password: 'password123',
        fullName: 'Quản Trị Viên',
        role: 'admin',
        bio: 'Quản trị hệ thống Báo Rồng Vàng',
        avatar: 'https://i.pravatar.cc/150?img=8',
        phone: '0956789012'
      }
    ];

    const insertedUsers = {};
    for (const userData of usersData) {
      // Check if user exists
      const existing = await pool.query('SELECT id, email FROM users WHERE email = $1', [userData.email]);
      if (existing.rows.length > 0) {
        insertedUsers[userData.email] = existing.rows[0].id;
        continue;
      }
      const hashed = await bcrypt.hash(userData.password, 10);
      const result = await pool.query(
        `INSERT INTO users (email, password, "fullName", role, bio, avatar, phone)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [userData.email, hashed, userData.fullName, userData.role, userData.bio, userData.avatar, userData.phone]
      );
      insertedUsers[userData.email] = result.rows[0].id;
    }

    // Sample categories
    const categoriesData = [
      { name: 'Thời Sự', slug: 'thoisu', description: 'Tin tức thời sự trong nước và quốc tế', color: '#e53e3e', icon: '📰' },
      { name: 'Công Nghệ', slug: 'technology', description: 'Tin tức công nghệ, khoa học máy tính', color: '#3182ce', icon: '💻' },
      { name: 'Kinh Tế', slug: 'business', description: 'Tin tức kinh tế, tài chính, thị trường', color: '#38a169', icon: '💼' },
      { name: 'Thể Thao', slug: 'sports', description: 'Tin tức thể thao trong nước và quốc tế', color: '#dd6b20', icon: '⚽' },
      { name: 'Giải Trí', slug: 'entertainment', description: 'Tin tức giải trí, văn hóa, nghệ thuật', color: '#805ad5', icon: '🎬' },
      { name: 'Sức Khỏe', slug: 'health', description: 'Tin tức y tế, sức khỏe cộng đồng', color: '#319795', icon: '🏥' },
      { name: 'Giáo Dục', slug: 'education', description: 'Tin tức giáo dục, học thuật', color: '#d69e2e', icon: '📚' }
    ];

    const insertedCategories = {};
    for (const cat of categoriesData) {
      const existing = await pool.query('SELECT id, slug FROM categories WHERE slug = $1', [cat.slug]);
      if (existing.rows.length > 0) {
        insertedCategories[cat.slug] = existing.rows[0].id;
        continue;
      }
      const result = await pool.query(
        `INSERT INTO categories (name, slug, description, color, icon)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [cat.name, cat.slug, cat.description, cat.color, cat.icon]
      );
      insertedCategories[cat.slug] = result.rows[0].id;
    }

    // Sample published articles (so homepage has content)
    const author1Id = insertedUsers['author1@baorong.com'];
    const author2Id = insertedUsers['author2@baorong.com'];
    const editor1Id = insertedUsers['editor1@baorong.com'];

    const articlesData = [
      {
        title: 'Kinh tế Việt Nam 6 tháng đầu năm 2024: Tăng trưởng vượt kỳ vọng',
        excerpt: 'GDP 6 tháng đầu năm tăng 6,42%, cao nhất trong cùng kỳ 5 năm qua. Nhiều ngành lĩnh vực ghi nhận mức tăng trưởng tích cực.',
        content: 'Theo số liệu của Tổng cục Thống kê, tổng sản phẩm trong nước (GDP) 6 tháng đầu năm 2024 tăng 6,42% so với cùng kỳ năm trước, cao hơn mức tăng 3,72% của cùng kỳ năm 2023. Đây là mức tăng trưởng cao nhất trong giai đoạn 2019-2024.\n\nCác ngành kinh tế chủ lực tăng trưởng tích cực:\n- Khu vực nông, lâm nghiệp và thủy sản tăng 3,28%\n- Khu vực công nghiệp và xây dựng tăng 7,51%\n- Khu vực dịch vụ tăng 6,64%\n\nNhiều ngành công nghiệp chế biến, chế tạo ghi nhận mức tăng trưởng cao, đóng góp lớn vào tăng trưởng chung của nền kinh tế. Các chuyên gia kinh tế nhận định đây là tín hiệu tích cực cho thấy sự phục hồi bền vững của nền kinh tế Việt Nam.',
        category: 'business',
        author_id: author1Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80',
        readTime: 5,
        views: 1240,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        title: 'SpaceX phóng thành công tàu vũ trụ Starship thế hệ mới',
        excerpt: 'Tàu Starship của SpaceX đã hoàn thành chuyến bay thử nghiệm thành công, đánh dấu bước tiến lớn trong hành trình chinh phục sao Hỏa.',
        content: 'Công ty SpaceX của tỷ phú Elon Musk đã phóng thành công tàu vũ trụ Starship trong chuyến bay thử nghiệm mới nhất. Đây là cột mốc quan trọng trong hành trình chinh phục sao Hỏa.\n\nStarship là tên lửa mạnh nhất từng được chế tạo, với sức đẩy 7.500 tấn lực. Theo kế hoạch, Starship sẽ được sử dụng để đưa con người lên Mặt Trăng trong khuôn khổ chương trình Artemis của NASA, và sau đó là sao Hỏa.\n\nElon Musk cho biết mục tiêu của SpaceX là đưa con người lên sao Hỏa vào năm 2030, và Starship là phương tiện then chốt để thực hiện tham vọng này.',
        category: 'technology',
        author_id: author2Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&q=80',
        readTime: 4,
        views: 890,
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        title: 'Quốc hội thông qua nhiều luật quan trọng trong kỳ họp thứ 7',
        excerpt: 'Kỳ họp thứ 7 Quốc hội khóa XV đã thông qua nhiều luật quan trọng, ảnh hưởng sâu rộng đến đời sống kinh tế xã hội.',
        content: 'Tại kỳ họp thứ 7, Quốc hội khóa XV đã xem xét, thông qua nhiều luật quan trọng với tỷ lệ đại biểu tán thành cao.\n\nCác luật được thông qua bao gồm:\n- Luật Đất đai (sửa đổi) với 432/477 đại biểu tán thành\n- Luật Nhà ở (sửa đổi) với 424/477 đại biểu tán thành\n- Luật Kinh doanh bất động sản (sửa đổi)\n- Luật Tổ chức tín dụng (sửa đổi)\n\nTheo các chuyên gia, các luật mới này sẽ tạo ra bước đột phá trong cải cách thể chế, tháo gỡ các điểm nghẽn pháp lý, thúc đẩy phát triển kinh tế - xã hội.',
        category: 'thoisu',
        author_id: author1Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1575321729918-87a2a36d2c23?w=1200&q=80',
        readTime: 6,
        views: 2100,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        title: 'ĐT Việt Nam thắng thuyết phục, tiến gần hơn đến vòng loại cuối World Cup',
        excerpt: 'Với tỷ số 3-1, đội tuyển Việt Nam đã có chiến thắng quan trọng trong vòng loại World Cup 2026, củng cố vị trí trong bảng đấu.',
        content: 'Đội tuyển Việt Nam đã có màn trình diễn ấn tượng khi đánh bại đối thủ với tỷ số 3-1 trong trận đấu vòng loại World Cup 2026.\n\nCác bàn thắng đến từ:\n- Nguyễn Tiến Linh (phút 23)\n- Nguyễn Quang Hải (phút 56, penalty)\n- Trần Đình Trọng (phút 78)\n\nHuấn luyện viên trưởng nhận xét: "Đây là chiến thắng xứng đáng. Các cầu thủ đã thể hiện tinh thần đoàn kết và quyết tâm cao độ. Chúng tôi sẽ tiếp tục phấn đấu để hoàn thành mục tiêu đề ra."',
        category: 'sports',
        author_id: author2Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
        readTime: 3,
        views: 3400,
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
      },
      {
        title: 'iPhone 16 Pro Max: Những nâng cấp đột phá về camera và AI',
        excerpt: 'Apple chính thức ra mắt iPhone 16 Pro Max với chip A18 Pro, hệ thống camera hoàn toàn mới và nhiều tính năng AI thông minh.',
        content: 'Apple vừa chính thức ra mắt dòng iPhone 16, trong đó iPhone 16 Pro Max là mẫu máy đỉnh cao nhất với hàng loạt nâng cấp đột phá.\n\n**Camera:**\n- Camera chính 48MP với khẩu độ f/1.78 mới\n- Camera telephoto 12MP với zoom quang học 5x\n- Tính năng Camera Control mới\n\n**Hiệu năng:**\n- Chip A18 Pro với Neural Engine thế hệ mới\n- Hỗ trợ Apple Intelligence trên thiết bị\n- RAM 8GB\n\n**Pin và sạc:**\n- Pin 4685mAh, lớn nhất từ trước đến nay\n- Sạc nhanh 30W, sạc không dây 25W\n\nGiá bán tại Việt Nam dự kiến từ 34,990,000 VNĐ.',
        category: 'technology',
        author_id: author1Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80',
        readTime: 5,
        views: 5670,
        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
      },
      {
        title: 'Hà Nội triển khai thẻ vé điện tử cho hệ thống xe buýt toàn thành phố',
        excerpt: 'Từ tháng 7/2024, toàn bộ hệ thống xe buýt Hà Nội sẽ áp dụng thẻ vé điện tử thông minh, thay thế hoàn toàn vé giấy.',
        content: 'UBND thành phố Hà Nội vừa công bố kế hoạch triển khai hệ thống thẻ vé điện tử thông minh cho toàn bộ mạng lưới xe buýt công cộng từ tháng 7/2024.\n\nTheo đó, hành khách có thể sử dụng:\n- Thẻ vé điện tử chuyên dụng\n- Ứng dụng điện thoại thông minh\n- Thẻ ngân hàng hỗ trợ NFC\n\nHệ thống mới sẽ cho phép kết nối liên thông giữa các tuyến xe buýt, Metro và các phương tiện công cộng khác, hướng tới xây dựng một hệ sinh thái giao thông thông minh cho Hà Nội.',
        category: 'thoisu',
        author_id: author2Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
        readTime: 4,
        views: 780,
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      },
      {
        title: 'Chứng khoán Việt Nam phục hồi mạnh: VN-Index vượt mốc 1.300 điểm',
        excerpt: 'Sau giai đoạn điều chỉnh, thị trường chứng khoán Việt Nam đang cho thấy sức bật ấn tượng với VN-Index vượt ngưỡng kháng cự quan trọng.',
        content: 'Kết thúc phiên giao dịch hôm nay, VN-Index đóng cửa tại mức 1.312,45 điểm, tăng 18,23 điểm (+1,41%) so với phiên trước, chính thức vượt ngưỡng kháng cự tâm lý 1.300 điểm.\n\nThống kê giao dịch:\n- Khối lượng giao dịch: 850 triệu cổ phiếu\n- Giá trị giao dịch: 18.500 tỷ đồng\n- Số mã tăng: 287\n- Số mã giảm: 124\n\nCác chuyên gia phân tích nhận định thị trường đang trong xu hướng tích cực, được hỗ trợ bởi dòng tiền nội địa mạnh mẽ và triển vọng kinh tế vĩ mô tích cực.',
        category: 'business',
        author_id: author1Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
        readTime: 4,
        views: 1890,
        publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000)
      },
      {
        title: 'Google ra mắt Gemini 2.0: Bước đột phá trong trí tuệ nhân tạo',
        excerpt: 'Google DeepMind công bố Gemini 2.0 với khả năng xử lý đa phương tiện vượt trội và cửa sổ ngữ cảnh 2 triệu token.',
        content: 'Google DeepMind vừa chính thức ra mắt Gemini 2.0, mô hình AI thế hệ tiếp theo với nhiều cải tiến đột phá so với phiên bản tiền nhiệm.\n\n**Những điểm nổi bật:**\n- Cửa sổ ngữ cảnh 2 triệu token - gấp đôi so với Gemini 1.5\n- Khả năng xử lý video dài lên đến 2 giờ trong một lần truy vấn\n- Hỗ trợ đầu ra âm thanh và hình ảnh gốc\n- Hiệu suất vượt trội trên hầu hết các benchmark AI\n\nGemini 2.0 sẽ được tích hợp vào toàn bộ hệ sinh thái sản phẩm của Google, từ Search, Gmail cho đến Google Workspace.',
        category: 'technology',
        author_id: author2Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
        readTime: 5,
        views: 4200,
        publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000)
      },
      {
        title: 'Festival âm nhạc lớn nhất Đông Nam Á 2024 sắp diễn ra tại Hà Nội',
        excerpt: 'Sau thành công vang dội năm ngoái, Festival âm nhạc quốc tế Hà Nội 2024 hứa hẹn quy tụ hơn 200 nghệ sĩ từ 30 quốc gia.',
        content: 'Ban tổ chức vừa công bố danh sách lineup ấn tượng cho Festival âm nhạc quốc tế Hà Nội 2024, sự kiện âm nhạc lớn nhất từ trước đến nay tại Việt Nam.\n\nSự kiện sẽ diễn ra từ 15-17/11/2024 tại Khu liên hợp thể thao quốc gia Mỹ Đình với:\n- 3 sân khấu chính hoạt động đồng thời\n- Hơn 200 nghệ sĩ và ban nhạc từ 30 quốc gia\n- 60.000 khán giả mỗi đêm\n\nVé đã được bán ra và đang trong tình trạng cháy vé cho hầu hết các hạng.',
        category: 'entertainment',
        author_id: author1Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
        readTime: 3,
        views: 2300,
        publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000)
      },
      {
        title: 'Hướng dẫn chăm sóc sức khỏe tâm thần trong thời đại số',
        excerpt: 'Các chuyên gia tâm lý chia sẻ những phương pháp hiệu quả để duy trì sức khỏe tâm thần trong bối cảnh công nghệ số ngày càng chi phối cuộc sống.',
        content: 'Trong thời đại công nghệ số, áp lực từ mạng xã hội và môi trường làm việc liên tục đang ảnh hưởng nghiêm trọng đến sức khỏe tâm thần của nhiều người.\n\n**5 phương pháp chăm sóc sức khỏe tâm thần hiệu quả:**\n\n1. **Đặt giới hạn thời gian dùng điện thoại**: Áp dụng quy tắc "no-phone zone" trong bữa ăn và trước khi ngủ\n\n2. **Thực hành mindfulness**: Dành 10-15 phút mỗi ngày cho thiền định và hít thở có ý thức\n\n3. **Duy trì kết nối xã hội thực**: Gặp gỡ bạn bè và gia đình thay vì chỉ giao tiếp qua mạng\n\n4. **Vận động thể chất đều đặn**: Ít nhất 30 phút tập thể dục mỗi ngày\n\n5. **Tìm kiếm sự trợ giúp chuyên nghiệp**: Không ngại tham khảo ý kiến chuyên gia tâm lý khi cần',
        category: 'health',
        author_id: author2Id,
        editor_id: editor1Id,
        status: 'published',
        image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&q=80',
        readTime: 6,
        views: 1560,
        publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000)
      }
    ];

    for (const article of articlesData) {
      const existing = await pool.query(
        'SELECT id FROM articles WHERE title = $1 AND author_id = $2',
        [article.title, article.author_id]
      );
      if (existing.rows.length > 0) continue;

      await pool.query(
        `INSERT INTO articles (title, excerpt, content, category, author_id, editor_id, status, image, "readTime", views, "publishedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          article.title, article.excerpt, article.content, article.category,
          article.author_id, article.editor_id, article.status, article.image,
          article.readTime, article.views || 0, article.publishedAt || null
        ]
      );
    }

    // Initialize editor stats for editors
    const editors = [
      { email: 'editor1@baorong.com' },
      { email: 'editor2@baorong.com' }
    ];
    for (const editor of editors) {
      const editorId = insertedUsers[editor.email];
      if (!editorId) continue;
      const existing = await pool.query('SELECT id FROM editor_stats WHERE editor_id = $1', [editorId]);
      if (existing.rows.length === 0) {
        await pool.query(
          `INSERT INTO editor_stats (editor_id, "articlesReviewed", "articlesApproved", "articlesRejected", "approvalRate")
           VALUES ($1, 0, 0, 0, 0)`,
          [editorId]
        );
      }
    }

    console.log('✓ Database seeded with sample data');
    console.log('\n─── Test Accounts ───────────────────────────');
    console.log('Author:  author1@baorong.com / password123');
    console.log('Author:  author2@baorong.com / password123');
    console.log('Editor:  editor1@baorong.com / password123');
    console.log('Editor:  editor2@baorong.com / password123');
    console.log('Admin:   admin@baorong.com   / password123');
    console.log('─────────────────────────────────────────────');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = { seedDatabase };
