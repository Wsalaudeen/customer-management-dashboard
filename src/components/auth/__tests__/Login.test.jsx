import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from '../Login';
import { DEMO_CREDENTIALS, AUTH_MESSAGES, AUTH_CONFIG } from '../../../constants/auth';

describe('Login Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders all essential Auth UI elements', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    expect(screen.getByRole('heading', { name: AUTH_CONFIG.HEADING })).toBeInTheDocument();
    expect(screen.getByText(AUTH_CONFIG.SUBTITLE)).toBeInTheDocument();

    expect(screen.getByLabelText(/Corporate Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();

    expect(screen.getByText(DEMO_CREDENTIALS.email)).toBeInTheDocument();
  });

  it('allows user to type into email and password inputs', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'secretpass' } });
    });

    expect(emailInput).toHaveValue('user@test.com');
    expect(passwordInput).toHaveValue('secretpass');
  });

  it('autofills credentials when clicking the demo callout card', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    const demoCard = screen.getByRole('button', { name: /Autofill demo credentials/i });
    
    act(() => {
      fireEvent.click(demoCard);
      vi.advanceTimersByTime(0);
    });

    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);

    expect(emailInput).toHaveValue(DEMO_CREDENTIALS.email);
    expect(passwordInput).toHaveValue(DEMO_CREDENTIALS.password);
  });

  it('shows error alert when submitting empty form', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /Sign in/i });

    act(() => {
      fireEvent.submit(submitBtn);
    });

    expect(screen.getByText(AUTH_MESSAGES.REQUIRED_FIELDS)).toBeInTheDocument();
  });

  it('shows error alert when submitting invalid credentials', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitBtn = screen.getByRole('button', { name: /Sign in/i });

    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalid@peerless.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitBtn);
    });

    act(() => {
      vi.advanceTimersByTime(AUTH_CONFIG.SIMULATED_DELAY_MS);
    });

    expect(screen.getByText(AUTH_MESSAGES.INVALID_CREDENTIALS)).toBeInTheDocument();
  });

  it('handles successful authentication flow and triggers onLoginSuccess', () => {
    const handleLoginSuccess = vi.fn();
    render(<Login onLoginSuccess={handleLoginSuccess} />);

    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitBtn = screen.getByRole('button', { name: /Sign in/i });

    act(() => {
      fireEvent.change(emailInput, { target: { value: DEMO_CREDENTIALS.email } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      fireEvent.click(submitBtn);
    });

    act(() => {
      vi.advanceTimersByTime(AUTH_CONFIG.SIMULATED_DELAY_MS);
    });

    expect(screen.getByText(AUTH_MESSAGES.SUCCESS)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(handleLoginSuccess).toHaveBeenCalledTimes(1);
  });

  it('disables submit button and shows loading state during submission', () => {
    render(<Login onLoginSuccess={vi.fn()} />);

    const emailInput = screen.getByLabelText(/Corporate Email/i);
    const passwordInput = screen.getByLabelText(/^Password/i);
    const submitBtn = screen.getByRole('button', { name: /Sign in/i });

    act(() => {
      fireEvent.change(emailInput, { target: { value: DEMO_CREDENTIALS.email } });
      fireEvent.change(passwordInput, { target: { value: DEMO_CREDENTIALS.password } });
      fireEvent.click(submitBtn);
    });

    expect(submitBtn).toBeDisabled();
  });
});
