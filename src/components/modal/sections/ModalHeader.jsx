import styles from '../RegisterCustomerModal.module.css';

export default function ModalHeader({ onClose }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitleGroup}>
        <h2 id="register-customer-modal-title" className={styles.title}>
          Register Customer
        </h2>
        <p id="register-customer-modal-desc" className={styles.subtitle}>
          Complete the form to register a new business customer.
        </p>
      </div>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        type="button"
        aria-label="Close modal"
      >
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </header>
  );
}
