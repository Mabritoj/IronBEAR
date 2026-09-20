import { Container } from '../../components/Container';
import { SectionLabel } from '../../components/SectionLabel';
import styles from './Methodology.module.css';
import { phases, principle } from './data';
import { PhaseCard } from './PhaseCard';

export function Methodology() {
  return (
    <section id="methodology" aria-labelledby="methodology-title">
      <div className={styles.approach}>
        <Container>
          <div className={styles.heading}>
            <SectionLabel label="Approach" />
            <div className={styles.headline}>
              <h2 id="methodology-title" className={styles.title}>
                ORCHESTRATE | OBSERVE | ADAPT.
              </h2>
              <p className={styles.summary}>
                A three-phase approach that keeps every project structured, visible, and easy to
                improve.
              </p>
            </div>
          </div>
          <ol className={styles.cards}>
            {phases.map((phase) => (
              <li key={phase.id}>
                <PhaseCard phase={phase} />
              </li>
            ))}
          </ol>
        </Container>
      </div>
      <div className={styles.statement}>
        <Container>
          <figure className={styles.principle}>
            <figcaption className={styles.lead}>{principle.lead}</figcaption>
            <blockquote className={styles.quote}>{principle.quote}</blockquote>
          </figure>
        </Container>
      </div>
    </section>
  );
}
