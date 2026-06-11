import React, { useState } from 'react';
import styles from './AuthorDashboard.module.css';
import { MOCK_ARTICLES } from '../../../utils/mockData';

const AUTHOR_MENU = [
   { id: 'dashboard', label: 'Tổng quan', icon: '📊' },
   { id: 'write', label: 'Tạo bài viết', icon: '✍️' },
   { id: 'drafts', label: 'Nháp (3)', icon: '📝' },
   { id: 'pending', label: 'Đang chờ duyệt (2)', icon: '⏳' },
   { id: 'published', label: 'Đã đăng (4)', icon: '✅' },
   { id: 'profile', label: 'Hồ sơ cá nhân', icon: '👤' },
];

function SidebarNav({ activeTab, onTabChange }) {
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— BÀI VIẾT TỐ —</span>
         </div>
         <nav className={styles.sidebarNav}>
            {AUTHOR_MENU.map((item) => (
               <button
                  key={item.id}
                  className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                  onClick={() => onTabChange(item.id)}
               >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
               </button>
            ))}
         </nav>
      </aside>
   );
}

function ArticleCard({ article, status = 'draft' }) {
   return (
      <div className={styles.articleCard}>
         <div className={styles.cardThumb}>
            <img src={article.image} alt={article.title} />
            <span className={`${styles.cardBadge} ${styles[`badge${status}`]}`}>
               {status === 'draft' ? 'Nháp' : status === 'pending' ? 'Chờ duyệt' : 'Đã đăng'}
            </span>
         </div>
         <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardExcerpt}>{article.excerpt}</p>
            <div className={styles.cardMeta}>
               <span>{article.category}</span>
               <span>•</span>
               <span>{article.readTime} phút</span>
            </div>
            <div className={styles.cardActions}>
               <button className={styles.btnSmall}>Chỉnh sửa</button>
               <button className={styles.btnSmallGhost}>Xóa</button>
            </div>
         </div>
      </div>
   );
}

function EditorPanel() {
   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('thoisu');
   const [content, setContent] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Bài viết:', { title, category, content });
      alert('Bài viết đã lưu nháp!');
   };

   return (
      <div className={styles.editorPanel}>
         <h2 className={styles.panelTitle}>Tạo bài viết mới</h2>
         <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label className={styles.label}>Tiêu đề bài viết</label>
                  <input
                     type="text"
                     className={styles.inputField}
                     placeholder="Nhập tiêu đề bài viết..."
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>
               <div className={styles.formGroup} style={{ maxWidth: '200px' }}>
                  <label className={styles.label}>Chuyên mục</label>
                  <select
                     className={styles.inputField}
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  >
                     <option value="thoisu">Thời sự</option>
                     <option value="business">Kinh tế</option>
                     <option value="technology">Công nghệ</option>
                     <option value="sports">Thể thao</option>
                     <option value="entertainment">Giải trí</option>
                  </select>
               </div>
            </div>

            <div className={styles.formGroup}>
               <label className={styles.label}>Nội dung bài viết</label>
               <div className={styles.richEditor}>
                  <div className={styles.toolbar}>
                     <button type="button" title="In đậm">
                        <b>B</b>
                     </button>
                     <button type="button" title="In nghiêng">
                        <i>I</i>
                     </button>
                     <button type="button" title="Gạch dưới">
                        <u>U</u>
                     </button>
                     <span className={styles.toolbarDivider} />
                     <button type="button" title="Danh sách">
                        ≡
                     </button>
                     <button type="button" title="Số thứ tự">
                        1.
                     </button>
                     <button type="button" title="Trích dẫn">
                        "
                     </button>
                     <button type="button" title="Liên kết">
                        🔗
                     </button>
                     <button type="button" title="Hình ảnh">
                        🖼️
                     </button>
                     <button type="button" title="Video">
                        ▶️
                     </button>
                     <span className={styles.toolbarDivider} />
                     <button type="button" title="Thêm nội dung">
                        ...
                     </button>
                  </div>
                  <textarea
                     className={styles.editorInput}
                     placeholder="Nhập nội dung bài viết tại đây..."
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                  />
               </div>
            </div>

            <div className={styles.formActions}>
               <button type="button" className={styles.btnOutline}>
                  Lưu nháp
               </button>
               <button type="submit" className={styles.btnPrimary}>
                  Gửi duyệt
               </button>
            </div>
         </form>
      </div>
   );
}

function ProfilePanel() {
   return (
      <div className={styles.profilePanel}>
         <h2 className={styles.panelTitle}>Hồ sơ cá nhân</h2>
         <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
               <div className={styles.profileAvatar} />
               <div className={styles.profileInfo}>
                  <h3>Nguyễn Văn A</h3>
                  <p>Nhà báo / Phóng viên</p>
               </div>
            </div>

            <div className={styles.profileStats}>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bài viết đã đăng</span>
                  <span className={styles.statNum}>12</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tổng lượt xem</span>
                  <span className={styles.statNum}>2.5K</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bình luận</span>
                  <span className={styles.statNum}>145</span>
               </div>
            </div>

            <div className={styles.profileDetails}>
               <div className={styles.detailRow}>
                  <label>Email:</label>
                  <span>nguyenvana@baorongvang.vn</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Điện thoại:</label>
                  <span>0123 456 789</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Chuyên mục:</label>
                  <span>Thời sự, Kinh tế</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Ngày tham gia:</label>
                  <span>15/03/2024</span>
               </div>
            </div>

            <button className={styles.btnPrimaryFull}>Cập nhật thông tin</button>
            <button className={styles.btnOutlineFull}>Đổi mật khẩu</button>
         </div>
      </div>
   );
}

export default function AuthorDashboard() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const allArticles = MOCK_ARTICLES.slice(0, 8);
   const draftArticles = allArticles.slice(0, 3);
   const pendingArticles = allArticles.slice(3, 5);
   const publishedArticles = allArticles.slice(5, 8);

   return (
      <div className={styles.authorDashboard}>
         <SidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

         <main className={styles.mainContent}>
            {activeTab === 'dashboard' && (
               <section className={styles.dashboardSection}>
                  <h1>Quản lý bài viết</h1>
                  <div className={styles.statsGrid}>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>📝</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Nháp</div>
                           <div className={styles.statValue}>3</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>⏳</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Chờ duyệt</div>
                           <div className={styles.statValue}>2</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>✅</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Đã đăng</div>
                           <div className={styles.statValue}>4</div>
                        </div>
                     </div>
                     <div className={styles.statBox}>
                        <div className={styles.statIcon}>👁️</div>
                        <div className={styles.statText}>
                           <div className={styles.statLabel}>Tổng lượt xem</div>
                           <div className={styles.statValue}>2.5K</div>
                        </div>
                     </div>
                  </div>

                  <div className={styles.recentArticles}>
                     <h2>Bài viết gần đây</h2>
                     <div className={styles.articlesGrid}>
                        {allArticles.map((article) => (
                           <ArticleCard key={article.id} article={article} status="draft" />
                        ))}
                     </div>
                  </div>
               </section>
            )}

            {activeTab === 'write' && <EditorPanel />}

            {activeTab === 'drafts' && (
               <section className={styles.listSection}>
                  <h1>Bài viết nháp</h1>
                  <div className={styles.articlesGrid}>
                     {draftArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} status="draft" />
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'pending' && (
               <section className={styles.listSection}>
                  <h1>Bài viết chờ duyệt</h1>
                  <div className={styles.articlesGrid}>
                     {pendingArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} status="pending" />
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'published' && (
               <section className={styles.listSection}>
                  <h1>Bài viết đã đăng</h1>
                  <div className={styles.articlesGrid}>
                     {publishedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} status="published" />
                     ))}
                  </div>
               </section>
            )}

            {activeTab === 'profile' && <ProfilePanel />}
         </main>
      </div>
   );
}
