import styles from '../dashboard/Dashboard.module.css';

/**
 * Skeleton Primitive UI Component
 * Reusable animated shimmer block placeholder for loading states.
 */
export default function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
  style = {},
  className = '',
}) {
  return (
    <div
      className={`${styles.skeletonBase} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

/**
 * StatCardsGridSkeleton
 * Shimmering loading skeleton cards grid matching StatCardsGrid.
 */
export function StatCardsGridSkeleton({ count = 4 }) {
  return (
    <div className={styles.statsGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.statCard}>
          <div style={{ flex: 1 }}>
            <Skeleton width="60%" height="14px" style={{ marginBottom: '12px' }} />
            <Skeleton width="40%" height="28px" style={{ marginBottom: '8px' }} />
            <Skeleton width="50%" height="12px" />
          </div>
          <Skeleton width="40px" height="40px" borderRadius="6px" />
        </div>
      ))}
    </div>
  );
}
