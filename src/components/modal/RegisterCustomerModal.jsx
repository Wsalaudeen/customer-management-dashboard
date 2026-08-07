import { useModalDrawer } from '../../hooks/modal/useModalDrawer';
import ModalHeader from './sections/ModalHeader';
import ModalSuccessView from './sections/ModalSuccessView';
import ModalFormView from './sections/ModalFormView';
import styles from './RegisterCustomerModal.module.css';

export default function RegisterCustomerModal({
  isOpen,
  onClose,
  newCustomer,
  onNewCustomerChange,
  onSubmit,
  successCustomer,
  onRegisterAnother,
  duplicateError,
}) {
  const { drawerRef, firstInputRef, isVisible, isAnimated } = useModalDrawer(isOpen, onClose);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.backdrop} ${isAnimated ? styles.backdropOpen : ''}`}
      onClick={onClose}
    >
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isAnimated ? styles.drawerOpen : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-customer-modal-title"
        aria-describedby="register-customer-modal-desc"
      >
        <ModalHeader onClose={onClose} />

        {successCustomer ? (
          <ModalSuccessView
            successCustomer={successCustomer}
            onRegisterAnother={onRegisterAnother}
            onClose={onClose}
          />
        ) : (
          <ModalFormView
            newCustomer={newCustomer}
            onNewCustomerChange={onNewCustomerChange}
            onSubmit={onSubmit}
            onClose={onClose}
            duplicateError={duplicateError}
            firstInputRef={firstInputRef}
          />
        )}
      </aside>
    </div>
  );
}
