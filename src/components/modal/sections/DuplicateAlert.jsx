import styles from '../RegisterCustomerModal.module.css';

export default function DuplicateAlert({ duplicateError }) {
  if (!duplicateError) return null;

  return (
    <aside
      className={styles.alertBanner}
      role="alert"
      aria-live="assertive"
      id="duplicate-customer-alert"
    >
      <svg
        className={styles.alertIcon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className={styles.alertContent}>
        <strong className={styles.alertTitle}>Duplicate Customer Detected</strong>
        <span className={styles.alertMessage}>{duplicateError.message}</span>
      </div>
    </aside>
  );
}
