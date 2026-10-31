import styles from './PhaseCard.module.css';
import type { Phase } from './data';

interface PhaseCardProps {
  phase: Phase;
}

export function PhaseCard({ phase }: PhaseCardProps) {
  const { index, phaseLabel, title, description, stack } = phase;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <p className={styles.pillar}>
          <span>{index}</span>
          <span className={styles.divider} aria-hidden="true" />
          <span>{phaseLabel}</span>
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <p className={styles.stack}>{stack}</p>
    </article>
  );
}
