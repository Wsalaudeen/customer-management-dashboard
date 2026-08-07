import { useState } from 'react';

export function useCustomerPagination(pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginateList = (items = []) => {
    const totalResults = items.length;
    const totalPages = Math.ceil(totalResults / pageSize) || 1;
    const validPage = Math.min(Math.max(1, currentPage), totalPages);

    const startIndex = (validPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalResults);

    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      totalResults,
      totalPages,
      validPage,
      currentSliceStart: totalResults > 0 ? startIndex + 1 : 0,
      currentSliceEnd: endIndex,
      paginatedItems,
    };
  };

  return {
    currentPage,
    setCurrentPage,
    paginateList,
  };
}
