import { useState } from 'react';

/**
 * Custom hook to handle table pagination calculations and page navigation.
 */
export function useCustomerPagination(pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate slice indices and paginated subset for a given customer list
  const paginateList = (customers = []) => {
    const totalResults = customers.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

    // Ensure currentPage stays within valid range (1 to totalPages)
    const validPage = Math.min(currentPage, totalPages);

    const currentSliceStart = totalResults === 0 ? 0 : (validPage - 1) * pageSize;
    const currentSliceEnd = Math.min(validPage * pageSize, totalResults);
    const paginatedItems = customers.slice(currentSliceStart, currentSliceEnd);

    return {
      paginatedItems,
      totalResults,
      totalPages,
      currentSliceStart,
      currentSliceEnd,
      validPage,
    };
  };

  return {
    currentPage,
    setCurrentPage,
    paginateList,
  };
}
