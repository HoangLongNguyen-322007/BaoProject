import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
   const [isDark, setIsDark] = useState(true);
   const isAnimating = useRef(false);

   // Load saved theme on mount (instant, no animation)
   useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      if (!isDarkMode) {
         document.body.classList.add('light-theme');
      } else {
         document.body.classList.remove('light-theme');
      }
   }, []);

   const handleToggle = useCallback(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const newDark = !isDark;

      // Step 1: Add the transition class to body FIRST
      // This tells all elements: "get ready to animate any color change"
      document.body.classList.add('theme-transitioning');

      // Step 2: Wait one browser frame so the transition class is applied
      // before we trigger the color change
      requestAnimationFrame(() => {
         requestAnimationFrame(() => {

            // Step 3: Now apply the theme — all CSS variable-dependent colors
            // will smoothly interpolate over 1.8s because we added the transition class
            setIsDark(newDark);
            if (newDark) {
               document.body.classList.remove('light-theme');
               localStorage.setItem('theme', 'dark');
            } else {
               document.body.classList.add('light-theme');
               localStorage.setItem('theme', 'light');
            }

            // Step 4: Remove the transition class after the animation completes (2s)
            // so normal hover / other transitions remain snappy
            setTimeout(() => {
               document.body.classList.remove('theme-transitioning');
               isAnimating.current = false;
            }, 2100);

         });
      });

   }, [isDark]);

   return (
      <div
         className={styles.toggleContainer}
         title="Chuyển chế độ: Sáng / Tối"
      >
         <div
            className={`${styles.toggleSwitch} ${isDark ? styles.isDark : ''}`}
            onClick={handleToggle}
         >
            {/* Sun Icon */}
            <svg
               className={`${styles.icon} ${styles.sunIcon} ${!isDark ? styles.iconActive : styles.iconInactive}`}
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <circle cx="12" cy="12" r="4" />
               <path d="M12 2v2" />
               <path d="M12 20v2" />
               <path d="M5 5l1.5 1.5" />
               <path d="M17.5 17.5L19 19" />
               <path d="M2 12h2" />
               <path d="M20 12h2" />
               <path d="M5 19l1.5-1.5" />
               <path d="M17.5 6.5L19 5" />
               <path d="M10 13c1 1 3 1 4 0" strokeWidth="2" />
            </svg>

            {/* Metallic Knob */}
            <div className={`${styles.thumb} ${isDark ? styles.thumbRight : styles.thumbLeft}`}>
               <div className={styles.thumbInner}></div>
            </div>

            {/* Moon Icon */}
            <svg
               className={`${styles.icon} ${styles.moonIcon} ${isDark ? styles.iconActive : styles.iconInactive}`}
               viewBox="0 0 24 24"
               fill="currentColor"
               stroke="none"
            >
               <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
               <path fill="#fff" d="M20 4l-1 2-2 1 2 1 1 2 1-2 2-1-2-1z" />
            </svg>
         </div>
      </div>
   );
}
