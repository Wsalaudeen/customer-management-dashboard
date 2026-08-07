import { useState, useEffect } from 'react';
import { INITIAL_CUSTOMERS } from '../../constants/mockCustomers';
import { useCustomerFilter } from './useCustomerFilter';
import { useCustomerSort } from './useCustomerSort';
import { useCustomerPagination } from './useCustomerPagination';
import { useCustomerMetrics } from './useCustomerMetrics';
import { useCustomerForm } from '../modal/useCustomerForm';

/**
 * Main dashboard orchestrator hook.
 * Composes sub-hooks into a clean, predictable data pipeline:
 * Raw Customers -> Filtered -> Sorted -> Paginated
 */
export function useDashboard({ initialLoading = false } = {}) {
  // 1. Core State
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 2. Simulated loading delay on login
  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  // 3. Instantiate Sub-Hooks
  const filter = useCustomerFilter();
  const sort = useCustomerSort();
  const pagination = useCustomerPagination(10);
  const metrics = useCustomerMetrics(customers);

  // Handler: Add customer and jump to page 1
  const handleAddCustomer = (record) => {
    setCustomers((prev) => [record, ...prev]);
    pagination.setCurrentPage(1);
  };

  // Handler: Delete customer by ID
  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  const form = useCustomerForm(handleAddCustomer, handleDeleteCustomer, customers);

  // 4. Data Processing Pipeline
  const filteredCustomers = filter.filterList(customers);
  const sortedCustomers = sort.sortList(filteredCustomers);
  const paginationData = pagination.paginateList(sortedCustomers);

  // Helper wrappers that change filter & reset pagination to page 1
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

  // 5. Return Clean Public Contract for Dashboard UI
  return {
    // Loading State
    isLoading,
    setIsLoading,

    // Raw Customers State
    customers,
    setCustomers,

    // Filter API
    searchQuery: filter.searchQuery,
    statusTab: filter.statusTab,
    industryFilter: filter.industryFilter,
    hasActiveFilters: filter.hasActiveFilters,
    handleSearchChange,
    handleStatusTabChange,
    handleIndustryFilterChange,
    handleClearFilters,

    // Sort API
    sortConfig: sort.sortConfig,
    handleSort: sort.toggleSort,

    // Pagination API
    currentPage: paginationData.validPage,
    setCurrentPage: pagination.setCurrentPage,
    totalResults: paginationData.totalResults,
    totalPages: paginationData.totalPages,
    currentSliceStart: paginationData.currentSliceStart,
    currentSliceEnd: paginationData.currentSliceEnd,
    paginatedCustomers: paginationData.paginatedItems,

    // Metrics Summary API
    totalCustomers: metrics.totalCustomers,
    activeCustomers: metrics.activeCustomers,
    pendingCustomers: metrics.pendingCustomers,
    inactiveCustomers: metrics.inactiveCustomers,

    // UI Dropdown & Modal API
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
