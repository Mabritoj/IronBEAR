export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  metric: string;
  /** Omit until the case study exists; the card then shows inert text instead of a dead link. */
  caseStudyUrl?: string;
  repoLabel: string;
  repoUrl: string;
  /** Renders the card on the dark surface instead of the light one. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'forge',
    index: '01',
    title: 'FORGE / EVENT CORE',
    description:
      'A fault-tolerant event pipeline that converts high-volume product telemetry into query-ready analytical facts within seconds.',
    technologies: ['RUST', 'KAFKA', 'CLICKHOUSE'],
    metric: '4.2B EVENTS / DAY',
    repoLabel: 'GITHUB / FORGE',
    repoUrl: 'https://github.com/mabritoj',
    featured: true,
  },
  {
    id: 'northstar',
    index: '02',
    title: 'NORTHSTAR CLI',
    description:
      'An open developer toolkit for authoring, validating, and distributing service templates consistently across engineering teams.',
    technologies: ['GO', 'NIX', 'GITHUB ACTIONS'],
    metric: '38% FASTER BOOTSTRAP',
    repoLabel: 'GITHUB / NORTHSTAR',
    repoUrl: 'https://github.com/mabritoj',
  },
  {
    id: 'bastion',
    index: '03',
    title: 'BASTION CONTROL',
    description:
      'An infrastructure access governance platform that makes permissions legible, reviewable, and time-bounded by design.',
    technologies: ['TYPESCRIPT', 'POSTGRES', 'OPA'],
    metric: 'ZERO STANDING ACCESS',
    repoLabel: 'GITHUB / BASTION',
    repoUrl: 'https://github.com/mabritoj',
  },
];
