import { ButtonLink } from '../../components/ButtonLink';
import { Container } from '../../components/Container';
import { SectionLabel } from '../../components/SectionLabel';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Container>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <SectionLabel label="Put it to work" />
            <h2 id="contact-title" className={styles.title}>
              OPEN TO INSPECTION
            </h2>
            <p className={styles.description}>
              Every project is open source. Read the code, fork what's useful, and contribute to the
              idea.
            </p>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Source</p>
            <p className={styles.cardTitle}>Read the source.</p>
            <ButtonLink label="View repositories" href="https://github.com/ironbear" external />
          </div>
        </div>
      </Container>
    </section>
  );
}
