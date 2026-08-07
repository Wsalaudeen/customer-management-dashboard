import { INDUSTRIES } from '../../constants/mockCustomers';
import styles from '../dashboard/Dashboard.module.css';

export default function CustomerFilterToolbar({
  statusTab,
  onStatusTabChange,
  industryFilter,
  onIndustryFilterChange,
  hasActiveFilters,
  onClearFilters,
  totalResults,
}) {
  return (
    <div className={styles.tableHeaderToolbar}>
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
        </span>

        <div role="group" aria-label="Filter customers by status" className={styles.statusTabPills}>
          {['All', 'Active', 'Pending', 'Inactive'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.statusTab} ${statusTab === tab ? styles.activeStatusTab : ''}`}
              onClick={() => onStatusTabChange(tab)}
              aria-pressed={statusTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <label htmlFor="industry-filter-select" className="sr-only">
            Filter by Industry
          </label>
          <select
            id="industry-filter-select"
            className={styles.industrySelect}
            value={industryFilter}
            onChange={(e) => onIndustryFilterChange(e.target.value)}
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearFiltersBtn}
            onClick={onClearFilters}
            aria-label="Clear all active filters and reset to All"
          >
            Clear filters
          </button>
        )}
      </div>

      <span className={styles.resultsCount} aria-live="polite" aria-atomic="true">
        {totalResults} results
      </span>
    </div>
  );
}
