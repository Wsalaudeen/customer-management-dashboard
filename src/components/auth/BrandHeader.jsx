import { AUTH_CONFIG } from '../../constants/auth';
import styles from './Login.module.css';

export default function BrandHeader() {
  return (
    <header className={styles.brandHeader}>
      <span id="brand-title" className={styles.brandName}>
        {AUTH_CONFIG.BRAND_NAME}
      </span>
    </header>
  );
}
