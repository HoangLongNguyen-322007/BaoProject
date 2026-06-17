/**
 * Seed script: Thêm nhiều bài báo mẫu (batch 2)
 * Chạy: node scripts/seed-articles-batch2.js
 */
const { pool } = require('../src/backend/config/database');

const AUTHORS = [
  '0b4c14b1-ccbf-4338-a5d0-ac36adc508b0',
  'e55ee61d-a021-46b7-868a-1ce1613c2382',
  'c6f3e57f-e68b-46c5-a6f6-cb6b12c43b66',
];

function randomAuthor() {
  return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
}

function randomDate(daysBack = 45) {
  const now = Date.now();
  const offset = Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(now - offset).toISOString();
}

const ARTICLES = [
  // ==================== THỜI SỰ (thêm) ====================
  {
    title: 'Việt Nam đăng cai tổ chức APEC 2027 tại Đà Nẵng',
    excerpt: 'Việt Nam chính thức được chọn làm chủ nhà Hội nghị APEC 2027, dự kiến đón hơn 10.000 đại biểu quốc tế.',
    content: `Việt Nam chính thức nhận quyền đăng cai tổ chức Hội nghị Hợp tác Kinh tế châu Á - Thái Bình Dương (APEC) 2027 tại Đà Nẵng, đánh dấu lần thứ 3 Việt Nam tổ chức sự kiện quốc tế quan trọng này.

Dự kiến hơn 10.000 đại biểu từ 21 nền kinh tế thành viên sẽ tham dự, với chủ đề "Kết nối và Đổi mới: Xây dựng tương lai bền vững châu Á - Thái Bình Dương".

Thủ tướng nhấn mạnh APEC 2027 là cơ hội lớn để Việt Nam khẳng định vai trò ngày càng quan trọng trong khu vực, đồng thời thúc đẩy hợp tác kinh tế và thương mại.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Đường sắt cao tốc Bắc Nam: Quốc hội thông qua chủ trương đầu tư',
    excerpt: 'Siêu dự án 67 tỷ USD được Quốc hội chấp thuận, dự kiến khởi công năm 2027 và hoàn thành năm 2035.',
    content: `Quốc hội đã bỏ phiếu thông qua chủ trương đầu tư dự án đường sắt tốc độ cao trên trục Bắc - Nam với 443/480 phiếu tán thành.

Dự án có tổng chiều dài 1.541 km, kết nối Hà Nội với TP.HCM chỉ trong 5 giờ thay vì 30 giờ hiện tại. Tốc độ thiết kế 350 km/h, tốc độ khai thác 300 km/h.

Tổng vốn đầu tư ước tính 67 tỷ USD, chia thành 3 giai đoạn. Giai đoạn 1 (Hà Nội - Vinh và TP.HCM - Nha Trang) sẽ khởi công năm 2027 và khai thác thương mại từ năm 2032.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Chính phủ ban hành Nghị định mới về quản lý mạng xã hội',
    excerpt: 'Nghị định yêu cầu xác thực danh tính người dùng và quy định trách nhiệm của các nền tảng mạng xã hội.',
    content: `Chính phủ vừa ban hành Nghị định mới về quản lý, cung cấp và sử dụng dịch vụ Internet và thông tin trên mạng, trong đó có nhiều quy định mới về mạng xã hội.

Theo nghị định, từ 01/01/2027, tất cả người dùng mạng xã hội tại Việt Nam phải xác thực danh tính bằng số CCCD/Hộ chiếu. Các nền tảng có trách nhiệm ngăn chặn thông tin sai lệch trong vòng 24 giờ.

Bộ TT&TT cho biết đây là biện pháp cần thiết để bảo vệ quyền lợi người dùng, ngăn chặn lừa đảo trực tuyến và tin giả.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Hà Nội khởi công xây dựng 10.000 căn nhà ở xã hội',
    excerpt: 'Dự án nhà ở xã hội lớn nhất lịch sử Thủ đô, giá bán chỉ từ 15 triệu đồng/m2.',
    content: `UBND TP Hà Nội đã khởi công đồng loạt 5 dự án nhà ở xã hội với tổng cộng 10.000 căn hộ, phục vụ nhu cầu nhà ở cho công nhân, người thu nhập thấp.

Các dự án phân bổ tại: Gia Lâm (3.000 căn), Đông Anh (2.500 căn), Hoài Đức (2.000 căn), Thanh Trì (1.500 căn) và Nam Từ Liêm (1.000 căn).

Giá bán dự kiến từ 15-20 triệu đồng/m2, thấp hơn 40-50% so với thị trường. Hộ gia đình đủ điều kiện có thể vay ưu đãi lãi suất 4,8%/năm trong 25 năm.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    readTime: 4,
  },

  // ==================== THẾ GIỚI (thêm) ====================
  {
    title: 'Liên Hợp Quốc thông qua hiệp ước bảo vệ đại dương toàn cầu',
    excerpt: 'Hiệp ước lịch sử đặt mục tiêu bảo vệ 30% diện tích đại dương vào năm 2030.',
    content: `Đại Hội đồng Liên Hợp Quốc đã chính thức thông qua Hiệp ước Biển cả (High Seas Treaty) sau gần 20 năm đàm phán.

Hiệp ước đặt mục tiêu bảo vệ 30% diện tích đại dương toàn cầu vào năm 2030, thiết lập các khu bảo tồn biển tại vùng biển quốc tế, và yêu cầu đánh giá tác động môi trường cho tất cả các hoạt động khai thác.

Tổng Thư ký LHQ tuyên bố: "Đây là chiến thắng lịch sử cho thiên nhiên. Đại dương nuôi sống hàng tỷ người và là lá phổi của hành tinh."`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'SpaceX hoàn thành chuyến bay du lịch không gian đầu tiên quanh Mặt Trăng',
    excerpt: 'Phi hành đoàn dân sự 4 người đã bay quanh Mặt Trăng thành công trong 6 ngày.',
    content: `SpaceX đã hoàn thành chuyến bay du lịch không gian đầu tiên quanh Mặt Trăng bằng tàu Starship, đưa 4 hành khách dân sự bay quanh vệ tinh tự nhiên của Trái Đất.

Hành trình kéo dài 6 ngày, trong đó phi hành đoàn đã bay cách bề mặt Mặt Trăng chỉ 200 km, chụp hàng nghìn bức ảnh và thực hiện thí nghiệm khoa học.

Tỷ phú Yusaku Maezawa (Nhật Bản), người tài trợ chuyến bay, chia sẻ: "Nhìn Trái Đất từ quỹ đạo Mặt Trăng là trải nghiệm thay đổi cuộc đời tôi. Tôi hy vọng trong tương lai mọi người đều có thể trải nghiệm điều này."`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Hàn Quốc - Triều Tiên nối lại đàm phán cấp cao sau 5 năm gián đoạn',
    excerpt: 'Hai miền Triều Tiên đã nhất trí giảm căng thẳng quân sự và mở lại tuyến liên lạc nóng.',
    content: `Sau 5 năm gián đoạn, lãnh đạo Hàn Quốc và Triều Tiên đã tiến hành cuộc đàm phán cấp cao tại Bàn Môn Điếm, đạt được thỏa thuận giảm căng thẳng quân sự.

Hai bên nhất trí: mở lại tuyến liên lạc nóng liên Triều, giảm quy mô tập trận quân sự gần biên giới, và khôi phục dự án hợp tác kinh tế Kaesong.

Tổng thống Hàn Quốc phát biểu: "Đây là bước đi đầu tiên nhưng quan trọng hướng tới hòa bình lâu dài trên bán đảo Triều Tiên."

Cộng đồng quốc tế hoan nghênh động thái này, Mỹ và Trung Quốc đều bày tỏ ủng hộ.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    readTime: 4,
  },

  // ==================== KINH DOANH (thêm) ====================
  {
    title: 'Việt Nam lọt Top 20 nền kinh tế lớn nhất thế giới',
    excerpt: 'GDP Việt Nam đạt 550 tỷ USD, vượt qua Thụy Điển và Đài Loan trên bảng xếp hạng kinh tế toàn cầu.',
    content: `Theo số liệu mới nhất của Quỹ Tiền tệ Quốc tế (IMF), GDP danh nghĩa của Việt Nam năm 2026 ước đạt 550 tỷ USD, chính thức lọt vào Top 20 nền kinh tế lớn nhất thế giới.

Với tốc độ tăng trưởng trung bình 7%/năm trong thập kỷ qua, Việt Nam đã vượt qua Thụy Điển, Đài Loan và Philippines trên bảng xếp hạng.

Thủ tướng nhấn mạnh: "Đây là thành quả của 40 năm Đổi Mới. Mục tiêu tiếp theo là trở thành nước phát triển, thu nhập cao vào năm 2045."`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Ngành bán dẫn Việt Nam: Cuộc đua thu hút đầu tư tỷ đô',
    excerpt: 'Intel, Samsung và TSMC đang cân nhắc mở rộng nhà máy chip tại Việt Nam, tổng vốn đầu tư hơn 10 tỷ USD.',
    content: `Ngành công nghiệp bán dẫn tại Việt Nam đang bước vào giai đoạn bùng nổ khi hàng loạt tập đoàn công nghệ lớn tuyên bố kế hoạch đầu tư.

Intel dự kiến nâng tổng vốn đầu tư tại Việt Nam lên 5 tỷ USD. Samsung mở rộng nhà máy đóng gói chip tại Thái Nguyên với 3 tỷ USD. TSMC đang khảo sát địa điểm cho nhà máy trị giá 3,5 tỷ USD.

Chính phủ đã ban hành chính sách ưu đãi đặc biệt cho ngành bán dẫn: miễn thuế thu nhập doanh nghiệp 4 năm, giảm 50% trong 9 năm tiếp theo, và hỗ trợ đào tạo 50.000 kỹ sư bán dẫn vào năm 2030.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Grab IPO trên sàn chứng khoán Việt Nam, vốn hóa 1 tỷ USD',
    excerpt: 'Grab Việt Nam trở thành startup unicorn đầu tiên niêm yết trên sàn HOSE.',
    content: `Grab Việt Nam đã chính thức niêm yết cổ phiếu trên Sở Giao dịch Chứng khoán TP.HCM (HOSE) với mã GRB, trở thành startup công nghệ đầu tiên IPO trên sàn chứng khoán Việt Nam.

Giá chào sàn 50.000 đồng/cổ phiếu, vốn hóa ban đầu đạt khoảng 25.000 tỷ đồng (1 tỷ USD). Phiên giao dịch đầu tiên ghi nhận thanh khoản kỷ lục với hơn 5 triệu cổ phiếu được khớp lệnh.

CEO Grab Việt Nam chia sẻ: "IPO tại Việt Nam là cam kết lâu dài của chúng tôi với thị trường 100 triệu dân. Chúng tôi sẽ tiếp tục đầu tư mạnh vào fintech, logistics và AI."`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Xuất khẩu nông sản Việt Nam lập kỷ lục 60 tỷ USD',
    excerpt: 'Cà phê, gạo, trái cây và thủy sản là bốn mặt hàng xuất khẩu tỷ đô của ngành nông nghiệp.',
    content: `Theo Bộ Nông nghiệp và Phát triển Nông thôn, tổng kim ngạch xuất khẩu nông, lâm, thủy sản năm 2026 ước đạt 60 tỷ USD, tăng 15% so với năm 2025.

Bốn mặt hàng tỷ đô: cà phê (5,5 tỷ USD), gạo (4,8 tỷ USD), trái cây (4,2 tỷ USD) và tôm (4 tỷ USD). Đặc biệt, sầu riêng đạt 3,5 tỷ USD, gấp 3 lần năm 2024 nhờ xuất khẩu chính ngạch sang Trung Quốc.

Bộ trưởng NN&PTNT nhấn mạnh: "Nông nghiệp Việt Nam đang chuyển mình mạnh mẽ từ sản xuất đại trà sang nông nghiệp công nghệ cao, sạch, hữu cơ và có giá trị gia tăng."`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    readTime: 4,
  },

  // ==================== CÔNG NGHỆ (thêm) ====================
  {
    title: 'VNPT ra mắt mạng 5G SA toàn quốc với tốc độ thực tế 2 Gbps',
    excerpt: 'Việt Nam trở thành quốc gia đầu tiên trong ASEAN triển khai 5G Standalone trên phạm vi toàn quốc.',
    content: `Tập đoàn VNPT chính thức ra mắt dịch vụ 5G Standalone (5G SA) trên phạm vi 63 tỉnh thành, đánh dấu Việt Nam là quốc gia đầu tiên trong ASEAN triển khai 5G SA quy mô toàn quốc.

Tốc độ thực tế đo được tại các thành phố lớn đạt 1,5-2 Gbps (download), gấp 20 lần so với 4G. Độ trễ siêu thấp dưới 5ms, mở ra khả năng ứng dụng IoT, xe tự lái, phẫu thuật từ xa.

VNPT đã đầu tư hơn 3 tỷ USD cho hạ tầng 5G, bao gồm 50.000 trạm phát sóng mới trên toàn quốc.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Google mở Trung tâm AI tại Hà Nội, tuyển 500 kỹ sư Việt Nam',
    excerpt: 'Đây là trung tâm nghiên cứu AI đầu tiên của Google tại Đông Nam Á lục địa.',
    content: `Google đã chính thức khai trương Trung tâm Nghiên cứu và Phát triển AI tại Tây Hồ Tây, Hà Nội - trung tâm AI đầu tiên của hãng tại Đông Nam Á lục địa.

Trung tâm sẽ tập trung vào 3 lĩnh vực: xử lý ngôn ngữ tự nhiên tiếng Việt, thị giác máy tính ứng dụng cho nông nghiệp, và AI hỗ trợ y tế. Google dự kiến tuyển 500 kỹ sư và nhà nghiên cứu Việt Nam trong 2 năm tới.

CEO Google Cloud chia sẻ: "Việt Nam có nguồn nhân lực CNTT chất lượng cao, chi phí cạnh tranh, và chính phủ ủng hộ mạnh mẽ AI. Đây là điểm đến lý tưởng cho R&D."`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Meta ra mắt kính AR Quest Pro 3: Thế giới thực và ảo hòa làm một',
    excerpt: 'Kính AR mới của Meta cho phép tương tác với đối tượng ảo trong môi trường thực với độ trễ gần bằng 0.',
    content: `Meta đã ra mắt Quest Pro 3, kính thực tế tăng cường (AR) tiên tiến nhất từ trước đến nay, mở ra kỷ nguyên mới cho "spatial computing".

Quest Pro 3 sử dụng tấm nền micro-OLED với độ phân giải 4K mỗi mắt, khả năng passthrough (nhìn xuyên) màu sắc chân thực với độ trễ chỉ 5ms. Chip Snapdragon XR3 Gen 2 cho hiệu năng đồ họa ngang PC gaming.

Mark Zuckerberg tuyên bố: "Quest Pro 3 là sản phẩm AR đầu tiên thực sự sẵn sàng thay thế màn hình máy tính. Bạn có thể làm việc, giải trí và giao tiếp mà không cần bất kỳ màn hình vật lý nào."

Giá bán 999 USD, thấp hơn đáng kể so với Apple Vision Pro (3.499 USD).`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Pin thể rắn Toyota sạc đầy trong 10 phút, đi 1.200 km',
    excerpt: 'Toyota công bố bước đột phá trong công nghệ pin thể rắn, hứa hẹn cách mạng xe điện.',
    content: `Toyota đã công bố thành công trong phát triển pin thể rắn (solid-state battery) thế hệ mới, với khả năng sạc đầy trong 10 phút và phạm vi hoạt động lên tới 1.200 km.

Pin mới có mật độ năng lượng 900 Wh/L, gấp đôi pin lithium-ion hiện tại. Tuổi thọ pin lên đến 3.000 chu kỳ sạc (tương đương 15 năm sử dụng), và hoạt động tốt trong dải nhiệt độ -30 đến 60°C.

Toyota dự kiến bắt đầu sản xuất hàng loạt pin thể rắn từ năm 2028, đầu tiên trang bị cho dòng Lexus cao cấp, sau đó mở rộng sang Toyota Camry và Corolla EV.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    readTime: 4,
  },

  // ==================== THỂ THAO (thêm) ====================
  {
    title: 'Nguyễn Thị Oanh phá kỷ lục châu Á chạy 5.000m tại Diamond League',
    excerpt: 'VĐV Việt Nam về đích với thời gian 14 phút 28 giây, xóa kỷ lục châu Á tồn tại 15 năm.',
    content: `Nguyễn Thị Oanh đã tạo nên cú sốc tại giải Diamond League Stockholm (Thụy Điển) khi phá kỷ lục châu Á nội dung chạy 5.000m nữ với thời gian 14 phút 28 giây 35.

Thành tích này xóa bỏ kỷ lục 14:39.89 do VĐV Trung Quốc Jiang Bo thiết lập năm 2011, và đưa Oanh vào Top 10 thế giới trong năm 2026.

"Tôi đã chuẩn bị rất kỹ cho chặng đua này. Khi cách đích 400m, tôi biết mình có thể phá kỷ lục," Oanh chia sẻ trong nước mắt.

Thành tích này giúp Nguyễn Thị Oanh trở thành ứng viên sáng giá cho huy chương Olympic 2028.`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c5e78?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Giải bóng rổ VBA 2026: Saigon Heat vô địch lần thứ 5',
    excerpt: 'Saigon Heat đánh bại Hanoi Buffaloes 4-2 trong series chung kết kịch tính.',
    content: `Saigon Heat đã giành chức vô địch VBA (Vietnam Basketball Association) mùa giải 2026 sau khi đánh bại Hanoi Buffaloes 4-2 trong series chung kết.

Trận đấu quyết định Game 6 tại nhà thi đấu Phú Thọ đã thu hút 5.000 khán giả - kỷ lục mới của giải bóng rổ chuyên nghiệp Việt Nam. Guard người Mỹ Mike Johnson được bầu là MVP chung kết với trung bình 28 điểm, 8 kiến tạo mỗi trận.

CEO VBA chia sẻ: "Bóng rổ đang phát triển rất nhanh tại Việt Nam. Mùa giải sau, chúng tôi sẽ mở rộng lên 10 đội và phát sóng trực tiếp trên truyền hình quốc gia."`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'ĐT bóng đá nữ Việt Nam giành vé dự World Cup 2027',
    excerpt: 'Chiến thắng 2-0 trước Thái Lan giúp Việt Nam lần thứ 2 liên tiếp góp mặt tại World Cup nữ.',
    content: `Đội tuyển bóng đá nữ Việt Nam đã chính thức giành vé tham dự FIFA Women's World Cup 2027 tại Brazil sau chiến thắng 2-0 trước Thái Lan ở vòng loại khu vực châu Á.

Hai bàn thắng đến từ Huỳnh Như (phút 55) và Nguyễn Thị Bích Thùy (phút 73) đã giúp Việt Nam kết thúc vòng loại với thành tích bất bại.

HLV Mai Đức Chung chia sẻ: "Lần này chúng tôi sẽ chuẩn bị tốt hơn. Mục tiêu là vượt qua vòng bảng và ghi dấu ấn trên sân chơi thế giới."`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    readTime: 3,
  },

  // ==================== GIẢI TRÍ (thêm) ====================
  {
    title: 'Đen Vâu phát hành album hợp tác cùng các nghệ sĩ châu Á',
    excerpt: 'Album "Châu Á Thức Giấc" quy tụ nghệ sĩ từ Hàn Quốc, Nhật Bản, Thái Lan và Philippines.',
    content: `Rapper Đen Vâu gây bất ngờ với album hợp tác quốc tế "Châu Á Thức Giấc" (Asia Awakens), quy tụ các nghệ sĩ nổi tiếng từ khắp châu Á.

Album gồm 10 ca khúc, trong đó "Monsoon" (ft. BTS Jin) là single chủ đạo, "Sakura Tears" hợp tác cùng nhạc sĩ Nhật Yojiro Noda, và "Mekong Flow" cùng rapper Thái Lan F.Hero.

Đen Vâu chia sẻ: "Tôi muốn chứng minh rằng nhạc Việt có thể đối thoại bình đẳng với nhạc quốc tế. Châu Á có vô số câu chuyện cần được kể qua âm nhạc."

Album đạt Top 5 Spotify Global Albums Chart trong tuần đầu phát hành.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Netflix đầu tư 100 triệu USD cho nội dung phim Việt Nam',
    excerpt: 'Netflix công bố kế hoạch sản xuất 20 bộ phim và series tiếng Việt gốc trong 3 năm tới.',
    content: `Netflix đã ký thỏa thuận trị giá 100 triệu USD với các nhà sản xuất phim Việt Nam để sản xuất 20 bộ phim và series gốc trong giai đoạn 2026-2028.

Trong số đó có 5 phim điện ảnh, 10 series truyền hình và 5 phim tài liệu, bao phủ các thể loại: kinh dị, hành động, tình cảm, lịch sử và phim tài liệu xã hội.

Giám đốc nội dung Netflix châu Á cho biết: "Phim Việt Nam có tiềm năng rất lớn. Khán giả toàn cầu ngày càng yêu thích các câu chuyện đa dạng văn hóa, và Việt Nam là một trong những thị trường sáng tạo nhất châu Á."

Series đầu tiên, "Sài Gòn 1968" (phim lịch sử), dự kiến ra mắt tháng 3/2027.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Lễ hội âm nhạc Monsoon lập kỷ lục 200.000 khán giả',
    excerpt: 'Monsoon Music Festival 2026 tại Hà Nội quy tụ 50 nghệ sĩ trong và ngoài nước trong 3 ngày.',
    content: `Monsoon Music Festival 2026 đã kết thúc thành công rực rỡ tại Công viên Yên Sở, Hà Nội với kỷ lục 200.000 lượt khán giả trong 3 ngày.

50 nghệ sĩ tham gia biểu diễn trên 5 sân khấu, bao gồm các tên tuổi quốc tế như Imagine Dragons, LANY, Dua Lipa, cùng các nghệ sĩ Việt Nam: Sơn Tùng M-TP, Hà Anh Tuấn, Đen Vâu, Hoàng Thùy Linh.

Đạo diễn âm nhạc Quốc Trung chia sẻ: "Monsoon 2026 là phiên bản hoành tráng nhất từ trước đến nay. Chúng tôi muốn Hà Nội trở thành thủ đô âm nhạc của Đông Nam Á."`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    readTime: 3,
  },

  // ==================== SỨC KHỎE (thêm) ====================
  {
    title: 'Phát hiện đột phá: Thuốc mới có thể đảo ngược quá trình lão hóa tế bào',
    excerpt: 'Nhóm nghiên cứu quốc tế công bố thuốc senolytic thế hệ mới giúp "trẻ hóa" tế bào trong chuột.',
    content: `Một nhóm nghiên cứu quốc tế do ĐH Harvard dẫn đầu vừa công bố trên tạp chí Nature thuốc senolytic thế hệ mới SEN-001 có khả năng loại bỏ tế bào lão hóa và kích hoạt tái tạo tế bào mới.

Thí nghiệm trên chuột cho thấy SEN-001 giúp: tuổi sinh học giảm 30%, cải thiện chức năng tim mạch 40%, tăng cường trí nhớ 25%, và kéo dài tuổi thọ 20%.

GS. David Sinclair (Harvard) chia sẻ: "Đây là bước tiến lớn nhất trong lĩnh vực chống lão hóa. Chúng tôi kỳ vọng bắt đầu thử nghiệm lâm sàng trên người vào năm 2028."`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Việt Nam kiểm soát thành công dịch cúm gia cầm H5N1 mới',
    excerpt: 'Bộ Y tế triển khai tiêm phòng khẩn cấp sau khi phát hiện biến chủng mới tại Đồng bằng sông Cửu Long.',
    content: `Bộ Y tế Việt Nam thông báo đã kiểm soát thành công ổ dịch cúm gia cầm H5N1 biến chủng mới xuất hiện tại 3 tỉnh Đồng bằng sông Cửu Long (Đồng Tháp, An Giang, Long An).

Tổng cộng 15 ca nhiễm đã được phát hiện và điều trị kịp thời, không có trường hợp tử vong. Hơn 500.000 gia cầm trong bán kính 3 km quanh ổ dịch đã được tiêu hủy.

Bộ trưởng Bộ Y tế cho biết: "Nhờ hệ thống giám sát dịch bệnh được nâng cấp và vaccine dự phòng sẵn có, Việt Nam đã phản ứng nhanh chóng và hiệu quả."`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Yoga và thiền định được đưa vào chương trình chăm sóc sức khỏe nhân viên',
    excerpt: '60% doanh nghiệp lớn tại Việt Nam đã tích hợp yoga, thiền định vào chính sách phúc lợi.',
    content: `Theo khảo sát của Viện Nghiên cứu Quản lý Kinh tế Trung ương (CIEM), 60% doanh nghiệp có trên 500 nhân viên tại Việt Nam đã tích hợp yoga, thiền định hoặc các chương trình mindfulness vào chính sách phúc lợi.

Nghiên cứu cho thấy: doanh nghiệp áp dụng chương trình wellness ghi nhận năng suất lao động tăng 15%, tỷ lệ nghỉ ốm giảm 25% và mức độ hài lòng nhân viên tăng 30%.

Vingroup, FPT, Viettel là những doanh nghiệp tiên phong, cung cấp phòng yoga, thiền định ngay tại văn phòng và trợ cấp gym cho nhân viên.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    readTime: 3,
  },

  // ==================== GIÁO DỤC (thêm) ====================
  {
    title: 'Học sinh Việt Nam giành 6 Huy chương Vàng Olympic Toán quốc tế',
    excerpt: 'Đoàn Việt Nam xếp hạng 2 thế giới tại IMO 2026, thành tích tốt nhất trong lịch sử.',
    content: `Đoàn học sinh Việt Nam đã có kỳ thi Olympic Toán quốc tế (IMO) 2026 tại Oslo, Na Uy xuất sắc nhất lịch sử khi giành 6 Huy chương Vàng trên 6 thí sinh.

Đặc biệt, học sinh Nguyễn Minh Quân (THPT chuyên Khoa học Tự nhiên, Hà Nội) đạt điểm tuyệt đối 42/42, trở thành một trong 5 thí sinh hoàn hảo của kỳ thi.

Đoàn Việt Nam xếp hạng 2 thế giới (sau Trung Quốc), vượt qua Mỹ, Hàn Quốc, Nhật Bản.

Bộ trưởng GD&ĐT gửi thư chúc mừng và công bố mỗi HCV sẽ được thưởng 100 triệu đồng cùng học bổng toàn phần du học.`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Đại học trực tuyến VN: Hơn 1 triệu sinh viên theo học',
    excerpt: 'Hệ thống đại học trực tuyến phát triển mạnh mẽ với chất lượng được quốc tế công nhận.',
    content: `Số sinh viên theo học đại học trực tuyến tại Việt Nam đã vượt mốc 1 triệu người, tăng gấp 5 lần so với năm 2020. Trong đó, 40% là người đi làm muốn nâng cao trình độ.

Các nền tảng phổ biến nhất: FPT Edu Online (350.000 SV), VNU Online (200.000 SV), HCMUT e-Learning (150.000 SV). Chương trình đào tạo được Bộ GD&ĐT và nhiều tổ chức quốc tế công nhận.

Chi phí học phí trực tuyến thấp hơn 50-70% so với chính quy, trong khi bằng cấp được đánh giá tương đương.

"Giáo dục trực tuyến là cuộc cách mạng thực sự, xóa bỏ rào cản địa lý và kinh tế trong tiếp cận giáo dục đại học," GS Phạm Quang Trung nhận xét.`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Chương trình STEM quốc gia: 5 triệu học sinh được đào tạo',
    excerpt: 'Bộ GD&ĐT triển khai chương trình STEM từ lớp 3, trang bị phòng lab cho 15.000 trường.',
    content: `Chương trình giáo dục STEM quốc gia đã đào tạo 5 triệu học sinh từ lớp 3 đến lớp 12 trên toàn quốc, với 15.000 trường được trang bị phòng thí nghiệm STEM hiện đại.

Chương trình bao gồm: robot, lập trình, in 3D, điện tử cơ bản, và thí nghiệm khoa học. Giáo viên được đào tạo theo chuẩn MIT STEM (Mỹ) với sự hỗ trợ của USAID.

Kết quả khảo sát cho thấy: học sinh tham gia STEM có tư duy logic tốt hơn 35%, khả năng giải quyết vấn đề tăng 40% so với nhóm đối chứng.

Phó Thủ tướng nhấn mạnh: "STEM là nền tảng để Việt Nam đào tạo thế hệ công dân 4.0."`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    readTime: 4,
  },

  // ==================== DU LỊCH (thêm) ====================
  {
    title: 'Ninh Bình đón lượng khách kỷ lục sau phim "Kong: Skull Island 2"',
    excerpt: 'Hiệu ứng phim bom tấn Hollywood giúp Ninh Bình tăng 80% lượng khách quốc tế.',
    content: `Ninh Bình đón 3,5 triệu lượt khách du lịch trong 6 tháng đầu năm 2026, tăng 60% so với cùng kỳ, trong đó khách quốc tế tăng 80%. Nguyên nhân chính là "hiệu ứng Kong" sau khi phần tiếp theo của bom tấn Hollywood "Kong: Skull Island 2" được phát hành.

Phim quay nhiều cảnh tại Tràng An, Tam Cốc, hang Múa và Vân Long, giúp Ninh Bình trở thành điểm đến "must-visit" trên bản đồ du lịch thế giới.

Lượng du khách đến từ Mỹ, châu Âu và Australia tăng đặc biệt mạnh. Nhiều tour "Kong Tour" được thiết kế riêng, đưa du khách thăm các địa điểm quay phim.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Việt Nam lọt Top 10 điểm đến ẩm thực hàng đầu thế giới 2026',
    excerpt: 'CNN Travel vinh danh Việt Nam trong danh sách "Best Food Destinations" nhờ phở, bánh mì, bún chả.',
    content: `CNN Travel đã xếp Việt Nam ở vị trí thứ 4 trong danh sách "Top 10 điểm đến ẩm thực hàng đầu thế giới 2026", sau Nhật Bản, Ý và Mexico.

Phở, bánh mì, bún chả Hà Nội, cơm tấm Sài Gòn và phở cuốn được đánh giá là những món ăn "phải thử" khi đến Việt Nam. CNN cũng đặc biệt khen ngợi street food Việt Nam vì sự đa dạng, phong phú và giá cả phải chăng.

Anthony Bourdain (cố đầu bếp nổi tiếng) từng nói: "Việt Nam có nền ẩm thực đường phố tốt nhất hành tinh." Nhận định này tiếp tục được khẳng định qua giải thưởng.

Tour ẩm thực đường phố tại Hà Nội và TP.HCM đang là xu hướng nóng nhất, thu hút hàng triệu food blogger quốc tế.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Côn Đảo mở rộng sân bay, đón đường bay quốc tế đầu tiên',
    excerpt: 'Sân bay Côn Đảo nâng cấp có thể đón máy bay Airbus A321, mở tuyến bay thẳng từ Seoul và Đài Bắc.',
    content: `Sân bay Côn Đảo (Côn Sơn) đã hoàn thành giai đoạn mở rộng, nâng công suất từ 400.000 lên 2 triệu hành khách/năm, có thể tiếp nhận máy bay Airbus A321.

Bamboo Airways và Vietjet Air ngay lập tức mở đường bay thẳng từ Seoul (Hàn Quốc) và Đài Bắc (Đài Loan) đến Côn Đảo, đánh dấu lần đầu tiên hòn đảo lịch sử đón chuyến bay quốc tế.

UBND tỉnh Bà Rịa - Vũng Tàu cho biết: "Côn Đảo sẽ phát triển du lịch sinh thái cao cấp, hạn chế số lượng khách để bảo vệ hệ sinh thái biển quý giá. Chúng tôi không muốn lặp lại bài học phát triển ồ ạt của các điểm đến khác."

Giá vé máy bay Hà Nội - Côn Đảo từ 1,5 triệu đồng, TP.HCM - Côn Đảo từ 800.000 đồng.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Du lịch golf Việt Nam bùng nổ: 100 sân golf đạt chuẩn quốc tế',
    excerpt: 'Việt Nam trở thành điểm đến golf hàng đầu châu Á với 100 sân đạt chuẩn, thu hút golfer toàn cầu.',
    content: `Với 100 sân golf đạt chuẩn quốc tế, Việt Nam đã vươn lên trở thành điểm đến golf số 1 Đông Nam Á và Top 5 châu Á.

Các sân golf nổi tiếng: BRG Kings Island (Hà Nội), Vinpearl Golf (Nha Trang), The Bluffs Hồ Tràm (Bà Rịa - Vũng Tàu) liên tục được các tạp chí quốc tế bình chọn.

Du lịch golf mang về 1,2 tỷ USD doanh thu mỗi năm. Golfer quốc tế, đặc biệt từ Hàn Quốc, Nhật Bản và Australia, đánh giá cao chất lượng sân bãi, dịch vụ và chi phí hợp lý tại Việt Nam.

"Chi phí chơi golf tại Việt Nam chỉ bằng 1/3 so với Nhật Bản hay Singapore, nhưng chất lượng sân không hề kém," một golfer Nhật Bản chia sẻ.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    readTime: 3,
  },
];

async function seedArticles() {
  console.log(`🚀 Bắt đầu seed ${ARTICLES.length} bài báo (batch 2)...`);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const article of ARTICLES) {
    try {
      const existing = await pool.query('SELECT id FROM articles WHERE title = $1', [article.title]);
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }
      
      const authorId = randomAuthor();
      const publishedAt = randomDate(45);
      const createdAt = new Date(new Date(publishedAt).getTime() - 3 * 60 * 60 * 1000).toISOString();
      
      await pool.query(
        `INSERT INTO articles (title, excerpt, content, category, author_id, image, "readTime", status, "publishedAt", "createdAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'published', $8, $9)`,
        [article.title, article.excerpt, article.content, article.category, authorId, article.image, article.readTime, publishedAt, createdAt]
      );
      inserted++;
    } catch (err) {
      console.error(`❌ Lỗi khi chèn "${article.title}":`, err.message);
    }
  }
  
  console.log(`\n✅ Hoàn tất batch 2!`);
  console.log(`   📰 Đã chèn: ${inserted} bài báo mới`);
  console.log(`   ⏭️  Bỏ qua: ${skipped} bài (đã tồn tại)`);
  
  const stats = await pool.query(
    `SELECT category, COUNT(*) as count FROM articles WHERE status = 'published' GROUP BY category ORDER BY count DESC`
  );
  console.log(`\n📊 Thống kê bài viết đã đăng theo chuyên mục:`);
  stats.rows.forEach(r => {
    console.log(`   ${r.category}: ${r.count} bài`);
  });
  
  const total = await pool.query(`SELECT COUNT(*) as total FROM articles WHERE status = 'published'`);
  console.log(`\n   🔢 Tổng: ${total.rows[0].total} bài đã đăng`);
  
  process.exit(0);
}

seedArticles().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
