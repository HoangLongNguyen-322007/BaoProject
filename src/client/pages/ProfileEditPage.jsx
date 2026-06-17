import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, commentsAPI, bookmarksAPI, notificationsAPI, tokenStorage } from '../../utils/api';
import styles from './ProfileEditPage.module.css';

function ProfileEditPage() {
   const navigate = useNavigate();
   const [toastMessage, setToastMessage] = useState('');
   const [activeMenu, setActiveMenu] = useState('profile');
   const [loading, setLoading] = useState(true);
   const fileInputRef = useRef(null);

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');

    // Password Tab States
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Comments Tab States
    const [userComments, setUserComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);

    // Bookmarks Tab States
    const [savedArticles, setSavedArticles] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(false);

    // Notifications Tab States
    const [notifications, setNotifications] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);

   useEffect(() => {
      window.scrollTo(0, 0);
      const fetchProfile = async () => {
         try {
            const user = await authAPI.getProfile();
            setName(user.fullName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setBio(user.bio || '');
            setAvatar(user.avatar || '');
         } catch (err) {
            console.error(err);
            if (err.message === 'Session expired') {
               navigate('/login');
            } else {
               showToast('Lỗi khi tải thông tin hồ sơ.');
            }
         } finally {
            setLoading(false);
         }
      };
      fetchProfile();
   }, [navigate]);

   // Fetch data depending on activeMenu
   useEffect(() => {
      if (activeMenu === 'comments') {
         const fetchComments = async () => {
            setLoadingComments(true);
            try {
               const data = await commentsAPI.getMyComments();
               setUserComments(data);
            } catch (err) {
               console.error(err);
               showToast('Lỗi khi tải bình luận.');
            } finally {
               setLoadingComments(false);
            }
         };
         fetchComments();
      } else if (activeMenu === 'saved') {
         const fetchSaved = async () => {
            setLoadingSaved(true);
            try {
               const data = await bookmarksAPI.getAll();
               setSavedArticles(data);
            } catch (err) {
               console.error(err);
               showToast('Lỗi khi tải bài viết đã lưu.');
            } finally {
               setLoadingSaved(false);
            }
         };
         fetchSaved();
      } else if (activeMenu === 'notifications') {
         const fetchNotifications = async () => {
            setLoadingNotifications(true);
            try {
               const data = await notificationsAPI.getAll();
               setNotifications(data);
            } catch (err) {
               console.error(err);
               showToast('Lỗi khi tải thông báo.');
            } finally {
               setLoadingNotifications(false);
            }
         };
         fetchNotifications();
      }
   }, [activeMenu]);

   const handleChangePassword = async (e) => {
      e.preventDefault();
      if (!currentPassword || !newPassword || !confirmNewPassword) {
         showToast('Vui lòng điền đầy đủ thông tin.');
         return;
      }
      if (newPassword.length < 6) {
         showToast('Mật khẩu mới phải có ít nhất 6 ký tự.');
         return;
      }
      if (newPassword !== confirmNewPassword) {
         showToast('Xác nhận mật khẩu mới không khớp.');
         return;
      }
      try {
         await authAPI.changePassword(currentPassword, newPassword);
         showToast('Đổi mật khẩu thành công!');
         setCurrentPassword('');
         setNewPassword('');
         setConfirmNewPassword('');
      } catch (err) {
         showToast('Lỗi: ' + (err.message || 'Mật khẩu hiện tại không chính xác.'));
      }
   };

   const handleDeleteComment = async (commentId) => {
      if (!window.confirm('Bạn có chắc muốn xóa bình luận này?')) return;
      try {
         await commentsAPI.delete(commentId);
         setUserComments(prev => prev.filter(c => c.id !== commentId));
         showToast('Đã xóa bình luận.');
      } catch (err) {
         showToast('Lỗi khi xóa bình luận.');
      }
   };

   const handleRemoveBookmark = async (articleId) => {
      try {
         await bookmarksAPI.delete(articleId);
         setSavedArticles(prev => prev.filter(a => a.id !== articleId));
         showToast('Đã bỏ lưu bài viết.');
      } catch (err) {
         showToast('Lỗi khi bỏ lưu.');
      }
   };

   const handleMarkAsRead = async (notifId) => {
      try {
         await notificationsAPI.markAsRead(notifId);
         setNotifications(prev =>
            prev.map(n => n.id === notifId ? { ...n, isRead: true } : n)
         );
      } catch (err) {
         console.error(err);
      }
   };

   const handleMarkAllRead = async () => {
      try {
         await notificationsAPI.readAll();
         setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
         showToast('Đã đánh dấu đọc tất cả.');
      } catch (err) {
         showToast('Lỗi thao tác.');
      }
   };

   const handleAvatarClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.match('image.*')) {
         showToast('Vui lòng chọn file hình ảnh (JPG, PNG).');
         return;
      }

      if (file.size > 4 * 1024 * 1024) {
         showToast('Kích thước ảnh không được vượt quá 4MB.');
         return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
         setAvatar(event.target.result);
         showToast('Ảnh đại diện đã được thay đổi (nhấn Lưu để cập nhật)!');
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset input
   };

   const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 2500);
   };

   const handleSave = async (e) => {
      e.preventDefault();

      if (!name.trim()) {
         showToast('Vui lòng nhập Họ và tên.');
         return;
      }

      try {
         const { user } = await authAPI.updateProfile({
            fullName: name,
            phone,
            bio,
            avatar
         });
         
         // Update token storage for immediate UI reflection if user obj matches
         const cachedUser = tokenStorage.getUser();
         if (cachedUser) {
            tokenStorage.setUser({ ...cachedUser, fullName: name, avatar });
            window.dispatchEvent(new Event('auth-change'));
         }
         
         showToast('Lưu thay đổi hồ sơ thành công!');
      } catch (err) {
         console.error(err);
         showToast('Lưu thay đổi thất bại: ' + err.message);
      }
   };

   const handleLogout = () => {
      tokenStorage.clearToken();
      tokenStorage.clearUser();
      window.dispatchEvent(new Event('auth-change'));
      navigate('/');
   };

   const sidebarMenuItems = [
      { id: 'profile', label: 'Thông tin cá nhân', icon: '👤' },
      { id: 'password', label: 'Đổi mật khẩu', icon: '🔒' },
      { id: 'comments', label: 'Quản lý bình luận', icon: '💬' },
      { id: 'saved', label: 'Bài viết đã lưu', icon: '🔖' },
      { id: 'notifications', label: 'Thông báo', icon: '🔔' }
   ];

   if (loading) {
      return (
         <div className={styles.profilePage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <div className="loading-spinner" style={{ fontSize: '1.5rem', color: 'var(--gold-primary)' }}>
               Đang tải hồ sơ...
            </div>
         </div>
      );
   }

   return (
      <div className={styles.profilePage}>
         {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

         <div className={styles.container}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
               <Link to="/">Trang chủ</Link>
               <span className={styles.breadcrumbSeparator}>›</span>
               <span className={styles.breadcrumbText}>Tài khoản</span>
               <span className={styles.breadcrumbSeparator}>›</span>
               <span className={styles.breadcrumbCurrent}>Chỉnh sửa hồ sơ</span>
            </nav>

            <div className={styles.layout}>
               {/* SIDEBAR NAVIGATION (LEFT) */}
               <aside className={styles.sidebar}>
                  <div className={styles.sidebarMenu}>
                     {sidebarMenuItems.map((item) => (
                        <button
                           key={item.id}
                           className={`${styles.menuItem} ${activeMenu === item.id ? styles.menuItemActive : ''}`}
                           onClick={() => setActiveMenu(item.id)}
                        >
                           <span className={styles.menuIcon}>{item.icon}</span>
                           <span className={styles.menuLabel}>{item.label}</span>
                        </button>
                     ))}
                  </div>

                  <button className={styles.btnLogout} onClick={handleLogout}>
                     <span className={styles.menuIcon}>🚪</span>
                     <span>Đăng xuất</span>
                  </button>
               </aside>

               {/* EDIT FORM CONTAINER (RIGHT) */}
               <main className={styles.formContainer}>
                  {activeMenu === 'profile' ? (
                     <>
                        <h2 className={styles.formTitle}>CHỈNH SỬA HỒ SƠ</h2>
                        <form onSubmit={handleSave} className={styles.form}>
                           
                           {/* Avatar Selection */}
                           <div className={styles.avatarSection}>
                              <span className={styles.inputLabel}>Ảnh đại diện</span>
                              <input 
                                 type="file" 
                                 accept="image/jpeg, image/png, image/webp" 
                                 ref={fileInputRef} 
                                 onChange={handleFileChange} 
                                 style={{ display: 'none' }} 
                              />
                              <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
                                 {avatar ? (
                                    <img src={avatar} className={styles.avatarImg} alt="Avatar" />
                                 ) : (
                                    <div className={styles.avatarEmpty}>
                                       {name ? name.charAt(0) : 'U'}
                                    </div>
                                 )}
                                 <div className={styles.cameraOverlay} title="Đổi ảnh đại diện">
                                    📷
                                 </div>
                              </div>
                              <span className={styles.avatarTips}>JPG, PNG. Kích thước tối đa 4MB</span>
                           </div>

                           {/* Họ và tên */}
                           <div className={styles.formGroup}>
                              <label htmlFor="fullname" className={styles.inputLabel}>Họ và tên</label>
                              <input
                                 type="text"
                                 id="fullname"
                                 className={styles.input}
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                              />
                           </div>

                           {/* Email */}
                           <div className={styles.formGroup}>
                              <label htmlFor="email" className={styles.inputLabel}>Email đăng nhập</label>
                              <input
                                 type="email"
                                 id="email"
                                 className={`${styles.input} ${styles.inputDisabled}`}
                                 value={email}
                                 disabled
                              />
                              <span className={styles.inputHelp}>Email không thể thay đổi</span>
                           </div>

                           {/* Số điện thoại */}
                           <div className={styles.formGroup}>
                              <label htmlFor="phone" className={styles.inputLabel}>Số điện thoại</label>
                              <input
                                 type="tel"
                                 id="phone"
                                 className={styles.input}
                                 value={phone}
                                 onChange={(e) => setPhone(e.target.value)}
                              />
                           </div>

                           {/* Giới thiệu bản thân */}
                           <div className={styles.formGroup}>
                              <label htmlFor="bio" className={styles.inputLabel}>Giới thiệu bản thân</label>
                              <textarea
                                 id="bio"
                                 className={styles.textarea}
                                 value={bio}
                                 onChange={(e) => setBio(e.target.value.slice(0, 200))}
                                 maxLength={200}
                              />
                              <div className={styles.textareaFooter}>
                                 <span className={styles.charCounter}>{bio.length}/200</span>
                              </div>
                           </div>

                           {/* Actions */}
                           <div className={styles.formActions}>
                              <button type="submit" className={styles.btnSave}>
                                 Lưu thay đổi
                              </button>
                           </div>

                        </form>
                     </>
                  ) : activeMenu === 'password' ? (
                     <>
                        <h2 className={styles.formTitle}>ĐỔI MẬT KHẨU</h2>
                        <form onSubmit={handleChangePassword} className={styles.form}>
                           <div className={styles.formGroup}>
                              <label htmlFor="current-pass" className={styles.inputLabel}>Mật khẩu hiện tại</label>
                              <input
                                 type="password"
                                 id="current-pass"
                                 className={styles.input}
                                 value={currentPassword}
                                 onChange={(e) => setCurrentPassword(e.target.value)}
                                 required
                              />
                           </div>
                           <div className={styles.formGroup}>
                              <label htmlFor="new-pass" className={styles.inputLabel}>Mật khẩu mới</label>
                              <input
                                 type="password"
                                 id="new-pass"
                                 className={styles.input}
                                 value={newPassword}
                                 onChange={(e) => setNewPassword(e.target.value)}
                                 required
                              />
                           </div>
                           <div className={styles.formGroup}>
                              <label htmlFor="confirm-new-pass" className={styles.inputLabel}>Xác nhận mật khẩu mới</label>
                              <input
                                 type="password"
                                 id="confirm-new-pass"
                                 className={styles.input}
                                 value={confirmNewPassword}
                                 onChange={(e) => setConfirmNewPassword(e.target.value)}
                                 required
                              />
                           </div>
                           <div className={styles.formActions}>
                              <button type="submit" className={styles.btnSave}>
                                 Thay đổi mật khẩu
                              </button>
                           </div>
                        </form>
                     </>
                  ) : activeMenu === 'comments' ? (
                     <>
                        <h2 className={styles.formTitle}>BÌNH LUẬN CỦA TÔI</h2>
                        {loadingComments ? (
                           <div className="loading-spinner" style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--gold-primary)' }}>
                              Đang tải bình luận...
                           </div>
                        ) : userComments.length === 0 ? (
                           <div className={styles.emptyState}>
                              <span className={styles.emptyStateIcon}>💬</span>
                              <p>Bạn chưa đăng bình luận nào.</p>
                           </div>
                        ) : (
                           <div className={styles.list}>
                              {userComments.map(comment => (
                                 <div key={comment.id} className={styles.item}>
                                    <div className={styles.itemHeader}>
                                       <Link to={`/article/${comment.article_id}`} className={styles.itemTitle}>
                                          {comment.articleTitle || 'Bài viết'}
                                       </Link>
                                       <span className={styles.itemMeta}>
                                          {new Date(comment.createdAt).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })}
                                       </span>
                                    </div>
                                    <p className={styles.itemContent}>"{comment.content}"</p>
                                    <div className={styles.itemActions}>
                                       <button 
                                          className={`${styles.btnActionLink} ${styles.btnActionRed}`} 
                                          onClick={() => handleDeleteComment(comment.id)}
                                          type="button"
                                       >
                                          🗑️ Xóa bình luận
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </>
                  ) : activeMenu === 'saved' ? (
                     <>
                        <h2 className={styles.formTitle}>BÀI VIẾT ĐÃ LƯU</h2>
                        {loadingSaved ? (
                           <div className="loading-spinner" style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--gold-primary)' }}>
                              Đang tải danh sách bài viết...
                           </div>
                        ) : savedArticles.length === 0 ? (
                           <div className={styles.emptyState}>
                              <span className={styles.emptyStateIcon}>🔖</span>
                              <p>Bạn chưa lưu bài viết nào.</p>
                           </div>
                        ) : (
                           <div className={styles.list}>
                              {savedArticles.map(article => (
                                 <div key={article.id} className={styles.item}>
                                    <div className={styles.itemHeader}>
                                       <Link to={`/article/${article.id}`} className={styles.itemTitle}>
                                          {article.title}
                                       </Link>
                                    </div>
                                    <p className={styles.itemContent}>{article.excerpt}</p>
                                    <div className={styles.itemMeta}>
                                       <span>Tác giả: {article.authorName}</span>
                                       <span>•</span>
                                       <span>Lượt xem: {article.views}</span>
                                    </div>
                                    <div className={styles.itemActions}>
                                       <button 
                                          className={`${styles.btnActionLink} ${styles.btnActionRed}`} 
                                          onClick={() => handleRemoveBookmark(article.id)}
                                          type="button"
                                       >
                                          ❌ Hủy lưu bài viết
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </>
                  ) : (
                     <>
                        <div className={styles.headerRow}>
                           <h2 className={styles.formTitle}>THÔNG BÁO CỦA TÔI</h2>
                           {notifications.length > 0 && (
                              <button className={styles.btnMarkAll} onClick={handleMarkAllRead} type="button">
                                 Đọc tất cả
                              </button>
                           )}
                        </div>
                        {loadingNotifications ? (
                           <div className="loading-spinner" style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--gold-primary)' }}>
                              Đang tải thông báo...
                           </div>
                        ) : notifications.length === 0 ? (
                           <div className={styles.emptyState}>
                              <span className={styles.emptyStateIcon}>🔔</span>
                              <p>Bạn không có thông báo nào.</p>
                           </div>
                        ) : (
                           <div className={styles.list}>
                              {notifications.map(notif => (
                                 <div 
                                    key={notif.id} 
                                    className={`${styles.item} ${!notif.isRead ? styles.notifUnread : ''}`}
                                    onClick={() => !notif.isRead && handleMarkAsRead(notif.id)}
                                 >
                                    <div className={styles.itemHeader}>
                                       <h4 className={styles.itemTitle} style={{ color: notif.isRead ? '#999' : '#FFF' }}>
                                          {notif.title}
                                       </h4>
                                       {!notif.isRead && <span className={styles.badgeUnread}>Mới</span>}
                                    </div>
                                    <p className={styles.itemContent} style={{ color: notif.isRead ? '#777' : '#BBB' }}>
                                       {notif.message}
                                    </p>
                                    <div className={styles.itemMeta}>
                                       <span>{new Date(notif.createdAt).toLocaleString('vi-VN')}</span>
                                       {notif.relatedId && (
                                          <>
                                             <span>•</span>
                                             <Link 
                                                to={`/article/${notif.relatedId}`} 
                                                className={`${styles.btnActionLink} ${styles.btnActionGold}`}
                                             >
                                                Xem bài viết ➔
                                             </Link>
                                          </>
                                       )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </>
                  )}
               </main>
            </div>
         </div>
      </div>
   );
}

export default ProfileEditPage;
