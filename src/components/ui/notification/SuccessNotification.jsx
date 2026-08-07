import { useEffect } from 'react';
import styles from './SuccessNotification.module.css';

export default function SuccessNotification({
  message,
  isVisible,
  onClose,
  duration = 5000,
}) {
  useEffect(() => {
    if (!isVisible || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, onClose, duration]);

  if (!isVisible || !message) return null;

  return (
    <div
      className={styles.toastContainer}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <svg
        className={styles.toastIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <span className={styles.toastMessage}>{message}</span>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
