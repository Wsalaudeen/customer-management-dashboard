import { useState } from 'react';
import { findDuplicateCustomer } from '../../utils/duplicateDetector';

const INITIAL_FORM_STATE = {
  businessName: '',
  contactPerson: '',
  type: '',
  industry: '',
  status: '',
  phone: '',
  email: '',
  notes: '',
  rmName: 'Ada',
};

export function useCustomerForm(onAddCustomer, onDeleteCustomer, existingCustomers = []) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(INITIAL_FORM_STATE);
  const [successCustomer, setSuccessCustomer] = useState(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [duplicateError, setDuplicateError] = useState(null);

  const updateNewCustomer = (updatedData) => {
    setNewCustomer(updatedData);
    if (duplicateError) {
      setDuplicateError(null);
    }
  };

  const openModal = () => {
    setDuplicateError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessCustomer(null);
    setDuplicateError(null);
    setNewCustomer(INITIAL_FORM_STATE);
  };

  const registerAnotherCustomer = () => {
    setSuccessCustomer(null);
    setDuplicateError(null);
    setNewCustomer(INITIAL_FORM_STATE);
  };

  const dismissNotification = () => {
    setShowSuccessNotification(false);
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const name = newCustomer.businessName?.trim();
    const contact = newCustomer.contactPerson?.trim();

    if (!name || !contact) return;

    const duplicateCheck = findDuplicateCustomer(newCustomer, existingCustomers);
    if (duplicateCheck.isDuplicate) {
      setDuplicateError({
        message: duplicateCheck.message,
        field: duplicateCheck.field,
        matchingCustomer: duplicateCheck.matchingCustomer,
      });
      return;
    }

    setDuplicateError(null);

    const rmName = newCustomer.rmName || 'Ada';
    const rmInitials = rmName.substring(0, 2).toUpperCase();
    const uniqueId = 'CMSIM' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const newRecord = {
      id: uniqueId,
      businessName: name,
      contactPerson: contact,
      email:
        newCustomer.email?.trim() ||
        `${contact.toLowerCase().replace(/\s+/g, '.')}@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: newCustomer.phone?.trim() || '+234 803 000 0000',
      type: newCustomer.type || 'Corporation',
      industry: newCustomer.industry || 'Telecommunications',
      status: newCustomer.status || 'Active',
      rm: {
        name: rmName,
        initials: rmInitials,
      },
      createdDate: 'Today',
    };

    if (onAddCustomer) {
      onAddCustomer(newRecord);
    }

    setSuccessCustomer(newRecord);
    setShowSuccessNotification(true);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    newCustomer,
    setNewCustomer: updateNewCustomer,
    successCustomer,
    setSuccessCustomer,
    showSuccessNotification,
    setShowSuccessNotification,
    duplicateError,
    setDuplicateError,
    registerAnotherCustomer,
    dismissNotification,
    handleSubmit,
    handleDelete: onDeleteCustomer,
  };
}
