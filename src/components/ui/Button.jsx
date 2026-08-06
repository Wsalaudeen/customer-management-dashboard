import { forwardRef } from 'react';
import Spinner from './Spinner';
import styles from '../auth/Login.module.css';

const Button = forwardRef(function Button(
  { children, loading = false, loadingText = 'Signing in...', disabled, type = 'submit', ...props },
  ref
) {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      className={styles.submitBtn}
      disabled={isButtonDisabled}
      aria-busy={loading}
      tabIndex={0}
      {...props}
    >
      {loading ? (
        <span className={styles.spinnerWrapper}>
          <Spinner />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
