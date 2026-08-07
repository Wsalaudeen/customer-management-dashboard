import CustomerFilterToolbar from './CustomerFilterToolbar';
import CustomerTable from './CustomerTable';
import PaginationFooter from '../pagination/PaginationFooter';
import styles from '../dashboard/Dashboard.module.css';

export default function CustomerSection({ dashboard }) {
  const {
    statusTab,
    handleStatusTabChange,
    industryFilter,
    handleIndustryFilterChange,
    hasActiveFilters,
    handleClearFilters,
    totalResults,
    paginatedCustomers,
    sortConfig,
    handleSort,
    handleDeleteCustomer,
    currentSliceStart,
    currentSliceEnd,
    currentPage,
    totalPages,
    setCurrentPage,
  } = dashboard;

  return (
    <section className={styles.tableContainerCard} aria-label="Customer Data Records">
      <CustomerFilterToolbar
        statusTab={statusTab}
        onStatusTabChange={handleStatusTabChange}
        industryFilter={industryFilter}
        onIndustryFilterChange={handleIndustryFilterChange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        totalResults={totalResults}
      />

      <CustomerTable
        customers={paginatedCustomers}
        sortConfig={sortConfig}
        onSort={handleSort}
        onDeleteCustomer={handleDeleteCustomer}
      />

      <PaginationFooter
        totalResults={totalResults}
        currentSliceStart={currentSliceStart}
        currentSliceEnd={currentSliceEnd}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
