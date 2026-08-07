import { useState } from 'react';

/**
 * Custom hook to handle table column sorting (ascending, descending, or none).
 */
export function useCustomerSort() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  // Toggle sort direction: none -> ascending -> descending -> none
  const toggleSort = (columnKey) => {
    setSortConfig((prev) => {
      if (prev.key !== columnKey) {
        return { key: columnKey, direction: 'ascending' };
      }

      switch (prev.direction) {
        case 'ascending':
          return { key: columnKey, direction: 'descending' };
        case 'descending':
        default:
          return { key: null, direction: 'none' };
      }
    });
  };

  // Convert date string ("Today", "12 Oct 2023") into timestamp number for accurate comparison
  const parseDate = (dateStr) => {
    switch (dateStr) {
      case '':
      case null:
      case undefined:
        return 0;
      case 'Today':
        return Date.now();
      default:
        return Date.parse(dateStr) || 0;
    }
  };

  // Pure function to sort a list of customers according to current sortConfig
  const sortList = (customers = []) => {
    const { key, direction } = sortConfig;
    if (!key || direction === 'none') return customers;

    return [...customers].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      switch (key) {
        case 'createdDate':
          valueA = parseDate(valueA);
          valueB = parseDate(valueB);
          break;
        default:
          if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
          }
          break;
      }

      if (valueA < valueB) return direction === 'ascending' ? -1 : 1;
      if (valueA > valueB) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  };

  return {
    sortConfig,
    toggleSort,
    sortList,
  };
}
