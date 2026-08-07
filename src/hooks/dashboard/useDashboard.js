import { useState, useEffect } from 'react';
import { INITIAL_CUSTOMERS } from '../../constants/mockCustomers';
import { useCustomerFilter } from './useCustomerFilter';
import { useCustomerSort } from './useCustomerSort';
import { useCustomerPagination } from './useCustomerPagination';
import { useCustomerMetrics } from './useCustomerMetrics';
import { useCustomerForm } from '../modal/useCustomerForm';

export function useDashboard({ initialLoading = false } = {}) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  const filter = useCustomerFilter();
  const sort = useCustomerSort();
  const pagination = useCustomerPagination(10);
  const metrics = useCustomerMetrics(customers);

  const handleAddCustomer = (record) => {
    setCustomers((prev) => [record, ...prev]);
    pagination.setCurrentPage(1);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  const form = useCustomerForm(handleAddCustomer, handleDeleteCustomer, customers);

  const filteredCustomers = filter.filterList(customers);
  const sortedCustomers = sort.sortList(filteredCustomers);
  const paginationData = pagination.paginateList(sortedCustomers);

  const handleSearchChange = (query) => {
    filter.setSearchQuery(query);
    pagination.setCurrentPage(1);
  };

  const handleStatusTabChange = (tab) => {
    filter.setStatusTab(tab);
    pagination.setCurrentPage(1);
  };

  const handleIndustryFilterChange = (industry) => {
    filter.setIndustryFilter(industry);
    pagination.setCurrentPage(1);
  };

  const handleClearFilters = () => {
    filter.resetFilters();
    pagination.setCurrentPage(1);
  };

  return {
    isLoading,
    setIsLoading,

    customers,
    setCustomers,

    searchQuery: filter.searchQuery,
    statusTab: filter.statusTab,
    industryFilter: filter.industryFilter,
    hasActiveFilters: filter.hasActiveFilters,
    handleSearchChange,
    handleStatusTabChange,
    handleIndustryFilterChange,
    handleClearFilters,

    sortConfig: sort.sortConfig,
    handleSort: sort.toggleSort,

    currentPage: paginationData.validPage,
    setCurrentPage: pagination.setCurrentPage,
    totalResults: paginationData.totalResults,
    totalPages: paginationData.totalPages,
    currentSliceStart: paginationData.currentSliceStart,
    currentSliceEnd: paginationData.currentSliceEnd,
    paginatedCustomers: paginationData.paginatedItems,

    totalCustomers: metrics.totalCustomers,
    activeCustomers: metrics.activeCustomers,
    pendingCustomers: metrics.pendingCustomers,
    inactiveCustomers: metrics.inactiveCustomers,

    isUserMenuOpen,
    setIsUserMenuOpen,
    isModalOpen: form.isModalOpen,
    setIsModalOpen: form.setIsModalOpen,
    closeModal: form.closeModal,
    newCustomer: form.newCustomer,
    setNewCustomer: form.setNewCustomer,
    successCustomer: form.successCustomer,
    showSuccessNotification: form.showSuccessNotification,
    duplicateError: form.duplicateError,
    registerAnotherCustomer: form.registerAnotherCustomer,
    dismissNotification: form.dismissNotification,
    handleAddCustomerSubmit: form.handleSubmit,
    handleDeleteCustomer: form.handleDelete,
  };
}
