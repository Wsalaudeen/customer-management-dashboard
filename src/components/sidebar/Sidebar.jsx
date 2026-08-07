import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar navigation">
      <div className={styles.sidebarTop}>
        <header className={styles.brandHeader}>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Peerless</span>
          </div>
        </header>

        <nav className={styles.nav} aria-label="Main navigation">
          <button
            className={`${styles.navItem} ${styles.activeNavItem}`}
            type="button"
            aria-current="page"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </button>
          <button className={styles.navItem} type="button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Customers
          </button>
        </nav>
      </div>
    </aside>
  );
}
