import styles from '../RegisterCustomerModal.module.css';

export default function ModalSuccessView({
  successCustomer,
  onRegisterAnother,
  onClose,
}) {
  if (!successCustomer) return null;

  return (
    <article className={styles.body}>
      <div className={styles.successContainer}>
        <div className={styles.successCircle}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h3 className={styles.successTitle}>Customer Successfully Registered</h3>

        <p className={styles.successDescription}>
          <strong className={styles.successHighlight}>
            {successCustomer.contactPerson || successCustomer.businessName}
          </strong>{' '}
          has been added to the customer registry and is now visible in the dashboard.
        </p>

        {/* 2x2 Details Summary Description List */}
        <dl className={styles.summaryCard}>
          <div className={styles.summaryGroup}>
            <dt className={styles.summaryLabel}>ID</dt>
            <dd className={styles.summaryValue}>{successCustomer.id}</dd>
          </div>
          <div className={styles.summaryGroup}>
            <dt className={styles.summaryLabel}>STATUS</dt>
            <dd className={styles.summaryValue}>{successCustomer.status || 'Active'}</dd>
          </div>
          <div className={styles.summaryGroup}>
            <dt className={styles.summaryLabel}>INDUSTRY</dt>
            <dd className={styles.summaryValue}>{successCustomer.industry || 'Technology'}</dd>
          </div>
          <div className={styles.summaryGroup}>
            <dt className={styles.summaryLabel}>RM</dt>
            <dd className={styles.summaryValue}>{successCustomer.rm?.name || 'Admin User'}</dd>
          </div>
        </dl>

        {/* Action Buttons Footer */}
        <footer className={styles.successActions}>
          <button
            type="button"
            className={styles.registerAnotherBtn}
            onClick={onRegisterAnother}
          >
            <span aria-hidden="true">+</span> Register Another Customer
          </button>
          <button
            type="button"
            className={styles.closeSuccessBtn}
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </article>
  );
}
