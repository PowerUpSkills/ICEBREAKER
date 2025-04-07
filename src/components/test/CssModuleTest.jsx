import React from 'react';
import styles from './CssModuleTest.module.css';

const CssModuleTest = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>CSS Module Test</h1>
        <p className={styles.subtitle}>This component is using CSS Modules instead of Tailwind CSS.</p>
        
        <div className={styles.formField}>
          <label className={styles.label}>
            Username
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your username"
          />
        </div>
        
        <div className={styles.formField}>
          <label className={styles.label}>
            Password
          </label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your password"
          />
        </div>
        
        <button className={styles.button}>
          Login
        </button>
        
        <div className={styles.footer}>
          <p className={styles.footerText}>
            This is a test component with CSS Modules
          </p>
        </div>
      </div>
    </div>
  );
};

export default CssModuleTest;
