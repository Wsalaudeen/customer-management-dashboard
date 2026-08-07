import styles from './StatCardsGrid.module.css';

export default function StatCardsGrid({
  totalCustomers,
  activeCustomers,
  pendingCustomers,
  inactiveCustomers,
}) {
  return (
    <section aria-labelledby="metrics-summary-heading" className={styles.statsGrid}>
      <h2 id="metrics-summary-heading" className="sr-only">
        Key Customer Metrics
      </h2>

      <article className={styles.statCard}>
        <div>
          <h3 className={styles.statTitle}>Total Customers</h3>
          <div className={styles.statValue}>{totalCustomers}</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>↑ +3 this month</div>
        </div>
        <div className={`${styles.statIconWrapper} ${styles.iconBlue}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </article>

      <article className={styles.statCard}>
        <div>
          <h3 className={styles.statTitle}>Active Customers</h3>
          <div className={styles.statValue}>{activeCustomers}</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>↑ +2 this month</div>
        </div>
        <div className={`${styles.statIconWrapper} ${styles.iconGreen}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
      </article>

      <article className={styles.statCard}>
        <div>
          <h3 className={styles.statTitle}>Pending Verification</h3>
          <div className={styles.statValue}>{pendingCustomers}</div>
          <div className={`${styles.statTrend} ${styles.trendAmber}`}>↑ +1 this week</div>
        </div>
        <div className={`${styles.statIconWrapper} ${styles.iconAmber}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      </article>

      <article className={styles.statCard}>
        <div>
          <h3 className={styles.statTitle}>Inactive Customers</h3>
          <div className={styles.statValue}>{inactiveCustomers}</div>
          <div className={`${styles.statTrend} ${styles.trendNeutral}`}>No change</div>
        </div>
        <div className={`${styles.statIconWrapper} ${styles.iconGray}`} aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
      </article>
    </section>
  );
}
