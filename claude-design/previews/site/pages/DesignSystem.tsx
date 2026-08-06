import { useState } from 'react'
import type { ReactNode } from 'react'
import auditLogoOnDark from '../../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg'
import { Badge, Button, Card, Nav, Table } from '../../../components'
import { SectionHero } from '../SectionHero'
import './DesignSystem.css'

interface TokenRow {
  name: string
  variable: string
  value: string
}

interface TokenGroup {
  id: string
  title: string
  rows: TokenRow[]
}

const COLOR_GROUPS: TokenGroup[] = [
  {
    id: 'base',
    title: 'Base (grayscale)',
    rows: [
      { name: 'Background', variable: '--color-background', value: '#0F0F0F' },
      { name: 'Surface', variable: '--color-surface', value: '#1F1F1F' },
      { name: 'Surface Subtle', variable: '--color-surface-subtle', value: '#1A1A19' },
      { name: 'Surface Strong', variable: '--color-surface-strong', value: '#2C2C2A' },
      { name: 'Border Default', variable: '--color-border-default', value: '#2A2A28' },
      { name: 'Border Strong', variable: '--color-border-strong', value: '#3A3938' },
      { name: 'Text Primary', variable: '--color-text-primary', value: '#F2F2F0' },
      { name: 'Text Secondary', variable: '--color-text-secondary', value: '#9C9C99' },
      { name: 'Muted', variable: '--color-muted', value: '#6B6B68' },
    ],
  },
  {
    id: 'accent-serialized',
    title: 'Accent — Serialized',
    rows: [
      { name: 'Accent', variable: '--color-accent-serialized', value: '#7EABF5' },
      { name: 'Accent Background', variable: '--color-accent-serialized-bg', value: '#0F1829' },
    ],
  },
  {
    id: 'accent-audit',
    title: 'Accent — Audit',
    rows: [
      { name: 'Accent', variable: '--color-accent-audit', value: '#51DA4C' },
      { name: 'Accent 16%', variable: '--color-accent-audit-16', value: 'rgba(81,218,76,0.16)' },
      { name: 'Accent Background', variable: '--color-accent-audit-bg', value: '#1D282C' },
    ],
  },
  {
    id: 'semantic',
    title: 'Semantic',
    rows: [
      { name: 'Warning', variable: '--color-warning', value: '#FB923C' },
      { name: 'Warning Background', variable: '--color-warning-bg', value: '#2E2010' },
      { name: 'Error', variable: '--color-error', value: '#F87171' },
      { name: 'Error Background', variable: '--color-error-bg', value: '#2E1010' },
      { name: 'Info', variable: '--color-info', value: '#60A5FA' },
      { name: 'Info Background', variable: '--color-info-bg', value: '#101828' },
    ],
  },
]

const TYPE_FAMILY_ROWS: TokenRow[] = [
  { name: 'Display', variable: '--font-display', value: "'Fraunces', serif" },
  { name: 'Body', variable: '--font-body', value: "'Satoshi', sans-serif" },
  { name: 'Mono', variable: '--font-mono', value: "'Roboto Mono', monospace" },
]

const TYPE_DETAIL_ROWS: TokenRow[] = [
  { name: 'Display variation axes', variable: '--font-display-settings', value: "'opsz' 38, 'wght' 360, 'SOFT' 17, 'WONK' 0.36" },
  { name: 'Display axes (large sizes)', variable: '--font-display-large-settings', value: "'opsz' 38, 'wght' 320, 'SOFT' 47, 'WONK' 0.36" },
  { name: 'Display letter-spacing', variable: '--font-display-letter-spacing', value: '-1px' },
  { name: 'Body weight', variable: '--font-body-weight', value: '400' },
  { name: 'Body letter-spacing', variable: '--font-body-letter-spacing', value: '0.2px' },
  { name: 'Mono letter-spacing (13px+)', variable: '--font-mono-letter-spacing', value: '0.02em' },
  { name: 'Mono label tracking (10–12px caps)', variable: '--font-mono-label-tracking', value: '0.08em' },
]

const TYPE_SCALE = [
  { name: 'Display Large', size: '--text-display-large-size (96px)', line: '0.95', tracking: '-0.02em', family: 'Fraunces' },
  { name: 'Headline Large', size: '--text-headline-large-size (56px)', line: '0.95', tracking: '-0.02em', family: 'Fraunces' },
  { name: 'Headline', size: '--text-headline-size (32px)', line: '1.05', tracking: '-0.01em', family: 'Satoshi 500' },
  { name: 'Subheadline', size: '--text-subheadline-size (22px)', line: '1.1', tracking: '-0.01em', family: 'Satoshi 500' },
  { name: 'Body', size: '--font-body-size (16px)', line: '1.1', tracking: '0.2px', family: 'Satoshi 400' },
  { name: 'Tertiary', size: '--text-tertiary-size (12px)', line: '1.2', tracking: '0.02em', family: 'Roboto Mono' },
]

const SPACING_ROWS: TokenRow[] = [
  { name: 'space-1', variable: '--space-1', value: '4px' },
  { name: 'space-2', variable: '--space-2', value: '8px' },
  { name: 'space-3', variable: '--space-3', value: '12px' },
  { name: 'space-4', variable: '--space-4', value: '16px' },
  { name: 'space-6', variable: '--space-6', value: '24px' },
  { name: 'space-8', variable: '--space-8', value: '32px' },
  { name: 'space-12', variable: '--space-12', value: '48px' },
  { name: 'space-16', variable: '--space-16', value: '64px' },
]

const RADIUS_ROWS: TokenRow[] = [
  { name: 'Small', variable: '--radius-sm', value: '4px' },
  { name: 'Medium', variable: '--radius-md', value: '8px' },
  { name: 'Large', variable: '--radius-lg', value: '4px' },
  { name: 'Full (pill)', variable: '--radius-full', value: '999px' },
]

const MOTION_ROWS: TokenRow[] = [
  { name: 'Hover duration', variable: '--duration-hover', value: '120ms' },
  { name: 'Standard easing', variable: '--easing-standard', value: 'ease' },
  { name: 'Reveal duration', variable: '--duration-reveal', value: '400ms' },
  { name: 'Reveal easing', variable: '--easing-reveal', value: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
  { name: 'Reveal rise distance', variable: '--reveal-distance', value: '12px' },
]

const SHADOW_ROWS: TokenRow[] = [
  { name: 'Shadow — small', variable: '--shadow-sm', value: '0 1px 2px rgba(0,0,0,0.24)' },
  { name: 'Shadow — medium', variable: '--shadow-md', value: '0 4px 12px rgba(0,0,0,0.32)' },
  { name: 'Focus ring width', variable: '--focus-ring-width', value: '2px' },
  { name: 'Focus ring offset', variable: '--focus-ring-offset', value: '2px' },
]

const ELEVATION_ROWS: TokenRow[] = [
  { name: 'L0 Canvas', variable: '--color-background', value: 'Page background only' },
  { name: 'L1 Band', variable: '--color-surface-subtle', value: 'Alternating section bands' },
  { name: 'L2 Surface', variable: '--color-surface', value: 'Cards, table headers, inputs' },
  { name: 'L3 Raised', variable: '--color-surface-strong', value: 'Hover / active — one rung above Surface' },
]

interface ComponentSpec {
  name: string
  path: string
  preview: ReactNode
  props: { prop: string; type: string; default: string; notes?: string }[]
}

const auditRows = [
  { token: 'USDC', address: '0xA0b8...eB48', risk: 'pass' as const, riskLabel: 'Low risk', score: '92' },
  { token: 'RUGX', address: '0x1123...9f0d', risk: 'error' as const, riskLabel: 'High risk', score: '11' },
]

const COMPONENT_SPECS: ComponentSpec[] = [
  {
    name: 'Button',
    path: 'claude-design/components/Button',
    preview: (
      <div className="component-preview__row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button tone="audit">Audit tone</Button>
        <Button disabled>Disabled</Button>
      </div>
    ),
    props: [
      { prop: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: 'primary' },
      { prop: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
      { prop: 'tone', type: "'brand' | 'audit'", default: 'brand', notes: 'brand = Serialized blue lane, audit = green lane' },
      { prop: 'disabled', type: 'boolean', default: 'false' },
    ],
  },
  {
    name: 'Badge',
    path: 'claude-design/components/Badge',
    preview: (
      <div className="component-preview__row">
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="pass" dot>
          Pass
        </Badge>
        <Badge tone="warning" dot>
          Medium risk
        </Badge>
        <Badge tone="error" dot>
          High risk
        </Badge>
        <Badge tone="info" dot>
          Info
        </Badge>
      </div>
    ),
    props: [
      { prop: 'tone', type: "'neutral' | 'pass' | 'warning' | 'error' | 'info'", default: 'neutral' },
      { prop: 'dot', type: 'boolean', default: 'false', notes: 'Shows a small status dot before the label' },
    ],
  },
  {
    name: 'Card',
    path: 'claude-design/components/Card',
    preview: (
      <div className="component-preview__grid">
        <Card title="Audit summary" description="Contract 0xA0b8...eB48">
          <Badge tone="pass" dot>
            92 / 100 · Low risk
          </Badge>
        </Card>
        <Card title="Liquidity" description="Locked for 180 days" action={<Badge tone="info">Verified</Badge>}>
          No unlock events found in the last 30 days.
        </Card>
      </div>
    ),
    props: [
      { prop: 'title', type: 'ReactNode', default: '—', notes: 'Optional' },
      { prop: 'description', type: 'ReactNode', default: '—', notes: 'Optional' },
      { prop: 'action', type: 'ReactNode', default: '—', notes: 'Rendered top-right of the header' },
      { prop: 'children', type: 'ReactNode', default: '—', notes: 'Card body' },
    ],
  },
  {
    name: 'Table',
    path: 'claude-design/components/Table',
    preview: (
      <Table>
        <Table.Head>
          <Table.Row>
            <th>Token</th>
            <th>Address</th>
            <th>Risk</th>
            <th>Score</th>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {auditRows.map((row) => (
            <Table.Row key={row.address}>
              <Table.Cell>{row.token}</Table.Cell>
              <Table.Cell mono>{row.address}</Table.Cell>
              <Table.Cell>
                <Badge tone={row.risk} dot>
                  {row.riskLabel}
                </Badge>
              </Table.Cell>
              <Table.Cell mono>{row.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    ),
    props: [
      { prop: 'children', type: 'ReactNode', default: '—', notes: 'Table.Head / Table.Body / Table.Row / Table.Cell' },
      { prop: 'Table.Cell mono', type: 'boolean', default: 'false', notes: 'Roboto Mono — use for hashes, addresses, numeric values' },
    ],
  },
  {
    name: 'Nav',
    path: 'claude-design/components/Nav',
    preview: (
      <div className="component-preview__frame">
        <Nav
          brand={<img src={auditLogoOnDark} alt="Serialized Audit" style={{ height: 22 }} />}
          links={[
            { label: 'Scan', href: '#scan', active: true },
            { label: 'Reports', href: '#reports' },
            { label: 'Docs', href: '#docs' },
          ]}
          actions={
            <Button tone="audit" size="sm">
              Connect wallet
            </Button>
          }
        />
      </div>
    ),
    props: [
      { prop: 'brand', type: 'ReactNode', default: '— (required)', notes: 'Logo lockup — see brand-kit/logo for on-dark/on-light variants' },
      { prop: 'links', type: '{ label, href, active? }[]', default: '[]' },
      { prop: 'actions', type: 'ReactNode', default: '—', notes: 'Right-aligned slot, typically a Button' },
    ],
  },
]

function CopyCell({ variable }: { variable: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(`var(${variable})`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button type="button" className="token-var" onClick={handleCopy}>
      {copied ? 'Copied' : variable}
    </button>
  )
}

function TokenTable({ rows }: { rows: TokenRow[] }) {
  return (
    <table className="spec-table token-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Variable</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.variable}>
            <td>{row.name}</td>
            <td>
              <CopyCell variable={row.variable} />
            </td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function DesignSystem() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Design System</p>
        <p className="content__lede">
          The full token and component reference — hand off directly from here. Every value below is the
          live source of truth (<code>claude-design/tokens/</code>), not a copy that can drift.
        </p>

        <div className="section" id="colors">
          <h2>Color</h2>
          {COLOR_GROUPS.map((group) => (
            <div key={group.id} style={{ marginBottom: 'var(--space-8)' }}>
              <h3 className="design-system__subhead">{group.title}</h3>
              <TokenTable rows={group.rows} />
            </div>
          ))}
        </div>

        <div className="section" id="typography-tokens">
          <h2>Typography</h2>
          <h3 className="design-system__subhead">Families</h3>
          <TokenTable rows={TYPE_FAMILY_ROWS} />
          <h3 className="design-system__subhead">Weights &amp; tracking</h3>
          <TokenTable rows={TYPE_DETAIL_ROWS} />
          <h3 className="design-system__subhead">Type scale</h3>
          <table className="spec-table token-table">
            <thead>
              <tr>
                <th>Style</th>
                <th>Size</th>
                <th>Line height</th>
                <th>Tracking</th>
                <th>Family</th>
              </tr>
            </thead>
            <tbody>
              {TYPE_SCALE.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>
                    <code>{row.size}</code>
                  </td>
                  <td>{row.line}</td>
                  <td>{row.tracking}</td>
                  <td>{row.family}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section" id="spacing-radius">
          <h2>Spacing &amp; radius</h2>
          <h3 className="design-system__subhead">Spacing (4px base scale)</h3>
          <TokenTable rows={SPACING_ROWS} />
          <h3 className="design-system__subhead">Radius</h3>
          <TokenTable rows={RADIUS_ROWS} />
        </div>

        <div className="section" id="motion-tokens">
          <h2>Motion</h2>
          <TokenTable rows={MOTION_ROWS} />
        </div>

        <div className="section" id="shadow-focus">
          <h2>Shadow &amp; focus</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Elevation is carried mostly by border and surface contrast, not shadow — kept subtle on purpose
            for a flat, precise feel.
          </p>
          <TokenTable rows={SHADOW_ROWS} />
        </div>

        <div className="section" id="elevation-ref">
          <h2>Elevation</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Four surface values, one rung apart. Full rules and a visual ladder live on{' '}
            <a href="/foundations#elevation" style={{ color: 'var(--color-accent-serialized)' }}>
              Foundations
            </a>
            .
          </p>
          <TokenTable rows={ELEVATION_ROWS} />
        </div>

        <div className="section" id="components">
          <h2>Components</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Live previews plus prop-level specs for hand-off. More states and a composed example page live on{' '}
            <a href="/in-use" style={{ color: 'var(--color-accent-serialized)' }}>
              In Use
            </a>
            .
          </p>
          {COMPONENT_SPECS.map((spec) => (
            <div key={spec.name} style={{ marginBottom: 'var(--space-8)' }}>
              <div className="design-system__component-head">
                <h3 className="design-system__subhead">{spec.name}</h3>
                <code>{spec.path}</code>
              </div>
              <div className="component-preview">{spec.preview}</div>
              <table className="spec-table token-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {spec.props.map((p) => (
                    <tr key={p.prop}>
                      <td>
                        <code>{p.prop}</code>
                      </td>
                      <td>{p.type}</td>
                      <td>{p.default}</td>
                      <td>{p.notes ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
