import Skeleton from '../ui/Skeleton';
import styles from '../dashboard/Dashboard.module.css';

/**
 * CustomerTableSkeleton
 * Renders shimmering loading placeholders for the customer table and filter toolbar.
 */
export default function CustomerTableSkeleton({ rows = 6 }) {
  return (
    <div className={styles.tableContainerCard}>
      <div className={styles.tableHeaderToolbar}>
        <div className={styles.leftToolbarControls}>
          <Skeleton width="120px" height="32px" borderRadius="8px" />
          <Skeleton width="220px" height="32px" borderRadius="8px" />
        </div>
        <Skeleton width="140px" height="32px" borderRadius="8px" />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.customerTable} style={{ pointerEvents: 'none' }}>
          <thead>
            <tr>
              <th style={{ width: '22%' }}><Skeleton width="80px" height="14px" /></th>
              <th style={{ width: '18%' }}><Skeleton width="90px" height="14px" /></th>
              <th style={{ width: '12%' }}><Skeleton width="50px" height="14px" /></th>
              <th style={{ width: '14%' }}><Skeleton width="70px" height="14px" /></th>
              <th style={{ width: '10%' }}><Skeleton width="40px" height="14px" /></th>
              <th style={{ width: '10%' }}><Skeleton width="50px" height="14px" /></th>
              <th style={{ width: '8%' }}><Skeleton width="40px" height="14px" /></th>
              <th style={{ width: '6%' }}><Skeleton width="30px" height="14px" /></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton width="75%" height="15px" style={{ marginBottom: '4px' }} />
                  <Skeleton width="45%" height="11px" />
                </td>
                <td>
                  <Skeleton width="70%" height="14px" style={{ marginBottom: '4px' }} />
                  <Skeleton width="55%" height="11px" />
                </td>
                <td><Skeleton width="70px" height="14px" /></td>
                <td><Skeleton width="85px" height="14px" /></td>
                <td><Skeleton width="50px" height="14px" /></td>
                <td><Skeleton width="60px" height="22px" borderRadius="12px" /></td>
                <td><Skeleton width="65px" height="13px" /></td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <Skeleton width="24px" height="24px" borderRadius="4px" />
                    <Skeleton width="24px" height="24px" borderRadius="4px" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
