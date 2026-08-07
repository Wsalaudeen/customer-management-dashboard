import { INDUSTRIES } from '../../../constants/mockCustomers';
import styles from '../RegisterCustomerModal.module.css';

export default function BusinessInfoSection({
  formData,
  handleFieldChange,
  duplicateError,
  firstInputRef,
}) {
  return (
    <section className={styles.section} aria-labelledby="section-business-info">
      <h3 id="section-business-info" className={styles.sectionHeader}>
        Business Information
      </h3>

      <div className={styles.formGroup}>
        <label htmlFor="reg-business-name" className={styles.formLabel}>
          Business Name <span className={styles.requiredStar} aria-hidden="true">*</span>
        </label>
        <input
          ref={firstInputRef}
          id="reg-business-name"
          type="text"
          required
          placeholder="e.g. Meridian Holdings plc"
          className={`${styles.formInput} ${
            duplicateError?.field === 'businessName' ? styles.inputError : ''
          }`}
          aria-invalid={duplicateError?.field === 'businessName' ? 'true' : undefined}
          value={formData.businessName || ''}
          onChange={(e) => handleFieldChange('businessName', e.target.value)}
        />
        {duplicateError?.field === 'businessName' && (
          <span className={styles.fieldErrorText}>
            A business with this name is already registered.
          </span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="reg-business-type" className={styles.formLabel}>
            Business Type <span className={styles.requiredStar} aria-hidden="true">*</span>
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="reg-business-type"
              required
              className={`${styles.formSelect} ${!formData.type ? styles.placeholderSelect : ''}`}
              value={formData.type || ''}
              onChange={(e) => handleFieldChange('type', e.target.value)}
            >
              <option value="" disabled className={styles.placeholderOption}>Select type</option>
              <option value="Corporation" className={styles.regularOption}>Corporation</option>
              <option value="LLC" className={styles.regularOption}>LLC</option>
              <option value="Partnership" className={styles.regularOption}>Partnership</option>
              <option value="Sole Proprietorship" className={styles.regularOption}>Sole Proprietorship</option>
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

        <div className={styles.formGroup}>
          <label htmlFor="reg-industry" className={styles.formLabel}>
            Industry <span className={styles.requiredStar} aria-hidden="true">*</span>
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="reg-industry"
              required
              className={`${styles.formSelect} ${!formData.industry ? styles.placeholderSelect : ''}`}
              value={formData.industry || ''}
              onChange={(e) => handleFieldChange('industry', e.target.value)}
            >
              <option value="" disabled className={styles.placeholderOption}>Select industry</option>
              {INDUSTRIES.filter((i) => i !== 'All Industries').map((ind) => (
                <option key={ind} value={ind} className={styles.regularOption}>
                  {ind}
                </option>
              ))}
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
    </section>
  );
}
