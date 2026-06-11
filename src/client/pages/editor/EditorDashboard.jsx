import React, { useState } from 'react';
import styles from './EditorDashboard.module.css';
import { MOCK_ARTICLES } from '../../../utils/mockData';

const EDITOR_MENU = [
   { id: 'dashboard', label: 'Tổng quan', icon: '📊' },
   { id: 'pending', label: 'Bài chờ duyệt', icon: '📋', badge: 3 },
   { id: 'approved', label: 'Bài đã duyệt', icon: '✅', badge: 8 },
   { id: 'rejected', label: 'Bài từ chối', icon: '❌', badge: 2 },
   { id: 'published', label: 'Bài đã đăng', icon: '📰', badge: 15 },
   { id: 'guidelines', label: 'Hướng dẫn chỉnh sửa', icon: '📝' },
   { id: 'profile', label: 'Hồ sơ cá nhân', icon: '👤' },
];

function SidebarNav({ activeTab, onTabChange }) {
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— BÁI VIẾT TỐ —</span>
         </div>
         <nav className={styles.sidebarNav}>
            {EDITOR_MENU.map((item) => (
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

function ArticleReviewCard({ article, onReview }) {
   return (
      <div className={styles.reviewCard}>
         <div className={styles.reviewHeader}>
            <div className={styles.authorInfo}>
               <span className={styles.authorAvatar}>{article.author?.charAt(0) || 'A'}</span>
               <div>
                  <div className={styles.authorName}>{article.author}</div>
                  <div className={styles.submitDate}>Gửi lúc: {new Date(article.date).toLocaleString('vi-VN')}</div>
               </div>
            </div>
            <span className={styles.categoryBadge}>{article.category}</span>
         </div>

         <h3 className={styles.reviewTitle}>{article.title}</h3>
         <p className={styles.reviewExcerpt}>{article.excerpt}</p>

         <div className={styles.reviewMeta}>
            <span>📖 {article.readTime} phút đọc</span>
            <span>•</span>
            <span>📊 {Math.floor(Math.random() * 1000)} từ</span>
         </div>

         <div className={styles.reviewContent}>
            {article.image && <img src={article.image} alt={article.title} />}
         </div>

         <div className={styles.reviewActions}>
            <button className={styles.btnReject} onClick={() => onReview(article.id, 'rejected')}>
               Từ chối
            </button>
            <button className={styles.btnEdit} onClick={() => onReview(article.id, 'edit')}>
               Chỉnh sửa & Duyệt
            </button>
            <button className={styles.btnApprove} onClick={() => onReview(article.id, 'approved')}>
               Duyệt ngay
            </button>
         </div>
      </div>
   );
}

function GuidelinesPanel() {
   return (
      <div className={styles.guidelinesPanel}>
         <h2 className={styles.panelTitle}>Hướng Dẫn Chỉnh Sửa Bài Viết</h2>

         <div className={styles.guideSection}>
            <h3>✅ Tiêu Chí Duyệt Bài</h3>
            <ul>
               <li>☑ Tiêu đề rõ ràng, hấp dẫn và không lạm dụng từ khóa</li>
               <li>☑ Nội dung không vi phạm chính sách nội dung</li>
               <li>☑ Không chứa thông tin sai lệch hoặc tin giả</li>
               <li>☑ Hình ảnh/video phải rõ ràng và liên quan đến nội dung</li>
               <li>☑ Tôn trọng bản quyền và nguồn tin</li>
               <li>☑ Không chứa spam hoặc quảng cáo che giấu</li>
            </ul>
         </div>

         <div className={styles.guideSection}>
            <h3>📏 Chiều Dài Tối Thiểu/Tối Đa</h3>
            <ul>
               <li>Tiêu đề: 10-100 ký tự</li>
               <li>Tóm tắt: 50-200 ký tự</li>
               <li>Nội dung: 300-5000 từ</li>
               <li>Thời gian đọc: 2-20 phút</li>
            </ul>
         </div>

         <div className={styles.guideSection}>
            <h3>🎯 Hướng Dẫn Chỉnh Sửa</h3>
            <ul>
               <li>Điều chỉnh tiêu đề để tăng độ hấp dẫn</li>
               <li>Kiểm tra chính tả và lỗi ngữ pháp</li>
               <li>Đảm bảo cấu trúc bài viết hợp lý</li>
               <li>Thêm các tiêu đề phụ để dễ đọc</li>
               <li>Xác minh các nguồn tin và dữ liệu</li>
               <li>Loại bỏ nội dung không liên quan</li>
            </ul>
         </div>

         <div className={styles.guideSection}>
            <h3>🚫 Lý Do Từ Chối Bài</h3>
            <ul>
               <li>Nội dung không phù hợp với chính sách</li>
               <li>Thông tin không được xác minh</li>
               <li>Vi phạm bản quyền hoặc sở hữu trí tuệ</li>
               <li>Chất lượng nội dung thấp</li>
               <li>Không phù hợp với tiêu chuẩn báo</li>
            </ul>
         </div>
      </div>
   );
}

function ProfilePanel() {
   return (
      <div className={styles.profilePanel}>
         <h2 className={styles.panelTitle}>Hồ Sơ Biên Tập Viên</h2>
         <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
               <div className={styles.profileAvatar} />
               <div className={styles.profileInfo}>
                  <h3>Trần Minh Đức</h3>
                  <p>Biên Tập Viên Cấp 2</p>
               </div>
            </div>

            <div className={styles.profileStats}>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bài đã duyệt</span>
                  <span className={styles.statNum}>245</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tỉ lệ duyệt</span>
                  <span className={styles.statNum}>89%</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bài từ chối</span>
                  <span className={styles.statNum}>30</span>
               </div>
            </div>

            <div className={styles.profileDetails}>
               <div className={styles.detailRow}>
                  <label>Email:</label>
                  <span>tranminhduc@baorongvang.vn</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Điện thoại:</label>
                  <span>0234 567 890</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Chuyên mục duyệt:</label>
                  <span>Thời sự, Kinh tế, Công nghệ</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Ngày tham gia:</label>
                  <span>01/06/2023</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Cấp độ:</label>
                  <span>Biên Tập Viên Cấp 2</span>
               </div>
            </div>

            <button className={styles.btnPrimaryFull}>Cập nhật thông tin</button>
            <button className={styles.btnOutlineFull}>Đổi mật khẩu</button>
         </div>
      </div>
   );
}

export default function EditorDashboard() {
   const [activeTab, setActiveTab] = useState('pending');
   const [articles] = useState(MOCK_ARTICLES.slice(0, 5));

   const handleReview = (articleId, action) => {
      console.log(`Article ${articleId} - Action: ${action}`);
      if (action === 'approved') {
         alert(`✅ Bài viết #${articleId} đã được duyệt và sẵn sàng xuất bản!`);
      } else if (action === 'rejected') {
         alert(`❌ Bài viết #${articleId} đã bị từ chối. Gửi thông báo cho tác giả.`);
      } else if (action === 'edit') {
         alert(`✏️ Mở editor để chỉnh sửa bài viết #${articleId}`);
      }
   };

   return (
      <div className={styles.editorDashboard}>
         <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

         <main className={styles.mainContent}>
            {activeTab === 'dashboard' && (
               <section className={styles.dashboardSection}>
                  <h1>Bảng Điều Khiển Biên Tập</h1>
                  <div className={styles.statsGrid}>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>📋</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Chờ duyệt</div>
                           <div className={styles.statValue}>3</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Đã duyệt</div>
                           <div className={styles.statValue}>8</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>❌</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Từ chối</div>
                           <div className={styles.statValue}>2</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>📰</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Đã xuất bản</div>
                           <div className={styles.statValue}>15</div>
                        </div>
                     </div>
                  </div>

                  <div className={styles.recentQueue}>
                     <h2>Bài viết chờ duyệt gần đây</h2>
                     <div className={styles.queueList}>
                        {articles.map((article) => (
                           <ArticleReviewCard key={article.id} article={article} onReview={handleReview} />
                        ))}
                     </div>
                  </div>
               </section>
            )}

            {activeTab === 'pending' && (
               <section className={styles.reviewSection}>
                  <h1>Bài Viết Chờ Duyệt</h1>
                  <div className={styles.queueList}>
                     {articles.map((article) => (
                        <ArticleReviewCard key={article.id} article={article} onReview={handleReview} />
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'approved' && (
               <section className={styles.listSection}>
                  <h1>Bài Viết Đã Duyệt</h1>
                  <div className={styles.articlesTable}>
                     <div className={styles.tableHeader}>
                        <span>Tiêu đề</span>
                        <span>Tác giả</span>
                        <span>Ngày duyệt</span>
                        <span>Trạng thái</span>
                     </div>
                     {articles.map((article) => (
                        <div key={article.id} className={styles.tableRow}>
                           <span className={styles.title}>{article.title}</span>
                           <span>{article.author}</span>
                           <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                           <span className={styles.statusApproved}>✅ Duyệt</span>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'rejected' && (
               <section className={styles.listSection}>
                  <h1>Bài Viết Bị Từ Chối</h1>
                  <div className={styles.articlesTable}>
                     <div className={styles.tableHeader}>
                        <span>Tiêu đề</span>
                        <span>Tác giả</span>
                        <span>Lý do từ chối</span>
                        <span>Ngày từ chối</span>
                     </div>
                     {articles.slice(0, 2).map((article) => (
                        <div key={article.id} className={styles.tableRow}>
                           <span className={styles.title}>{article.title}</span>
                           <span>{article.author}</span>
                           <span>Thông tin sai lệch</span>
                           <span className={styles.statusRejected}>❌ Từ chối</span>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'published' && (
               <section className={styles.listSection}>
                  <h1>Bài Viết Đã Đăng</h1>
                  <div className={styles.articlesTable}>
                     <div className={styles.tableHeader}>
                        <span>Tiêu đề</span>
                        <span>Tác giả</span>
                        <span>Ngày đăng</span>
                        <span>Lượt xem</span>
                     </div>
                     {articles.map((article, idx) => (
                        <div key={article.id} className={styles.tableRow}>
                           <span className={styles.title}>{article.title}</span>
                           <span>{article.author}</span>
                           <span>{new Date(article.date).toLocaleDateString('vi-VN')}</span>
                           <span>{Math.floor(Math.random() * 5000) + 500}</span>
                        </div>
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'guidelines' && <GuidelinesPanel />}

            {activeTab === 'profile' && <ProfilePanel />}
         </main>
      </div>
   );
}
