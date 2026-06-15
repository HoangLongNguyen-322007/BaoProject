/**
 * Seed Script - Khởi tạo dữ liệu mẫu cho Website Báo
 *
 * Usage:
 *   node src/backend/config/seed.js
 *   npm run db:seed
 */

const { pool } = require('./database');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

// ============================================================
// USERS DATA
// ============================================================
const USERS = [
  {
    email: 'admin@baorong.com',
    password: 'password123',
    fullName: 'Quản Trị Viên',
    role: 'admin',
    bio: 'Quản trị hệ thống Báo Rồng Vàng',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '0956789012',
  },
  {
    email: 'editor1@baorong.com',
    password: 'password123',
    fullName: 'Phạm Văn Cường',
    role: 'editor',
    bio: 'Biên tập viên kỳ cựu, hơn 10 năm kinh nghiệm trong nghề báo',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '0934567890',
  },
  {
    email: 'editor2@baorong.com',
    password: 'password123',
    fullName: 'Lê Thị Hương',
    role: 'editor',
    bio: 'Biên tập viên chuyên mục Kinh tế & Thời sự, tốt nghiệp ĐH Báo chí',
    avatar: 'https://i.pravatar.cc/150?img=10',
    phone: '0945678901',
  },
  {
    email: 'author1@baorong.com',
    password: 'password123',
    fullName: 'Nguyễn Văn An',
    role: 'author',
    bio: 'Nhà báo chuyên viết về công nghệ và khoa học, 5 năm kinh nghiệm',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '0912345678',
  },
  {
    email: 'author2@baorong.com',
    password: 'password123',
    fullName: 'Trần Thị Bình',
    role: 'author',
    bio: 'Nhà báo viết về đời sống xã hội và con người',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '0923456789',
  },
  {
    email: 'author3@baorong.com',
    password: 'password123',
    fullName: 'Hoàng Minh Tuấn',
    role: 'author',
    bio: 'Phóng viên mảng thể thao và giải trí',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '0967890123',
  },
  {
    email: 'user1@baorong.com',
    password: 'password123',
    fullName: 'Lý Văn Đức',
    role: 'guest',
    bio: 'Độc giả thường xuyên của Báo Rồng Vàng',
    avatar: 'https://i.pravatar.cc/150?img=15',
    phone: '0978901234',
  },
  {
    email: 'user2@baorong.com',
    password: 'password123',
    fullName: 'Nguyễn Thị Mai',
    role: 'guest',
    bio: 'Yêu thích đọc tin tức công nghệ và kinh tế',
    avatar: 'https://i.pravatar.cc/150?img=20',
    phone: '0989012345',
  },
];

// ============================================================
// CATEGORIES DATA
// ============================================================
const CATEGORIES = [
  {
    name: 'Thời Sự',
    slug: 'thoisu',
    description: 'Tin tức thời sự trong nước và quốc tế nóng nhất',
    color: '#e53e3e',
    icon: '📰',
    sortOrder: 1,
  },
  {
    name: 'Công Nghệ',
    slug: 'technology',
    description: 'Tin tức công nghệ, khoa học máy tính, AI và đổi mới sáng tạo',
    color: '#3182ce',
    icon: '💻',
    sortOrder: 2,
  },
  {
    name: 'Kinh Tế',
    slug: 'business',
    description: 'Tin tức kinh tế, tài chính, thị trường và doanh nghiệp',
    color: '#38a169',
    icon: '💼',
    sortOrder: 3,
  },
  {
    name: 'Thể Thao',
    slug: 'sports',
    description: 'Tin tức thể thao trong nước và quốc tế, kết quả thi đấu',
    color: '#dd6b20',
    icon: '⚽',
    sortOrder: 4,
  },
  {
    name: 'Giải Trí',
    slug: 'entertainment',
    description: 'Tin tức giải trí, văn hóa, điện ảnh và nghệ thuật',
    color: '#805ad5',
    icon: '🎬',
    sortOrder: 5,
  },
  {
    name: 'Sức Khỏe',
    slug: 'health',
    description: 'Tin tức y tế, sức khỏe cộng đồng và đời sống lành mạnh',
    color: '#319795',
    icon: '🏥',
    sortOrder: 6,
  },
  {
    name: 'Giáo Dục',
    slug: 'education',
    description: 'Tin tức giáo dục, học thuật, tuyển sinh và đào tạo',
    color: '#d69e2e',
    icon: '📚',
    sortOrder: 7,
  },
  {
    name: 'Du Lịch',
    slug: 'travel',
    description: 'Khám phá điểm đến, kinh nghiệm du lịch và văn hóa vùng miền',
    color: '#00b5d8',
    icon: '✈️',
    sortOrder: 8,
  },
];

// ============================================================
// TAGS DATA
// ============================================================
const TAGS = [
  { name: 'Việt Nam', slug: 'viet-nam' },
  { name: 'Kinh tế', slug: 'kinh-te' },
  { name: 'Công nghệ', slug: 'cong-nghe' },
  { name: 'AI', slug: 'ai' },
  { name: 'Thể thao', slug: 'the-thao' },
  { name: 'Bóng đá', slug: 'bong-da' },
  { name: 'Sức khỏe', slug: 'suc-khoe' },
  { name: 'Giáo dục', slug: 'giao-duc' },
  { name: 'Du lịch', slug: 'du-lich' },
  { name: 'Khoa học', slug: 'khoa-hoc' },
  { name: 'Môi trường', slug: 'moi-truong' },
  { name: 'Chứng khoán', slug: 'chung-khoan' },
  { name: 'Bất động sản', slug: 'bat-dong-san' },
  { name: 'SpaceX', slug: 'spacex' },
  { name: 'Apple', slug: 'apple' },
  { name: 'Google', slug: 'google' },
  { name: 'World Cup', slug: 'world-cup' },
  { name: 'Hà Nội', slug: 'ha-noi' },
  { name: 'TP.HCM', slug: 'tp-hcm' },
  { name: 'Startup', slug: 'startup' },
];

// ============================================================
// ARTICLES DATA
// ============================================================
const getArticles = (users) => {
  const a1 = users['author1@baorong.com'];
  const a2 = users['author2@baorong.com'];
  const a3 = users['author3@baorong.com'];
  const e1 = users['editor1@baorong.com'];
  const e2 = users['editor2@baorong.com'];

  return [
    // --- PUBLISHED ARTICLES ---
    {
      title: 'Kinh tế Việt Nam 6 tháng đầu năm 2024: Tăng trưởng vượt kỳ vọng',
      excerpt:
        'GDP 6 tháng đầu năm tăng 6,42%, cao nhất trong cùng kỳ 5 năm qua. Nhiều ngành lĩnh vực ghi nhận mức tăng trưởng tích cực.',
      content: `Theo số liệu của Tổng cục Thống kê, tổng sản phẩm trong nước (GDP) 6 tháng đầu năm 2024 tăng 6,42% so với cùng kỳ năm trước, cao hơn mức tăng 3,72% của cùng kỳ năm 2023. Đây là mức tăng trưởng cao nhất trong giai đoạn 2019-2024.

## Các ngành kinh tế chủ lực

- **Khu vực nông, lâm nghiệp và thủy sản** tăng 3,28%
- **Khu vực công nghiệp và xây dựng** tăng 7,51%  
- **Khu vực dịch vụ** tăng 6,64%

Nhiều ngành công nghiệp chế biến, chế tạo ghi nhận mức tăng trưởng cao, đóng góp lớn vào tăng trưởng chung của nền kinh tế. Các chuyên gia kinh tế nhận định đây là tín hiệu tích cực cho thấy sự phục hồi bền vững của nền kinh tế Việt Nam.

## Triển vọng cuối năm

Chính phủ đặt mục tiêu tăng trưởng GDP cả năm 2024 đạt 6-6,5%. Với đà tăng trưởng mạnh trong 6 tháng đầu năm, nhiều chuyên gia nhận định mục tiêu này hoàn toàn khả thi, thậm chí có thể vượt.`,
      category: 'business',
      author_id: a1,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80',
      readTime: 5,
      views: 1240,
      isFeatured: true,
      tags: ['kinh-te', 'viet-nam'],
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      title: 'SpaceX phóng thành công tàu vũ trụ Starship thế hệ mới',
      excerpt:
        'Tàu Starship của SpaceX đã hoàn thành chuyến bay thử nghiệm thành công, đánh dấu bước tiến lớn trong hành trình chinh phục sao Hỏa.',
      content: `Công ty SpaceX của tỷ phú Elon Musk đã phóng thành công tàu vũ trụ Starship trong chuyến bay thử nghiệm mới nhất. Đây là cột mốc quan trọng trong hành trình chinh phục sao Hỏa.

Starship là tên lửa mạnh nhất từng được chế tạo, với sức đẩy **7.500 tấn lực**. Theo kế hoạch, Starship sẽ được sử dụng để đưa con người lên Mặt Trăng trong khuôn khổ chương trình Artemis của NASA, và sau đó là sao Hỏa.

## Thông số kỹ thuật

| Thông số | Giá trị |
|---|---|
| Chiều cao | 121 m |
| Đường kính | 9 m |
| Sức đẩy | 7.500 tấn lực |
| Trọng tải LEO | 150 tấn |

Elon Musk cho biết mục tiêu của SpaceX là đưa con người lên sao Hỏa vào năm 2030, và Starship là phương tiện then chốt để thực hiện tham vọng này.`,
      category: 'technology',
      author_id: a2,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&q=80',
      readTime: 4,
      views: 890,
      isFeatured: false,
      tags: ['spacex', 'khoa-hoc', 'cong-nghe'],
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      title: 'Quốc hội thông qua nhiều luật quan trọng trong kỳ họp thứ 7',
      excerpt:
        'Kỳ họp thứ 7 Quốc hội khóa XV đã thông qua nhiều luật quan trọng, ảnh hưởng sâu rộng đến đời sống kinh tế xã hội.',
      content: `Tại kỳ họp thứ 7, Quốc hội khóa XV đã xem xét, thông qua nhiều luật quan trọng với tỷ lệ đại biểu tán thành cao.

## Các luật được thông qua

- **Luật Đất đai (sửa đổi)** với 432/477 đại biểu tán thành
- **Luật Nhà ở (sửa đổi)** với 424/477 đại biểu tán thành
- **Luật Kinh doanh bất động sản (sửa đổi)**
- **Luật Tổ chức tín dụng (sửa đổi)**

Theo các chuyên gia, các luật mới này sẽ tạo ra bước đột phá trong cải cách thể chế, tháo gỡ các điểm nghẽn pháp lý, thúc đẩy phát triển kinh tế - xã hội.

## Luật Đất đai - điểm nổi bật

Luật Đất đai (sửa đổi) có nhiều điểm mới quan trọng, trong đó đáng chú ý là việc bỏ khung giá đất, giao cho UBND cấp tỉnh quyết định bảng giá đất hàng năm, tiệm cận giá thị trường.`,
      category: 'thoisu',
      author_id: a1,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1575321729918-87a2a36d2c23?w=1200&q=80',
      readTime: 6,
      views: 2100,
      isFeatured: true,
      tags: ['viet-nam', 'bat-dong-san'],
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      title: 'ĐT Việt Nam thắng thuyết phục, tiến gần hơn đến vòng loại cuối World Cup',
      excerpt:
        'Với tỷ số 3-1, đội tuyển Việt Nam đã có chiến thắng quan trọng trong vòng loại World Cup 2026, củng cố vị trí trong bảng đấu.',
      content: `Đội tuyển Việt Nam đã có màn trình diễn ấn tượng khi đánh bại đối thủ với tỷ số **3-1** trong trận đấu vòng loại World Cup 2026.

## Diễn biến trận đấu

- ⚽ **Nguyễn Tiến Linh** (phút 23) - Bàn mở tỷ số tuyệt đẹp
- ⚽ **Nguyễn Quang Hải** (phút 56, penalty) - Nâng tỷ số lên 2-0
- ⚽ **Đối thủ** (phút 65) - Rút ngắn tỷ số
- ⚽ **Trần Đình Trọng** (phút 78) - Ấn định chiến thắng

## Nhận định sau trận

Huấn luyện viên trưởng chia sẻ: *"Đây là chiến thắng xứng đáng. Các cầu thủ đã thể hiện tinh thần đoàn kết và quyết tâm cao độ. Chúng tôi sẽ tiếp tục phấn đấu để hoàn thành mục tiêu đề ra."*

Với kết quả này, Việt Nam đang đứng thứ 2 bảng đấu và có cơ hội lớn để tiến vào vòng loại cuối.`,
      category: 'sports',
      author_id: a3,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
      readTime: 3,
      views: 3400,
      isFeatured: false,
      tags: ['bong-da', 'world-cup', 'viet-nam'],
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      title: 'iPhone 16 Pro Max: Những nâng cấp đột phá về camera và AI',
      excerpt:
        'Apple chính thức ra mắt iPhone 16 Pro Max với chip A18 Pro, hệ thống camera hoàn toàn mới và nhiều tính năng AI thông minh.',
      content: `Apple vừa chính thức ra mắt dòng iPhone 16, trong đó iPhone 16 Pro Max là mẫu máy đỉnh cao nhất với hàng loạt nâng cấp đột phá.

## Camera

- Camera chính **48MP** với khẩu độ f/1.78 mới
- Camera telephoto 12MP với **zoom quang học 5x**
- Tính năng Camera Control mới - nút điều khiển vật lý

## Hiệu năng

- Chip **A18 Pro** với Neural Engine thế hệ mới
- Hỗ trợ **Apple Intelligence** trực tiếp trên thiết bị
- RAM 8GB - lần đầu tiên trên iPhone

## Pin và sạc

- Pin **4685mAh**, lớn nhất từ trước đến nay
- Sạc nhanh 30W, sạc không dây 25W

## Giá bán tại Việt Nam

| Model | Dung lượng | Giá |
|---|---|---|
| iPhone 16 Pro Max | 256GB | 34,990,000 đ |
| iPhone 16 Pro Max | 512GB | 39,990,000 đ |
| iPhone 16 Pro Max | 1TB | 44,990,000 đ |`,
      category: 'technology',
      author_id: a1,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&q=80',
      readTime: 5,
      views: 5670,
      isFeatured: true,
      tags: ['apple', 'cong-nghe', 'ai'],
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    },
    {
      title: 'Hà Nội triển khai thẻ vé điện tử cho hệ thống xe buýt toàn thành phố',
      excerpt:
        'Từ tháng 7/2024, toàn bộ hệ thống xe buýt Hà Nội sẽ áp dụng thẻ vé điện tử thông minh, thay thế hoàn toàn vé giấy.',
      content: `UBND thành phố Hà Nội vừa công bố kế hoạch triển khai hệ thống thẻ vé điện tử thông minh cho toàn bộ mạng lưới xe buýt công cộng từ tháng 7/2024.

## Phương thức thanh toán được hỗ trợ

- 💳 **Thẻ vé điện tử** chuyên dụng - mua tại các điểm giao dịch
- 📱 **Ứng dụng điện thoại** - quét mã QR khi lên xe  
- 💰 **Thẻ ngân hàng NFC** - chạm thẻ để trả tiền

## Lợi ích cho hành khách

Hệ thống mới sẽ cho phép kết nối liên thông giữa các tuyến xe buýt, Metro và các phương tiện công cộng khác. Hành khách có thể chuyển tuyến mà không cần mua vé mới trong vòng **90 phút**.

## Lộ trình triển khai

- **Tháng 7/2024**: Thí điểm 50 tuyến trọng điểm
- **Tháng 10/2024**: Mở rộng toàn bộ 132 tuyến
- **Tháng 1/2025**: Kết nối với Metro Nhổn - Ga Hà Nội`,
      category: 'thoisu',
      author_id: a2,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
      readTime: 4,
      views: 780,
      isFeatured: false,
      tags: ['ha-noi', 'viet-nam'],
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      title: 'Chứng khoán Việt Nam phục hồi mạnh: VN-Index vượt mốc 1.300 điểm',
      excerpt:
        'Sau giai đoạn điều chỉnh, thị trường chứng khoán Việt Nam đang cho thấy sức bật ấn tượng với VN-Index vượt ngưỡng kháng cự quan trọng.',
      content: `Kết thúc phiên giao dịch hôm nay, VN-Index đóng cửa tại mức **1.312,45 điểm**, tăng 18,23 điểm (+1,41%) so với phiên trước, chính thức vượt ngưỡng kháng cự tâm lý 1.300 điểm.

## Thống kê giao dịch phiên hôm nay

| Chỉ số | Giá trị |
|---|---|
| Khối lượng giao dịch | 850 triệu cổ phiếu |
| Giá trị giao dịch | 18.500 tỷ đồng |
| Số mã tăng | 287 |
| Số mã giảm | 124 |
| Số mã không đổi | 58 |

## Cổ phiếu nổi bật

- **VCB** (+2,8%) - Ngân hàng Ngoại thương dẫn đầu nhóm ngân hàng
- **VIC** (+3,1%) - Vingroup bứt phá sau tin tức khả quan
- **HPG** (+2,2%) - Hòa Phát ổn định trong bối cảnh thép phục hồi

Các chuyên gia phân tích nhận định thị trường đang trong xu hướng tích cực, được hỗ trợ bởi dòng tiền nội địa mạnh mẽ và triển vọng kinh tế vĩ mô tích cực.`,
      category: 'business',
      author_id: a1,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
      readTime: 4,
      views: 1890,
      isFeatured: false,
      tags: ['chung-khoan', 'kinh-te', 'viet-nam'],
      publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    },
    {
      title: 'Google ra mắt Gemini 2.0: Bước đột phá trong trí tuệ nhân tạo',
      excerpt:
        'Google DeepMind công bố Gemini 2.0 với khả năng xử lý đa phương tiện vượt trội và cửa sổ ngữ cảnh 2 triệu token.',
      content: `Google DeepMind vừa chính thức ra mắt **Gemini 2.0**, mô hình AI thế hệ tiếp theo với nhiều cải tiến đột phá so với phiên bản tiền nhiệm.

## Những điểm nổi bật

- 📏 **Cửa sổ ngữ cảnh 2 triệu token** - gấp đôi so với Gemini 1.5
- 🎬 **Xử lý video dài** lên đến 2 giờ trong một lần truy vấn
- 🔊 **Đầu ra âm thanh và hình ảnh gốc** - không chỉ văn bản
- 🏆 **Hiệu suất vượt trội** trên hầu hết các benchmark AI

## So sánh với GPT-4o

| Benchmark | Gemini 2.0 | GPT-4o |
|---|---|---|
| MMLU | 90.0% | 88.7% |
| HumanEval | 74.4% | 90.2% |
| MATH | 53.2% | 52.9% |

Gemini 2.0 sẽ được tích hợp vào toàn bộ hệ sinh thái sản phẩm của Google, từ Search, Gmail cho đến Google Workspace, dự kiến ra mắt rộng rãi trong Q1/2025.`,
      category: 'technology',
      author_id: a2,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
      readTime: 5,
      views: 4200,
      isFeatured: true,
      tags: ['google', 'ai', 'cong-nghe'],
      publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    },
    {
      title: 'Festival âm nhạc lớn nhất Đông Nam Á 2024 sắp diễn ra tại Hà Nội',
      excerpt:
        'Sau thành công vang dội năm ngoái, Festival âm nhạc quốc tế Hà Nội 2024 hứa hẹn quy tụ hơn 200 nghệ sĩ từ 30 quốc gia.',
      content: `Ban tổ chức vừa công bố danh sách lineup ấn tượng cho **Festival âm nhạc quốc tế Hà Nội 2024**, sự kiện âm nhạc lớn nhất từ trước đến nay tại Việt Nam.

## Thông tin sự kiện

- 📅 **Thời gian**: 15-17/11/2024  
- 📍 **Địa điểm**: Khu liên hợp thể thao quốc gia Mỹ Đình, Hà Nội
- 🎪 **3 sân khấu chính** hoạt động đồng thời
- 🎤 **Hơn 200 nghệ sĩ** từ 30 quốc gia
- 👥 **60.000 khán giả** mỗi đêm

## Nghệ sĩ quốc tế nổi bật

Một số cái tên đáng chú ý trong lineup lần này bao gồm các nghệ sĩ đến từ Hàn Quốc, Nhật Bản, Mỹ và các nước Đông Nam Á. Ban tổ chức cho biết sẽ công bố toàn bộ lineup vào tuần tới.

## Tình trạng vé

Vé đã được bán ra và đang trong tình trạng **cháy vé** cho hầu hết các hạng. Người hâm mộ nên nhanh chóng đặt mua trước khi hết.`,
      category: 'entertainment',
      author_id: a3,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
      readTime: 3,
      views: 2300,
      isFeatured: false,
      tags: ['ha-noi', 'viet-nam'],
      publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
    },
    {
      title: 'Hướng dẫn chăm sóc sức khỏe tâm thần trong thời đại số',
      excerpt:
        'Các chuyên gia tâm lý chia sẻ những phương pháp hiệu quả để duy trì sức khỏe tâm thần trong bối cảnh công nghệ số ngày càng chi phối cuộc sống.',
      content: `Trong thời đại công nghệ số, áp lực từ mạng xã hội và môi trường làm việc liên tục đang ảnh hưởng nghiêm trọng đến sức khỏe tâm thần của nhiều người.

## 5 phương pháp chăm sóc sức khỏe tâm thần hiệu quả

### 1. Đặt giới hạn thời gian dùng điện thoại
Áp dụng quy tắc **"no-phone zone"** trong bữa ăn và trước khi ngủ 1 tiếng. Sử dụng tính năng Screen Time (iOS) hoặc Digital Wellbeing (Android) để theo dõi và giới hạn thời gian.

### 2. Thực hành mindfulness
Dành **10-15 phút** mỗi ngày cho thiền định và hít thở có ý thức. Các app miễn phí như Headspace, Calm có thể hỗ trợ người mới bắt đầu.

### 3. Duy trì kết nối xã hội thực
Gặp gỡ bạn bè và gia đình thay vì chỉ giao tiếp qua mạng. Các cuộc trò chuyện trực tiếp giúp não bộ tiết ra oxytocin - hormone hạnh phúc.

### 4. Vận động thể chất đều đặn
Ít nhất **30 phút tập thể dục** mỗi ngày, 5 ngày/tuần. Đi bộ, đạp xe, bơi lội hay yoga đều có tác dụng tốt.

### 5. Tìm kiếm sự trợ giúp chuyên nghiệp
Không ngại tham khảo ý kiến chuyên gia tâm lý khi cần. Tâm lý trị liệu hiện đã phổ biến và được bảo hiểm y tế một số nơi chi trả.`,
      category: 'health',
      author_id: a2,
      editor_id: e1,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&q=80',
      readTime: 6,
      views: 1560,
      isFeatured: false,
      tags: ['suc-khoe'],
      publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
    },
    {
      title: 'Startup Việt Nam gọi vốn thành công 10 triệu USD từ quỹ ngoại',
      excerpt:
        'MediTech Việt Nam - startup trong lĩnh vực y tế số vừa hoàn tất vòng gọi vốn Series A trị giá 10 triệu USD từ các quỹ đầu tư Đông Nam Á.',
      content: `**MediTech Việt Nam**, startup chuyên cung cấp giải pháp y tế số, vừa thông báo hoàn tất vòng gọi vốn Series A trị giá **10 triệu USD** từ các quỹ đầu tư hàng đầu khu vực Đông Nam Á.

## Về MediTech Việt Nam

Thành lập năm 2021, MediTech phát triển nền tảng kết nối bệnh nhân với bác sĩ qua telemedicine, quản lý hồ sơ sức khỏe điện tử và AI hỗ trợ chẩn đoán.

## Thành tích ấn tượng

- 📊 **500.000+ người dùng** trên toàn quốc
- 🏥 **1.200 bác sĩ** đang hoạt động trên nền tảng
- 💹 **Tăng trưởng 300%** về doanh thu trong năm 2023
- 🌏 Đang mở rộng sang **Thái Lan và Philippines**

## Kế hoạch sử dụng vốn

Nguồn vốn mới sẽ được dùng để mở rộng thị trường ra Đông Nam Á, nâng cấp hệ thống AI và tuyển dụng thêm 200 nhân sự trong năm 2024.`,
      category: 'business',
      author_id: a1,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80',
      readTime: 4,
      views: 920,
      isFeatured: false,
      tags: ['startup', 'kinh-te', 'viet-nam', 'suc-khoe'],
      publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
    },
    {
      title: 'Khám phá vẻ đẹp mùa nước nổi miền Tây Nam Bộ',
      excerpt:
        'Mùa nước nổi từ tháng 7 đến tháng 11 mang đến cho vùng đồng bằng sông Cửu Long vẻ đẹp độc đáo cùng nguồn tài nguyên thiên nhiên phong phú.',
      content: `Mùa nước nổi ở đồng bằng sông Cửu Long là một trong những hiện tượng thiên nhiên đặc trưng nhất của miền Tây Nam Bộ Việt Nam, diễn ra từ khoảng **tháng 7 đến tháng 11** hàng năm.

## Những điểm đến không thể bỏ qua

### Tràm Chim - Đồng Tháp
Vườn quốc gia Tràm Chim là nơi trú ngụ của hàng trăm loài chim, trong đó có sếu đầu đỏ quý hiếm. Vào mùa nước nổi, du khách có thể đi thuyền len lỏi qua những cánh đồng ngập nước xanh mướt.

### Búng Bình Thiên - An Giang
Được mệnh danh là "Biển hồ thu nhỏ" của Việt Nam, Búng Bình Thiên rộng hơn 200 ha luôn trong xanh quanh năm, đặc biệt đẹp vào mùa nước nổi.

### Chợ nổi Cái Răng - Cần Thơ
Hoạt động từ 5 giờ sáng, chợ nổi là nơi giao thương sầm uất trên mặt nước với đủ loại nông sản đặc trưng vùng sông nước.

## Lưu ý khi đi du lịch mùa nước nổi

- Mang theo áo phao và giày cao su chống thấm
- Tốt nhất đi vào **tháng 9-10** khi nước đạt đỉnh cao nhất
- Đặt trước homestay và thuyền chèo để có trải nghiệm tốt nhất`,
      category: 'travel',
      author_id: a3,
      editor_id: e2,
      status: 'published',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80',
      readTime: 5,
      views: 1100,
      isFeatured: false,
      tags: ['du-lich', 'viet-nam'],
      publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    },
    // --- PENDING ARTICLES (chờ biên tập duyệt) ---
    {
      title: 'Trí tuệ nhân tạo sẽ thay thế bao nhiêu công việc vào năm 2030?',
      excerpt:
        'Báo cáo mới nhất từ McKinsey Global Institute dự báo AI và tự động hóa sẽ ảnh hưởng đến 375 triệu lao động toàn cầu vào năm 2030.',
      content: `Theo báo cáo mới nhất từ McKinsey Global Institute, trí tuệ nhân tạo (AI) và tự động hóa dự kiến sẽ ảnh hưởng đến khoảng **375 triệu lao động** trên toàn cầu vào năm 2030.

## Các lĩnh vực bị ảnh hưởng nhiều nhất

1. **Sản xuất và chế tạo** - Robot và tự động hóa thay thế công việc lặp lại
2. **Dịch vụ khách hàng** - Chatbot AI xử lý hầu hết các yêu cầu thông thường
3. **Kế toán và tài chính** - AI phân tích dữ liệu nhanh hơn và chính xác hơn
4. **Lái xe và giao thông** - Xe tự lái thay thế tài xế

## Công việc nào sẽ phát triển?

Ngược lại, nhu cầu về các vai trò đòi hỏi sáng tạo, tư duy phản biện và kỹ năng giao tiếp phức tạp sẽ tăng mạnh. Các ngành y tế, giáo dục, nghệ thuật và kỹ thuật AI chính là những lĩnh vực triển vọng nhất.`,
      category: 'technology',
      author_id: a1,
      editor_id: null,
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
      readTime: 6,
      views: 0,
      isFeatured: false,
      tags: ['ai', 'cong-nghe'],
      publishedAt: null,
    },
    // --- DRAFT ARTICLE ---
    {
      title: 'Giải pháp năng lượng tái tạo cho Việt Nam năm 2025',
      excerpt:
        'Việt Nam đang đẩy mạnh phát triển điện mặt trời và điện gió nhằm đáp ứng nhu cầu năng lượng ngày càng tăng.',
      content: `[Bài viết đang được hoàn thiện...]

Việt Nam có tiềm năng lớn về năng lượng tái tạo với đường bờ biển dài và lượng bức xạ mặt trời cao...`,
      category: 'thoisu',
      author_id: a2,
      editor_id: null,
      status: 'draft',
      image: null,
      readTime: 7,
      views: 0,
      isFeatured: false,
      tags: ['moi-truong', 'viet-nam'],
      publishedAt: null,
    },
  ];
};

// ============================================================
// SEED COMMENTS
// ============================================================
const getSeedComments = (articleIds, userIds) => {
  const articleList = Object.values(articleIds);
  const u1 = userIds['user1@baorong.com'];
  const u2 = userIds['user2@baorong.com'];
  const a1 = userIds['author1@baorong.com'];

  if (!articleList[0] || !u1) return [];

  return [
    {
      article_id: articleList[0],
      user_id: u1,
      content: 'Bài viết rất hay và chi tiết! Cảm ơn tác giả đã cung cấp thông tin hữu ích.',
      status: 'approved',
    },
    {
      article_id: articleList[0],
      user_id: u2,
      content: 'Tôi đồng ý với nhận định trong bài. Kinh tế Việt Nam đang trên đà phục hồi tích cực.',
      status: 'approved',
    },
    {
      article_id: articleList[1],
      user_id: u1,
      content: 'SpaceX thực sự đang làm thay đổi ngành hàng không vũ trụ toàn cầu!',
      status: 'approved',
    },
    {
      article_id: articleList[3],
      user_id: u2,
      content: 'Tuyệt vời! Hy vọng đội tuyển sẽ tiếp tục phong độ tốt ở các trận tiếp theo!',
      status: 'approved',
    },
    {
      article_id: articleList[3],
      user_id: a1,
      content: 'Màn trình diễn của Quang Hải trong trận này thực sự xuất sắc.',
      status: 'approved',
    },
    {
      article_id: articleList[4],
      user_id: u1,
      content: 'Camera iPhone 16 Pro Max trông rất ấn tượng nhưng giá vẫn còn cao quá!',
      status: 'approved',
    },
  ];
};

// ============================================================
// SEED NOTIFICATIONS
// ============================================================
const getSeedNotifications = (userIds) => {
  const a1 = userIds['author1@baorong.com'];
  const a2 = userIds['author2@baorong.com'];
  const e1 = userIds['editor1@baorong.com'];

  if (!a1) return [];
  return [
    {
      user_id: a1,
      title: 'Bài viết được duyệt',
      message: 'Bài viết "Kinh tế Việt Nam 6 tháng đầu năm" đã được biên tập viên duyệt và xuất bản.',
      type: 'approval',
      isRead: true,
    },
    {
      user_id: a1,
      title: 'Bình luận mới',
      message: 'Có người vừa bình luận vào bài viết của bạn.',
      type: 'comment',
      isRead: false,
    },
    {
      user_id: a2,
      title: 'Bài viết được duyệt',
      message: 'Bài viết "SpaceX phóng thành công tàu vũ trụ Starship" đã được xuất bản.',
      type: 'approval',
      isRead: false,
    },
    {
      user_id: e1,
      title: 'Bài viết mới chờ duyệt',
      message: 'Có 1 bài viết mới đang chờ bạn xem xét và phê duyệt.',
      type: 'system',
      isRead: false,
    },
  ];
};

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
const seedDatabase = async () => {
  try {
    console.log('\n🌱 Starting database seed...\n');

    // --- 1. Seed Users ---
    console.log('👤 Seeding users...');
    const insertedUsers = {};
    for (const userData of USERS) {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [userData.email]);
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
    console.log(`  ✓ ${USERS.length} users ready`);

    // --- 2. Seed Categories ---
    console.log('📂 Seeding categories...');
    const insertedCategories = {};
    for (const cat of CATEGORIES) {
      const existing = await pool.query('SELECT id FROM categories WHERE slug = $1', [cat.slug]);
      if (existing.rows.length > 0) {
        insertedCategories[cat.slug] = existing.rows[0].id;
        continue;
      }
      const result = await pool.query(
        `INSERT INTO categories (name, slug, description, color, icon, "sortOrder")
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [cat.name, cat.slug, cat.description, cat.color, cat.icon, cat.sortOrder]
      );
      insertedCategories[cat.slug] = result.rows[0].id;
    }
    console.log(`  ✓ ${CATEGORIES.length} categories ready`);

    // --- 3. Seed Tags ---
    console.log('🏷️  Seeding tags...');
    const insertedTags = {};
    for (const tag of TAGS) {
      const existing = await pool.query('SELECT id FROM tags WHERE slug = $1', [tag.slug]);
      if (existing.rows.length > 0) {
        insertedTags[tag.slug] = existing.rows[0].id;
        continue;
      }
      const result = await pool.query(
        `INSERT INTO tags (name, slug) VALUES ($1, $2) RETURNING id`,
        [tag.name, tag.slug]
      );
      insertedTags[tag.slug] = result.rows[0].id;
    }
    console.log(`  ✓ ${TAGS.length} tags ready`);

    // --- 4. Seed Articles ---
    console.log('📰 Seeding articles...');
    const articles = getArticles(insertedUsers);
    const insertedArticles = {};
    let articleCount = 0;

    for (const article of articles) {
      const existing = await pool.query(
        'SELECT id FROM articles WHERE title = $1 AND author_id = $2',
        [article.title, article.author_id]
      );
      if (existing.rows.length > 0) {
        insertedArticles[article.title] = existing.rows[0].id;
        continue;
      }

      const result = await pool.query(
        `INSERT INTO articles
          (title, excerpt, content, category, author_id, editor_id, status, image,
           "readTime", views, tags, "isFeatured", "publishedAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         RETURNING id`,
        [
          article.title,
          article.excerpt,
          article.content,
          article.category,
          article.author_id,
          article.editor_id || null,
          article.status,
          article.image || null,
          article.readTime || 5,
          article.views || 0,
          article.tags || [],
          article.isFeatured || false,
          article.publishedAt || null,
        ]
      );
      insertedArticles[article.title] = result.rows[0].id;
      articleCount++;

      // Link article_tags
      if (article.tags && article.tags.length > 0) {
        for (const tagSlug of article.tags) {
          const tagId = insertedTags[tagSlug];
          if (tagId) {
            await pool.query(
              `INSERT INTO article_tags (article_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
              [result.rows[0].id, tagId]
            );
          }
        }
      }
    }
    console.log(`  ✓ ${articleCount} new articles inserted (${articles.length} total)`);

    // --- 5. Seed Comments ---
    console.log('💬 Seeding comments...');
    const comments = getSeedComments(insertedArticles, insertedUsers);
    let commentCount = 0;
    for (const comment of comments) {
      if (!comment.article_id || !comment.user_id) continue;
      const existing = await pool.query(
        'SELECT id FROM comments WHERE article_id = $1 AND user_id = $2 AND content = $3',
        [comment.article_id, comment.user_id, comment.content]
      );
      if (existing.rows.length > 0) continue;
      await pool.query(
        `INSERT INTO comments (article_id, user_id, content, status) VALUES ($1, $2, $3, $4)`,
        [comment.article_id, comment.user_id, comment.content, comment.status]
      );
      commentCount++;
    }
    console.log(`  ✓ ${commentCount} comments inserted`);

    // --- 6. Seed Notifications ---
    console.log('🔔 Seeding notifications...');
    const notifications = getSeedNotifications(insertedUsers);
    let notifCount = 0;
    for (const notif of notifications) {
      if (!notif.user_id) continue;
      const existing = await pool.query(
        'SELECT id FROM notifications WHERE user_id = $1 AND title = $2',
        [notif.user_id, notif.title]
      );
      if (existing.rows.length > 0) continue;
      await pool.query(
        `INSERT INTO notifications (user_id, title, message, type, "isRead")
         VALUES ($1, $2, $3, $4, $5)`,
        [notif.user_id, notif.title, notif.message, notif.type, notif.isRead]
      );
      notifCount++;
    }
    console.log(`  ✓ ${notifCount} notifications inserted`);

    // --- 7. Init Editor Stats ---
    console.log('📊 Initializing editor stats...');
    const editorEmails = ['editor1@baorong.com', 'editor2@baorong.com'];
    for (const email of editorEmails) {
      const editorId = insertedUsers[email];
      if (!editorId) continue;
      await pool.query(
        `INSERT INTO editor_stats (editor_id) VALUES ($1) ON CONFLICT (editor_id) DO NOTHING`,
        [editorId]
      );
    }
    console.log(`  ✓ Editor stats initialized`);

    // --- Done ---
    console.log('\n✅ Database seeded successfully!\n');
    console.log('─── Tài khoản test ───────────────────────────────');
    console.log('  Admin:   admin@baorong.com    / password123');
    console.log('  Editor:  editor1@baorong.com  / password123');
    console.log('  Editor:  editor2@baorong.com  / password123');
    console.log('  Author:  author1@baorong.com  / password123');
    console.log('  Author:  author2@baorong.com  / password123');
    console.log('  Author:  author3@baorong.com  / password123');
    console.log('  User:    user1@baorong.com    / password123');
    console.log('  User:    user2@baorong.com    / password123');
    console.log('──────────────────────────────────────────────────\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  }
};

// Chạy trực tiếp nếu là main module
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedDatabase };
