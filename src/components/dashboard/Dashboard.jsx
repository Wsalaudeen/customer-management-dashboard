import { useDashboard } from '../../hooks/useDashboard';
import Sidebar from '../sidebar/Sidebar';
import TopHeader from '../header/TopHeader';
import PageHeader from '../header/PageHeader';
import StatCardsGrid from '../stats/StatCardsGrid';
import CustomerSection from '../customer/CustomerSection';
import RegisterCustomerModal from '../modal/RegisterCustomerModal';
import DashboardSkeleton from '../ui/DashboardSkeleton';
import styles from './Dashboard.module.css';

export default function Dashboard({ onLogout, initialLoading = false }) {
  const dashboard = useDashboard({ initialLoading });

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <main className={styles.mainCanvas} id="main-content">
        <TopHeader
          searchQuery={dashboard.searchQuery}
          onSearchChange={dashboard.handleSearchChange}
          isUserMenuOpen={dashboard.isUserMenuOpen}
          onToggleUserMenu={() => dashboard.setIsUserMenuOpen(!dashboard.isUserMenuOpen)}
          onLogout={onLogout}
        />

        <section className={styles.content} aria-labelledby="dashboard-page-title">
          <PageHeader onOpenModal={() => dashboard.setIsModalOpen(true)} />

          {dashboard.isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <StatCardsGrid
                totalCustomers={dashboard.totalCustomers}
                activeCustomers={dashboard.activeCustomers}
                pendingCustomers={dashboard.pendingCustomers}
                inactiveCustomers={dashboard.inactiveCustomers}
              />

              <CustomerSection dashboard={dashboard} />
            </>
          )}
        </section>
      </main>

      <RegisterCustomerModal
        isOpen={dashboard.isModalOpen}
        onClose={() => dashboard.setIsModalOpen(false)}
        newCustomer={dashboard.newCustomer}
        onNewCustomerChange={dashboard.setNewCustomer}
        onSubmit={dashboard.handleAddCustomerSubmit}
      />
    </div>
  );
}
