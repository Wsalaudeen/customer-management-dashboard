import styles from '../dashboard/Dashboard.module.css';

// SVG Sort Icons
function ArrowUpIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowDownIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

export default function CustomerTable({ customers, sortConfig, onSort }) {
  const columns = [
    { key: 'businessName', label: 'Business Name' },
    { key: 'type', label: 'Type' },
    { key: 'industry', label: 'Industry' },
    { key: 'rm', label: 'RM' },
    { key: 'status', label: 'Status' },
    { key: 'createdDate', label: 'Created' },
  ];

  const getAriaSort = (columnKey) => {
    if (!sortConfig || sortConfig.key !== columnKey) return 'none';
    return sortConfig.direction;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.customerTable} aria-label="Business customer records">
        <caption className="sr-only">List of business customers</caption>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortConfig && sortConfig.key === col.key;
              const isAsc = isSorted && sortConfig.direction === 'ascending';
              const isDesc = isSorted && sortConfig.direction === 'descending';

              return (
                <th key={col.key} scope="col" aria-sort={getAriaSort(col.key)}>
                  <button
                    type="button"
                    className={styles.sortHeaderBtn}
                    onClick={() => onSort(col.key)}
                    aria-label={`Sort by ${col.label}, currently ${
                      getAriaSort(col.key) === 'none' ? 'unsorted' : getAriaSort(col.key)
                    }`}
                  >
                    <span>{col.label}</span>
                    <div className={styles.sortArrowsGroup}>
                      <ArrowUpIcon
                        className={isAsc ? styles.sortIconActive : styles.sortIconNeutral}
                      />
                      <ArrowDownIcon
                        className={isDesc ? styles.sortIconActive : styles.sortIconNeutral}
                      />
                    </div>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>
                <div className={styles.businessCell}>
                  <span className={styles.businessName}>{cust.businessName}</span>
                  <span className={styles.contactPerson}>{cust.contactPerson}</span>
                </div>
              </td>
              <td>
                <span className={styles.typeBadge}>{cust.type}</span>
              </td>
              <td>{cust.industry}</td>
              <td>
                <div className={styles.rmCell}>
                  <div className={styles.rmAvatar} aria-hidden="true">
                    {cust.rm?.initials || (cust.rmName ? cust.rmName.substring(0, 2).toUpperCase() : 'AN')}
                  </div>
                  <span className={styles.rmName}>{cust.rm?.name || cust.rmName || 'Ada'}</span>
                </div>
              </td>
              <td>
                <span
                  className={`${styles.statusPill} ${
                    cust.status === 'Active'
                      ? styles.statusActive
                      : cust.status === 'Pending'
                      ? styles.statusPending
                      : styles.statusInactive
                  }`}
                >
                  <span className={styles.statusDot} aria-hidden="true" />
                  {cust.status}
                </span>
              </td>
              <td>{cust.createdDate}</td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No customers match your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
