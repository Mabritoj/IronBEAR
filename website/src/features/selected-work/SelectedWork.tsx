import { Container } from '../../components/Container';
import { SectionLabel } from '../../components/SectionLabel';
import { projects } from './data';
import { ProjectCard } from './ProjectCard';
import styles from './SelectedWork.module.css';

export function SelectedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Container>
        <div className={styles.heading}>
          <div className={styles.titleGroup}>
            <SectionLabel label="SELECTED SYSTEMS" />
            <h2 id="work-title" className={styles.title}>
              BUILT IN THE OPEN.
            </h2>
          </div>
          <p className={styles.summary}>
            Open source infrastructure, applications, developer tooling, and data systems, with
            source, architecture notes, and results for each.
          </p>
        </div>
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
