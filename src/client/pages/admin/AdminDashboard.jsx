import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import { MOCK_ARTICLES } from '../../../utils/mockData';

const ADMIN_MENU = [
   { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊' },
   { id: 'articles-pending', label: 'Bài chờ duyệt', icon: '📋', badge: 3 },
   { id: 'articles-approved', label: 'Bài đã duyệt', icon: '✅', badge: 8 },
   { id: 'articles-manage', label: 'Quản lý bài viết', icon: '📝' },
   { id: 'categories-manage', label: 'Quản lý chuyên mục', icon: '📂' },
   { id: 'users-manage', label: 'Quản lý người dùng', icon: '👥' },
   { id: 'editors-manage', label: 'Quản lý biên tập viên', icon: '✏️' },
   { id: 'contributors', label: 'Quản lý cộng tác viên', icon: '📄' },
   { id: 'settings', label: 'Cài đặt hệ thống', icon: '⚙️' },
];

function SidebarNav({ activeTab, onTabChange }) {
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— ADMIN —</span>
         </div>
         <nav className={styles.sidebarNav}>
            {ADMIN_MENU.map((item) => (
               <button
                  key={item.id}
                  className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                  onClick={() => onTabChange(item.id)}
               >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
               </button>
            ))}
         </nav>
      </aside>
   );
}

function DashboardOverview() {
   return (
      <section className={styles.dashboardSection}>
         <h1>Bảng Điều Khiển Quản Trị</h1>
         <div className={styles.statsGrid}>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>📰</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tổng bài viết</div>
                  <div className={styles.statValue}>1,245</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>👥</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tác giả</div>
                  <div className={styles.statValue}>127</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>✏️</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Biên tập viên</div>
                  <div className={styles.statValue}>23</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>👁️</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tổng lượt xem</div>
                  <div className={styles.statValue}>156.8K</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>💬</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Bình luận</div>
                  <div className={styles.statValue}>3,421</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>📂</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Chuyên mục</div>
                  <div className={styles.statValue}>12</div>
               </div>
            </div>
         </div>

         <div className={styles.chartsSection}>
            <div className={styles.chartBox}>
               <h2>Bài viết theo trạng thái</h2>
               <div className={styles.chartPlaceholder}>
                  <div className={styles.barChart}>
                     <div className={styles.bar} style={{ height: '70%' }}>Nháp: 245</div>
                     <div className={styles.bar} style={{ height: '40%' }}>Chờ duyệt: 98</div>
                     <div className={styles.bar} style={{ height: '90%' }}>Đã duyệt: 654</div>
                     <div className={styles.bar} style={{ height: '50%' }}>Từ chối: 145</div>
                  </div>
               </div>
            </div>
            <div className={styles.chartBox}>
               <h2>Hoạt động gần đây</h2>
               <div className={styles.activityList}>
                  <div className={styles.activityItem}>
                     <span className={styles.activityIcon}>📰</span>
                     <span>Nguyễn Văn A đã xuất bản bài "Tin tức hôm nay"</span>
                     <span className={styles.activityTime}>5 phút trước</span>
                  </div>
                  <div className={styles.activityItem}>
                     <span className={styles.activityIcon}>👤</span>
                     <span>Người dùng mới đăng ký: Trần Thị B</span>
                     <span className={styles.activityTime}>12 phút trước</span>
                  </div>
                  <div className={styles.activityItem}>
                     <span className={styles.activityIcon}>✏️</span>
                     <span>Bài viết được sửa: "Kinh tế Việt Nam"</span>
                     <span className={styles.activityTime}>28 phút trước</span>
                  </div>
                  <div className={styles.activityItem}>
                     <span className={styles.activityIcon}>❌</span>
                     <span>Bài viết bị từ chối: "Tin không xác minh"</span>
                     <span className={styles.activityTime}>1 giờ trước</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

function ArticlesPendingTable({ articles }) {
   return (
      <section className={styles.managementSection}>
         <h1>Bài Viết Chờ Duyệt</h1>
         <div className={styles.tableControls}>
            <input type="text" placeholder="Tìm kiếm bài viết..." className={styles.searchInput} />
            <button className={styles.btnPrimary}>🔄 Làm mới</button>
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Tác giả</span>
               <span>Ngày gửi</span>
               <span>Hành động</span>
            </div>
            {articles.slice(0, 3).map((article) => (
               <div key={article.id} className={styles.tableRow}>
                  <span>#{article.id}</span>
                  <span className={styles.title}>{article.title}</span>
                  <span>{article.author}</span>
                  <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                  <span className={styles.actions}>
                     <button className={styles.btnSmall}>Xem</button>
                     <button className={styles.btnSmallApprove}>✅ Duyệt</button>
                     <button className={styles.btnSmallDanger}>❌ Từ chối</button>
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function ArticlesApprovedTable({ articles }) {
   return (
      <section className={styles.managementSection}>
         <h1>Bài Viết Đã Duyệt</h1>
         <div className={styles.tableControls}>
            <input type="text" placeholder="Tìm kiếm bài viết..." className={styles.searchInput} />
            <button className={styles.btnPrimary}>📰 Xuất bản tất cả</button>
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Tác giả</span>
               <span>Ngày duyệt</span>
               <span>Hành động</span>
            </div>
            {articles.slice(3, 8).map((article) => (
               <div key={article.id} className={styles.tableRow}>
                  <span>#{article.id}</span>
                  <span className={styles.title}>{article.title}</span>
                  <span>{article.author}</span>
                  <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                  <span className={styles.actions}>
                     <button className={styles.btnSmall}>Xem</button>
                     <button className={styles.btnSmall}>Sửa</button>
                     <button className={styles.btnSmallDanger}>Xóa</button>
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function ArticlesManagementTable({ articles }) {
   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Bài Viết</h1>
         <div className={styles.tableControls}>
            <input type="text" placeholder="Tìm kiếm bài viết..." className={styles.searchInput} />
            <select className={styles.filterSelect}>
               <option>Tất cả trạng thái</option>
               <option>Nháp</option>
               <option>Chờ duyệt</option>
               <option>Đã duyệt</option>
               <option>Đã đăng</option>
            </select>
            <button className={styles.btnPrimary}>+ Bài viết mới</button>
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Tác giả</span>
               <span>Trạng thái</span>
               <span>Ngày tạo</span>
               <span>Hành động</span>
            </div>
            {articles.map((article) => (
               <div key={article.id} className={styles.tableRow}>
                  <span>#{article.id}</span>
                  <span className={styles.title}>{article.title}</span>
                  <span>{article.author}</span>
                  <span>
                     <span className={styles.statusBadge}>Đã đăng</span>
                  </span>
                  <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                  <span className={styles.actions}>
                     <button className={styles.btnSmall}>Xem</button>
                     <button className={styles.btnSmall}>Sửa</button>
                     <button className={styles.btnSmallDanger}>Xóa</button>
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function CategoriesManagement() {
   const categories = [
      { id: 1, name: 'Thời sự', color: '#ff6b6b', articles: 245 },
      { id: 2, name: 'Kinh tế', color: '#4ecdc4', articles: 189 },
      { id: 3, name: 'Công nghệ', color: '#45b7d1', articles: 156 },
      { id: 4, name: 'Thể thao', color: '#f9ca24', articles: 134 },
      { id: 5, name: 'Giải trí', color: '#6c5ce7', articles: 201 },
      { id: 6, name: 'Sức khỏe', color: '#a29bfe', articles: 98 },
   ];

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Chuyên Mục</h1>
         <button className={styles.btnPrimary}>+ Thêm chuyên mục</button>

         <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
               <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryColor} style={{ backgroundColor: cat.color }} />
                  <h3>{cat.name}</h3>
                  <p>{cat.articles} bài viết</p>
                  <div className={styles.categoryActions}>
                     <button className={styles.btnSmall}>Sửa</button>
                     <button className={styles.btnSmallDanger}>Xóa</button>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}

function UsersManagement() {
   const users = [
      { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Author', joinDate: '2024-03-15' },
      { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'Author', joinDate: '2024-04-20' },
      { id: 3, name: 'Lê Văn C', email: 'levcan@example.com', role: 'Author', joinDate: '2024-05-10' },
      { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'Author', joinDate: '2024-02-28' },
      { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', role: 'Author', joinDate: '2024-01-15' },
   ];

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Người Dùng</h1>
         <div className={styles.tableControls}>
            <input type="text" placeholder="Tìm kiếm người dùng..." className={styles.searchInput} />
            <select className={styles.filterSelect}>
               <option>Tất cả vai trò</option>
               <option>Author</option>
               <option>Editor</option>
               <option>Admin</option>
            </select>
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tên</span>
               <span>Email</span>
               <span>Vai trò</span>
               <span>Ngày tham gia</span>
               <span>Hành động</span>
            </div>
            {users.map((user) => (
               <div key={user.id} className={styles.tableRow}>
                  <span>#{user.id}</span>
                  <span className={styles.title}>{user.name}</span>
                  <span>{user.email}</span>
                  <span>
                     <span className={styles.roleBadge}>{user.role}</span>
                  </span>
                  <span>{user.joinDate}</span>
                  <span className={styles.actions}>
                     <button className={styles.btnSmall}>Chi tiết</button>
                     <button className={styles.btnSmall}>Sửa</button>
                     <button className={styles.btnSmallDanger}>Khóa</button>
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function EditorsManagement() {
   const editors = [
      { id: 1, name: 'Trần Minh Đức', email: 'minhduc@baorongvang.vn', level: 'Cấp 2', articles: 245, approved: 234 },
      { id: 2, name: 'Lê Thị Hương', email: 'huong@baorongvang.vn', level: 'Cấp 1', articles: 189, approved: 178 },
      { id: 3, name: 'Nguyễn Công Minh', email: 'minhnc@baorongvang.vn', level: 'Cấp 3', articles: 312, approved: 301 },
   ];

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Biên Tập Viên</h1>
         <button className={styles.btnPrimary}>+ Thêm biên tập viên</button>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>Tên</span>
               <span>Email</span>
               <span>Cấp độ</span>
               <span>Bài duyệt</span>
               <span>Duyệt thành công</span>
               <span>Hành động</span>
            </div>
            {editors.map((editor) => (
               <div key={editor.id} className={styles.tableRow}>
                  <span className={styles.title}>{editor.name}</span>
                  <span>{editor.email}</span>
                  <span>
                     <span className={styles.levelBadge}>{editor.level}</span>
                  </span>
                  <span>{editor.articles}</span>
                  <span>{editor.approved}</span>
                  <span className={styles.actions}>
                     <button className={styles.btnSmall}>Sửa</button>
                     <button className={styles.btnSmallDanger}>Xóa</button>
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function SystemSettings() {
   return (
      <section className={styles.settingsSection}>
         <h1>Cài Đặt Hệ Thống</h1>

         <div className={styles.settingsGroup}>
            <h2>Thông Tin Chung</h2>
            <div className={styles.settingRow}>
               <label>Tên trang web:</label>
               <input type="text" defaultValue="Báo Rồng Vàng" className={styles.settingInput} />
            </div>
            <div className={styles.settingRow}>
               <label>Mô tả:</label>
               <textarea defaultValue="Website đọc báo nhưng bản temu" className={styles.settingTextarea} />
            </div>
            <div className={styles.settingRow}>
               <label>Email liên hệ:</label>
               <input type="email" defaultValue="info@baorongvang.vn" className={styles.settingInput} />
            </div>
         </div>

         <div className={styles.settingsGroup}>
            <h2>Cài Đặt Nội Dung</h2>
            <div className={styles.settingRow}>
               <label>Bài viết trên trang: </label>
               <input type="number" defaultValue="12" className={styles.settingInput} style={{ maxWidth: '100px' }} />
            </div>
            <div className={styles.settingRow}>
               <label>
                  <input type="checkbox" defaultChecked /> Yêu cầu duyệt bài trước khi xuất bản
               </label>
            </div>
            <div className={styles.settingRow}>
               <label>
                  <input type="checkbox" defaultChecked /> Cho phép bình luận trên bài viết
               </label>
            </div>
            <div className={styles.settingRow}>
               <label>
                  <input type="checkbox" /> Duyệt bình luận trước khi hiển thị
               </label>
            </div>
         </div>

         <div className={styles.settingsGroup}>
            <h2>Bảo Mật</h2>
            <div className={styles.settingRow}>
               <label>Thời hạn hết hạn phiên (phút):</label>
               <input type="number" defaultValue="30" className={styles.settingInput} style={{ maxWidth: '100px' }} />
            </div>
            <div className={styles.settingRow}>
               <label>
                  <input type="checkbox" defaultChecked /> Bật 2FA (Two-Factor Authentication)
               </label>
            </div>
         </div>

         <button className={styles.btnPrimary} style={{ marginTop: '2rem' }}>
            💾 Lưu cài đặt
         </button>
      </section>
   );
}

export default function AdminDashboard() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const articles = MOCK_ARTICLES.slice(0, 8);

   return (
      <div className={styles.adminDashboard}>
         <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

         <main className={styles.mainContent}>
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'articles-pending' && <ArticlesPendingTable articles={articles} />}
            {activeTab === 'articles-approved' && <ArticlesApprovedTable articles={articles} />}
            {activeTab === 'articles-manage' && <ArticlesManagementTable articles={articles} />}
            {activeTab === 'categories-manage' && <CategoriesManagement />}
            {activeTab === 'users-manage' && <UsersManagement />}
            {activeTab === 'editors-manage' && <EditorsManagement />}
            {activeTab === 'settings' && <SystemSettings />}
         </main>
      </div>
   );
}
