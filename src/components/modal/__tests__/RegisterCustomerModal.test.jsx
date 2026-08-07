import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterCustomerModal from '../RegisterCustomerModal';

describe('RegisterCustomerModal Component', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(<RegisterCustomerModal isOpen={false} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders drawer with dialog role, title, subtitle, form sections, and buttons when isOpen is true', () => {
    render(<RegisterCustomerModal isOpen={true} onClose={vi.fn()} />);

    // Dialog & Accessibility
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Title and Subtitle
    expect(screen.getByRole('heading', { name: 'Register Customer' })).toBeInTheDocument();
    expect(
      screen.getByText('Complete the form to register a new business customer.')
    ).toBeInTheDocument();

    // Form Sections
    expect(screen.getByText('Business Information')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Account Settings')).toBeInTheDocument();

    // Inputs
    expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Industry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Person/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();

    // Action Buttons
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register Customer' })).toBeInTheDocument();
  });

  it('calls onClose when close icon button, cancel button, or escape key is pressed', () => {
    const handleClose = vi.fn();
    render(<RegisterCustomerModal isOpen={true} onClose={handleClose} />);

    // Close button click
    const closeIconBtn = screen.getByRole('button', { name: /Close modal/i });
    fireEvent.click(closeIconBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Cancel button click
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);
    expect(handleClose).toHaveBeenCalledTimes(2);

    // Escape key press
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(3);
  });

  it('submits form with entered data', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    const handleNewCustomerChange = vi.fn();
    const mockData = {
      businessName: 'Meridian Ltd',
      contactPerson: 'Jane Doe',
      type: 'LLC',
      industry: 'Technology',
      phone: '+234 800 123 4567',
      email: 'jane@meridian.com',
      status: 'Active',
      notes: 'VIP customer',
    };

    render(
      <RegisterCustomerModal
        isOpen={true}
        onClose={vi.fn()}
        newCustomer={mockData}
        onNewCustomerChange={handleNewCustomerChange}
        onSubmit={handleSubmit}
      />
    );

    const submitBtn = screen.getByRole('button', { name: 'Register Customer' });
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays role="alert" banner and highlights field when duplicateError prop is passed', () => {
    const duplicateError = {
      message: 'A business with the name "Pinnacle Telecom Solutions" is already registered.',
      field: 'businessName',
    };

    render(
      <RegisterCustomerModal
        isOpen={true}
        onClose={vi.fn()}
        duplicateError={duplicateError}
      />
    );

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(
      screen.getByText('A business with the name "Pinnacle Telecom Solutions" is already registered.')
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Business Name/i);
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });
});
