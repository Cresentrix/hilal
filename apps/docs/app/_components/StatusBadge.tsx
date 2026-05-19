import { Badge } from '@hilal-ds/react';

export type Status = 'stable' | 'beta' | 'experimental' | 'deprecated';

const TONE: Record<Status, 'success' | 'info' | 'warning' | 'danger'> = {
  stable: 'success',
  beta: 'info',
  experimental: 'warning',
  deprecated: 'danger',
};

const LABEL: Record<Status, string> = {
  stable: 'Stable',
  beta: 'Beta',
  experimental: 'Experimental',
  deprecated: 'Deprecated',
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge tone={TONE[status]} size="sm">{LABEL[status]}</Badge>;
}

// Source of truth for component / pattern stability. Everything ships as
// Stable for the 0.1.x line — when we cut something new behind a flag or
// in a non-final API, mark it Beta / Experimental here.
export const COMPONENT_STATUS: Record<string, Status> = {
  // primitives
  accordion:  'stable',
  alert:      'stable',
  avatar:     'stable',
  badge:      'stable',
  bottomnav:  'stable',
  button:     'stable',
  calendar:   'stable',
  card:       'stable',
  checkbox:   'stable',
  combobox:   'stable',
  datepicker: 'stable',
  drawer:     'stable',
  empty:      'stable',
  input:      'stable',
  modal:      'stable',
  pagination: 'stable',
  select:     'stable',
  sidebar:    'stable',
  skeleton:   'stable',
  stepper:    'stable',
  tabs:       'stable',
  toast:      'stable',
  toggle:     'stable',
  tooltip:    'stable',
};

export const PATTERN_STATUS: Record<string, Status> = {
  'auth-form':           'stable',
  'command-palette':     'stable',
  'confirm-dialog':      'stable',
  'dashboard-shell':     'stable',
  'data-list':           'stable',
  'filter-bar':          'stable',
  'form-section':        'stable',
  'multi-step-form':     'beta',
  'notification-center': 'beta',
  'page-header':         'stable',
  'search-header':       'stable',
  'stats-grid':          'stable',
};
