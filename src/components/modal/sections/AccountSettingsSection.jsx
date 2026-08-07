import styles from '../RegisterCustomerModal.module.css';

export default function AccountSettingsSection({
  formData,
  handleFieldChange,
}) {
  return (
    <section className={styles.section} aria-labelledby="section-account-settings">
      <h3 id="section-account-settings" className={styles.sectionHeader}>
        Account Settings
      </h3>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="reg-status" className={styles.formLabel}>
            Status
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="reg-status"
              className={`${styles.formSelect} ${!formData.status ? styles.placeholderSelect : ''}`}
              value={formData.status || ''}
              onChange={(e) => handleFieldChange('status', e.target.value)}
            >
              <option value="" disabled className={styles.placeholderOption}>Select status</option>
              <option value="Active" className={styles.regularOption}>Active</option>
              <option value="Pending" className={styles.regularOption}>Pending</option>
              <option value="Inactive" className={styles.regularOption}>Inactive</option>
            </select>
            <svg
              className={styles.selectChevron}
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
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="reg-notes" className={styles.formLabel}>
          Notes
        </label>
        <textarea
          id="reg-notes"
          rows={3}
          placeholder="Internal notes about this customer (optional)..."
          className={styles.formTextarea}
          value={formData.notes || ''}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
        />
        <p className={styles.helperText}>Visible to Relationship Managers only.</p>
      </div>
    </section>
  );
}
