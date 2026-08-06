import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../useLoginForm';
import { DEMO_CREDENTIALS, AUTH_MESSAGES, AUTH_CONFIG } from '../../constants/auth';

describe('useLoginForm Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with default empty values', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('');
  });

  it('should update email and password when setters are called', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.setEmail('user@example.com');
      result.current.setPassword('secret123');
    });

    expect(result.current.email).toBe('user@example.com');
    expect(result.current.password).toBe('secret123');
  });

  it('should autofill demo credentials when handleDemoAutofill is called', () => {
    const mockFocus = vi.fn();
    const { result } = renderHook(() => useLoginForm());

    // Attach mock focus to submitBtnRef
    result.current.submitBtnRef.current = { focus: mockFocus };

    act(() => {
      result.current.handleDemoAutofill();
    });

    expect(result.current.email).toBe(DEMO_CREDENTIALS.email);
    expect(result.current.password).toBe(DEMO_CREDENTIALS.password);
    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('');

    // Advance timer for focus timeout
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

  it('should set error message when submitted with empty email', () => {
    const mockEmailFocus = vi.fn();
    const { result } = renderHook(() => useLoginForm());
    result.current.emailInputRef.current = { focus: mockEmailFocus };

    const mockEvent = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.error).toBe(AUTH_MESSAGES.REQUIRED_FIELDS);
    expect(mockEmailFocus).toHaveBeenCalledTimes(1);
  });

  it('should set error message when submitted with empty password', () => {
    const mockPasswordFocus = vi.fn();
    const { result } = renderHook(() => useLoginForm());
    result.current.passwordInputRef.current = { focus: mockPasswordFocus };

    act(() => {
      result.current.setEmail('user@example.com');
    });

    const mockEvent = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.error).toBe(AUTH_MESSAGES.REQUIRED_FIELDS);
    expect(mockPasswordFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid credentials submission flow', () => {
    const mockEmailFocus = vi.fn();
    const { result } = renderHook(() => useLoginForm());
    result.current.emailInputRef.current = { focus: mockEmailFocus };

    act(() => {
      result.current.setEmail('wrong@example.com');
      result.current.setPassword('wrongpass');
    });

    const mockEvent = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    // Loading state activated immediately
    expect(result.current.isLoading).toBe(true);

    // Fast-forward simulated delay
    act(() => {
      vi.advanceTimersByTime(AUTH_CONFIG.SIMULATED_DELAY_MS);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(AUTH_MESSAGES.INVALID_CREDENTIALS);
    expect(mockEmailFocus).toHaveBeenCalledTimes(1);
  });

  it('should handle successful login flow and invoke callback after delay', () => {
    const onLoginSuccess = vi.fn();
    const { result } = renderHook(() => useLoginForm(onLoginSuccess));

    act(() => {
      result.current.setEmail(DEMO_CREDENTIALS.email);
      result.current.setPassword(DEMO_CREDENTIALS.password);
    });

    const mockEvent = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.isLoading).toBe(true);

    // Advance timer for API delay
    act(() => {
      vi.advanceTimersByTime(AUTH_CONFIG.SIMULATED_DELAY_MS);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.success).toBe(AUTH_MESSAGES.SUCCESS);
    expect(onLoginSuccess).not.toHaveBeenCalled();

    // Advance timer for redirect delay (800ms)
    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(onLoginSuccess).toHaveBeenCalledTimes(1);
  });
});
