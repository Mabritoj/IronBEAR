import logoMark from '../../assets/logo-mark.webp';
import { ButtonLink } from '../../components/ButtonLink';
import { Container } from '../../components/Container';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Methodology', href: '#methodology' },
];

export function Navigation() {
  return (
    <header>
      <Container>
        <nav className={styles.nav} aria-label="Primary">
          <a className={styles.identity} href="#top">
            <img className={styles.logo} src={logoMark} alt="" width={44} height={44} />
            <span className={styles.domain}>ironbear.dev</span>
          </a>
          <ul className={styles.links}>
            {navLinks.map(({ label, href }) => (
              <li key={href} className={styles.textLink}>
                <a href={href}>{label}</a>
              </li>
            ))}
            <li>
              <ButtonLink label="ENGAGE" href="#contact" variant="secondary" />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
