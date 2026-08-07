import { StatCardsGridSkeleton } from './Skeleton';
import CustomerTableSkeleton from '../customer/CustomerTableSkeleton';
import styles from '../dashboard/Dashboard.module.css';

/**
 * DashboardSkeleton Component
 * Composes StatCardsGridSkeleton and CustomerTableSkeleton for initial loading UX.
 */
export default function DashboardSkeleton() {
  return (
    <div
      className={styles.skeletonContainer}
      aria-busy="true"
      aria-label="Loading dashboard content"
      role="status"
    >
      <StatCardsGridSkeleton />
      <CustomerTableSkeleton />
    </div>
  );
}
