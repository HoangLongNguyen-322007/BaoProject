import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileEditPage.module.css';

function ProfileEditPage() {
   const navigate = useNavigate();
   const [toastMessage, setToastMessage] = useState('');
   const [activeMenu, setActiveMenu] = useState('profile');

   // Form States
   const [name, setName] = useState('Nguyễn Văn A');
   const [username, setUsername] = useState('nguyenvana');
   const [email, setEmail] = useState('nguyenvana@gmail.com');
   const [phone, setPhone] = useState('0912 345 678');
   const [dob, setDob] = useState('1995-05-15');
   const [gender, setGender] = useState('Nam');
   const [address, setAddress] = useState('Hà Nội, Việt Nam');
   const [bio, setBio] = useState('Đam mê đọc báo và cập nhật tin tức mỗi ngày.');
   const [avatar, setAvatar] = useState('');

   // Load user from localStorage on mount
   useEffect(() => {
      window.scrollTo(0, 0);
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
         const parsed = JSON.parse(savedUser);
         setName(parsed.name || '');
         setUsername(parsed.username || '');
         setEmail(parsed.email || '');
         setPhone(parsed.phone || '');
         setDob(parsed.dob || '1995-05-15');
         setGender(parsed.gender || 'Nam');
         setAddress(parsed.address || '');
         setBio(parsed.bio || '');
         setAvatar(parsed.avatar || '');
      }
   }, []);

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
      showToast('Ảnh đại diện đã được cập nhật!');
   };

   const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 2500);
   };

   const handleSave = (e) => {
      e.preventDefault();

      if (!name.trim()) {
         showToast('Vui lòng nhập Họ và tên.');
         return;
      }

      const updatedUser = {
         name,
         username,
         email,
         phone,
         dob,
         gender,
         address,
         bio,
         avatar
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      // Dispatch custom event to notify Header
      window.dispatchEvent(new Event('auth-change'));
      
      showToast('Lưu thay đổi hồ sơ thành công!');
   };

   const handleCancel = () => {
      // Re-load saved user
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
         const parsed = JSON.parse(savedUser);
         setName(parsed.name || '');
         setPhone(parsed.phone || '');
         setDob(parsed.dob || '1995-05-15');
         setGender(parsed.gender || 'Nam');
         setAddress(parsed.address || '');
         setBio(parsed.bio || '');
         setAvatar(parsed.avatar || '');
      }
      showToast('Đã hủy bỏ các thay đổi.');
   };

   const handleLogout = () => {
      localStorage.removeItem('user');
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

                           {/* Tên đăng nhập */}
                           <div className={styles.formGroup}>
                              <label htmlFor="username" className={styles.inputLabel}>Tên đăng nhập</label>
                              <input
                                 type="text"
                                 id="username"
                                 className={`${styles.input} ${styles.inputDisabled}`}
                                 value={username}
                                 disabled
                              />
                              <span className={styles.inputHelp}>Tên đăng nhập không thể thay đổi</span>
                           </div>

                           {/* Email */}
                           <div className={styles.formGroup}>
                              <label htmlFor="email" className={styles.inputLabel}>Email</label>
                              <input
                                 type="email"
                                 id="email"
                                 className={styles.input}
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                              />
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

                           {/* Ngày sinh */}
                           <div className={styles.formGroup}>
                              <label htmlFor="dob" className={styles.inputLabel}>Ngày sinh</label>
                              <div className={styles.dateInputWrapper}>
                                 <input
                                    type="date"
                                    id="dob"
                                    className={styles.input}
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                 />
                              </div>
                           </div>

                           {/* Giới tính */}
                           <div className={styles.formGroup}>
                              <span className={styles.inputLabel}>Giới tính</span>
                              <div className={styles.radioGroup}>
                                 {['Nam', 'Nữ', 'Khác'].map((g) => (
                                    <label key={g} className={styles.radioLabel}>
                                       <input
                                          type="radio"
                                          name="gender"
                                          value={g}
                                          checked={gender === g}
                                          onChange={() => setGender(g)}
                                          className={styles.radioInput}
                                       />
                                       <span className={styles.radioIndicator} />
                                       {g}
                                    </label>
                                 ))}
                              </div>
                           </div>

                           {/* Địa chỉ */}
                           <div className={styles.formGroup}>
                              <label htmlFor="address" className={styles.inputLabel}>Địa chỉ</label>
                              <input
                                 type="text"
                                 id="address"
                                 className={styles.input}
                                 value={address}
                                 onChange={(e) => setAddress(e.target.value)}
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
                              <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                                 Hủy bỏ
                              </button>
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
