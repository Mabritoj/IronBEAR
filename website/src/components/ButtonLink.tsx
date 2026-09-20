import styles from './ButtonLink.module.css';

interface ButtonLinkProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}

export function ButtonLink({
  label,
  href,
  variant = 'primary',
  external = false,
}: ButtonLinkProps) {
  return (
    <a
      className={`${styles.button} ${styles[variant]}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{label}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
