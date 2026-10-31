import { GITHUB_URL } from '../../config/site';

export interface Project {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  /** Headline line for the "at a glance" panel. Facts from the repo only, no invented results. */
  metric: string;
  /** Live site, when the project has one. */
  siteUrl?: string;
  repoLabel: string;
  repoUrl: string;
  /** Card surface. Set explicitly so the list alternates dark, light, dark. */
  tone: 'dark' | 'light';
}

export const projects: Project[] = [
  {
    id: 'filacrypt',
    index: '01',
    title: 'FILACRYPT',
    description:
      'An NFC-native inventory tracker for 3D printer filament spools. Tap a tagged spool to pull up its brand, material, drying profile, and remaining weight.',
    technologies: ['REACT', 'TYPESCRIPT', 'AWS SAM'],
    metric: 'EVERY SPOOL, TRACKED TO THE GRAM',
    siteUrl: 'https://filacrypt.com',
    repoLabel: 'GITHUB / FILACRYPT',
    repoUrl: `${GITHUB_URL}/Filacrypt`,
    tone: 'dark',
  },
  {
    id: 'prusa-widget',
    index: '02',
    title: 'PRUSA STATUS WIDGET',
    description:
      'A Corsair Xeneon Edge widget that shows live Prusa printer status (state, current job, progress, and temperatures) through a small local bridge server.',
    technologies: ['JAVASCRIPT', 'NODE.JS', 'ICUE'],
    metric: 'REAL-TIME PRINTER STATUS',
    repoLabel: 'GITHUB / PRUSA-WIDGET',
    repoUrl: `${GITHUB_URL}/Corsair-Xeneon---Prusa-Widget`,
    tone: 'light',
  },
  {
    id: 'ironbear-plugins',
    index: '03',
    title: 'IRONBEAR PLUGINS',
    description:
      'A Claude Code plugin marketplace of installable skills, agents, hooks, and MCP configs, including AWS SAM and Corsair iCUE widget skills.',
    technologies: ['CLAUDE CODE', 'AWS SAM', 'ICUE'],
    metric: '2 INSTALLABLE PLUGINS',
    repoLabel: 'GITHUB / CLAUDE',
    repoUrl: `${GITHUB_URL}/claude`,
    tone: 'dark',
  },
];
