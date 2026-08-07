import { useState } from 'react';

export function useCustomerSort(initialSort = { key: 'createdDate', direction: 'desc' }) {
  const [sortConfig, setSortConfig] = useState(initialSort);

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const sortList = (customers = []) => {
    if (!sortConfig.key) return customers;

    return [...customers].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'rm') {
        aVal = a.rm?.name || '';
        bVal = b.rm?.name || '';
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  return {
    sortConfig,
    toggleSort,
    sortList,
  };
}
