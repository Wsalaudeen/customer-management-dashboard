import styles from './Dashboard.module.css';

export default function PaginationFooter({
  totalResults,
  currentSliceStart,
  currentSliceEnd,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <nav aria-label="Table pagination" className={styles.paginationFooter}>
      <div className={styles.paginationInfo} aria-live="polite" aria-atomic="true">
        Showing {totalResults === 0 ? 0 : currentSliceStart + 1}-{currentSliceEnd} of {totalResults}
      </div>

      <div className={styles.paginationControls} role="group" aria-label="Pagination controls">
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          type="button"
          aria-label="Go to previous page"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            className={`${styles.pageBtn} ${currentPage === pg ? styles.activePageBtn : ''}`}
            onClick={() => onPageChange(pg)}
            type="button"
            aria-label={`Go to page ${pg}`}
            aria-current={currentPage === pg ? 'page' : undefined}
          >
            {pg}
          </button>
        ))}
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          type="button"
          aria-label="Go to next page"
        >
          &gt;
        </button>
      </div>
    </nav>
  );
}
