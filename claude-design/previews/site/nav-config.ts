export interface NavChild {
  id: string
  label: string
}

export interface NavSection {
  path: string
  label: string
  children?: NavChild[]
}

export const NAV_SECTIONS: NavSection[] = [
  { path: '/', label: 'Introduction' },
  {
    path: '/identity',
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
    children: [
      { id: 'primary-fonts', label: 'Primary fonts' },
      { id: 'secondary-font', label: 'Secondary font' },
      { id: 'type-usage', label: 'Type usage' },
    ],
  },
  {
    path: '/color',
    label: 'Color',
    children: [
      { id: 'base', label: 'Base' },
      { id: 'accent-serialized', label: 'Accent — Serialized' },
      { id: 'accent-audit', label: 'Accent — Audit' },
      { id: 'semantic', label: 'Semantic' },
      { id: 'usage-rules', label: 'Usage rules' },
    ],
  },
  { path: '/sub-brands', label: 'Sub Brands' },
  { path: '/in-use', label: 'In Use' },
]
