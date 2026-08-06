import { forwardRef } from 'react';
import styles from '../auth/Login.module.css';

const TextField = forwardRef(function TextField(
  { id, name, label, type = 'text', required = false, className = '', ...props },
  ref
) {
  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required} aria-hidden="true">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name || id}
        type={type}
        className={`${styles.input} ${className}`.trim()}
        required={required}
        aria-required={required ? 'true' : 'false'}
        tabIndex={0}
        {...props}
      />
    </div>
  );
});

export default TextField;
