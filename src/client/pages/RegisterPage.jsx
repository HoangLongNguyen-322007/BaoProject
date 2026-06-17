import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import styles from './RegisterPage.module.css';

function RegisterPage() {
   const navigate = useNavigate();
   const [step, setStep] = useState('form'); // 'form' | 'success'
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      if (!username.trim()) {
         setError('Vui lòng nhập tên đăng nhập.');
         return;
      }
      if (password.length < 6) {
         setError('Mật khẩu phải có ít nhất 6 ký tự.');
         return;
      }
      if (password !== confirmPassword) {
         setError('Mật khẩu nhập lại không khớp.');
         return;
      }

      try {
         // Pass username as both email and fullName for simplicity since UI only has username
         await authAPI.register(username.trim(), password, username.trim(), 'guest');
         setStep('success');
      } catch (err) {
         setError(err.message || 'Đăng ký thất bại. Tên đăng nhập có thể đã tồn tại.');
      }
   };

   if (step === 'success') {
      return (
         <div className={styles.page}>
            <div className={styles.card}>
               {/* Logo */}
               <div className={styles.logoWrap}>
                  <img
                     src="/logo512.png"
                     alt="Rồng Vàng logo"
                     className={styles.logoImg}
                  />
               </div>
               <h1 className={styles.brand}>RỒNG VÀNG</h1>
               <p className={styles.brandSub}>— BÁO ĐIỆN TỬ —</p>

               <div className={styles.formBox}>
                  {/* Sparkles */}
                  <div className={styles.sparklesWrap} aria-hidden="true">
                     <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
                     <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
                     <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
                     <span className={`${styles.sparkle} ${styles.s4}`}>✦</span>
                  </div>

                  {/* Check icon */}
                  <div className={styles.checkCircle}>
                     <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                     </svg>
                  </div>

                  <h2 className={styles.successTitle}>ĐĂNG KÝ THÀNH CÔNG!</h2>
                  <p className={styles.successText}>
                     Tài khoản của bạn đã được tạo thành công. Bạn có thể đăng nhập để trải nghiệm đọc báo cùng Rồng Vàng.
                  </p>

                  <button
                     className={styles.submitBtn}
                     onClick={() => navigate('/login')}
                     id="btn-go-to-login"
                  >
                     Đăng nhập ngay
                  </button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.page}>
         <div className={styles.card}>
            {/* Logo */}
            <div className={styles.logoWrap}>
               <img
                  src="/logo512.png"
                  alt="Rồng Vàng logo"
                  className={styles.logoImg}
               />
            </div>
            <h1 className={styles.brand}>RỒNG VÀNG</h1>
            <p className={styles.brandSub}>— BÁO ĐIỆN TỬ —</p>

            <div className={styles.formBox}>
               <h2 className={styles.formTitle}>ĐĂNG KÝ</h2>
               <p className={styles.formSub}>Tạo tài khoản để tiếp tục</p>

               {error && <p className={styles.errorMsg}>{error}</p>}

               <form onSubmit={handleSubmit} noValidate>
                  {/* Username */}
                  <div className={styles.inputGroup}>
                     <span className={styles.inputIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                           <circle cx="12" cy="7" r="4"/>
                        </svg>
                     </span>
                     <input
                        id="reg-username"
                        type="text"
                        className={styles.input}
                        placeholder="Tạo tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                     />
                  </div>

                  {/* Password */}
                  <div className={styles.inputGroup}>
                     <span className={styles.inputIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                     </span>
                     <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="Tạo mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                     />
                     <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        id="btn-toggle-password"
                     >
                        {showPassword ? (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                           </svg>
                        ) : (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                           </svg>
                        )}
                     </button>
                  </div>

                  {/* Confirm Password */}
                  <div className={styles.inputGroup}>
                     <span className={styles.inputIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                           <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                     </span>
                     <input
                        id="reg-confirm-password"
                        type={showConfirm ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                     />
                     <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        id="btn-toggle-confirm"
                     >
                        {showConfirm ? (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                              <line x1="1" y1="1" x2="23" y2="23"/>
                           </svg>
                        ) : (
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                           </svg>
                        )}
                     </button>
                  </div>

                  <button type="submit" className={styles.submitBtn} id="btn-register">
                     Đăng ký
                  </button>
               </form>

               <p className={styles.switchText}>
                  Đã có tài khoản?{' '}
                  <Link to="/login" className={styles.switchLink} id="link-to-login">
                     Đăng nhập
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default RegisterPage;
