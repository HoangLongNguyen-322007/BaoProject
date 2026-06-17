import React, { useState, useEffect } from 'react';
import styles from './AuthorDashboard.module.css';
import { authorAPI, tokenStorage } from '../../../utils/api';

const getAuthorMenu = (draftCount, pendingCount, publishedCount) => [
   { id: 'dashboard', label: 'Tổng quan', icon: '📊' },
   { id: 'write', label: 'Tạo bài viết', icon: '✍️' },
   { id: 'drafts', label: `Nháp (${draftCount})`, icon: '📝' },
   { id: 'pending', label: `Đang chờ duyệt (${pendingCount})`, icon: '⏳' },
   { id: 'published', label: `Đã đăng (${publishedCount})`, icon: '✅' },
   { id: 'profile', label: 'Hồ sơ cá nhân', icon: '👤' },
];

function SidebarNav({ activeTab, onTabChange, draftCount = 0, pendingCount = 0, publishedCount = 0 }) {
   const menu = getAuthorMenu(draftCount, pendingCount, publishedCount);
   return (
      <aside className={styles.sidebar}>
         <div className={styles.sidebarHeader}>
            <span className={styles.sidebarLogo}>RỒNG VÀNG</span>
            <span className={styles.sidebarSub}>— TÁC GIẢ —</span>
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
               </button>
            ))}
         </nav>
      </aside>
   );
}

function ArticleCard({ article, status = 'draft', onDelete, onSubmit }) {
   const imageUrl = article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600';
   return (
      <div className={styles.articleCard}>
         <div className={styles.cardThumb}>
            <img src={imageUrl} alt={article.title} />
            <span className={`${styles.cardBadge} ${styles[`badge${status}`]}`}>
               {status === 'draft' ? 'Nháp' : status === 'pending' ? 'Chờ duyệt' : status === 'rejected' ? 'Bị từ chối' : 'Đã đăng'}
            </span>
         </div>
         <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{article.title}</h3>
            <p className={styles.cardExcerpt}>{article.excerpt}</p>
            <div className={styles.cardMeta}>
               <span>Chuyên mục: {article.category}</span>
               <span>•</span>
               <span>👁️ {article.views || 0} lượt xem</span>
            </div>
            {status === 'rejected' && article.rejectionReason && (
               <div style={{ fontSize: '0.75rem', color: '#ff6b6b', marginTop: '0.5rem', background: 'rgba(255,107,107,0.1)', padding: '0.4rem', borderRadius: '3px' }}>
                  <strong>Lý do từ chối:</strong> {article.rejectionReason}
               </div>
            )}
            <div className={styles.cardActions} style={{ marginTop: '1rem' }}>
               {status === 'draft' && (
                  <>
                     <button className={styles.btnSmall} onClick={() => onSubmit(article.id)}>🚀 Gửi duyệt</button>
                     <button className={styles.btnSmallGhost} onClick={() => onDelete(article.id)}>🗑️ Xóa</button>
                  </>
               )}
               {status === 'rejected' && (
                  <span style={{ fontSize: '0.8rem', color: '#ff6b6b' }}>Cần chỉnh sửa lại</span>
               )}
            </div>
         </div>
      </div>
   );
}

function EditorPanel({ onArticleCreated }) {
   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('thoisu');
   const [excerpt, setExcerpt] = useState('');
   const [image, setImage] = useState('');
   const [content, setContent] = useState('');
   const [submitting, setSubmitting] = useState(false);

   const handleSubmit = async (e, shouldSubmit = false) => {
      e.preventDefault();
      if (!title || !content) {
         alert('Vui lòng điền tiêu đề và nội dung bài viết!');
         return;
      }
      setSubmitting(true);
      try {
         const res = await authorAPI.createArticle({
            title,
            category,
            excerpt: excerpt || content.substring(0, 150),
            content,
            image: image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600',
            readTime: Math.max(1, Math.round(content.split(/\s+/).length / 200))
         });

         if (shouldSubmit) {
            await authorAPI.submitArticle(res.article.id);
            alert('Bài viết đã được tạo và gửi duyệt thành công!');
         } else {
            alert('Đã lưu bài viết nháp thành công!');
         }

         setTitle('');
         setContent('');
         setExcerpt('');
         setImage('');
         onArticleCreated();
      } catch (err) {
         alert('Lỗi khi lưu bài viết: ' + err.message);
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <div className={styles.editorPanel}>
         <h2 className={styles.panelTitle}>Tạo bài viết mới</h2>
         <form onSubmit={(e) => handleSubmit(e, false)}>
            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label className={styles.label}>Tiêu đề bài viết</label>
                  <input
                     type="text"
                     className={styles.inputField}
                     placeholder="Nhập tiêu đề bài viết..."
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     required
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
                     <option value="thegioi">Thế giới</option>
                     <option value="business">Kinh doanh</option>
                     <option value="technology">Công nghệ</option>
                     <option value="sports">Thể thao</option>
                     <option value="entertainment">Giải trí</option>
                     <option value="health">Sức khỏe</option>
                     <option value="education">Giáo dục</option>
                     <option value="lifestyle">Đời sống</option>
                  </select>
               </div>
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label className={styles.label}>Tóm tắt ngắn</label>
                  <input
                     type="text"
                     className={styles.inputField}
                     placeholder="Tóm tắt ngắn gọn nội dung bài viết..."
                     value={excerpt}
                     onChange={(e) => setExcerpt(e.target.value)}
                  />
               </div>
               <div className={styles.formGroup}>
                  <label className={styles.label}>Link ảnh minh họa</label>
                  <input
                     type="text"
                     className={styles.inputField}
                     placeholder="URL hình ảnh (https://...)"
                     value={image}
                     onChange={(e) => setImage(e.target.value)}
                  />
               </div>
            </div>

            <div className={styles.formGroup}>
               <label className={styles.label}>Nội dung bài viết</label>
               <div className={styles.richEditor}>
                  <div className={styles.toolbar}>
                     <button type="button" title="In đậm" onClick={() => setContent(c => c + ' **Chữ đậm**')}><b>B</b></button>
                     <button type="button" title="In nghiêng" onClick={() => setContent(c => c + ' *Chữ nghiêng*')}><i>I</i></button>
                     <button type="button" title="Tiêu đề phụ" onClick={() => setContent(c => c + '\n\n### Tiêu đề phụ\n')}>H3</button>
                     <span className={styles.toolbarDivider} />
                     <button type="button" title="Trích dẫn" onClick={() => setContent(c => c + '\n\n> Trích dẫn — Tác giả\n')}>"</button>
                  </div>
                  <textarea
                     className={styles.editorInput}
                     placeholder="Nhập nội dung bài viết tại đây (hỗ trợ Markdown H3 ### và trích dẫn >)..."
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     required
                  />
               </div>
            </div>

            <div className={styles.formActions}>
               <button type="button" className={styles.btnOutline} onClick={(e) => handleSubmit(e, false)} disabled={submitting}>
                  💾 Lưu nháp
               </button>
               <button type="button" className={styles.btnPrimary} onClick={(e) => handleSubmit(e, true)} disabled={submitting}>
                  🚀 Gửi duyệt ngay
               </button>
            </div>
         </form>
      </div>
   );
}

function ProfilePanel({ user, articlesCount = 0, viewsCount = 0 }) {
   if (!user) return null;
   return (
      <div className={styles.profilePanel}>
         <h2 className={styles.panelTitle}>Hồ sơ cá nhân</h2>
         <div className={styles.profileContent}>
            <div className={styles.profileHeader}>
               {user.avatar ? (
                  <img src={user.avatar} className={styles.profileAvatar} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
               ) : (
                  <div className={styles.profileAvatar} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', background: '#333', color: '#FFF' }}>
                     {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
               )}
               <div className={styles.profileInfo}>
                  <h3>{user.fullName}</h3>
                  <p>Nhà báo / Tác giả</p>
               </div>
            </div>

            <div className={styles.profileStats}>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Bài viết đã đăng</span>
                  <span className={styles.statNum}>{articlesCount}</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Tổng lượt xem</span>
                  <span className={styles.statNum}>{viewsCount}</span>
               </div>
               <div className={styles.statItem}>
                  <span className={styles.statLabel}>Vai trò</span>
                  <span className={styles.statNum} style={{ fontSize: '0.9rem', color: 'var(--gold-primary)' }}>Tác Giả</span>
               </div>
            </div>

            <div className={styles.profileDetails}>
               <div className={styles.detailRow}>
                  <label>Email:</label>
                  <span>{user.email}</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Tiểu sử:</label>
                  <span>{user.bio || 'Chưa cập nhật tiểu sử.'}</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Số điện thoại:</label>
                  <span>{user.phone || 'Chưa cập nhật'}</span>
               </div>
               <div className={styles.detailRow}>
                  <label>Ngày tham gia:</label>
                  <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'Mới tham gia'}</span>
               </div>
            </div>

            <button className={styles.btnPrimaryFull} onClick={() => window.location.href = '/profile'}>✏️ Cập nhật thông tin hồ sơ</button>
         </div>
      </div>
   );
}

export default function AuthorDashboard() {
   const [activeTab, setActiveTab] = useState('dashboard');
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(true);
   const [user] = useState(() => tokenStorage.getUser());

   const fetchArticles = async () => {
      setLoading(true);
      try {
         const data = await authorAPI.getMyArticles(100, 0);
         setArticles(data || []);
      } catch (err) {
         console.error('Failed to fetch articles:', err);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchArticles();
   }, []);

   const handleDeleteArticle = async (id) => {
      if (!window.confirm('Bạn có chắc chắn muốn xóa bài nháp này không?')) return;
      try {
         await authorAPI.deleteArticle(id);
         alert('Xóa bài viết thành công!');
         fetchArticles();
      } catch (err) {
         alert('Xóa thất bại: ' + err.message);
      }
   };

   const handleSubmitArticle = async (id) => {
      if (!window.confirm('Bạn muốn gửi duyệt bài viết này? Sau khi gửi sẽ không thể chỉnh sửa.')) return;
      try {
         await authorAPI.submitArticle(id);
         alert('Gửi duyệt bài viết thành công!');
         fetchArticles();
      } catch (err) {
         alert('Gửi duyệt thất bại: ' + err.message);
      }
   };

   const draftArticles = articles.filter((a) => a.status === 'draft' || a.status === 'rejected');
   const pendingArticles = articles.filter((a) => a.status === 'pending' || a.status === 'approved');
   const publishedArticles = articles.filter((a) => a.status === 'published');

   return (
      <div className={styles.authorDashboard}>
         <SidebarNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            draftCount={draftArticles.length}
            pendingCount={pendingArticles.length}
            publishedCount={publishedArticles.length}
         />

         <main className={styles.mainContent}>
            {loading ? (
               <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--gold-primary)' }}>
                  Đang tải dữ liệu tác giả...
               </div>
            ) : (
               <>
                  {activeTab === 'dashboard' && (
                     <section className={styles.dashboardSection}>
                        <h1>Quản lý bài viết</h1>
                        <div className={styles.statsGrid}>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>📝</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Nháp / Từ chối</div>
                                 <div className={styles.statValue}>{draftArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>⏳</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Chờ duyệt</div>
                                 <div className={styles.statValue}>{pendingArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>✅</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Đã đăng</div>
                                 <div className={styles.statValue}>{publishedArticles.length}</div>
                              </div>
                           </div>
                           <div className={styles.statBox}>
                              <div className={styles.statIcon}>👁️</div>
                              <div className={styles.statText}>
                                 <div className={styles.statLabel}>Tổng lượt xem</div>
                                 <div className={styles.statValue}>
                                    {publishedArticles.reduce((sum, a) => sum + (a.views || 0), 0)}
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className={styles.recentArticles}>
                           <h2>Bài viết mới nhất</h2>
                           {articles.length === 0 ? (
                              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '1rem 0' }}>Chưa có bài viết nào.</p>
                           ) : (
                              <div className={styles.articlesGrid}>
                                 {articles.slice(0, 6).map((article) => (
                                    <ArticleCard 
                                       key={article.id} 
                                       article={article} 
                                       status={article.status} 
                                       onDelete={handleDeleteArticle}
                                       onSubmit={handleSubmitArticle}
                                    />
                                 ))}
                              </div>
                           )}
                        </div>
                     </section>
                  )}

                  {activeTab === 'write' && <EditorPanel onArticleCreated={() => { fetchArticles(); setActiveTab('dashboard'); }} />}

                  {activeTab === 'drafts' && (
                     <section className={styles.listSection}>
                        <h1>Bài viết nháp & cần chỉnh sửa</h1>
                        {draftArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Không có bài viết nháp nào.</p>
                        ) : (
                           <div className={styles.articlesGrid}>
                              {draftArticles.map((article) => (
                                 <ArticleCard 
                                    key={article.id} 
                                    article={article} 
                                    status={article.status} 
                                    onDelete={handleDeleteArticle}
                                    onSubmit={handleSubmitArticle}
                                 />
                              ))}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'pending' && (
                     <section className={styles.listSection}>
                        <h1>Bài viết chờ duyệt</h1>
                        {pendingArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Không có bài viết đang chờ duyệt.</p>
                        ) : (
                           <div className={styles.articlesGrid}>
                              {pendingArticles.map((article) => (
                                 <ArticleCard key={article.id} article={article} status={article.status} />
                              ))}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'published' && (
                     <section className={styles.listSection}>
                        <h1>Bài viết đã đăng</h1>
                        {publishedArticles.length === 0 ? (
                           <p style={{ color: 'rgba(255,255,255,0.4)' }}>Không có bài viết đã đăng.</p>
                        ) : (
                           <div className={styles.articlesGrid}>
                              {publishedArticles.map((article) => (
                                 <ArticleCard key={article.id} article={article} status="published" />
                              ))}
                           </div>
                        )}
                     </section>
                  )}

                  {activeTab === 'profile' && (
                     <ProfilePanel 
                        user={user} 
                        articlesCount={publishedArticles.length} 
                        viewsCount={publishedArticles.reduce((sum, a) => sum + (a.views || 0), 0)} 
                     />
                  )}
               </>
            )}
         </main>
      </div>
   );
}
