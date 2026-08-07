import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDashboard } from '../useDashboard';

describe('useDashboard Hook Orchestrator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default mock customer data and page 1', () => {
    const { result } = renderHook(() => useDashboard());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.customers.length).toBeGreaterThan(0);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.statusTab).toBe('All');
  });

  it('simulates loading state when initialLoading option is true', () => {
    const { result } = renderHook(() => useDashboard({ initialLoading: true }));

    expect(result.current.isLoading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('filters list by search query and resets to page 1', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.setCurrentPage(2);
    });

    act(() => {
      result.current.handleSearchChange('Pinnacle');
    });

    expect(result.current.searchQuery).toBe('Pinnacle');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.paginatedCustomers.length).toBe(1);
    expect(result.current.paginatedCustomers[0].businessName).toContain('Pinnacle');
  });

  it('filters list by status tab', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleStatusTabChange('Pending');
    });

    expect(result.current.statusTab).toBe('Pending');
    expect(
      result.current.paginatedCustomers.every((c) => c.status === 'Pending')
    ).toBe(true);
  });

  it('filters list by industry filter', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleIndustryFilterChange('Telecommunications');
    });

    expect(result.current.industryFilter).toBe('Telecommunications');
    expect(
      result.current.paginatedCustomers.every((c) => c.industry === 'Telecommunications')
    ).toBe(true);
  });

  it('resets all filters when handleClearFilters is called', () => {
    const { result } = renderHook(() => useDashboard());

    act(() => {
      result.current.handleSearchChange('Test');
      result.current.handleStatusTabChange('Active');
      result.current.handleIndustryFilterChange('Energy');
    });

    expect(result.current.hasActiveFilters).toBe(true);

    act(() => {
      result.current.handleClearFilters();
    });

    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.statusTab).toBe('All');
    expect(result.current.industryFilter).toBe('All Industries');
  });

  it('adds a new customer record and prepends to list at page 1', () => {
    const { result } = renderHook(() => useDashboard());
    const initialCount = result.current.totalCustomers;

    const newRecord = {
      id: '999',
      businessName: 'Brand New Corp',
      contactPerson: 'Alice Wonder',
      email: 'alice@brandnew.com',
      status: 'Active',
      industry: 'Technology',
      rm: { name: 'Ada', initials: 'AD' },
    };

    act(() => {
      result.current.setCustomers((prev) => [newRecord, ...prev]);
    });

    expect(result.current.totalCustomers).toBe(initialCount + 1);
    expect(result.current.customers[0].businessName).toBe('Brand New Corp');
  });

  it('deletes a customer record by ID', () => {
    const { result } = renderHook(() => useDashboard());
    const initialCount = result.current.totalCustomers;
    const targetId = result.current.customers[0].id;

    act(() => {
      result.current.handleDeleteCustomer(targetId);
    });

    expect(result.current.totalCustomers).toBe(initialCount - 1);
    expect(result.current.customers.some((c) => c.id === targetId)).toBe(false);
  });
});
