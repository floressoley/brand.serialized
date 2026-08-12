export interface NavChild {
  id: string
  label: string
}

export interface NavSection {
  path: string
  label: string
  group?: string
  children?: NavChild[]
}

export const NAV_SECTIONS: NavSection[] = [
  { path: '/', label: 'Introduction' },
  {
    path: '/identity',
    group: 'Brand Book',
    label: 'Identity',
    children: [
      { id: 'purpose', label: 'Purpose' },
      { id: 'audience', label: 'Audience' },
      { id: 'feeling', label: 'Feeling' },
      { id: 'beliefs', label: 'Beliefs' },
      { id: 'vision', label: 'Vision' },
      { id: 'values', label: 'Values' },
      { id: 'difference', label: 'Difference' },
      { id: 'vibes', label: 'Vibes' },
      { id: 'promises', label: 'Promises' },
      { id: 'voice', label: 'Voice' },
    ],
  },
  {
    path: '/logos',
    label: 'Logos',
    group: 'Brand Book',
    children: [
      { id: 'full-logo', label: 'Full Logo' },
      { id: 'wordmark', label: 'Wordmark' },
      { id: 'logomark', label: 'Logomark' },
      { id: 'clearspace', label: 'Clearspace' },
      { id: 'minimum-size', label: 'Minimum size' },
      { id: 'misuse', label: 'Misuse' },
      { id: 'in-use', label: 'In Use' },
    ],
  },
  {
    path: '/typography',
    label: 'Typography',
    group: 'Brand Book',
    children: [
      { id: 'primary-fonts', label: 'Primary fonts' },
      { id: 'secondary-font', label: 'Secondary font' },
      { id: 'type-usage', label: 'Type usage' },
    ],
  },
  {
    path: '/color',
    label: 'Color',
    group: 'Brand Book',
    children: [
      { id: 'base', label: 'Base' },
      { id: 'accent-serialized', label: 'Accent — Serialized' },
      { id: 'accent-audit', label: 'Accent — Audit' },
      { id: 'semantic', label: 'Semantic' },
      { id: 'usage-rules', label: 'Usage rules' },
    ],
  },
  {
    path: '/foundations',
    label: 'Foundations',
    group: 'Brand Book',
    children: [
      { id: 'elevation', label: 'Elevation' },
      { id: 'rhythm', label: 'Rhythm' },
      { id: 'motion', label: 'Motion' },
      { id: 'texture', label: 'Texture' },
    ],
  },
  {
    path: '/icons',
    label: 'Icons',
    group: 'Brand Book',
    children: [
      { id: 'weights', label: 'Weights' },
      { id: 'set', label: 'Set' },
    ],
  },
  { path: '/sub-brands', label: 'Sub Brands', group: 'Brand Book' },
  {
    path: '/in-use',
    label: 'In Use',
    group: 'Brand Book',
    children: [
      { id: 'scan-page', label: 'Scan page' },
      { id: 'button', label: 'Button' },
      { id: 'badge', label: 'Badge' },
      { id: 'cards', label: 'Cards' },
      { id: 'table', label: 'Table' },
      { id: 'navigation', label: 'Navigation' },
    ],
  },
  {
    path: '/design-system',
    label: 'Design System',
    group: 'Design System',
    children: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography-tokens', label: 'Typography' },
      { id: 'spacing-radius', label: 'Spacing & radius' },
      { id: 'motion-tokens', label: 'Motion' },
      { id: 'shadow-focus', label: 'Shadow & focus' },
      { id: 'elevation-ref', label: 'Elevation' },
      { id: 'components', label: 'Components' },
    ],
  },
  { path: '/media-kit', label: 'Media Kit', group: 'Media Kit' },
  { path: '/field-generator', label: 'Field Generator', group: 'Media Kit' },
]
