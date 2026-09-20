import styles from './TextLink.module.css';

interface TextLinkProps {
  label: string;
  /** External destination. When omitted the label renders as inert text, not a dead link. */
  href?: string;
}

export function TextLink({ label, href }: TextLinkProps) {
  const content = (
    <>
      {label} <span aria-hidden="true">↗</span>
    </>
  );

  if (!href) {
    return <span className={styles.link}>{content}</span>;
  }

  return (
    <a
      className={`${styles.link} ${styles.active}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}
