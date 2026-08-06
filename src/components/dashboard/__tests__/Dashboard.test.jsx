import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';

describe('Dashboard Component', () => {
  it('renders dashboard title, sidebar, and stat cards', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    // Check heading
    expect(screen.getByRole('heading', { name: /Customer Management/i })).toBeInTheDocument();

    // Check sidebar brand
    expect(screen.getByText('Peerless')).toBeInTheDocument();

    // Check stat card labels
    expect(screen.getByText('Total Customers')).toBeInTheDocument();
    expect(screen.getByText('Active Customers')).toBeInTheDocument();
    expect(screen.getByText('Pending Verification')).toBeInTheDocument();
    expect(screen.getByText('Inactive Customers')).toBeInTheDocument();
  });

  it('renders initial paginated list of customers (1-10)', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    // First customer on page 1
    expect(screen.getByText('Pinnacle Telecom Solutions')).toBeInTheDocument();
    // Pagination footer text
    expect(screen.getByText(/Showing 1-10 of 15/i)).toBeInTheDocument();
  });

  it('navigates to page 2 when clicking page 2 button', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    const page2Btn = screen.getByRole('button', { name: /Go to page 2/i });
    fireEvent.click(page2Btn);

    expect(screen.getByText(/Showing 11-15 of 15/i)).toBeInTheDocument();
  });

  it('filters customers when typing into search input', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/Search customers.../i);
    fireEvent.change(searchInput, { target: { value: 'Pinnacle' } });

    expect(screen.getByText('Pinnacle Telecom Solutions')).toBeInTheDocument();
    expect(screen.queryByText('Sterling Media Works Ltd')).not.toBeInTheDocument();
    expect(screen.getByText(/1 results/i)).toBeInTheDocument();
  });

  it('filters customers by status tabs', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    const pendingTab = screen.getByRole('button', { name: 'Pending' });
    fireEvent.click(pendingTab);

    expect(screen.getByText('SunRise Energy Resources')).toBeInTheDocument();
    expect(screen.queryByText('Pinnacle Telecom Solutions')).not.toBeInTheDocument();
  });

  it('shows clear filters button when filter is active and resets back to All on click', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    // Initially clear filters button is not present
    expect(screen.queryByRole('button', { name: /Clear filters/i })).not.toBeInTheDocument();

    // Click Pending tab
    const pendingTab = screen.getByRole('button', { name: 'Pending' });
    fireEvent.click(pendingTab);

    // Clear filters button should appear
    const clearBtn = screen.getByRole('button', { name: /Clear.*filters/i });
    expect(clearBtn).toBeInTheDocument();

    // Click Clear filters
    fireEvent.click(clearBtn);

    // Clear filters button disappears and All tab is active
    expect(screen.queryByRole('button', { name: /Clear.*filters/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('opens register customer modal when clicking CTA button', () => {
    render(<Dashboard onLogout={vi.fn()} />);

    const registerBtn = screen.getByRole('button', { name: /Register Customer/i });
    fireEvent.click(registerBtn);

    expect(screen.getByRole('heading', { name: /Register New Customer/i })).toBeInTheDocument();
  });

  it('triggers onLogout when clicking Sign out from user dropdown', () => {
    const handleLogout = vi.fn();
    render(<Dashboard onLogout={handleLogout} />);

    // Open user menu
    const adminMenuBtn = screen.getByRole('button', { name: /Admin account menu/i });
    fireEvent.click(adminMenuBtn);

    const signOutBtn = screen.getByRole('menuitem', { name: /Sign out/i });
    fireEvent.click(signOutBtn);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
