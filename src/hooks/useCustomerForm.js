import { useState } from 'react';

const INITIAL_FORM_STATE = {
  businessName: '',
  contactPerson: '',
  type: 'Corporation',
  industry: 'Telecommunications',
  status: 'Active',
  rmName: 'Ada',
};

/**
 * Custom hook to manage modal visibility and new customer registration form state.
 */
export function useCustomerForm(onAddCustomer, onDeleteCustomer) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState(INITIAL_FORM_STATE);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = newCustomer.businessName.trim();
    const contact = newCustomer.contactPerson.trim();

    if (!name || !contact) return;

    const newRecord = {
      id: Date.now(),
      businessName: name,
      contactPerson: contact,
      email: `${contact.toLowerCase().replace(/\s+/g, '.')}@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: '+234 803 000 0000',
      type: newCustomer.type,
      industry: newCustomer.industry,
      status: newCustomer.status,
      rmName: newCustomer.rmName || 'Ada',
      createdDate: 'Today',
    };

    if (onAddCustomer) {
      onAddCustomer(newRecord);
    }

    setNewCustomer(INITIAL_FORM_STATE);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    newCustomer,
    setNewCustomer,
    handleSubmit,
    handleDelete: onDeleteCustomer,
  };
}
