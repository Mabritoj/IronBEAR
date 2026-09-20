import bearMark from '../../assets/bear-mark.png';
import { ButtonLink } from '../../components/ButtonLink';
import { Container } from '../../components/Container';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container>
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.availability}>
              <span className={styles.status} aria-hidden="true" />
              ACCEPTING SELECT ENGAGEMENTS
            </p>
            <h1 id="hero-title" className={styles.title}>
              <span>ORCHESTRATING</span>
              <span>CLEAR</span>
              <span>OUTCOMES</span>
            </h1>
            <div className={styles.motto}>
              <span className={styles.divider} aria-hidden="true" />
              <p>Orchestrate | Observe | Adapt</p>
            </div>
            <p className={styles.intro}>
              IronBEAR designs and builds developer tooling, integrations, and automation. Each
              project is open source, documented, and built to be reused.
            </p>
            <div className={styles.actions}>
              <ButtonLink label="VIEW SELECTED WORK" href="#work" />
              <ButtonLink
                label="GITHUB / IRONBEAR"
                href="https://github.com/ironbear"
                variant="secondary"
                external
              />
            </div>
          </div>
          <div className={styles.card}>
            <p className={styles.meta}>IB / CORE / 01</p>
            <img
              className={styles.bear}
              src={bearMark}
              alt="IronBEAR logo: a steel bear head with circuit-trace details"
              width={380}
              height={380}
            />
            <p className={`${styles.meta} ${styles.coordinates}`}>
              <span>N 51.5072°</span>
              <span>SYSTEMS / INFRASTRUCTURE</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
