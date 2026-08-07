/**
 * Custom hook to calculate overview metric totals from customer records.
 */
export function useCustomerMetrics(customers = []) {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const pendingCustomers = customers.filter((c) => c.status === 'Pending').length;
  const inactiveCustomers = customers.filter((c) => c.status === 'Inactive').length;

  return {
    totalCustomers,
    activeCustomers,
    pendingCustomers,
    inactiveCustomers,
  };
}
