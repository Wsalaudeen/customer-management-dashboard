import { useMemo } from 'react';

export function useCustomerMetrics(customers = []) {
  return useMemo(() => {
    const totalCustomers = customers.length;
    let activeCustomers = 0;
    let pendingCustomers = 0;
    let inactiveCustomers = 0;

    for (const item of customers) {
      if (item.status === 'Active') activeCustomers++;
      else if (item.status === 'Pending') pendingCustomers++;
      else if (item.status === 'Inactive') inactiveCustomers++;
    }

    return {
      totalCustomers,
      activeCustomers,
      pendingCustomers,
      inactiveCustomers,
    };
  }, [customers]);
}
