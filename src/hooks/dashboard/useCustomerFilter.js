import { useState } from 'react';
import { normalizeText } from '../../utils/duplicateDetector';

export function useCustomerFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All Industries');

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusTab !== 'All' ||
    industryFilter !== 'All Industries';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusTab('All');
    setIndustryFilter('All Industries');
  };

  const filterList = (customers = []) => {
    const query = normalizeText(searchQuery);

    return customers.filter((customer) => {
      if (statusTab !== 'All' && customer.status !== statusTab) {
        return false;
      }

      if (industryFilter !== 'All Industries' && customer.industry !== industryFilter) {
        return false;
      }

      if (query) {
        const name = normalizeText(customer.businessName);
        const contact = normalizeText(customer.contactPerson);
        const email = normalizeText(customer.email);

        const matchesName = name.includes(query);
        const matchesContact = contact.includes(query);
        const matchesEmail = email.includes(query);

        if (!matchesName && !matchesContact && !matchesEmail) {
          return false;
        }
      }

      return true;
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
