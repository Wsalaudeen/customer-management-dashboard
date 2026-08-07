import { useState } from 'react';
import DuplicateAlert from './DuplicateAlert';
import BusinessInfoSection from './BusinessInfoSection';
import ContactInfoSection from './ContactInfoSection';
import AccountSettingsSection from './AccountSettingsSection';
import styles from '../RegisterCustomerModal.module.css';

const DEFAULT_FORM_STATE = {
  businessName: '',
  contactPerson: '',
  type: '',
  industry: '',
  phone: '',
  email: '',
  status: '',
  notes: '',
  rmName: 'Ada',
};

export default function ModalFormView({
  newCustomer,
  onNewCustomerChange,
  onSubmit,
  onClose,
  duplicateError,
  firstInputRef,
}) {
  const [localForm, setLocalForm] = useState(DEFAULT_FORM_STATE);
  const formData = newCustomer || localForm;

  const handleFieldChange = (field, value) => {
    if (onNewCustomerChange) {
      onNewCustomerChange({ ...formData, [field]: value });
    } else {
      setLocalForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      onClose();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.body}>
        <DuplicateAlert duplicateError={duplicateError} />

        <BusinessInfoSection
          formData={formData}
          handleFieldChange={handleFieldChange}
          duplicateError={duplicateError}
          firstInputRef={firstInputRef}
        />

        <hr className={styles.divider} />

        <ContactInfoSection
          formData={formData}
          handleFieldChange={handleFieldChange}
          duplicateError={duplicateError}
        />

        <hr className={styles.divider} />

        <AccountSettingsSection
          formData={formData}
          handleFieldChange={handleFieldChange}
        />
      </div>

      <footer className={styles.footer}>
        <button className={styles.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={styles.submitBtn} type="submit">
          Register Customer
        </button>
      </footer>
    </form>
  );
}
