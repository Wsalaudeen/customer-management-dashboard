import { useState } from 'react';

/**
 * Custom hook to manage customer search, status, and industry filters.
 */
export function useCustomerFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All Industries');

  // True if any filter is currently applied
  const hasActiveFilters = searchQuery !== '' || statusTab !== 'All' || industryFilter !== 'All Industries';

  // Reset all filters back to default state
  const resetFilters = () => {
    setSearchQuery('');
    setStatusTab('All');
    setIndustryFilter('All Industries');
  };

  // Pure function to filter a list of customers based on current filter state
  const filterList = (customers = []) => {
    const query = searchQuery.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.businessName.toLowerCase().includes(query) ||
        customer.contactPerson.toLowerCase().includes(query);

      const matchesStatus = statusTab === 'All' || customer.status === statusTab;
      const matchesIndustry = industryFilter === 'All Industries' || customer.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    statusTab,
    setStatusTab,
    industryFilter,
    setIndustryFilter,
    hasActiveFilters,
    resetFilters,
    filterList,
  };
}
