import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';
import { adminAPI, commentsAPI, tokenStorage } from '../../../utils/api';

function SidebarNav({ activeTab, onTabChange, pendingCount = 0, approvedCount = 0 }) {
   const menu = [
      { id: 'dashboard', label: 'Bảng điều khiển', icon: '📊' },
      { id: 'articles-pending', label: 'Bài chờ duyệt', icon: '📋', badge: pendingCount },
      { id: 'articles-approved', label: 'Bài chờ xuất bản', icon: '✅', badge: approvedCount },
      { id: 'articles-manage', label: 'Quản lý bài viết', icon: '📝' },
      { id: 'categories-manage', label: 'Quản lý chuyên mục', icon: '📂' },
      { id: 'comments-manage', label: 'Quản lý bình luận', icon: '💬' },
      { id: 'users-manage', label: 'Quản lý người dùng', icon: '👥' },
      { id: 'logs', label: 'Nhật ký hệ thống', icon: '📜' },
      { id: 'settings', label: 'Cài đặt hệ thống', icon: '⚙️' },
   ];
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— QUẢN TRỊ —</span>
         </div>
         <nav className={styles.sidebarNav}>
            {menu.map((item) => (
               <button
                  key={item.id}
                  className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                  onClick={() => onTabChange(item.id)}
               >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge > 0 && <span className={styles.navBadge}>{item.badge}</span>}
               </button>
            ))}
         </nav>
      </aside>
   );
}

function DashboardOverview({ stats }) {
   return (
      <section className={styles.dashboardSection}>
         <h1>Bảng Điều Khiển Quản Trị</h1>
         <div className={styles.statsGrid}>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>📰</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tổng bài viết</div>
                  <div className={styles.statValue}>{stats?.totalArticles || 0}</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>✅</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Đã xuất bản</div>
                  <div className={styles.statValue}>{stats?.publishedArticles || 0}</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>⏳</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Đang chờ duyệt</div>
                  <div className={styles.statValue}>{stats?.pendingArticles || 0}</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>👥</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tổng người dùng</div>
                  <div className={styles.statValue}>{stats?.totalUsers || 0}</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>✍️</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Tác giả</div>
                  <div className={styles.statValue}>{stats?.totalAuthors || 0}</div>
               </div>
            </div>
            <div className={styles.statBox}>
               <div className={styles.statIcon}>✏️</div>
               <div className={styles.statText}>
                  <div className={styles.statLabel}>Biên tập viên</div>
                  <div className={styles.statValue}>{stats?.totalEditors || 0}</div>
               </div>
            </div>
         </div>
      </section>
   );
}

function ArticlesPendingTable({ articles, onView }) {
   return (
      <section className={styles.managementSection}>
         <h1>Bài Viết Chờ Biên Tập Duyệt</h1>
         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Tác giả</span>
               <span>Ngày tạo</span>
               <span>Trạng thái</span>
            </div>
            {articles.length === 0 ? (
               <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Không có bài viết chờ duyệt.</div>
            ) : (
               articles.map((article) => (
                  <div key={article.id} className={styles.tableRow}>
                     <span>#{article.id.substring(0, 8)}...</span>
                     <span className={styles.title}>{article.title}</span>
                     <span>{article.authorName || article.author || 'Tác giả'}</span>
                     <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                     <span style={{ color: 'var(--gold-primary)' }}>📋 Chờ duyệt</span>
                  </div>
               ))
            )}
         </div>
      </section>
   );
}

function ArticlesApprovedTable({ articles, onPublish }) {
   return (
      <section className={styles.managementSection}>
         <h1>Bài Viết Chờ Xuất Bản</h1>
         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Tác giả</span>
               <span>Ngày duyệt</span>
               <span>Hành động</span>
            </div>
            {articles.length === 0 ? (
               <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Không có bài viết chờ xuất bản.</div>
            ) : (
               articles.map((article) => (
                  <div key={article.id} className={styles.tableRow}>
                     <span>#{article.id.substring(0, 8)}...</span>
                     <span className={styles.title}>{article.title}</span>
                     <span>{article.authorName || article.author || 'Tác giả'}</span>
                     <span>{new Date(article.updatedAt || article.createdAt).toLocaleDateString('vi-VN')}</span>
                     <span className={styles.actions}>
                        <button className={styles.btnSmallApprove} onClick={() => onPublish(article.id)}>📰 Xuất bản ngay</button>
                     </span>
                  </div>
               ))
            )}
         </div>
      </section>
   );
}

function ArticlesManagementTable({ articles, onDelete }) {
   const [filter, setFilter] = useState('all');
   const [search, setSearch] = useState('');

   const filtered = articles.filter((a) => {
      const matchFilter = filter === 'all' || a.status === filter;
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
   });

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Toàn Bộ Bài Viết</h1>
         <div className={styles.tableControls}>
            <input 
               type="text" 
               placeholder="Tìm kiếm bài viết..." 
               className={styles.searchInput} 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
            <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
               <option value="all">Tất cả trạng thái</option>
               <option value="draft">Nháp</option>
               <option value="pending">Chờ duyệt</option>
               <option value="approved">Chờ đăng</option>
               <option value="published">Đã đăng</option>
            </select>
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>ID</span>
               <span>Tiêu đề</span>
               <span>Chuyên mục</span>
               <span>Trạng thái</span>
               <span>Lượt xem</span>
               <span>Hành động</span>
            </div>
            {filtered.length === 0 ? (
               <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Không tìm thấy bài viết nào.</div>
            ) : (
               filtered.map((article) => (
                  <div key={article.id} className={styles.tableRow}>
                     <span>#{article.id.substring(0, 8)}</span>
                     <span className={styles.title}>{article.title}</span>
                     <span>{article.category}</span>
                     <span>
                        <span className={`${styles.statusBadge} ${article.status === 'published' ? styles.statusApproved : ''}`}>
                           {article.status.toUpperCase()}
                        </span>
                     </span>
                     <span>👁️ {article.views || 0}</span>
                     <span className={styles.actions}>
                        <button className={styles.btnSmallDanger} onClick={() => onDelete(article.id)}>🗑️ Xóa</button>
                     </span>
                  </div>
               ))
            )}
         </div>
      </section>
   );
}

function CategoriesManagement({ categories, onCreate, onDelete }) {
   const [name, setName] = useState('');
   const [slug, setSlug] = useState('');
   const [color, setColor] = useState('#D4AF37');

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !slug) return;
      onCreate({ name, slug, color });
      setName('');
      setSlug('');
   };

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Chuyên Mục</h1>
         <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', background: '#141414', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Tên chuyên mục..." value={name} onChange={(e) => setName(e.target.value)} required className={styles.settingInput} style={{ flex: 1, minWidth: '150px' }} />
            <input type="text" placeholder="Slug (ví dụ: thoisu)..." value={slug} onChange={(e) => setSlug(e.target.value)} required className={styles.settingInput} style={{ flex: 1, minWidth: '150px' }} />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '40px', height: '40px', border: 'none', background: 'transparent', cursor: 'pointer' }} />
            <button type="submit" className={styles.btnPrimary} style={{ height: '40px' }}>➕ Thêm</button>
         </form>

         <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
               <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryColor} style={{ backgroundColor: cat.color || '#D4AF37' }} />
                  <h3>{cat.name}</h3>
                  <p>Slug: <code>{cat.slug}</code></p>
                  <div className={styles.categoryActions}>
                     <button className={styles.btnSmallDanger} onClick={() => onDelete(cat.id)}>Xóa</button>
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}

function CommentsManagement({ comments, onDelete }) {
   const [search, setSearch] = useState('');

   const filtered = comments.filter((c) =>
      c.content.toLowerCase().includes(search.toLowerCase()) ||
      (c.userName && c.userName.toLowerCase().includes(search.toLowerCase())) ||
      (c.articleTitle && c.articleTitle.toLowerCase().includes(search.toLowerCase()))
   );

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Bình Luận Độc Giả</h1>
         <div className={styles.tableControls}>
            <input 
               type="text" 
               placeholder="Tìm theo nội dung, người gửi hoặc bài viết..." 
               className={styles.searchInput} 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>Người gửi</span>
               <span>Bài viết</span>
               <span>Nội dung bình luận</span>
               <span>Ngày gửi</span>
               <span>Hành động</span>
            </div>
            {filtered.length === 0 ? (
               <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Không tìm thấy bình luận nào.</div>
            ) : (
               filtered.map((comment) => (
                  <div key={comment.id} className={styles.tableRow}>
                     <span className={styles.title}>
                        {comment.userName || 'Ẩn danh'}
                        <br/>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{comment.userEmail}</span>
                     </span>
                     <span>{comment.articleTitle || 'Bài viết'}</span>
                     <span style={{ fontStyle: 'italic', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '300px' }}>
                        "{comment.content}"
                     </span>
                     <span>{new Date(comment.createdAt).toLocaleDateString('vi-VN')}</span>
                     <span className={styles.actions}>
                        <button className={styles.btnSmallDanger} onClick={() => onDelete(comment.id)}>🗑️ Xóa</button>
                     </span>
                  </div>
               ))
            )}
         </div>
      </section>
   );
}

function UsersManagement({ users, onUpdateRole, onSuspend, onActivate }) {
   const [search, setSearch] = useState('');

   const filtered = users.filter((u) => 
      u.email.toLowerCase().includes(search.toLowerCase()) || 
      (u.fullName && u.fullName.toLowerCase().includes(search.toLowerCase()))
   );

   return (
      <section className={styles.managementSection}>
         <h1>Quản Lý Tài Khoản Thành Viên</h1>
         <div className={styles.tableControls}>
            <input 
               type="text" 
               placeholder="Tìm kiếm theo tên hoặc email..." 
               className={styles.searchInput} 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>

         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>Tên thành viên</span>
               <span>Email</span>
               <span>Vai trò</span>
               <span>Trạng thái</span>
               <span>Hành động</span>
            </div>
            {filtered.map((user) => (
               <div key={user.id} className={styles.tableRow}>
                  <span className={styles.title}>{user.fullName || 'Chưa đặt tên'}</span>
                  <span>{user.email}</span>
                  <span>
                     <select 
                        value={user.role} 
                        onChange={(e) => onUpdateRole(user.id, e.target.value)}
                        style={{ background: '#1c1c1c', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', padding: '0.2rem 0.5rem', borderRadius: '3px', outline: 'none' }}
                     >
                        <option value="guest">Guest</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                     </select>
                  </span>
                  <span>
                     <span style={{ color: user.status === 'suspended' ? '#ff4757' : '#2ed573' }}>
                        {user.status === 'suspended' ? '🚫 Khóa' : '✅ Active'}
                     </span>
                  </span>
                  <span className={styles.actions}>
                     {user.status === 'suspended' ? (
                        <button className={styles.btnSmall} onClick={() => onActivate(user.id)}>🔓 Mở khóa</button>
                     ) : (
                        <button className={styles.btnSmallDanger} onClick={() => onSuspend(user.id)}>🚫 Khóa</button>
                     )}
                  </span>
               </div>
            ))}
         </div>
      </section>
   );
}

function SystemLogs({ logs }) {
   return (
      <section className={styles.managementSection}>
         <h1>Nhật Ký Hoạt Động Hệ Thống</h1>
         <div className={styles.articlesTable}>
            <div className={styles.tableHeader}>
               <span>Thời gian</span>
               <span>Hành động</span>
               <span>Nội dung mô tả</span>
            </div>
            {logs.length === 0 ? (
               <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Không có log hoạt động nào.</div>
            ) : (
               logs.map((log) => (
                  <div key={log.id} className={styles.tableRow}>
                     <span>{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
                     <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>{log.action}</span>
                     <span>{log.description}</span>
                  </div>
               ))
            )}
         </div>
      </section>
   );
}

function SystemSettings() {
   return (
      <section className={styles.settingsSection}>
         <h1>Cài Đặt Hệ Thống</h1>

         <div className={styles.settingsGroup}>
            <h2>Thông Tin Trang Tin</h2>
            <div className={styles.settingRow}>
               <label>Tên trang web:</label>
               <input type="text" defaultValue="Báo Rồng Vàng" className={styles.settingInput} readOnly />
            </div>
            <div className={styles.settingRow}>
               <label>Khẩu hiệu:</label>
               <input type="text" defaultValue="Thông tin trung thực - Kịp thời - Khách quan" className={styles.settingInput} readOnly />
            </div>
         </div>
         <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontStyle: 'italic' }}>Các thông số cấu hình hệ thống đang được quản trị tự động qua biến môi trường (.env).</p>
      </section>
   );
}

export default function AdminDashboard() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const [articles, setArticles] = useState([]);
   const [categories, setCategories] = useState([]);
   const [users, setUsers] = useState([]);
   const [comments, setComments] = useState([]);
   const [logs, setLogs] = useState([]);
   const [stats, setStats] = useState(null);
   const [loading, setLoading] = useState(true);

   const fetchAdminData = async () => {
      setLoading(true);
      try {
         const [allArticles, allCategories, allUsers, allLogs, statsData, allComments] = await Promise.all([
            adminAPI.getAllArticles(200, 0),
            adminAPI.getCategories(),
            adminAPI.getUsers(200, 0),
            adminAPI.getLogs(50, 0),
            adminAPI.getStats(),
            commentsAPI.getAll()
         ]);
         setArticles(allArticles || []);
         setCategories(allCategories || []);
         setUsers(allUsers || []);
         setLogs(allLogs || []);
         setStats(statsData || null);
         setComments(allComments || []);
      } catch (err) {
         console.error('Failed to load admin dashboard data:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchAdminData();
   }, []);

   const handlePublish = async (id) => {
      if (!window.confirm('Bạn có muốn xuất bản bài viết này lên trang chủ công khai không?')) return;
      try {
         await adminAPI.publishArticle(id);
         alert('Đã xuất bản bài viết thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Xuất bản thất bại: ' + err.message);
      }
   };

   const handleDeleteArticle = async (id) => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.')) return;
      try {
         await adminAPI.deleteArticle(id);
         alert('Đã xóa bài viết khỏi hệ thống!');
         fetchAdminData();
      } catch (err) {
         alert('Xóa bài viết thất bại: ' + err.message);
      }
   };

   const handleCreateCategory = async (catData) => {
      try {
         await adminAPI.createCategory(catData);
         alert('Đã tạo chuyên mục mới thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Tạo chuyên mục thất bại: ' + err.message);
      }
   };

   const handleDeleteCategory = async (id) => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa chuyên mục này không?')) return;
      try {
         await adminAPI.deleteCategory(id);
         alert('Đã xóa chuyên mục thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Xóa chuyên mục thất bại: ' + err.message);
      }
   };

   const handleUpdateUserRole = async (userId, role) => {
      try {
         await adminAPI.updateUserRole(userId, role);
         alert('Đã cập nhật vai trò người dùng thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Cập nhật vai trò thất bại: ' + err.message);
      }
   };

   const handleSuspendUser = async (userId) => {
      try {
         await adminAPI.suspendUser(userId);
         alert('Đã khóa tài khoản thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Khóa tài khoản thất bại: ' + err.message);
      }
   };

   const handleActivateUser = async (userId) => {
      try {
         await adminAPI.activateUser(userId);
         alert('Đã mở khóa tài khoản thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Mở khóa tài khoản thất bại: ' + err.message);
      }
   };

   const handleDeleteComment = async (id) => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) return;
      try {
         await commentsAPI.delete(id);
         alert('Đã xóa bình luận thành công!');
         fetchAdminData();
      } catch (err) {
         alert('Xóa bình luận thất bại: ' + err.message);
      }
   };

   const pendingArticles = articles.filter((a) => a.status === 'pending');
   const approvedArticles = articles.filter((a) => a.status === 'approved');

   return (
      <div className={styles.adminDashboard}>
         <SidebarNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            pendingCount={pendingArticles.length}
            approvedCount={approvedArticles.length}
         />

         <main className={styles.mainContent}>
            {loading ? (
               <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--gold-primary)' }}>
                  Đang tải dữ liệu hệ thống quản trị...
               </div>
            ) : (
               <>
                  {activeTab === 'dashboard' && <DashboardOverview stats={stats} />}
                  {activeTab === 'articles-pending' && <ArticlesPendingTable articles={pendingArticles} />}
                  {activeTab === 'articles-approved' && <ArticlesApprovedTable articles={approvedArticles} onPublish={handlePublish} />}
                  {activeTab === 'articles-manage' && <ArticlesManagementTable articles={articles} onDelete={handleDeleteArticle} />}
                  {activeTab === 'categories-manage' && <CategoriesManagement categories={categories} onCreate={handleCreateCategory} onDelete={handleDeleteCategory} />}
                  {activeTab === 'comments-manage' && <CommentsManagement comments={comments} onDelete={handleDeleteComment} />}
                  {activeTab === 'users-manage' && <UsersManagement users={users} onUpdateRole={handleUpdateUserRole} onSuspend={handleSuspendUser} onActivate={handleActivateUser} />}
                  {activeTab === 'logs' && <SystemLogs logs={logs} />}
                  {activeTab === 'settings' && <SystemSettings />}
               </>
            )}
         </main>
      </div>
   );
}
