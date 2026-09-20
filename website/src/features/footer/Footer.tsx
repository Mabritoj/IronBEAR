import bearMark from '../../assets/bear-mark.webp';
import { Container } from '../../components/Container';
import { TextLink } from '../../components/TextLink';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <img className={styles.logo} src={bearMark} alt="IronBEAR" width={120} height={32} />
          <ul className={styles.social} aria-label="Social links">
            <li>
              <TextLink label="GitHub" href="https://github.com/ironbear" />
            </li>
            <li>
              <TextLink label="LinkedIn" />
            </li>
          </ul>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} IRONBEAR. ALL RIGHTS RESERVED.
          </p>
          <p className={styles.status}>
            <span aria-hidden="true">● </span>ALL SYSTEMS NOMINAL
          </p>
        </div>
      </Container>
    </footer>
  );
}
