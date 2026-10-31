import { TextLink } from '../../components/TextLink';
import styles from './ProjectCard.module.css';
import type { Project } from './data';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { index, title, description, technologies, metric, siteUrl, repoLabel, repoUrl, tone } =
    project;

  return (
    <article className={`${styles.card} ${tone === 'dark' ? styles.dark : styles.light}`}>
      <p className={styles.index}>{index}</p>
      <div className={styles.copy}>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <ul className={styles.tags} aria-label="Technologies">
          {technologies.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.proof}>
        <p className={styles.metricLabel}>AT A GLANCE</p>
        <p className={styles.metric}>{metric}</p>
        <div className={styles.links}>
          {siteUrl && (
            <span className={styles.site}>
              <TextLink label="LIVE SITE" href={siteUrl} />
            </span>
          )}
          <span className={styles.repo}>
            <TextLink label={repoLabel} href={repoUrl} />
          </span>
        </div>
      </div>
    </article>
  );
}
