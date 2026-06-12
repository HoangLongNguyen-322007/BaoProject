import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, tokenStorage } from '../../utils/api';
import styles from './ProfileEditPage.module.css';

function ProfileEditPage() {
   const navigate = useNavigate();
   const [toastMessage, setToastMessage] = useState('');
   const [activeMenu, setActiveMenu] = useState('profile');
   const [loading, setLoading] = useState(true);

   // Form States
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [bio, setBio] = useState('');
   const [avatar, setAvatar] = useState('');

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

   const handleAvatarClick = () => {
      const mockAvatars = [
         'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80',
         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
         'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&q=80',
         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80'
      ];
      // Pick next or random
      const randomIdx = Math.floor(Math.random() * mockAvatars.length);
      setAvatar(mockAvatars[randomIdx]);
      showToast('Ảnh đại diện đã được thay đổi (chưa lưu)!');
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
                              <span className={styles.avatarTips}>JPG, PNG. Kích thước tối đa 2MB</span>
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
                  ) : (
                     <div className={styles.placeholderBlock}>
                        <h2 className={styles.formTitle}>{sidebarMenuItems.find(i => i.id === activeMenu)?.label.toUpperCase()}</h2>
                        <div className={styles.placeholderContent}>
                           <span className={styles.placeholderIcon}>🛠️</span>
                           <p>Tính năng đang được phát triển.</p>
                        </div>
                     </div>
                  )}
               </main>
            </div>
         </div>
      </div>
   );
}

export default ProfileEditPage;
