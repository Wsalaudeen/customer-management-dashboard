import { useDashboard } from '../../hooks/dashboard/useDashboard';
import Sidebar from '../sidebar/Sidebar';
import TopHeader from '../header/top-header/TopHeader';
import PageHeader from '../header/page-header/PageHeader';
import StatCardsGrid from '../stats/StatCardsGrid';
import CustomerSection from '../customer/CustomerSection';
import RegisterCustomerModal from '../modal/RegisterCustomerModal';
import SuccessNotification from '../ui/notification/SuccessNotification';
import DashboardSkeleton from '../ui/DashboardSkeleton';
import styles from './Dashboard.module.css';

export default function Dashboard({ onLogout, initialLoading = false }) {
  const dashboard = useDashboard({ initialLoading });

  const notificationName =
    dashboard.successCustomer?.contactPerson ||
    dashboard.successCustomer?.businessName ||
    'Customer';

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <main className={styles.mainCanvas} id="main-content">
        <TopHeader
          searchQuery={dashboard.searchQuery}
          onSearchChange={dashboard.handleSearchChange}
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
        onClose={dashboard.closeModal}
        newCustomer={dashboard.newCustomer}
        onNewCustomerChange={dashboard.setNewCustomer}
        onSubmit={dashboard.handleAddCustomerSubmit}
        successCustomer={dashboard.successCustomer}
        onRegisterAnother={dashboard.registerAnotherCustomer}
        duplicateError={dashboard.duplicateError}
      />

      <SuccessNotification
        message={`${notificationName} has been registered successfully.`}
        isVisible={dashboard.showSuccessNotification}
        onClose={dashboard.dismissNotification}
      />
    </div>
  );
}
