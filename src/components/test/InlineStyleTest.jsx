import React from 'react';

const InlineStyleTest = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #e0e7ff, #f3e8ff)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      width: '100%',
      maxWidth: '28rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: '700',
      textAlign: 'center',
      color: '#4338ca',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#4b5563',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    formField: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      backgroundColor: '#4f46e5',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center',
    },
    footerText: {
      fontSize: '0.875rem',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Inline Style Test</h1>
        <p style={styles.subtitle}>This component is using inline styles instead of Tailwind CSS.</p>
        
        <div style={styles.formField}>
          <label style={styles.label}>
            Username
          </label>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your username"
          />
        </div>
        
        <div style={styles.formField}>
          <label style={styles.label}>
            Password
          </label>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>
        
        <button style={styles.button}>
          Login
        </button>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            This is a test component with inline styles
          </p>
        </div>
      </div>
    </div>
  );
};

export default InlineStyleTest;
