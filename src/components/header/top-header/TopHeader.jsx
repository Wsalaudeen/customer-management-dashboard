import styles from './TopHeader.module.css';

export default function TopHeader({
  searchQuery,
  onSearchChange,
  onLogout,
}) {
  return (
    <header className={styles.topBar}>
      <form role="search" aria-label="Customer search" className={styles.searchContainer} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="dashboard-customer-search" className="sr-only">Search customers</label>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="dashboard-customer-search"
          type="search"
          className={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </form>

      <div className={styles.headerActions}>
        <button
          className={styles.signOutBtn}
          onClick={onLogout}
          type="button"
          aria-label="Sign out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </div>
    </header>
  );
}
