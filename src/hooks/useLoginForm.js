import { useState, useRef } from 'react';
import { DEMO_CREDENTIALS, AUTH_MESSAGES, AUTH_CONFIG } from '../constants/auth';

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
    setSuccess('');
    setTimeout(() => {
      submitBtnRef.current?.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError(AUTH_MESSAGES.REQUIRED_FIELDS);
      emailInputRef.current?.focus();
      return;
    }

    if (!password.trim()) {
      setError(AUTH_MESSAGES.REQUIRED_FIELDS);
      passwordInputRef.current?.focus();
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        setSuccess(AUTH_MESSAGES.SUCCESS);
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        }, 800);
      } else {
        setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
        emailInputRef.current?.focus();
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
    success,
    emailInputRef,
    passwordInputRef,
    submitBtnRef,
    handleDemoAutofill,
    handleSubmit,
  };
}
