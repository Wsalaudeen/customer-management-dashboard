import { forwardRef, useState } from 'react';
import styles from '../auth/Login.module.css';

const PasswordField = forwardRef(function PasswordField(
  { id, name, label, required = false, value, onChange, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <div className={styles.passwordInputContainer}>
        <input
          ref={ref}
          id={id}
          name={name || id}
          type={showPassword ? 'text' : 'password'}
          className={`${styles.input} ${styles.passwordInput}`}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required ? 'true' : 'false'}
          tabIndex={0}
          {...props}
        />
        <button
          type="button"
          className={styles.eyeToggleBtn}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          tabIndex={0}
        >
          {showPassword ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
});

export default PasswordField;
