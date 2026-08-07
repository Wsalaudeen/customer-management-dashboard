import styles from './PageHeader.module.css';

export default function PageHeader({ onOpenModal }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 id="dashboard-page-title" className={styles.pageTitle}>
          Customer Management
        </h1>
        <p className={styles.pageSubtitle}>Monitor and manage all business customer relationships.</p>
      </div>

      <button
        className={styles.registerBtn}
        onClick={onOpenModal}
        type="button"
        aria-haspopup="dialog"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Register Customer
      </button>
    </div>
  );
}
