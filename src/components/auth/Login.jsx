import { AUTH_CONFIG } from '../../constants/auth';
import { useLoginForm } from '../../hooks/useLoginForm';
import BrandHeader from './BrandHeader';
import DemoCredentialsCallout from './DemoCredentialsCallout';
import TextField from '../ui/TextField';
import PasswordField from '../ui/PasswordField';
import Button from '../ui/Button';
import Alert from '../ui/Alert';
import styles from './Login.module.css';

export default function Login({ onLoginSuccess }) {
  const {
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
  } = useLoginForm(onLoginSuccess);

  return (
    <main className={styles.authWrapper}>
      <section className={styles.authContent} aria-labelledby="brand-title">
        <BrandHeader />

        <h1 className={styles.title}>{AUTH_CONFIG.HEADING}</h1>
        <p className={styles.subtitle}>{AUTH_CONFIG.SUBTITLE}</p>

        <DemoCredentialsCallout onAutofill={handleDemoAutofill} />

        <div aria-live="polite" aria-atomic="true">
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            ref={emailInputRef}
            id="email"
            type="email"
            label="Corporate Email"
            placeholder="you@peerless.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <PasswordField
            ref={passwordInputRef}
            id="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button ref={submitBtnRef} type="submit" loading={isLoading}>
            Sign in
          </Button>
        </form>
      </section>
    </main>
  );
}
