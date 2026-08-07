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

export default function CustomerTable({ customers, sortConfig, onSort, onDeleteCustomer }) {
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
        <caption className="sr-only">List of business customers and management actions</caption>
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
            <th scope="col" style={{ textAlign: 'right' }}>
              Actions
            </th>
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
                    {cust.rm.initials}
                  </div>
                  <span className={styles.rmName}>{cust.rm.name}</span>
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
              <td>
                <div className={styles.actionButtons} style={{ justifyContent: 'flex-end' }}>
                  <button
                    className={styles.actionBtn}
                    title="View Details"
                    type="button"
                    aria-label={`View details for ${cust.businessName}`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button
                    className={styles.actionBtn}
                    title="Edit Customer"
                    type="button"
                    aria-label={`Edit ${cust.businessName}`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Delete Customer"
                    type="button"
                    aria-label={`Delete ${cust.businessName}`}
                    onClick={() => onDeleteCustomer(cust.id)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No customers match your criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
