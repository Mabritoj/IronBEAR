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
    id: 'orchestrate',
    index: '01',
    phaseLabel: 'PHASE ONE',
    title: 'ORCHESTRATE',
    description:
      'Define how the pieces fit before building: interfaces, integrations, and data flow. Clear structure is the first deliverable.',
    stack: 'AWS · MCP · A.I',
  },
  {
    id: 'observe',
    index: '02',
    phaseLabel: 'PHASE TWO',
    title: 'OBSERVE',
    description:
      'Make system state visible. Status displays, dashboards, and logs turn hidden behavior into something you can act on.',
    stack: 'CloudWatch · Github',
  },
  {
    id: 'adapt',
    index: '03',
    phaseLabel: 'PHASE THREE',
    title: 'ADAPT',
    description:
      'Use what the data shows to shape the next iteration. Short feedback loops, less friction, and changes that stay small.',
    stack: 'Jira · Confluence',
  },
];

export const principle = {
  lead: 'IRONBEAR / OPERATING PRINCIPLE',
  quote:
    '"Every project starts with an idea worth exploring. Some become tools, some stay experiments, all of it stays open"',
};
