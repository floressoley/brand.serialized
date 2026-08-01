export interface NavSection {
  path: string
  label: string
}

export const NAV_SECTIONS: NavSection[] = [
  { path: '/', label: 'Introduction' },
  { path: '/voice', label: 'Voice & Messaging' },
  { path: '/identity', label: 'Marks & Lockups' },
  { path: '/color', label: 'Color' },
  { path: '/typography', label: 'Typography' },
  { path: '/sub-brands', label: 'Sub Brands' },
  { path: '/in-use', label: 'In Use' },
]
