import { DEMO_CREDENTIALS } from '../../constants/auth';
import styles from './Login.module.css';

export default function DemoCredentialsCallout({ onAutofill }) {
  return (
    <button
      type="button"
      className={styles.demoBox}
      onClick={onAutofill}
      title="Click to autofill demo credentials"
      aria-label="Autofill demo credentials"
      tabIndex={0}
    >
      <div className={styles.demoIcon} aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <div className={styles.demoContent}>
        <span>
          <strong>Demo:</strong> Use <code className={styles.codeHighlight}>{DEMO_CREDENTIALS.email}</code> with password{' '}
          <code className={styles.codeHighlight}>{DEMO_CREDENTIALS.password}</code>
        </span>
      </div>
    </button>
  );
}
