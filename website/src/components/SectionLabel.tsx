import styles from './SectionLabel.module.css';

interface SectionLabelProps {
  label: string;
}

/** Eyebrow label. Colour comes from `--label-color`, which a parent section may override. */
export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className={styles.label}>
      <span className={styles.signal} aria-hidden="true" />
      {label}
    </p>
  );
}
