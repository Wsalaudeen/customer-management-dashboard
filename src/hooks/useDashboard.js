import { useState, useMemo } from 'react';
import { INITIAL_CUSTOMERS } from '../constants/mockCustomers';

export function useDashboard() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [currentPage, setCurrentPage] = useState(1);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const [newCustomer, setNewCustomer] = useState({
    businessName: '',
    contactPerson: '',
    type: 'Corporation',
    industry: 'Telecommunications',
    status: 'Active',
    rmName: 'Ada',
  });

  const pageSize = 10;

  // Stat metrics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const pendingCustomers = customers.filter((c) => c.status === 'Pending').length;
  const inactiveCustomers = customers.filter((c) => c.status === 'Inactive').length;

  // Active filter indicator
  const hasActiveFilters = statusTab !== 'All' || industryFilter !== 'All Industries' || searchQuery !== '';

  // Filtered customer list
  const filteredCustomers = useMemo(() => {
    return customers.filter((item) => {
      const matchesSearch =
        item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusTab === 'All' || item.status === statusTab;
      const matchesIndustry = industryFilter === 'All Industries' || item.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [customers, searchQuery, statusTab, industryFilter]);

  const parseCreatedDate = (dateStr) => {
    if (!dateStr) return 0;
    if (dateStr === 'Today') return Date.now();
    const timestamp = Date.parse(dateStr);
    return isNaN(timestamp) ? 0 : timestamp;
  };

  // Sorted customer list
  const sortedCustomers = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === 'none') {
      return filteredCustomers;
    }

    return [...filteredCustomers].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'rm') {
        aVal = a.rm.name.toLowerCase();
        bVal = b.rm.name.toLowerCase();
      } else if (sortConfig.key === 'createdDate') {
        aVal = parseCreatedDate(a.createdDate);
        bVal = parseCreatedDate(b.createdDate);
      } else if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortConfig]);

  // Pagination calculations
  const totalResults = sortedCustomers.length;
  const totalPages = Math.ceil(totalResults / pageSize) || 1;
  const currentSliceStart = (currentPage - 1) * pageSize;
  const currentSliceEnd = Math.min(currentSliceStart + pageSize, totalResults);
  const paginatedCustomers = sortedCustomers.slice(currentSliceStart, currentSliceEnd);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusTabChange = (tab) => {
    setStatusTab(tab);
    setCurrentPage(1);
  };

  const handleIndustryFilterChange = (industry) => {
    setIndustryFilter(industry);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setStatusTab('All');
    setIndustryFilter('All Industries');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: 'ascending' };
      }
      if (prev.direction === 'ascending') {
        return { key, direction: 'descending' };
      }
      return { key: null, direction: 'none' };
    });
    setCurrentPage(1);
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    if (!newCustomer.businessName.trim() || !newCustomer.contactPerson.trim()) return;

    const initialsMap = {
      Ada: 'AN',
      John: 'JA',
      James: 'JM',
      Kemi: 'KA',
      Sarah: 'SO',
    };

    const newRecord = {
      id: String(Date.now()),
      businessName: newCustomer.businessName.trim(),
      contactPerson: newCustomer.contactPerson.trim(),
      type: newCustomer.type,
      industry: newCustomer.industry,
      rm: {
        name: newCustomer.rmName,
        initials: initialsMap[newCustomer.rmName] || 'AU',
      },
      status: newCustomer.status,
      createdDate: 'Today',
    };

    setCustomers([newRecord, ...customers]);
    setIsModalOpen(false);
    setNewCustomer({
      businessName: '',
      contactPerson: '',
      type: 'Corporation',
      industry: 'Telecommunications',
      status: 'Active',
      rmName: 'Ada',
    });
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return {
    customers,
    searchQuery,
    statusTab,
    industryFilter,
    currentPage,
    setCurrentPage,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isModalOpen,
    setIsModalOpen,
    sortConfig,
    newCustomer,
    setNewCustomer,
    totalCustomers,
    activeCustomers,
    pendingCustomers,
    inactiveCustomers,
    totalResults,
    totalPages,
    currentSliceStart,
    currentSliceEnd,
    paginatedCustomers,
    hasActiveFilters,
    handleSearchChange,
    handleStatusTabChange,
    handleIndustryFilterChange,
    handleClearFilters,
    handleSort,
    handleAddCustomerSubmit,
    handleDeleteCustomer,
  };
}
