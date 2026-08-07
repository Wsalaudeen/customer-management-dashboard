import styles from '../RegisterCustomerModal.module.css';

export default function ContactInfoSection({
  formData,
  handleFieldChange,
  duplicateError,
}) {
  return (
    <section className={styles.section} aria-labelledby="section-contact-info">
      <h3 id="section-contact-info" className={styles.sectionHeader}>
        Contact Information
      </h3>

      <div className={styles.formGroup}>
        <label htmlFor="reg-contact-person" className={styles.formLabel}>
          Contact Person <span className={styles.requiredStar} aria-hidden="true">*</span>
        </label>
        <input
          id="reg-contact-person"
          type="text"
          required
          placeholder="Full name of primary contact"
          className={styles.formInput}
          value={formData.contactPerson || ''}
          onChange={(e) => handleFieldChange('contactPerson', e.target.value)}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="reg-phone-number" className={styles.formLabel}>
            Phone Number <span className={styles.requiredStar} aria-hidden="true">*</span>
          </label>
          <input
            id="reg-phone-number"
            type="tel"
            required
            placeholder="+234 800 000 0000"
            className={`${styles.formInput} ${
              duplicateError?.field === 'phone' ? styles.inputError : ''
            }`}
            aria-invalid={duplicateError?.field === 'phone' ? 'true' : undefined}
            value={formData.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
          />
          {duplicateError?.field === 'phone' && (
            <span className={styles.fieldErrorText}>
              A customer with this phone number already exists.
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reg-email-address" className={styles.formLabel}>
            Email Address <span className={styles.requiredStar} aria-hidden="true">*</span>
          </label>
          <input
            id="reg-email-address"
            type="email"
            required
            placeholder="contact@company.com"
            className={`${styles.formInput} ${
              duplicateError?.field === 'email' ? styles.inputError : ''
            }`}
            aria-invalid={duplicateError?.field === 'email' ? 'true' : undefined}
            value={formData.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
          {duplicateError?.field === 'email' && (
            <span className={styles.fieldErrorText}>
              A customer with this email address already exists.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
