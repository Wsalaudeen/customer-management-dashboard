import styles from './Dashboard.module.css';

export default function TopHeader({
  searchQuery,
  onSearchChange,
  isUserMenuOpen,
  onToggleUserMenu,
  onLogout,
}) {
  return (
    <header className={styles.topBar}>
      <form
        role="search"
        aria-label="Customer search"
        className={styles.searchContainer}
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="dashboard-customer-search" className="sr-only">
          Search customers
        </label>
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
        <div style={{ position: 'relative' }}>
          <button
            className={`${styles.adminDropdownBtn} ${isUserMenuOpen ? styles.adminBtnActive : ''}`}
            onClick={onToggleUserMenu}
            type="button"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
            aria-controls="admin-user-menu"
            aria-label="Admin account menu"
          >
            <div className={styles.adminAvatarBadge} aria-hidden="true">
              AU
            </div>
            <span className={styles.adminText}>Admin</span>
            <svg
              className={`${styles.chevronIcon} ${isUserMenuOpen ? styles.chevronRotated : ''}`}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isUserMenuOpen && (
            <div id="admin-user-menu" role="menu" aria-label="User options menu" className={styles.userMenuDropdown}>
              <div className={styles.dropdownUserHeader}>
                <span className={styles.dropdownUserName}>Admin User</span>
                <span className={styles.dropdownUserEmail}>admin@peerless.com</span>
              </div>
              <button className={styles.dropdownItem} onClick={onLogout} type="button" role="menuitem">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
