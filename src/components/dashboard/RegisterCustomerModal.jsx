import { INDUSTRIES } from '../../constants/mockCustomers';
import styles from './Dashboard.module.css';

export default function RegisterCustomerModal({
  isOpen,
  onClose,
  newCustomer,
  onNewCustomerChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="presentation">
      <div
        className={styles.modalCard}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-customer-modal-title"
      >
        <div className={styles.modalHeader}>
          <h2 id="register-customer-modal-title" className={styles.modalTitle}>
            Register New Customer
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            type="button"
            aria-label="Close registration modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="reg-business-name" className={styles.formLabel}>
              Business Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="reg-business-name"
              type="text"
              required
              placeholder="e.g. Acorn Ventures Ltd"
              className={styles.formInput}
              value={newCustomer.businessName}
              onChange={(e) => onNewCustomerChange({ ...newCustomer, businessName: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reg-contact-person" className={styles.formLabel}>
              Contact Person <span aria-hidden="true">*</span>
            </label>
            <input
              id="reg-contact-person"
              type="text"
              required
              placeholder="e.g. David Mark"
              className={styles.formInput}
              value={newCustomer.contactPerson}
              onChange={(e) => onNewCustomerChange({ ...newCustomer, contactPerson: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reg-business-type" className={styles.formLabel}>
              Business Type
            </label>
            <select
              id="reg-business-type"
              className={styles.formSelect}
              value={newCustomer.type}
              onChange={(e) => onNewCustomerChange({ ...newCustomer, type: e.target.value })}
            >
              <option value="Corporation">Corporation</option>
              <option value="LLC">LLC</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reg-industry" className={styles.formLabel}>
              Industry
            </label>
            <select
              id="reg-industry"
              className={styles.formSelect}
              value={newCustomer.industry}
              onChange={(e) => onNewCustomerChange({ ...newCustomer, industry: e.target.value })}
            >
              {INDUSTRIES.filter((i) => i !== 'All Industries').map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reg-rm-name" className={styles.formLabel}>
              Relationship Manager (RM)
            </label>
            <select
              id="reg-rm-name"
              className={styles.formSelect}
              value={newCustomer.rmName}
              onChange={(e) => onNewCustomerChange({ ...newCustomer, rmName: e.target.value })}
            >
              <option value="Ada">Ada (AN)</option>
              <option value="John">John (JA)</option>
              <option value="James">James (JM)</option>
              <option value="Kemi">Kemi (KA)</option>
              <option value="Sarah">Sarah (SO)</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button className={styles.cancelBtn} type="button" onClick={onClose}>
              Cancel
            </button>
            <button className={styles.submitModalBtn} type="submit">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
