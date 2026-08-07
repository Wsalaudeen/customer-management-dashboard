import { useState, useRef } from 'react';
import { DEMO_CREDENTIALS, AUTH_MESSAGES, AUTH_CONFIG } from '../../constants/auth';

/**
 * Custom hook to manage Login form state, input validation, autofill, and submission.
 */
export function useLoginForm(onLoginSuccess) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitBtnRef = useRef(null);

  const handleDemoAutofill = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setError('');
    setSuccess('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError(AUTH_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (trimmedEmail === DEMO_CREDENTIALS.email && trimmedPassword === DEMO_CREDENTIALS.password) {
        setIsLoading(false);
        setSuccess(AUTH_MESSAGES.SUCCESS);

        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        }, 800);
      } else {
        setIsLoading(false);
        setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
      }
    }, AUTH_CONFIG.SIMULATED_DELAY_MS);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    setError,
    success,
    emailInputRef,
    passwordInputRef,
    submitBtnRef,
    handleDemoAutofill,
    handleSubmit,
  };
}
