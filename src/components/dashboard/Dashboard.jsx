import { useDashboard } from '../../hooks/useDashboard';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import StatCardsGrid from './StatCardsGrid';
import CustomerFilterToolbar from './CustomerFilterToolbar';
import CustomerTable from './CustomerTable';
import PaginationFooter from './PaginationFooter';
import RegisterCustomerModal from './RegisterCustomerModal';
import styles from './Dashboard.module.css';

export default function Dashboard({ onLogout }) {
  const {
    searchQuery,
    statusTab,
    industryFilter,
    currentPage,
    setCurrentPage,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isModalOpen,
    setIsModalOpen,
    sortConfig,
    newCustomer,
    setNewCustomer,
    totalCustomers,
    activeCustomers,
    pendingCustomers,
    inactiveCustomers,
    totalResults,
    totalPages,
    currentSliceStart,
    currentSliceEnd,
    paginatedCustomers,
    hasActiveFilters,
    handleSearchChange,
    handleStatusTabChange,
    handleIndustryFilterChange,
    handleClearFilters,
    handleSort,
    handleAddCustomerSubmit,
    handleDeleteCustomer,
  } = useDashboard();

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar
        isUserMenuOpen={isUserMenuOpen}
        onToggleUserMenu={() => setIsUserMenuOpen(!isUserMenuOpen)}
      />

      <main className={styles.mainCanvas} id="main-content">
        <TopHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          isUserMenuOpen={isUserMenuOpen}
          onToggleUserMenu={() => setIsUserMenuOpen(!isUserMenuOpen)}
          onLogout={onLogout}
        />

        <section className={styles.content} aria-labelledby="dashboard-page-title">
          <div className={styles.pageHeader}>
            <div>
              <h1 id="dashboard-page-title" className={styles.pageTitle}>
                Customer Management
              </h1>
              <p className={styles.pageSubtitle}>Monitor and manage all business customer relationships.</p>
            </div>

            <button
              className={styles.registerBtn}
              onClick={() => setIsModalOpen(true)}
              type="button"
              aria-haspopup="dialog"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Register Customer
            </button>
          </div>

          <StatCardsGrid
            totalCustomers={totalCustomers}
            activeCustomers={activeCustomers}
            pendingCustomers={pendingCustomers}
            inactiveCustomers={inactiveCustomers}
          />

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
        </section>
      </main>

      <RegisterCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newCustomer={newCustomer}
        onNewCustomerChange={setNewCustomer}
        onSubmit={handleAddCustomerSubmit}
      />
    </div>
  );
}
