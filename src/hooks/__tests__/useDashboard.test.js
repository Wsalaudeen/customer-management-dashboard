import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDashboard } from '../useDashboard';

describe('useDashboard Custom Hook', () => {
  it('initializes with default metrics and initial customer dataset', () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.totalCustomers).toBe(15);
    expect(result.current.activeCustomers).toBe(9);
    expect(result.current.pendingCustomers).toBe(3);
    expect(result.current.inactiveCustomers).toBe(3);
    expect(result.current.paginatedCustomers.length).toBe(10);
  });

  it('filters customers when search query changes', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleSearchChange('Pinnacle');
    });

    expect(result.current.totalResults).toBe(1);
    expect(result.current.paginatedCustomers[0].businessName).toBe('Pinnacle Telecom Solutions');
  });

  it('filters customers when status tab changes', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleStatusTabChange('Pending');
    });

    expect(result.current.totalResults).toBe(3);
    expect(result.current.paginatedCustomers.every((c) => c.status === 'Pending')).toBe(true);
  });

  it('resets active filters when handleClearFilters is called', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleStatusTabChange('Pending');
      result.current.handleIndustryFilterChange('Energy');
      result.current.handleSearchChange('SunRise');
    });

    expect(result.current.hasActiveFilters).toBe(true);

    act(() => {
      result.current.handleClearFilters();
    });

    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.statusTab).toBe('All');
    expect(result.current.industryFilter).toBe('All Industries');
    expect(result.current.searchQuery).toBe('');
  });

  it('toggles column sorting direction (none -> ascending -> descending -> none)', () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.sortConfig).toEqual({ key: null, direction: 'none' });

    // Ascending
    act(() => {
      result.current.handleSort('businessName');
    });
    expect(result.current.sortConfig).toEqual({ key: 'businessName', direction: 'ascending' });
    expect(result.current.paginatedCustomers[0].businessName).toBe('Apex Management Consulting');

    // Descending
    act(() => {
      result.current.handleSort('businessName');
    });
    expect(result.current.sortConfig).toEqual({ key: 'businessName', direction: 'descending' });
    expect(result.current.paginatedCustomers[0].businessName).toBe('Zenith Construction plc');

    // Reset to none
    act(() => {
      result.current.handleSort('businessName');
    });
    expect(result.current.sortConfig).toEqual({ key: null, direction: 'none' });
  });

  it('sorts createdDate chronologically rather than alphabetically', () => {
    const { result } = renderHook(() => useDashboard());

    // Sort ascending: Oldest date first ('10 Dec 2023')
    act(() => {
      result.current.handleSort('createdDate');
    });
    expect(result.current.paginatedCustomers[0].createdDate).toBe('10 Dec 2023');

    // Sort descending: Newest date first ('10 Jun 2024')
    act(() => {
      result.current.handleSort('createdDate');
    });
    expect(result.current.paginatedCustomers[0].createdDate).toBe('10 Jun 2024');
  });

  it('adds a new customer record to the top of the list', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.setNewCustomer({
        businessName: 'Acorn Financial Group',
        contactPerson: 'David Miller',
        type: 'LLC',
        industry: 'Finance',
        status: 'Active',
        rmName: 'Ada',
      });
    });

    const mockEvent = { preventDefault: () => {} };
    act(() => {
      result.current.handleAddCustomerSubmit(mockEvent);
    });

    expect(result.current.totalCustomers).toBe(16);
    expect(result.current.paginatedCustomers[0].businessName).toBe('Acorn Financial Group');
  });

  it('deletes a customer record by id', () => {
    const { result } = renderHook(() => useDashboard());
    const targetId = result.current.customers[0].id;

    act(() => {
      result.current.handleDeleteCustomer(targetId);
    });

    expect(result.current.totalCustomers).toBe(14);
    expect(result.current.customers.find((c) => c.id === targetId)).toBeUndefined();
  });
});
