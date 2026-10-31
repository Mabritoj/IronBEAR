export interface Phase {
  id: string;
  index: string;
  phaseLabel: string;
  title: string;
  description: string;
  stack: string;
}

export const phases: Phase[] = [
  {
    id: 'develop',
    index: '01',
    phaseLabel: 'PHASE ONE',
    title: 'DEVELOP',
    description:
      'Build in small, typed, tested steps. Clear interfaces and fast tests make every change easy to trust.',
    stack: 'React · Node.js · Claude Code · MCP',
  },
  {
    id: 'deploy',
    index: '02',
    phaseLabel: 'PHASE TWO',
    title: 'DEPLOY',
    description:
      'Ship through infrastructure as code. The whole stack lives in a template, so every release is repeatable and easy to review.',
    stack: 'AWS · GitHub · IaC',
  },
  {
    id: 'iterate',
    index: '03',
    phaseLabel: 'PHASE THREE',
    title: 'ITERATE',
    description:
      'Use what the data shows to shape the next round. Short feedback loops, less friction, and changes that stay small.',
    stack: 'Jira · Confluence',
  },
];

export const principle = {
  lead: 'IRONBEAR / OPERATING PRINCIPLE',
  quote:
    '"Every project starts with an idea worth exploring. Some become tools, some stay experiments, all of it stays open"',
};
