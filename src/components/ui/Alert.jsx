import styles from '../auth/Login.module.css';

export default function Alert({ type = 'error', message }) {
  if (!message) return null;

  const isError = type === 'error';
  const className = isError ? styles.errorMessage : styles.successMessage;
  const role = isError ? 'alert' : 'status';

  return (
    <div className={className} role={role} tabIndex={-1}>
      {message}
    </div>
  );
}
