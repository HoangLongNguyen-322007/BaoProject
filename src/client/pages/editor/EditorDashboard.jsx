import React, { useState, useEffect } from 'react';
import styles from './EditorDashboard.module.css';
import { editorAPI, tokenStorage } from '../../../utils/api';

function SidebarNav({ activeTab, onTabChange, pendingCount = 0, approvedCount = 0, rejectedCount = 0 }) {
   const menu = [
      { id: 'dashboard', label: 'Tổng quan', icon: '📊' },
      { id: 'pending', label: 'Bài chờ duyệt', icon: '📋', badge: pendingCount },
      { id: 'approved', label: 'Bài đã duyệt', icon: '✅', badge: approvedCount },
      { id: 'rejected', label: 'Bài từ chối', icon: '❌', badge: rejectedCount },
      { id: 'guidelines', label: 'Hướng dẫn biên tập', icon: '📝' },
      { id: 'profile', label: 'Hồ sơ cá nhân', icon: '👤' },
   ];
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— BIÊN TẬP —</span>
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

function ArticleReviewCard({ article, onApprove, onReject, onSuggest }) {
   const imageUrl = article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600';
   const authorName = article.authorName || article.author || 'Tác giả';
   return (
      <div className={styles.reviewCard}>
         <div className={styles.reviewHeader}>
            <div className={styles.authorInfo}>
               <span className={styles.authorAvatar}>{authorName.charAt(0)}</span>
               <div>
                  <div className={styles.authorName}>{authorName}</div>
                  <div className={styles.submitDate}>Ngày gửi: {new Date(article.createdAt || article.date).toLocaleDateString('vi-VN')}</div>
               </div>
            </div>
            <span className={styles.categoryBadge}>{article.category}</span>
         </div>

         <h3 className={styles.reviewTitle}>{article.title}</h3>
         <p className={styles.reviewExcerpt}>{article.excerpt}</p>

         <div className={styles.reviewMeta}>
            <span>📖 {article.readTime || 5} phút đọc</span>
            <span>•</span>
            <span>Trạng thái: <strong style={{ color: 'var(--gold-primary)' }}>{article.status.toUpperCase()}</strong></span>
         </div>

         <div className={styles.reviewContent} style={{ margin: '1rem 0' }}>
            {article.image && <img src={imageUrl} alt={article.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} />}
            <div style={{ background: '#1c1c1c', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem', color: '#ccc', maxHeight: '150px', overflowY: 'auto', marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
               {article.content}
            </div>
         </div>

         <div className={styles.reviewActions}>
            <button className={styles.btnReject} onClick={() => onReject(article.id)}>
               ❌ Từ chối
            </button>
            <button className={styles.btnEdit} onClick={() => onSuggest(article.id)}>
               💬 Đề xuất sửa
            </button>
            <button className={styles.btnApprove} onClick={() => onApprove(article.id)}>
               ✅ Duyệt bài
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
            </ul>
         </div>

         <div className={styles.guideSection}>
            <h3>🚫 Lý Do Từ Chối Bài</h3>
            <ul>
               <li>Nội dung không phù hợp với chính sách báo</li>
               <li>Thông tin không được xác minh</li>
               <li>Vi phạm bản quyền hoặc sao chép nguyên bản</li>
               <li>Chất lượng viết bài thấp hoặc spam</li>
            </ul>
         </div>
      </div>
   );
}

function ProfilePanel({ user, stats }) {
   if (!user) return null;
   return (
      <div className={styles.profilePanel}>
         <h2 className={styles.panelTitle}>Hồ Sơ Biên Tập Viên</h2>
         <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
               <div className={styles.profileAvatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', background: '#333', color: '#FFF' }}>
                  {user.fullName ? user.fullName.charAt(0) : 'E'}
               </div>
               <div className={styles.profileInfo}>
                  <h3>{user.fullName}</h3>
                  <p>Ban Biên Tập Rồng Vàng</p>
               </div>
            </div>

            <div className={styles.profileStats}>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tổng bài duyệt</span>
                  <span className={styles.statNum}>{stats?.articlesReviewed || 0}</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Đã duyệt</span>
                  <span className={styles.statNum} style={{ color: '#2ed573' }}>{stats?.articlesApproved || 0}</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Từ chối</span>
                  <span className={styles.statNum} style={{ color: '#ff4757' }}>{stats?.articlesRejected || 0}</span>
               </div>
            </div>

            <div className={styles.profileDetails}>
               <div className={styles.detailRow}>
                  <label>Email:</label>
                  <span>{user.email}</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Chức vụ:</label>
                  <span>Biên Tập Viên</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Ngày tham gia:</label>
                  <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Chưa rõ'}</span>
               </div>
            </div>

            <button className={styles.btnPrimaryFull} onClick={() => window.location.href = '/profile'}>✏️ Cài đặt tài khoản</button>
         </div>
      </div>
   );
}

export default function EditorDashboard() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const [pendingArticles, setPendingArticles] = useState([]);
   const [approvedArticles, setApprovedArticles] = useState([]);
   const [rejectedArticles, setRejectedArticles] = useState([]);
   const [stats, setStats] = useState(null);
   const [loading, setLoading] = useState(true);
   const [user] = useState(() => tokenStorage.getUser());

   const fetchDashboardData = async () => {
      setLoading(true);
      try {
         const [pending, approved, rejected, statsData] = await Promise.all([
            editorAPI.getPendingArticles(100, 0),
            editorAPI.getApprovedArticles(100, 0),
            editorAPI.getRejectedArticles(100, 0),
            editorAPI.getStats()
         ]);
         setPendingArticles(pending || []);
         setApprovedArticles(approved || []);
         setRejectedArticles(rejected || []);
         setStats(statsData || { articlesReviewed: 0, articlesApproved: 0, articlesRejected: 0 });
      } catch (err) {
         console.error('Failed to load editor dashboard data:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchDashboardData();
   }, []);

   const handleApprove = async (id) => {
      if (!window.confirm('Bạn có chắc chắn muốn phê duyệt bài viết này không?')) return;
      try {
         await editorAPI.approveArticle(id);
         alert('Phê duyệt bài viết thành công!');
         fetchDashboardData();
      } catch (err) {
         alert('Duyệt bài thất bại: ' + err.message);
      }
   };

   const handleReject = async (id) => {
      const reason = window.prompt('Vui lòng nhập lý do từ chối bài viết:');
      if (reason === null) return;
      try {
         await editorAPI.rejectArticle(id, reason || 'Nội dung không phù hợp tiêu chuẩn.');
         alert('Đã từ chối bài viết thành công.');
         fetchDashboardData();
      } catch (err) {
         alert('Từ chối bài thất bại: ' + err.message);
      }
   };

   const handleSuggestEdit = async (id) => {
      const suggestion = window.prompt('Nhập ý kiến đề xuất sửa đổi gửi tới tác giả:');
      if (!suggestion) return;
      try {
         await editorAPI.suggestEdit(id, suggestion);
         alert('Đã gửi ý kiến đề xuất chỉnh sửa!');
         fetchDashboardData();
      } catch (err) {
         alert('Gửi đề xuất thất bại: ' + err.message);
      }
   };

   return (
      <div className={styles.editorDashboard}>
         <SidebarNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            pendingCount={pendingArticles.length}
            approvedCount={approvedArticles.length}
            rejectedCount={rejectedArticles.length}
         />

         <main className={styles.mainContent}>
            {loading ? (
               <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--gold-primary)' }}>
                  Đang tải dữ liệu biên tập...
               </div>
            ) : (
               <>
                  {activeTab === 'dashboard' && (
                     <section className={styles.dashboardSection}>
                        <h1>Bảng Điều Khiển Biên Tập</h1>
                        <div className={styles.statsGrid}>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>📋</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Chờ duyệt</div>
                                 <div className={styles.statValue}>{pendingArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>✅</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Bài đã duyệt</div>
                                 <div className={styles.statValue}>{approvedArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>❌</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Bị từ chối</div>
                                 <div className={styles.statValue}>{rejectedArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>📰</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Bài đã duyệt (Lịch sử)</div>
                                 <div className={styles.statValue}>{stats?.articlesReviewed || 0}</div>
                              </div>
                           </div>
                        </div>

                        <div className={styles.recentQueue}>
                           <h2>Bài viết chờ duyệt mới nhất</h2>
                           {pendingArticles.length === 0 ? (
                              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '1rem 0' }}>Không có bài viết nào đang chờ duyệt.</p>
                           ) : (
                              <div className={styles.queueList}>
                                 {pendingArticles.slice(0, 3).map((article) => (
                                    <ArticleReviewCard 
                                       key={article.id} 
                                       article={article} 
                                       onApprove={handleApprove} 
                                       onReject={handleReject}
                                       onSuggest={handleSuggestEdit}
                                    />
                                 ))}
                              </div>
                           )}
                        </div>
                     </section>
                  )}

                  {activeTab === 'pending' && (
                     <section className={styles.reviewSection}>
                        <h1>Bài Viết Chờ Duyệt ({pendingArticles.length})</h1>
                        {pendingArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Danh sách trống.</p>
                        ) : (
                           <div className={styles.queueList}>
                              {pendingArticles.map((article) => (
                                 <ArticleReviewCard 
                                    key={article.id} 
                                    article={article} 
                                    onApprove={handleApprove} 
                                    onReject={handleReject}
                                    onSuggest={handleSuggestEdit}
                                 />
                              ))}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'approved' && (
                     <section className={styles.listSection}>
                        <h1>Bài Viết Đã Duyệt ({approvedArticles.length})</h1>
                        {approvedArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Danh sách trống.</p>
                        ) : (
                           <div className={styles.articlesTable}>
                              <div className={styles.tableHeader}>
                                 <span>Tiêu đề</span>
                                 <span>Tác giả</span>
                                 <span>Ngày gửi</span>
                                 <span>Trạng thái</span>
                              </div>
                              {approvedArticles.map((article) => {
                                 const authorName = article.authorName || article.author || 'Tác giả';
                                 return (
                                    <div key={article.id} className={styles.tableRow}>
                                       <span className={styles.title}>{article.title}</span>
                                       <span>{authorName}</span>
                                       <span>{new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
                                       <span style={{ color: '#2ed573' }}>✅ Đã duyệt</span>
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'rejected' && (
                     <section className={styles.listSection}>
                        <h1>Bài Viết Bị Từ Chối ({rejectedArticles.length})</h1>
                        {rejectedArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Danh sách trống.</p>
                        ) : (
                           <div className={styles.articlesTable}>
                              <div className={styles.tableHeader}>
                                 <span>Tiêu đề</span>
                                 <span>Tác giả</span>
                                 <span>Lý do từ chối</span>
                                 <span>Trạng thái</span>
                              </div>
                              {rejectedArticles.map((article) => {
                                 const authorName = article.authorName || article.author || 'Tác giả';
                                 return (
                                    <div key={article.id} className={styles.tableRow}>
                                       <span className={styles.title}>{article.title}</span>
                                       <span>{authorName}</span>
                                       <span style={{ color: '#ff4757', fontSize: '0.8rem' }}>{article.rejectionReason || 'Không phù hợp.'}</span>
                                       <span style={{ color: '#ff4757' }}>❌ Từ chối</span>
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'guidelines' && <GuidelinesPanel />}

                  {activeTab === 'profile' && <ProfilePanel user={user} stats={stats} />}
               </>
            )}
         </main>
      </div>
   );
}
