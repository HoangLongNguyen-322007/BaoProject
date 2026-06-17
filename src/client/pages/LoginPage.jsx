import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, tokenStorage } from '../../utils/api';
import styles from './LoginPage.module.css';

function LoginPage() {
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!username.trim() || !password.trim()) {
         setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
         return;
      }
      setError('');
      
      try {
         const data = await authAPI.login(username.trim(), password);
         tokenStorage.setToken(data.token);
         tokenStorage.setUser(data.user);
         window.dispatchEvent(new Event('auth-change'));
         navigate('/');
      } catch (err) {
         setError(err.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }
   };

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

            {/* Form box */}
            <div className={styles.formBox}>
               <h2 className={styles.formTitle}>ĐĂNG NHẬP</h2>
               <p className={styles.formSub}>Chào mừng bạn trở lại</p>

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
                        id="login-username"
                        type="text"
                        className={styles.input}
                        placeholder="Tài khoản"
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
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        className={styles.input}
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
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

                  {/* Remember + Forgot */}
                  <div className={styles.optionsRow}>
                     <label className={styles.rememberLabel} htmlFor="remember-me">
                        <input
                           id="remember-me"
                           type="checkbox"
                           className={styles.checkbox}
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Ghi nhớ đăng nhập
                     </label>
                     <Link to="/forgot-password" className={styles.forgotLink} id="link-forgot-password">
                        Quên mật khẩu?
                     </Link>
                  </div>

                  <button type="submit" className={styles.submitBtn} id="btn-login">
                     Đăng nhập
                  </button>
               </form>

               <div className={styles.dividerRow}>
                  <span className={styles.dividerLine} />
                  <span className={styles.dividerText}>hoặc</span>
                  <span className={styles.dividerLine} />
               </div>

               <p className={styles.switchText}>
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className={styles.switchLink} id="link-to-register">
                     Đăng ký
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default LoginPage;
