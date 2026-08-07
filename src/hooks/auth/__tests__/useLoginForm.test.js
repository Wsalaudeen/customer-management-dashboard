import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '../useLoginForm';

describe('useLoginForm Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default empty values', () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('updates email and password states', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.setEmail('test@peerless.com');
      result.current.setPassword('secret123');
    });

    expect(result.current.email).toBe('test@peerless.com');
    expect(result.current.password).toBe('secret123');
  });

  it('autofills demo credentials when handleDemoAutofill is called', () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handleDemoAutofill();
    });

    expect(result.current.email).toBe('admin@peerless.com');
    expect(result.current.password).toBe('password123');
  });

  it('sets error when submitting empty fields', () => {
    const { result } = renderHook(() => useLoginForm());
    const event = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(result.current.error).toBe('Please fill in all required fields.');
  });

  it('sets error on invalid credentials', () => {
    const { result } = renderHook(() => useLoginForm());
    const event = { preventDefault: vi.fn() };

    act(() => {
      result.current.setEmail('wrong@email.com');
      result.current.setPassword('wrongpass');
    });

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Invalid email or password. Please try again.');
  });

  it('calls onLoginSuccess on valid credentials', () => {
    const handleSuccess = vi.fn();
    const { result } = renderHook(() => useLoginForm(handleSuccess));
    const event = { preventDefault: vi.fn() };

    act(() => {
      result.current.setEmail('admin@peerless.com');
      result.current.setPassword('password123');
    });

    act(() => {
      result.current.handleSubmit(event);
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(result.current.error).toBe('');
    expect(result.current.success).toBe('Authentication successful! Redirecting...');

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(handleSuccess).toHaveBeenCalledTimes(1);
  });
});
