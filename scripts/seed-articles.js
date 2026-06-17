/**
 * Seed script: Tạo bài báo mẫu cho tất cả chuyên mục
 * Chạy: node scripts/seed-articles.js
 */
const { pool } = require('../src/backend/config/database');

const AUTHORS = [
  '0b4c14b1-ccbf-4338-a5d0-ac36adc508b0', // author1
  'e55ee61d-a021-46b7-868a-1ce1613c2382', // author2
  'c6f3e57f-e68b-46c5-a6f6-cb6b12c43b66', // author3
];

function randomAuthor() {
  return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
}

function randomDate(daysBack = 30) {
  const now = Date.now();
  const offset = Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(now - offset).toISOString();
}

const ARTICLES = [
  // ==================== THỜI SỰ ====================
  {
    title: 'Thủ tướng chủ trì phiên họp Chính phủ thường kỳ tháng 6/2026',
    excerpt: 'Phiên họp tập trung thảo luận các giải pháp thúc đẩy tăng trưởng kinh tế, kiểm soát lạm phát và đảm bảo an sinh xã hội.',
    content: `Ngày 14/6, Thủ tướng Chính phủ đã chủ trì phiên họp Chính phủ thường kỳ tháng 6/2026 với sự tham dự đầy đủ của các thành viên Chính phủ.

Tại phiên họp, các thành viên Chính phủ đã nghe và thảo luận về báo cáo tình hình kinh tế - xã hội tháng 5 và 5 tháng đầu năm 2026; tình hình giải ngân vốn đầu tư công; các giải pháp thúc đẩy tăng trưởng, kiểm soát lạm phát.

Thủ tướng nhấn mạnh: "Chúng ta cần quyết liệt hơn nữa trong cải cách thể chế, đơn giản hóa thủ tục hành chính, tạo môi trường đầu tư kinh doanh thuận lợi nhất cho doanh nghiệp và người dân."

Chính phủ đặt mục tiêu GDP năm 2026 tăng trưởng từ 7-7,5%, kiểm soát lạm phát dưới 4%, xuất khẩu tăng 8-10% so với năm 2025.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Quốc hội thông qua Luật Bảo vệ Môi trường sửa đổi',
    excerpt: 'Luật mới quy định chặt chẽ hơn về phát thải carbon, khuyến khích năng lượng tái tạo và xử phạt nghiêm vi phạm môi trường.',
    content: `Với 445/480 đại biểu tán thành (chiếm 92,7%), Quốc hội đã chính thức thông qua Luật Bảo vệ Môi trường (sửa đổi) vào chiều 12/6.

Luật mới bổ sung nhiều quy định quan trọng về thị trường tín chỉ carbon, nghĩa vụ phân loại rác tại nguồn, trách nhiệm mở rộng của nhà sản xuất (EPR), và cơ chế ưu đãi cho doanh nghiệp đầu tư vào năng lượng sạch.

Theo Chủ nhiệm Ủy ban Khoa học, Công nghệ và Môi trường, đây là bước tiến lớn trong cam kết Net Zero vào năm 2050 của Việt Nam, phù hợp với xu hướng phát triển bền vững toàn cầu.

Luật sẽ có hiệu lực thi hành từ ngày 01/01/2027.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1575321729918-87a2a36d2c23?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Hà Nội hoàn thành tuyến Metro số 3 đoạn Nhổn - ga Hà Nội',
    excerpt: 'Sau nhiều năm thi công, tuyến Metro số 3 chính thức đi vào vận hành thử nghiệm, kết nối phía Tây với trung tâm thành phố.',
    content: `Sáng 10/6, UBND TP Hà Nội đã tổ chức lễ khánh thành và vận hành thử nghiệm toàn tuyến Metro số 3 đoạn Nhổn - ga Hà Nội, đánh dấu cột mốc quan trọng trong hệ thống giao thông công cộng của Thủ đô.

Tuyến metro dài 12,5 km với 12 ga, trong đó 8,5 km đi trên cao và 4 km đi ngầm. Thời gian di chuyển toàn tuyến chỉ mất khoảng 20 phút, so với 45-60 phút bằng xe buýt hoặc phương tiện cá nhân vào giờ cao điểm.

Phó Chủ tịch UBND TP cho biết: "Đây là bước đột phá trong giao thông đô thị Hà Nội. Chúng tôi kỳ vọng metro sẽ phục vụ 200.000 - 300.000 lượt hành khách mỗi ngày, góp phần giảm ùn tắc giao thông đáng kể."`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Bộ Giáo dục công bố phương án thi tốt nghiệp THPT 2027',
    excerpt: 'Từ năm 2027, kỳ thi tốt nghiệp THPT sẽ chuyển sang hình thức thi trên máy tính với 4 môn bắt buộc và 2 môn tự chọn.',
    content: `Bộ Giáo dục và Đào tạo vừa chính thức công bố phương án thi tốt nghiệp THPT từ năm 2027 theo Chương trình giáo dục phổ thông 2018.

Theo đó, thí sinh sẽ thi 4 môn bắt buộc (Toán, Ngữ văn, Ngoại ngữ, và Lịch sử) cùng 2 môn tự chọn trong số các môn: Vật lý, Hóa học, Sinh học, Địa lý, Giáo dục kinh tế và pháp luật, Tin học, Công nghệ.

Điểm đáng chú ý là các môn trắc nghiệm sẽ được tổ chức thi trên máy tính, trong khi môn Ngữ văn vẫn giữ hình thức thi tự luận trên giấy.

Thứ trưởng Bộ GD&ĐT nhấn mạnh: "Phương án này đã được nghiên cứu kỹ lưỡng, tham khảo kinh nghiệm quốc tế và phù hợp với điều kiện thực tiễn của Việt Nam."`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Miền Trung đối mặt đợt nắng nóng gay gắt kéo dài',
    excerpt: 'Nhiệt độ tại nhiều tỉnh miền Trung lên đến 40-42 độ C, cơ quan khí tượng cảnh báo nguy cơ cháy rừng và thiếu nước.',
    content: `Trung tâm Dự báo Khí tượng Thủy văn Quốc gia cho biết, đợt nắng nóng gay gắt đang bao trùm các tỉnh từ Thanh Hóa đến Bình Thuận với nhiệt độ cao nhất phổ biến 38-42 độ C.

Đặc biệt tại các tỉnh Nghệ An, Hà Tĩnh, Quảng Bình, nhiệt độ ngoài trời có thể lên đến 43 độ C vào buổi trưa. Độ ẩm không khí thấp dưới 40%, gió Tây Nam khô nóng thổi mạnh.

Các cơ quan chức năng đã ban hành cảnh báo cấp 4 (cấp nguy hiểm) về nguy cơ cháy rừng tại nhiều khu vực. Nhiều hồ chứa nước đang ở mức thấp, ảnh hưởng đến sản xuất nông nghiệp.

Người dân được khuyến cáo hạn chế ra ngoài trời trong khoảng 10h - 16h, uống đủ nước và bảo vệ sức khỏe.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'TP.HCM triển khai chương trình chuyển đổi số toàn diện',
    excerpt: 'Thành phố đặt mục tiêu 100% dịch vụ công trực tuyến mức độ 4 và xây dựng trung tâm dữ liệu lớn phục vụ quản lý đô thị thông minh.',
    content: `UBND TP.HCM vừa phê duyệt Đề án chuyển đổi số toàn diện giai đoạn 2026-2030 với tổng vốn đầu tư hơn 15.000 tỷ đồng.

Đề án bao gồm: số hóa 100% thủ tục hành chính, xây dựng trung tâm điều hành đô thị thông minh (IOC), triển khai hệ thống camera AI giám sát giao thông và an ninh, ứng dụng AI trong y tế và giáo dục.

Đáng chú ý, TP.HCM sẽ triển khai ứng dụng "Công dân số" cho phép người dân thực hiện mọi giao dịch hành chính trên điện thoại, từ đăng ký hộ khẩu, cấp giấy phép kinh doanh đến nộp thuế và thanh toán các dịch vụ công.`,
    category: 'thoisu',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    readTime: 4,
  },

  // ==================== THẾ GIỚI ====================
  {
    title: 'Hội nghị G20 tại Brazil: Các nước cam kết chống biến đổi khí hậu',
    excerpt: 'Lãnh đạo 20 nền kinh tế lớn nhất thế giới đã thống nhất gói hành động trị giá 500 tỷ USD để giảm phát thải carbon.',
    content: `Hội nghị thượng đỉnh G20 tại Rio de Janeiro, Brazil đã kết thúc với tuyên bố chung cam kết mạnh mẽ về chống biến đổi khí hậu.

Các nước đã thống nhất thành lập Quỹ Chuyển đổi Năng lượng Toàn cầu trị giá 500 tỷ USD, trong đó các nước phát triển đóng góp 60% và các nước đang phát triển 40%.

Tổng thống Brazil tuyên bố: "Đây là thời khắc lịch sử. Lần đầu tiên chúng ta có một cam kết cụ thể, có ràng buộc pháp lý về tài chính khí hậu."

Việt Nam tham dự với tư cách khách mời và được đánh giá cao về nỗ lực phát triển năng lượng tái tạo.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'NASA phát hiện dấu hiệu sự sống trên Mặt trăng Europa của Sao Mộc',
    excerpt: 'Tàu thăm dò Europa Clipper phát hiện các hợp chất hữu cơ phức tạp dưới lớp băng của vệ tinh Europa.',
    content: `NASA vừa công bố phát hiện chấn động từ sứ mệnh Europa Clipper: các máy dò đã phát hiện dấu hiệu của amino acid và các phân tử hữu cơ phức tạp trong các luồng khí phun ra từ bề mặt băng của Europa.

"Đây là phát hiện quan trọng nhất trong lịch sử thám hiểm không gian," Giám đốc NASA tuyên bố. "Mặc dù chưa thể khẳng định đây là bằng chứng trực tiếp của sự sống, nhưng các điều kiện trên Europa rõ ràng có tiềm năng hỗ trợ sự sống vi sinh vật."

Europa, vệ tinh lớn thứ 4 của Sao Mộc, được cho là có một đại dương nước lỏng khổng lồ ẩn dưới lớp vỏ băng dày 15-25 km. Nhiệt năng từ hiệu ứng thủy triều với Sao Mộc giữ cho nước luôn ở trạng thái lỏng.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'EU thông qua đạo luật AI toàn diện đầu tiên trên thế giới',
    excerpt: 'Liên minh châu Âu chính thức áp dụng AI Act, phân loại rủi ro và đặt ra quy tắc nghiêm ngặt cho các hệ thống trí tuệ nhân tạo.',
    content: `Nghị viện châu Âu đã chính thức thông qua Đạo luật AI (AI Act) với 523 phiếu thuận, 46 phiếu chống, trở thành khung pháp lý toàn diện đầu tiên trên thế giới về trí tuệ nhân tạo.

AI Act phân loại các hệ thống AI theo 4 mức rủi ro: Không chấp nhận được, Cao, Hạn chế, và Thấp/Tối thiểu. Các hệ thống AI được sử dụng trong y tế, giao thông, tư pháp và giáo dục sẽ phải tuân thủ các yêu cầu nghiêm ngặt nhất.

Đáng chú ý, luật yêu cầu các công ty phát triển AI tạo sinh (như ChatGPT, Claude) phải minh bạch về dữ liệu huấn luyện và gắn nhãn nội dung do AI tạo ra.

Các doanh nghiệp có 24 tháng để tuân thủ, vi phạm có thể bị phạt tới 35 triệu EUR hoặc 7% doanh thu toàn cầu.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Nhật Bản công bố kế hoạch xây dựng thành phố nổi trên biển',
    excerpt: 'Dự án trị giá 200 tỷ USD nhằm ứng phó với mực nước biển dâng và thiếu đất ở, dự kiến hoàn thành năm 2040.',
    content: `Chính phủ Nhật Bản đã công bố kế hoạch đầy tham vọng xây dựng "Ocean City" - thành phố nổi đầu tiên trên thế giới tại vùng biển phía Nam Tokyo.

Thành phố nổi sẽ có diện tích 4 km², sức chứa 30.000 cư dân, bao gồm khu dân cư, trung tâm thương mại, bệnh viện, trường học và khu vui chơi giải trí. Toàn bộ năng lượng sẽ đến từ năng lượng mặt trời, gió và thủy triều.

"Đây không chỉ là giải pháp cho Nhật Bản mà cho cả nhân loại khi mực nước biển tiếp tục dâng cao do biến đổi khí hậu," Thủ tướng Nhật Bản phát biểu.

Giai đoạn 1 của dự án sẽ bắt đầu xây dựng từ năm 2028, dự kiến đón cư dân đầu tiên vào năm 2035.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Chiến tranh thương mại Mỹ - Trung: Tác động đến kinh tế ASEAN',
    excerpt: 'Các nhà phân tích nhận định ASEAN có thể hưởng lợi từ xu hướng dịch chuyển chuỗi cung ứng nhưng cũng đối mặt nhiều rủi ro.',
    content: `Căng thẳng thương mại giữa Mỹ và Trung Quốc tiếp tục leo thang khi Washington tăng thuế lên 60% đối với nhiều mặt hàng nhập khẩu từ Trung Quốc.

Theo báo cáo mới nhất của Ngân hàng Phát triển Châu Á (ADB), Việt Nam, Indonesia và Thái Lan là ba quốc gia ASEAN hưởng lợi nhiều nhất từ xu hướng dịch chuyển chuỗi cung ứng "China+1".

Tuy nhiên, chuyên gia cảnh báo: "ASEAN cần cẩn trọng với rủi ro bị cả hai bên gây áp lực. Các nước cần đa dạng hóa đối tác thương mại và nâng cao năng lực cạnh tranh nội tại."

Riêng Việt Nam, FDI từ cả Mỹ và Trung Quốc đều tăng mạnh, cho thấy vị trí chiến lược của đất nước trong chuỗi giá trị toàn cầu mới.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Ấn Độ vượt Trung Quốc trở thành quốc gia đông dân nhất thế giới',
    excerpt: 'Liên Hợp Quốc xác nhận dân số Ấn Độ đã vượt 1,45 tỷ người, đặt ra nhiều thách thức về kinh tế và xã hội.',
    content: `Theo báo cáo mới nhất của Quỹ Dân số Liên Hợp Quốc (UNFPA), Ấn Độ đã chính thức vượt Trung Quốc để trở thành quốc gia đông dân nhất thế giới với ước tính 1,45 tỷ người.

Sự thay đổi này mang đến cả cơ hội và thách thức. Với độ tuổi trung bình chỉ 28 tuổi, Ấn Độ có lực lượng lao động trẻ và dồi dào - "lợi thế dân số" mà nhiều quốc gia phát triển đang mất dần.

Tuy nhiên, để tận dụng cơ hội này, Ấn Độ cần đầu tư mạnh vào giáo dục, y tế và tạo việc làm. Mỗi tháng, khoảng 1,2 triệu thanh niên Ấn Độ bước vào thị trường lao động.`,
    category: 'thegioi',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    readTime: 4,
  },

  // ==================== KINH DOANH ====================
  {
    title: 'VN-Index vượt mốc 1.400 điểm, thanh khoản thị trường đạt kỷ lục',
    excerpt: 'Sàn HOSE ghi nhận giá trị giao dịch bình quân đạt 28.000 tỷ đồng/phiên, dòng tiền ngoại đổ vào mạnh mẽ.',
    content: `Thị trường chứng khoán Việt Nam ghi nhận tuần giao dịch sôi động nhất năm 2026 khi VN-Index chính thức vượt mốc 1.400 điểm, mức cao nhất trong vòng 2 năm qua.

Động lực tăng trưởng đến từ nhóm cổ phiếu ngân hàng (VCB, BID, TCB tăng 5-8%), bất động sản (VHM, NVL tăng mạnh) và công nghệ (FPT đạt đỉnh lịch sử).

Đáng chú ý, khối ngoại đã mua ròng 3 tuần liên tiếp với tổng giá trị hơn 8.000 tỷ đồng, chủ yếu từ các quỹ ETF Hàn Quốc, Nhật Bản và Đài Loan.

Các chuyên gia phân tích kỳ vọng VN-Index có thể hướng tới vùng 1.500-1.600 điểm trong nửa cuối năm 2026 nếu kinh tế vĩ mô tiếp tục ổn định.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'FPT ký hợp đồng AI trị giá 500 triệu USD với tập đoàn Nhật Bản',
    excerpt: 'Thương vụ lớn nhất lịch sử FPT đánh dấu vị thế mới của doanh nghiệp công nghệ Việt Nam trên thị trường quốc tế.',
    content: `Tập đoàn FPT vừa ký kết hợp đồng chiến lược trị giá 500 triệu USD với SoftBank Group (Nhật Bản) để cung cấp giải pháp AI và chuyển đổi số cho hệ sinh thái các công ty thuộc tập đoàn.

Đây là hợp đồng đơn lẻ lớn nhất trong lịch sử 36 năm hoạt động của FPT, vượt xa kỷ lục 200 triệu USD được thiết lập năm 2024.

CEO FPT chia sẻ: "Hợp đồng này khẳng định năng lực AI của đội ngũ kỹ sư Việt Nam đã đạt tầm thế giới. Chúng tôi sẽ huy động 5.000 chuyên gia AI để thực hiện dự án này trong 5 năm."

Cổ phiếu FPT tăng trần ngay sau thông tin, vốn hóa vượt 200.000 tỷ đồng.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Ngân hàng Nhà nước hạ lãi suất điều hành lần thứ 3 trong năm',
    excerpt: 'Lãi suất tái cấp vốn giảm còn 3,5%/năm, hỗ trợ doanh nghiệp tiếp cận vốn vay với chi phí thấp hơn.',
    content: `Ngân hàng Nhà nước Việt Nam (SBV) vừa quyết định hạ lãi suất điều hành thêm 0,5 điểm phần trăm, đưa lãi suất tái cấp vốn xuống còn 3,5%/năm - mức thấp nhất trong lịch sử.

Quyết định này nhằm tiếp tục hỗ trợ nền kinh tế trong bối cảnh tăng trưởng tín dụng còn chậm so với mục tiêu. Tính đến hết tháng 5/2026, tăng trưởng tín dụng toàn hệ thống chỉ đạt 4,2%, thấp hơn nhiều so với mục tiêu 14-15% cả năm.

Thống đốc NHNN cho biết: "Việc hạ lãi suất sẽ giúp các ngân hàng thương mại có dư địa giảm lãi suất cho vay, từ đó hỗ trợ doanh nghiệp và người dân phục hồi sản xuất kinh doanh."

Các ngân hàng thương mại lớn như Vietcombank, BIDV, VietinBank đã ngay lập tức giảm lãi suất cho vay thêm 0,3-0,5%/năm.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Vingroup ra mắt VinFast VF 3 giá từ 235 triệu đồng',
    excerpt: 'Mẫu ô tô điện mini đầu tiên của VinFast nhắm vào phân khúc xe đô thị, cạnh tranh trực tiếp với Wuling Mini EV.',
    content: `VinFast chính thức ra mắt mẫu xe ô tô điện mini VF 3 tại thị trường Việt Nam với giá bán từ 235 triệu đồng (phiên bản thuê pin) và 315 triệu đồng (phiên bản mua pin).

VF 3 có kích thước nhỏ gọn (3.190 x 1.580 x 1.565 mm), phù hợp di chuyển trong đô thị. Xe trang bị động cơ điện công suất 25 kW, pin LFP 18,6 kWh, phạm vi hoạt động 210 km/lần sạc.

CEO VinFast chia sẻ: "VF 3 là giải pháp di chuyển xanh cho mọi gia đình Việt Nam. Chúng tôi muốn mọi người đều có thể sở hữu một chiếc ô tô điện."

Trong tháng đầu mở bán, VinFast đã nhận hơn 50.000 đơn đặt hàng VF 3, cho thấy nhu cầu rất lớn từ thị trường.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Thương mại điện tử Việt Nam vượt 25 tỷ USD',
    excerpt: 'Shopee, TikTok Shop và Lazada dẫn đầu cuộc đua, thanh toán không tiền mặt chiếm 65% giao dịch.',
    content: `Theo báo cáo của Bộ Công Thương, doanh thu thương mại điện tử Việt Nam 5 tháng đầu năm 2026 đạt 25,3 tỷ USD, tăng 35% so với cùng kỳ năm trước.

Shopee tiếp tục dẫn đầu với 42% thị phần, theo sau là TikTok Shop (28%) và Lazada (18%). Điểm đáng chú ý là TikTok Shop tăng trưởng nhanh nhất với tốc độ 85%/năm nhờ mô hình "shoppertainment" (mua sắm kết hợp giải trí).

Thanh toán không tiền mặt (ví điện tử, QR code, thẻ) chiếm 65% tổng giao dịch, tăng mạnh từ mức 45% năm 2024. MoMo, ZaloPay và VNPay là ba ví điện tử phổ biến nhất.

Việt Nam hiện đứng thứ 3 Đông Nam Á về quy mô thương mại điện tử, chỉ sau Indonesia và Thái Lan.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Bất động sản công nghiệp bùng nổ nhờ làn sóng FDI',
    excerpt: 'Giá thuê đất khu công nghiệp tại miền Nam tăng 15-20%, tỷ lệ lấp đầy đạt trên 90% ở nhiều tỉnh thành.',
    content: `Thị trường bất động sản công nghiệp Việt Nam tiếp tục tăng trưởng mạnh mẽ khi làn sóng FDI đổ vào ngày càng lớn.

Theo JLL Việt Nam, giá thuê đất bình quân tại các khu công nghiệp miền Nam đạt 180-250 USD/m²/chu kỳ thuê, tăng 15-20% so với năm 2025. Tỷ lệ lấp đầy tại Bình Dương đạt 96%, Đồng Nai 93%, Long An 89%.

Các tập đoàn lớn như Samsung, Intel, LG, Foxconn tiếp tục mở rộng đầu tư, trong khi nhiều doanh nghiệp mới từ Mỹ, EU và Nhật Bản cũng đang tìm kiếm mặt bằng.

Chuyên gia dự báo nhu cầu thuê đất công nghiệp sẽ tiếp tục tăng 25-30% trong giai đoạn 2026-2030.`,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    readTime: 4,
  },

  // ==================== CÔNG NGHỆ ====================
  {
    title: 'Apple ra mắt iPhone 17 Pro với chip A19 Pro và camera 200MP',
    excerpt: 'Thế hệ iPhone mới nhất mang đến thiết kế titan thế hệ 2, màn hình ProMotion 240Hz và khả năng quay video 8K.',
    content: `Apple vừa chính thức ra mắt dòng iPhone 17 tại sự kiện đặc biệt tại Apple Park, Cupertino. Mẫu iPhone 17 Pro và Pro Max là tâm điểm với nhiều nâng cấp đáng kể.

Chip A19 Pro được sản xuất trên tiến trình 2nm của TSMC, mang lại hiệu năng tăng 40% và tiết kiệm pin 25% so với A18 Pro. Neural Engine 20-core cho phép chạy các mô hình AI lớn trực tiếp trên thiết bị.

Camera chính 200MP với cảm biến kích thước 1 inch cho chất lượng ảnh ngang ngửa máy ảnh mirrorless. Khả năng zoom quang học 10x và quay video 8K 30fps là bước tiến vượt bậc.

Giá bán iPhone 17 Pro từ 999 USD, Pro Max từ 1.199 USD. Tại Việt Nam, giá dự kiến từ 28,99 triệu đồng.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'OpenAI ra mắt GPT-5: Bước nhảy vọt trong trí tuệ nhân tạo',
    excerpt: 'GPT-5 có khả năng suy luận logic ngang ngửa con người, xử lý đa phương thức và hỗ trợ ngữ cảnh 1 triệu token.',
    content: `OpenAI đã chính thức ra mắt GPT-5, mô hình AI mạnh nhất từ trước đến nay, đánh dấu bước tiến quan trọng hướng tới AGI (Trí tuệ Nhân tạo Tổng quát).

GPT-5 đạt điểm số vượt trội trong các bài kiểm tra: 97% trên MMLU (kiến thức tổng quát), 92% trên MATH (toán học), và 89% trên HumanEval (lập trình). Đặc biệt, GPT-5 có khả năng suy luận chuỗi phức tạp, tự phát hiện và sửa lỗi logic.

CEO OpenAI cho biết: "GPT-5 không chỉ thông minh hơn mà còn đáng tin cậy hơn. Tỷ lệ 'ảo giác' (hallucination) giảm 90% so với GPT-4."

Giá sử dụng GPT-5 qua API là 15 USD/triệu token đầu vào và 60 USD/triệu token đầu ra.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Samsung ra mắt Galaxy S26 Ultra với màn hình gập đôi',
    excerpt: 'Thiết kế đột phá cho phép mở rộng màn hình từ 6.9 inch thành 10 inch, kết hợp AI Galaxy Brain mới.',
    content: `Samsung đã gây bất ngờ lớn tại sự kiện Galaxy Unpacked 2026 khi ra mắt Galaxy S26 Ultra với thiết kế gập đôi (Tri-Fold) đầu tiên trên dòng flagship.

Khi đóng, S26 Ultra có kích thước 6.9 inch như smartphone thông thường. Khi mở ra, màn hình Dynamic AMOLED 2X mở rộng lên 10 inch với độ phân giải 2K+, tần số quét 165Hz.

Galaxy Brain, hệ thống AI mới của Samsung, cho phép: tóm tắt cuộc họp real-time, dịch đồng thời 13 ngôn ngữ, tự động chỉnh sửa ảnh/video chuyên nghiệp và hỗ trợ lập trình.

Giá bán Galaxy S26 Ultra từ 1.399 USD (bản 256GB). Tại Việt Nam, dự kiến từ 33,99 triệu đồng.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Việt Nam phóng thành công vệ tinh viễn thám đầu tiên do trong nước sản xuất',
    excerpt: 'Vệ tinh VNREDSat-2 được phóng lên quỹ đạo bằng tên lửa Falcon 9, phục vụ giám sát tài nguyên và môi trường.',
    content: `Vệ tinh viễn thám VNREDSat-2, do các kỹ sư Việt Nam thiết kế và chế tạo, đã được phóng thành công lên quỹ đạo từ bệ phóng Cape Canaveral (Mỹ) bằng tên lửa Falcon 9 của SpaceX.

VNREDSat-2 nặng 150 kg, hoạt động ở quỹ đạo 680 km, có khả năng chụp ảnh độ phân giải 1 mét. Vệ tinh sẽ phục vụ giám sát tài nguyên thiên nhiên, dự báo thiên tai, quản lý đô thị và an ninh quốc phòng.

"Đây là thành tựu đáng tự hào của ngành công nghiệp vũ trụ Việt Nam," Giám đốc Trung tâm Vũ trụ Việt Nam phát biểu. "Việc tự chủ công nghệ vệ tinh giúp chúng ta không phụ thuộc vào nước ngoài trong việc thu thập dữ liệu địa lý."`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Tesla giới thiệu Optimus Gen 3: Robot hình người thông minh nhất',
    excerpt: 'Robot Optimus thế hệ mới có thể nấu ăn, dọn nhà, chăm sóc người già và thực hiện các công việc nhà máy phức tạp.',
    content: `Tesla đã ra mắt Optimus Gen 3, thế hệ robot hình người tiên tiến nhất với 40 bậc tự do, có thể di chuyển và thao tác linh hoạt như con người.

Optimus Gen 3 được trang bị chip FSD v5 và hệ thống thị giác máy tính tiên tiến, cho phép nhận diện hàng nghìn vật thể và thực hiện các tác vụ phức tạp: nấu ăn theo công thức, gấp quần áo, lau dọn nhà, chăm sóc cây cối, và hỗ trợ người cao tuổi trong sinh hoạt hàng ngày.

Elon Musk tuyên bố: "Optimus sẽ thay đổi hoàn toàn thị trường lao động. Giá bán mục tiêu dưới 20.000 USD sẽ khiến robot trở nên phổ biến như ô tô."

Tesla dự kiến sản xuất 10.000 robot Optimus trong năm 2027 cho các nhà máy và bệnh viện.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Mạng 6G thử nghiệm thành công tại Hàn Quốc: Tốc độ 1 Tbps',
    excerpt: 'Samsung và SK Telecom đạt tốc độ truyền dữ liệu 1 terabit/giây, nhanh gấp 50 lần so với 5G hiện tại.',
    content: `Samsung Electronics và SK Telecom đã thành công trong việc thử nghiệm mạng 6G với tốc độ truyền dữ liệu lên tới 1 Tbps (terabit/giây), mở ra kỷ nguyên mới cho truyền thông không dây.

Công nghệ 6G sử dụng sóng terahertz (THz) ở tần số 140-300 GHz, cho phép tải một bộ phim 4K trong chưa đầy 1 giây. Ngoài tốc độ, 6G còn mang lại độ trễ cực thấp (dưới 0,1ms) và khả năng kết nối hàng triệu thiết bị đồng thời.

Ứng dụng tiềm năng bao gồm: hologram real-time, phẫu thuật từ xa không độ trễ, xe tự lái giao tiếp tức thì, và metaverse thực sự.

Hàn Quốc đặt mục tiêu thương mại hóa 6G vào năm 2030, trước Mỹ và Trung Quốc.`,
    category: 'technology',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    readTime: 4,
  },

  // ==================== THỂ THAO ====================
  {
    title: 'ĐT Việt Nam vào vòng loại cuối World Cup 2030: Lịch sử gọi tên',
    excerpt: 'Chiến thắng 2-1 trước Australia giúp Việt Nam lần đầu góp mặt tại vòng loại cuối cùng World Cup.',
    content: `Đội tuyển bóng đá Việt Nam đã viết nên trang sử mới khi giành chiến thắng 2-1 trước Australia tại Mỹ Đình, chính thức bước vào vòng loại cuối cùng World Cup 2030.

Hai bàn thắng của Nguyễn Tiến Linh (phút 35) và Nguyễn Quang Hải (phút 78) đã giúp Việt Nam vượt qua đối thủ mạnh. Thủ môn Đặng Văn Lâm cũng có một trận đấu xuất sắc với 7 pha cứu thua.

HLV trưởng xúc động chia sẻ: "Đây là thành quả của cả một thế hệ cầu thủ tài năng và nỗ lực không ngừng. Bóng đá Việt Nam đang ở đúng quỹ đạo phát triển."

Hơn 40.000 CĐV đã có mặt tại sân Mỹ Đình, tạo nên bầu không khí cuồng nhiệt chưa từng thấy.`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Olympic Paris 2028: Việt Nam đặt mục tiêu 3-5 huy chương',
    excerpt: 'Bắn súng, cầu lông, điền kinh và bơi lội là những nội dung được kỳ vọng mang về huy chương cho Việt Nam.',
    content: `Ủy ban Olympic Việt Nam đã công bố kế hoạch chuẩn bị cho Olympic Paris 2028 với mục tiêu giành 3-5 huy chương, trong đó có ít nhất 1 huy chương Vàng.

Xạ thủ Hoàng Xuân Vinh (bắn súng), tay vợt Nguyễn Thùy Linh (cầu lông), và VĐV Nguyễn Thị Oanh (điền kinh) là những hy vọng Vàng sáng giá nhất.

Đoàn thể thao Việt Nam sẽ tập huấn dài hạn tại Nhật Bản và Hàn Quốc trong 12 tháng trước Olympic, với tổng ngân sách đầu tư 150 tỷ đồng.

"Chúng tôi tin tưởng vào thế hệ VĐV trẻ tài năng này. Olympic 2028 sẽ là dấu mốc lịch sử của thể thao Việt Nam," Chủ tịch Ủy ban Olympic khẳng định.`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c5e78?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Giải V.League 2026: Hà Nội FC dẫn đầu sau 15 vòng đấu',
    excerpt: 'Với lối chơi tấn công đẹp mắt và hàng thủ chắc chắn, Hà Nội FC đang trên đường bảo vệ ngôi vô địch.',
    content: `Sau 15 vòng đấu V.League 2026, Hà Nội FC đang dẫn đầu bảng xếp hạng với 37 điểm, hơn đội nhì bảng Hải Phòng FC 5 điểm.

Tiền đạo Nguyễn Văn Quyết tiếp tục là chân sút hàng đầu giải với 12 bàn thắng. Trong khi đó, tiền vệ Đỗ Hùng Dũng đóng vai trò "đạo diễn" xuất sắc với 8 đường kiến tạo.

HLV Hà Nội FC cho biết: "Đội bóng đang trong phong độ tốt nhất. Mục tiêu của chúng tôi không chỉ là vô địch V.League mà còn đi sâu tại AFC Champions League."

Trận derby Hà Nội FC vs Viettel FC ở vòng 16 được dự đoán sẽ thu hút hơn 25.000 CĐV tới sân Hàng Đẫy.`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Lý Hoàng Nam vào Top 50 ATP, tạo mốc lịch sử cho quần vợt Việt Nam',
    excerpt: 'Tay vợt số 1 Việt Nam ghi dấu ấn lớn sau chiến thắng tại giải ATP 250 Singapore.',
    content: `Tay vợt Lý Hoàng Nam đã chính thức vào Top 50 thế giới trên bảng xếp hạng ATP sau khi vô địch giải ATP 250 Singapore, trở thành tay vợt Đông Nam Á đầu tiên đạt được thành tích này.

Trong trận chung kết, Lý Hoàng Nam đánh bại tay vợt người Nhật Bản Kei Nishikori với tỷ số 6-4, 3-6, 7-5 trong một trận đấu kịch tính kéo dài gần 3 giờ.

"Tôi không thể diễn tả được cảm xúc lúc này. Đây là giấc mơ mà tôi đã theo đuổi suốt 15 năm," Hoàng Nam xúc động chia sẻ.

Thành tích này giúp Hoàng Nam đảm bảo suất tham dự trực tiếp Grand Slam Wimbledon và US Open 2026.`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'SEA Games 34 tại Myanmar: Việt Nam đặt mục tiêu ngôi nhất toàn đoàn',
    excerpt: 'Đoàn thể thao Việt Nam cử 700 VĐV tham dự 40 môn thi, tự tin bảo vệ vị trí số 1 khu vực.',
    content: `SEA Games 34 sẽ diễn ra tại Yangon, Myanmar từ ngày 15-30/11/2026 với 40 môn thi đấu. Đoàn thể thao Việt Nam cử đội hình 700 VĐV, đặt mục tiêu giành 150-180 HCV.

Các môn thế mạnh của Việt Nam bao gồm: điền kinh (mục tiêu 25 HCV), bơi lội (15 HCV), bắn súng (12 HCV), wushu (10 HCV), thể dục dụng cụ (8 HCV) và cầu lông (6 HCV).

Đặc biệt, bóng đá nam và nữ đều đặt mục tiêu HCV. Đội tuyển bóng đá nữ Việt Nam đang giữ phong độ ấn tượng sau khi tham dự World Cup nữ 2023.

Tổng cục TDTT nhấn mạnh: "Mục tiêu ngôi nhất toàn đoàn không chỉ vì thành tích mà còn để khẳng định vị thế thể thao hàng đầu khu vực của Việt Nam."`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c5e78?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Đua xe F1 Grand Prix Hà Nội chính thức trở lại năm 2027',
    excerpt: 'Ban tổ chức xác nhận đường đua Mỹ Đình đã được nâng cấp đạt tiêu chuẩn FIA Grade 1.',
    content: `Sau nhiều năm trì hoãn do đại dịch và các vấn đề kỹ thuật, giải đua xe Công thức 1 Grand Prix Việt Nam sẽ chính thức diễn ra vào tháng 4/2027 tại đường đua Mỹ Đình, Hà Nội.

Đường đua dài 5,613 km với 23 khúc cua đã được nâng cấp hoàn toàn, đáp ứng tiêu chuẩn FIA Grade 1. Khán đài sức chứa 40.000 chỗ ngồi, cùng khu vực giải trí và ẩm thực đẳng cấp quốc tế.

"Chúng tôi rất vui mừng chào đón F1 đến Hà Nội. Đây sẽ là sự kiện thể thao lớn nhất lịch sử Việt Nam," đại diện BTC cho biết.

Giá vé dự kiến từ 1,5 triệu đồng (khu vực đứng) đến 50 triệu đồng (VIP Paddock Club).`,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1541889413-bc5bbe7c66fd?w=800&q=80',
    readTime: 4,
  },

  // ==================== GIẢI TRÍ ====================
  {
    title: 'Sơn Tùng M-TP công bố world tour "Vietnam to the World" 2026',
    excerpt: 'Tour diễn quốc tế đầu tiên của nghệ sĩ Việt Nam, ghé qua 15 thành phố tại Mỹ, châu Âu và châu Á.',
    content: `Ca sĩ Sơn Tùng M-TP chính thức công bố world tour "Vietnam to the World" với 15 đêm diễn tại các thành phố lớn: Los Angeles, New York, London, Paris, Tokyo, Seoul, Bangkok, Singapore, Sydney...

Đây là world tour đầu tiên của một nghệ sĩ Việt Nam với quy mô quốc tế thực sự. Mỗi đêm diễn kéo dài 2,5 giờ với sân khấu 3D hologram, hiệu ứng ánh sáng laser và dàn vũ công 50 người.

"Tôi muốn mang âm nhạc Việt Nam đến gần hơn với khán giả quốc tế. Đây là giấc mơ 10 năm của tôi," Sơn Tùng chia sẻ.

Vé đêm diễn tại TP.HCM (mở màn tour) đã bán hết trong 5 phút sau khi mở bán, cho thấy sức hút khổng lồ của nam ca sĩ.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Phim "Đất Rừng Phương Nam" phần 2 phá kỷ lục phòng vé Việt',
    excerpt: 'Bom tấn điện ảnh Việt đạt doanh thu 500 tỷ đồng sau 3 tuần công chiếu, trở thành phim Việt ăn khách nhất lịch sử.',
    content: `"Đất Rừng Phương Nam 2" của đạo diễn Nguyễn Quang Dũng đã phá vỡ mọi kỷ lục phòng vé Việt Nam khi đạt doanh thu 500 tỷ đồng chỉ sau 3 tuần công chiếu.

Phim kể tiếp câu chuyện của bé An (do diễn viên trẻ Hạo Khang thủ vai) trên hành trình khám phá vùng đất phương Nam thời kỳ kháng chiến. Với kỹ xảo CGI đẳng cấp quốc tế, bối cảnh hoành tráng và diễn xuất đỉnh cao, phim nhận được đánh giá 9.2/10 trên các nền tảng đánh giá.

Đạo diễn Nguyễn Quang Dũng chia sẻ: "Thành công của phim chứng minh khán giả Việt Nam sẵn sàng ủng hộ phim nội nếu chất lượng xứng đáng."

Phim đã được mời tham dự LHP Cannes 2026 trong hạng mục Un Certain Regard.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'K-pop tại Việt Nam: BLACKPINK xác nhận đêm diễn tại Mỹ Đình',
    excerpt: 'Nhóm nhạc Hàn Quốc sẽ có 2 đêm diễn tại Sân vận động Mỹ Đình vào tháng 11, dự kiến thu hút 80.000 fan.',
    content: `Sau nhiều đồn đoán, nhóm nhạc BLACKPINK đã chính thức xác nhận 2 đêm diễn Born Pink World Tour tại Sân vận động Quốc gia Mỹ Đình, Hà Nội vào ngày 15-16/11/2026.

Đây là lần thứ 2 BLACKPINK biểu diễn tại Việt Nam, sau đêm diễn lịch sử năm 2023. Với sức chứa 40.000 khán giả mỗi đêm, tổng cộng 80.000 vé sẽ được phát hành.

Giá vé dao động từ 1,8 triệu đồng (khu vực khán đài xa) đến 12 triệu đồng (VIP soundcheck). Vé sẽ được mở bán từ ngày 01/8 trên nền tảng Ticketbox.

BTC cho biết sẽ tăng cường an ninh và giao thông xung quanh khu vực Mỹ Đình trong 2 ngày diễn ra sự kiện.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Vietnam International Film Festival lần thứ nhất khai mạc tại Đà Nẵng',
    excerpt: 'Liên hoan phim quốc tế đầu tiên tại Việt Nam quy tụ 200 tác phẩm từ 45 quốc gia, với ban giám khảo quốc tế uy tín.',
    content: `Vietnam International Film Festival (VIFF) lần thứ nhất đã chính thức khai mạc tại Trung tâm Hội nghị APEC Đà Nẵng với sự tham dự của hơn 500 nhà làm phim đến từ 45 quốc gia.

Ban giám khảo quốc tế gồm đạo diễn Trần Anh Hùng (Pháp-Việt), nhà sản xuất Christine Vachon (Mỹ), đạo diễn Park Chan-wook (Hàn Quốc), và nữ diễn viên Penélope Cruz (Tây Ban Nha).

200 tác phẩm được chiếu trong 7 ngày, tranh giải ở 8 hạng mục. Giải thưởng cao nhất "Rồng Vàng" trị giá 100.000 USD.

"VIFF sẽ đưa điện ảnh Việt Nam ra bản đồ quốc tế và Đà Nẵng trở thành điểm đến văn hóa hàng đầu châu Á," BTC chia sẻ.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Game Việt "Flappy Dragon" gây bão toàn cầu: 50 triệu lượt tải',
    excerpt: 'Tựa game mobile do studio Việt Nam phát triển đứng Top 1 App Store và Google Play tại 80 quốc gia.',
    content: `Studio game độc lập SkyLab (TP.HCM) đã tạo nên hiện tượng toàn cầu với tựa game mobile "Flappy Dragon" - game casual lấy cảm hứng từ văn hóa rồng Việt Nam.

Sau 2 tuần phát hành, Flappy Dragon đã đạt 50 triệu lượt tải, đứng #1 trên cả App Store và Google Play tại 80 quốc gia. Doanh thu ước tính đạt 5 triệu USD chỉ trong tháng đầu.

CEO SkyLab chia sẻ: "Chúng tôi muốn tạo ra một trò chơi đơn giản nhưng gây nghiện, đồng thời giới thiệu hình ảnh rồng - biểu tượng văn hóa Việt Nam - đến bạn bè quốc tế."

Thành công của Flappy Dragon gợi nhớ hiện tượng Flappy Bird của Nguyễn Hà Đông năm 2014, nhưng lần này được thương mại hóa bài bản hơn.`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Hoàng Thùy Linh phát hành album "Folklore" - hòa nhạc dân gian hiện đại',
    excerpt: 'Album gồm 12 ca khúc kết hợp nhạc dân gian Việt Nam với electronic và hip-hop, được quốc tế đánh giá cao.',
    content: `Ca sĩ Hoàng Thùy Linh vừa phát hành album phòng thu thứ 5 mang tên "Folklore", tiếp nối phong cách âm nhạc đặc trưng kết hợp dân gian Việt Nam với các thể loại hiện đại.

Album gồm 12 ca khúc, trong đó "Bà Chúa" và "Thần Thoại" đã nhanh chóng lọt Top Trending YouTube Việt Nam. Đặc biệt, bài hát "Dragon Dance" phiên bản tiếng Anh đã được playlist New Music Friday của Spotify giới thiệu đến khán giả toàn cầu.

Pitchfork (tạp chí âm nhạc uy tín nhất thế giới) chấm album 8.3/10, nhận xét: "Folklore là minh chứng rực rỡ cho cách âm nhạc truyền thống có thể được tái sinh trong thời đại số."`,
    category: 'entertainment',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    readTime: 3,
  },

  // ==================== SỨC KHỎE ====================
  {
    title: 'Việt Nam thử nghiệm thành công vaccine ung thư phổi',
    excerpt: 'Vaccine VABIO-2601 bước vào giai đoạn thử nghiệm lâm sàng Phase 3 với kết quả ban đầu rất khả quan.',
    content: `Viện Vaccine và Sinh phẩm Nha Trang (IVAC) đã công bố kết quả thử nghiệm lâm sàng Phase 2 của vaccine VABIO-2601 điều trị ung thư phổi không tế bào nhỏ (NSCLC).

Trong nhóm 500 bệnh nhân tham gia thử nghiệm, tỷ lệ đáp ứng miễn dịch đạt 72%, tỷ lệ sống sau 2 năm cao hơn 35% so với nhóm đối chứng. Tác dụng phụ nhẹ và có thể kiểm soát được.

GS.TS Nguyễn Văn Kính, Giám đốc IVAC, cho biết: "Đây là bước đột phá lớn của y học Việt Nam. Nếu Phase 3 thành công, chúng ta sẽ có vaccine ung thư phổi đầu tiên do Việt Nam nghiên cứu và sản xuất."

Phase 3 sẽ bắt đầu từ tháng 9/2026 với 3.000 bệnh nhân tại 15 bệnh viện trên cả nước.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'WHO cảnh báo dịch sốt xuất huyết bùng phát tại Đông Nam Á',
    excerpt: 'Số ca mắc sốt xuất huyết tại Việt Nam tăng 40% so với cùng kỳ, Bộ Y tế triển khai chiến dịch phòng chống quy mô lớn.',
    content: `Tổ chức Y tế Thế giới (WHO) đã ban hành cảnh báo cấp độ cao về dịch sốt xuất huyết tại khu vực Đông Nam Á, đặc biệt tại Việt Nam, Philippines và Indonesia.

Tại Việt Nam, tính đến hết tháng 5/2026, cả nước ghi nhận 85.000 ca mắc sốt xuất huyết, tăng 40% so với cùng kỳ năm 2025. TP.HCM, Bình Dương, Đồng Nai là ba địa phương có số ca mắc cao nhất.

Bộ Y tế đã triển khai chiến dịch "Diệt lăng quăng, phòng sốt xuất huyết" trên toàn quốc, huy động 500.000 tình nguyện viên tham gia phun hóa chất diệt muỗi.

Người dân được khuyến cáo: đậy kín dụng cụ chứa nước, diệt lăng quăng hàng tuần, ngủ mùng kể cả ban ngày, và đến cơ sở y tế ngay khi có triệu chứng sốt cao.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Nghiên cứu mới: Thiền định 20 phút mỗi ngày giảm 50% nguy cơ trầm cảm',
    excerpt: 'Nghiên cứu trên 10.000 người tại 15 quốc gia chứng minh lợi ích rõ rệt của thiền định đối với sức khỏe tâm thần.',
    content: `Một nghiên cứu quy mô lớn được công bố trên tạp chí The Lancet Psychiatry đã chứng minh thiền định mindfulness (chánh niệm) 20 phút mỗi ngày có thể giảm 50% nguy cơ trầm cảm.

Nghiên cứu theo dõi 10.000 người tại 15 quốc gia trong 5 năm, chia thành nhóm thiền định đều đặn và nhóm đối chứng. Kết quả cho thấy nhóm thiền định có mức cortisol (hormone stress) thấp hơn 35%, chất lượng giấc ngủ tốt hơn 40%, và tỷ lệ mắc trầm cảm giảm 50%.

PGS.TS Trần Thị Hà (Đại học Y Hà Nội) nhận xét: "Đây là bằng chứng khoa học mạnh mẽ nhất ủng hộ thiền định như một phương pháp phòng ngừa trầm cảm hiệu quả, an toàn và không tốn kém."

Bộ Y tế Việt Nam đang xem xét đưa thiền định vào chương trình chăm sóc sức khỏe tâm thần cộng đồng.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Bệnh viện Chợ Rẫy thực hiện ca ghép tim nhân tạo đầu tiên tại Việt Nam',
    excerpt: 'Bệnh nhân 45 tuổi bị suy tim giai đoạn cuối đã được cấy ghép thành công thiết bị hỗ trợ tâm thất trái LVAD.',
    content: `Bệnh viện Chợ Rẫy TP.HCM đã thực hiện thành công ca cấy ghép thiết bị hỗ trợ tâm thất trái (LVAD) đầu tiên tại Việt Nam cho bệnh nhân N.V.T (45 tuổi, Đồng Nai) bị suy tim giai đoạn cuối.

Ca phẫu thuật kéo dài 8 giờ do ê-kíp 15 bác sĩ thực hiện, có sự hỗ trợ kỹ thuật từ chuyên gia Đức. Sau 2 tuần, bệnh nhân đã hồi phục tốt, có thể tự đi lại và sinh hoạt bình thường.

PGS.TS Phạm Thọ Tuấn Anh, Phó Giám đốc BV Chợ Rẫy, chia sẻ: "Thiết bị LVAD hoạt động như một trái tim nhân tạo, bơm máu liên tục để thay thế chức năng tim bị suy yếu. Đây là giải pháp 'cầu nối' trong khi chờ ghép tim."

Chi phí ca phẫu thuật khoảng 3 tỷ đồng, bảo hiểm y tế hỗ trợ 80%.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
    readTime: 5,
  },
  {
    title: 'Xu hướng ăn chay tăng mạnh tại Việt Nam: 15% dân số trẻ áp dụng',
    excerpt: 'Gen Z Việt Nam đang dẫn đầu xu hướng thực phẩm thực vật, thúc đẩy ngành công nghiệp plant-based trị giá 500 triệu USD.',
    content: `Theo khảo sát của Nielsen Việt Nam, 15% người trẻ (18-35 tuổi) tại Việt Nam đang theo chế độ ăn thuần chay hoặc bán chay (flexitarian), tăng gấp 3 so với năm 2022.

Ngành công nghiệp thực phẩm thực vật (plant-based food) tại Việt Nam ước đạt 500 triệu USD, với sự tham gia của nhiều thương hiệu nội địa như VeggiDay, Loving Hut, và cả các tập đoàn quốc tế như Beyond Meat, Oatly.

PGS.TS Lê Bạch Mai (Viện Dinh dưỡng Quốc gia) nhận xét: "Chế độ ăn giàu thực vật mang lại nhiều lợi ích sức khỏe: giảm nguy cơ tim mạch 25%, ung thư đại trực tràng 20% và tiểu đường type 2 30%. Tuy nhiên, cần đảm bảo đủ protein, vitamin B12 và sắt."

Nhiều nhà hàng chay cao cấp đã xuất hiện tại Hà Nội và TP.HCM, phục vụ thực đơn plant-based với phong cách fine dining.`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Ứng dụng AI trong chẩn đoán bệnh lý mắt: Độ chính xác 98%',
    excerpt: 'Hệ thống AI-Eye do FPT phát triển có thể phát hiện sớm các bệnh lý mắt nguy hiểm từ ảnh chụp đáy mắt.',
    content: `FPT Healthcare vừa ra mắt hệ thống AI-Eye - ứng dụng trí tuệ nhân tạo trong chẩn đoán bệnh lý mắt, đạt độ chính xác 98% trong phát hiện sớm bệnh võng mạc tiểu đường, glaucoma và thoái hóa hoàng điểm.

Hệ thống chỉ cần 1 ảnh chụp đáy mắt để phân tích trong 30 giây, so với 15-30 phút nếu bác sĩ chuyên khoa thực hiện. AI-Eye đặc biệt hữu ích tại các vùng nông thôn, nơi thiếu bác sĩ nhãn khoa.

Hiện AI-Eye đã được triển khai tại 50 bệnh viện trên cả nước, đã sàng lọc cho hơn 200.000 bệnh nhân.

TS. Nguyễn Thanh Tùng, Giám đốc FPT Healthcare, cho biết: "Mục tiêu của chúng tôi là AI giúp phát hiện sớm bệnh mắt cho 5 triệu người Việt Nam mỗi năm, ngăn ngừa mù lòa do phát hiện muộn."`,
    category: 'health',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    readTime: 4,
  },

  // ==================== GIÁO DỤC ====================
  {
    title: '3 đại học Việt Nam lọt Top 500 thế giới theo QS Rankings 2026',
    excerpt: 'ĐHQG Hà Nội, ĐHQG TP.HCM và ĐH Bách khoa Hà Nội ghi dấu ấn trên bảng xếp hạng quốc tế.',
    content: `Tổ chức giáo dục Quacquarelli Symonds (QS) vừa công bố bảng xếp hạng đại học thế giới 2026, trong đó 3 đại học Việt Nam lọt Top 500.

Đại học Quốc gia Hà Nội xếp hạng 371 (tăng 30 bậc), ĐHQG TP.HCM xếp hạng 425 (tăng 20 bậc), và ĐH Bách khoa Hà Nội lần đầu vào Top 500 ở vị trí 489.

Theo đánh giá của QS, các đại học Việt Nam đã cải thiện đáng kể ở các tiêu chí: tỷ lệ trích dẫn nghiên cứu, hợp tác quốc tế, và đánh giá của nhà tuyển dụng.

GS.TS Lê Quân, Giám đốc ĐHQG Hà Nội, cho biết: "Đây là kết quả của chiến lược quốc tế hóa mạnh mẽ. Chúng tôi hiện có 150 chương trình liên kết với đại học hàng đầu thế giới."`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Bộ GD&ĐT triển khai chương trình "Mỗi trường học - một thư viện số"',
    excerpt: 'Dự án đưa thư viện số đến 30.000 trường học, cung cấp miễn phí hàng triệu đầu sách điện tử cho học sinh.',
    content: `Bộ Giáo dục và Đào tạo phối hợp với Quỹ Đổi mới Sáng tạo Quốc gia (NIF) triển khai chương trình "Mỗi trường học - một thư viện số" trên phạm vi toàn quốc.

Chương trình cung cấp miễn phí nền tảng thư viện số với hơn 500.000 đầu sách điện tử, 10.000 video bài giảng, và 50.000 bài tập tương tác cho 30.000 trường học từ tiểu học đến THPT.

Mỗi trường sẽ được trang bị 10-20 máy tính bảng để học sinh vùng khó khăn có thể truy cập thư viện số ngay tại lớp. Tổng kinh phí dự án 2.000 tỷ đồng, trong đó 60% từ ngân sách nhà nước và 40% từ tài trợ doanh nghiệp.

Bộ trưởng GD&ĐT nhấn mạnh: "Thư viện số sẽ xóa bỏ khoảng cách giáo dục giữa thành thị và nông thôn, giúp mọi trẻ em đều được tiếp cận tri thức."`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Sinh viên Việt Nam vô địch cuộc thi lập trình ACM-ICPC châu Á',
    excerpt: 'Đội tuyển ĐH Bách khoa Hà Nội đã vượt qua 500 đội thi để giành ngôi vô địch ACM-ICPC khu vực châu Á - Thái Bình Dương.',
    content: `Đội tuyển sinh viên Đại học Bách khoa Hà Nội đã xuất sắc giành chức vô địch cuộc thi lập trình ACM International Collegiate Programming Contest (ICPC) khu vực châu Á - Thái Bình Dương 2026.

Ba thành viên đội tuyển - Nguyễn Minh Đức, Trần Hoàng Anh và Lê Quốc Bảo - đã giải được 11/13 bài trong 5 giờ thi, vượt qua các đối thủ mạnh từ Trung Quốc, Nhật Bản và Hàn Quốc.

"Chúng em đã luyện tập 6 tháng ròng rã, mỗi ngày 4-5 giờ sau giờ học. Chiến thắng này là cho cả đội, cho trường và cho Việt Nam," thành viên Nguyễn Minh Đức chia sẻ.

Đội tuyển sẽ đại diện Việt Nam tham dự vòng chung kết ICPC World Finals tại Sharm El Sheikh (Ai Cập) vào tháng 11/2026.`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Học phí đại học năm 2026: Tăng bình quân 10%, nhiều trường áp dụng tín chỉ',
    excerpt: 'Các trường đại học công lập điều chỉnh học phí theo lộ trình, trường tư thục giữ ổn định hoặc tăng nhẹ.',
    content: `Năm học 2026-2027, học phí đại học công lập tăng bình quân 10% theo lộ trình được Chính phủ phê duyệt. Mức học phí dao động từ 15-30 triệu đồng/năm tùy nhóm ngành.

Đáng chú ý, nhiều trường chuyển sang hệ thống tín chỉ linh hoạt, cho phép sinh viên tự chọn số tín chỉ mỗi kỳ phù hợp với điều kiện tài chính và thời gian.

Để hỗ trợ sinh viên, Chính phủ tăng nguồn vay sinh viên lên 5 triệu đồng/tháng (từ 4 triệu), mở rộng đối tượng nhận học bổng và miễn giảm học phí.

PGS.TS Huỳnh Quyết Thắng, Hiệu trưởng ĐH Bách khoa Hà Nội, nhận xét: "Tăng học phí là cần thiết để nâng cao chất lượng đào tạo, nhưng phải đi kèm với hệ thống hỗ trợ tài chính cho sinh viên khó khăn."`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Xu hướng du học 2026: Nhật Bản vượt Mỹ thành điểm đến số 1 của sinh viên Việt',
    excerpt: 'Chi phí hợp lý, cơ hội việc làm tốt và văn hóa gần gũi khiến Nhật Bản trở thành lựa chọn hàng đầu.',
    content: `Theo thống kê của Cục Hợp tác Quốc tế (Bộ GD&ĐT), số sinh viên Việt Nam du học Nhật Bản năm 2025-2026 đạt 85.000 người, vượt Mỹ (72.000) để trở thành điểm đến du học số 1.

Ba lý do chính: (1) Chi phí sinh hoạt và học phí ở Nhật Bản thấp hơn 40-50% so với Mỹ, (2) Chính sách cho phép sinh viên làm thêm 28 giờ/tuần, và (3) Nhu cầu tuyển dụng nhân sự Việt Nam tại các doanh nghiệp Nhật rất cao.

Các ngành học phổ biến nhất: Công nghệ thông tin (25%), Kỹ thuật (20%), Kinh tế - Quản trị (18%), Điều dưỡng (15%) và Ngôn ngữ Nhật (12%).

Đại sứ quán Nhật Bản tại Việt Nam cũng tăng cường cấp học bổng MEXT, với 500 suất dành cho sinh viên Việt Nam năm 2026.`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'FPT Education ra mắt chương trình đào tạo AI Engineer đầu tiên tại Đông Nam Á',
    excerpt: 'Chương trình 4 năm hợp tác với Google DeepMind và Meta AI, đào tạo chuyên gia AI với mức lương khởi điểm 2.000 USD/tháng.',
    content: `Đại học FPT chính thức ra mắt chương trình cử nhân "AI Engineering" - chương trình đào tạo kỹ sư AI đầu tiên tại Đông Nam Á, hợp tác trực tiếp với Google DeepMind và Meta AI Research.

Chương trình kéo dài 4 năm, trong đó năm 3 và 4 sinh viên sẽ thực tập tại các phòng thí nghiệm AI của Google hoặc Meta. Chương trình giảng dạy bao gồm: Machine Learning, Deep Learning, NLP, Computer Vision, Reinforcement Learning và AI Ethics.

Khóa đầu tiên tuyển 100 sinh viên, yêu cầu: điểm Toán tốt nghiệp THPT từ 8.0 trở lên và vượt qua bài test năng lực logic.

CEO FPT Education cho biết: "Theo dự báo, Việt Nam cần 100.000 kỹ sư AI vào năm 2030. Chương trình này sẽ đào tạo những nhân tài AI hàng đầu cho đất nước."`,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    readTime: 4,
  },

  // ==================== DU LỊCH ====================
  {
    title: 'Phú Quốc đón 5 triệu khách du lịch trong nửa đầu năm 2026',
    excerpt: 'Đảo ngọc trở thành điểm đến hàng đầu Đông Nam Á nhờ hạ tầng được nâng cấp và nhiều khu nghỉ dưỡng mới.',
    content: `Theo Sở Du lịch tỉnh Kiên Giang, Phú Quốc đã đón 5 triệu lượt khách du lịch trong 6 tháng đầu năm 2026, tăng 45% so với cùng kỳ. Trong đó, khách quốc tế chiếm 40% (chủ yếu từ Hàn Quốc, Trung Quốc và châu Âu).

Sự bùng nổ du lịch Phú Quốc đến từ: (1) Sân bay quốc tế Phú Quốc mở thêm 20 đường bay thẳng quốc tế mới, (2) Khai trương 5 khu nghỉ dưỡng 5 sao mới, và (3) Công viên giải trí VinWonders Phú Quốc mở rộng giai đoạn 2.

Chính quyền đặc khu kinh tế Phú Quốc cũng triển khai chính sách visa-free 30 ngày cho công dân 80 quốc gia, thu hút lượng lớn du khách nghỉ dưỡng dài ngày.

"Mục tiêu đến 2030, Phú Quốc sẽ trở thành trung tâm du lịch biển đảo hàng đầu châu Á, cạnh tranh trực tiếp với Bali và Phuket," Chủ tịch UBND tỉnh chia sẻ.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Sapa mùa hè 2026: Trải nghiệm du lịch bản làng và săn mây đỉnh Fansipan',
    excerpt: 'Thời tiết mát mẻ 18-25 độ C, ruộng bậc thang xanh mướt tạo nên bức tranh thiên nhiên tuyệt đẹp.',
    content: `Sapa (Lào Cai) đang vào mùa đẹp nhất trong năm với thời tiết mát mẻ 18-25 độ C, ruộng bậc thang xanh ngắt và những đám mây bồng bềnh quanh đỉnh Fansipan.

Mùa hè 2026, Sapa giới thiệu nhiều trải nghiệm mới: trekking qua 5 bản làng dân tộc (H'Mông, Dao, Tày), homestay tại nhà sàn truyền thống, lớp học nấu ăn dân tộc, và đặc biệt là tour "săn mây" trên đỉnh Fansipan lúc bình minh.

Cáp treo Fansipan đã nâng cấp hệ thống cabin mới, sức chứa gấp đôi, giảm thời gian chờ đợi. Giá vé cáp treo từ 750.000 đồng/người lớn.

"Du lịch bền vững là ưu tiên hàng đầu. Chúng tôi giới hạn 5.000 khách/ngày lên Fansipan để bảo vệ hệ sinh thái," đại diện BQL Khu du lịch cho biết.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Đà Nẵng khai trương tuyến cáp treo vượt biển dài nhất Việt Nam',
    excerpt: 'Tuyến cáp treo nối bán đảo Sơn Trà với đảo Cù Lao Chàm, dài 8.5km, mở ra góc nhìn du lịch hoàn toàn mới.',
    content: `Đà Nẵng chính thức khai trương tuyến cáp treo vượt biển Sơn Trà - Cù Lao Chàm, dài 8.5 km, trở thành tuyến cáp treo vượt biển dài nhất Việt Nam và thứ 3 thế giới.

Hành trình 25 phút trên cáp treo mang đến tầm nhìn 360 độ ngoạn mục: bên dưới là biển xanh ngọc bích, phía xa là bán đảo Sơn Trà với khu rừng nguyên sinh và đàn voọc quý hiếm.

Hệ thống cáp treo do tập đoàn Sun Group đầu tư, sử dụng công nghệ Doppelmayr (Áo) với cabin 30 chỗ, đảm bảo an toàn trong gió cấp 8.

Giá vé: 800.000 đồng/người lớn (khứ hồi), bao gồm vé tham quan khu bảo tồn biển Cù Lao Chàm. Dự kiến phục vụ 3.000 lượt khách/ngày.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Top 10 homestay đẹp nhất Việt Nam 2026 theo Lonely Planet',
    excerpt: 'Tạp chí du lịch hàng đầu thế giới đánh giá cao các homestay sinh thái tại Ninh Bình, Hà Giang và Đà Lạt.',
    content: `Tạp chí Lonely Planet vừa công bố danh sách "Top 10 Homestay đẹp nhất Việt Nam 2026", tôn vinh những cơ sở lưu trú kết hợp giữa kiến trúc truyền thống, thiên nhiên hoang sơ và trải nghiệm văn hóa đích thực.

Dẫn đầu danh sách là "Tam Cốc Hideaway" (Ninh Bình) - homestay nằm giữa cánh đồng lúa với 8 phòng bungalow tre, giá chỉ 800.000 đồng/đêm. Tiếp theo là "Mã Pí Lèng Ecolodge" (Hà Giang) với view hẻm vực Tu Sản, và "Wild Dalat" (Đà Lạt) nằm giữa rừng thông cổ thụ.

Lonely Planet nhận xét: "Homestay Việt Nam là một trong những trải nghiệm lưu trú tốt nhất Đông Nam Á, kết hợp hoàn hảo giữa sự thoải mái hiện đại và bản sắc văn hóa địa phương."

Xu hướng homestay sinh thái đang bùng nổ tại Việt Nam, với hơn 5.000 cơ sở trên toàn quốc.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    readTime: 4,
  },
  {
    title: 'Du lịch đường sắt Bắc - Nam: Trải nghiệm toa tàu hạng sang mới',
    excerpt: 'Đường sắt Việt Nam ra mắt toa VIP 4 sao với giường nằm rộng, WiFi tốc độ cao và dịch vụ ăn uống đẳng cấp.',
    content: `Tổng công ty Đường sắt Việt Nam vừa đưa vào khai thác toa tàu hạng sang mới trên tuyến Bắc - Nam, mang đến trải nghiệm du lịch đường sắt hoàn toàn khác biệt.

Toa VIP 4 sao gồm 20 giường nằm riêng biệt với rèm cách âm, nệm bọt nhớ, bộ khăn trải giường sạch sẽ, và hệ thống điều hòa riêng. Mỗi giường có ổ cắm USB, đèn đọc sách và WiFi tốc độ cao.

Ngoài ra, toa restaurant phục vụ đồ ăn Việt Nam và quốc tế, toa sky lounge với cửa kính panoramic để ngắm cảnh, và dịch vụ spa mini.

Giá vé tuyến Hà Nội - TP.HCM (34 giờ) từ 2,5 triệu đồng/người. "Du lịch đường sắt không chỉ là phương tiện di chuyển mà là trải nghiệm thú vị," đại diện ĐSVN chia sẻ.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
    readTime: 3,
  },
  {
    title: 'Hạ Long Bay chính thức vào Top 10 kỳ quan thiên nhiên mới của thế giới',
    excerpt: 'Vịnh Hạ Long được New7Wonders Foundation vinh danh sau cuộc bình chọn toàn cầu với hơn 500 triệu phiếu bầu.',
    content: `Vịnh Hạ Long (Quảng Ninh) đã chính thức được New7Wonders Foundation vinh danh trong danh sách "Top 10 Kỳ quan Thiên nhiên Mới của Thế giới" sau cuộc bình chọn toàn cầu kéo dài 2 năm.

Với hơn 1.969 hòn đảo đá vôi lớn nhỏ, hang động kỳ vĩ và hệ sinh thái biển đa dạng, Hạ Long đã nhận được hơn 80 triệu phiếu bầu từ du khách và người yêu thiên nhiên trên toàn thế giới.

Thủ tướng Chính phủ đã gửi thư chúc mừng và chỉ đạo UBND tỉnh Quảng Ninh tăng cường bảo tồn, phát triển du lịch bền vững.

Tỉnh Quảng Ninh đặt mục tiêu đón 20 triệu lượt khách trong năm 2026, tăng 30% so với năm 2025, đồng thời giới hạn số lượng tàu du lịch để bảo vệ môi trường vịnh.`,
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    readTime: 4,
  },
];

async function seedArticles() {
  console.log(`🚀 Bắt đầu seed ${ARTICLES.length} bài báo...`);
  
  let inserted = 0;
  let skipped = 0;
  
  for (const article of ARTICLES) {
    try {
      // Check if article with same title already exists
      const existing = await pool.query('SELECT id FROM articles WHERE title = $1', [article.title]);
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }
      
      const authorId = randomAuthor();
      const publishedAt = randomDate(30);
      const createdAt = new Date(new Date(publishedAt).getTime() - 2 * 60 * 60 * 1000).toISOString();
      
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
  
  console.log(`\n✅ Hoàn tất!`);
  console.log(`   📰 Đã chèn: ${inserted} bài báo mới`);
  console.log(`   ⏭️  Bỏ qua: ${skipped} bài (đã tồn tại)`);
  
  // Show stats
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
