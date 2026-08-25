import { useState } from 'react'
import './Color.css'

const GROUPS = [
  {
    id: 'base',
    title: 'Base (grayscale)',
    body: 'Default to grayscale for structure — backgrounds, borders, text hierarchy. Color is never used decoratively.',
    swatches: [
      ['Background', '#0F0F0F'],
      ['Surface', '#1F1F1F'],
      ['Surface Subtle', '#1A1A19'],
      ['Surface Strong', '#2C2C2A'],
      ['Border Default', '#2A2A28'],
      ['Border Strong', '#3A3938'],
      ['Text Primary', '#F2F2F0'],
      ['Text Secondary', '#9C9C99'],
      ['Muted', '#6B6B68'],
    ],
  },
  {
    id: 'accent-serialized',
    title: 'Accent — Serialized (brand)',
    body: 'Brand-level surfaces — marketing site, Serialized product family. Links, highlights, primary CTA on dark.',
    swatches: [
      ['Accent Serialized', '#3D74FF'],
      ['Accent Background', '#0F1829'],
    ],
  },
  {
    id: 'accent-audit',
    title: 'Accent — Audit (product)',
    body: 'SerializedAudit.io surfaces only — pass states, primary actions. Do not mix with Serialized blue as competing primaries on the same screen.',
    swatches: [
      ['Accent Audit', '#3DCF8E'],
      ['Accent Audit 16%', 'rgba(61,207,142,0.16)'],
      ['Audit Background', '#1D282C'],
    ],
  },
  {
    id: 'semantic',
    title: 'Semantic',
    body: 'Reserved for audit result severity and system states — never for branding or emphasis.',
    swatches: [
      ['Warning', '#FB923C'],
      ['Warning Background', '#2E2010'],
      ['Error', '#F87171'],
      ['Error Background', '#2E1010'],
      ['Info', '#60A5FA'],
      ['Info Background', '#101828'],
    ],
  },
]

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.match(/^#([0-9a-f]{6})$/i)
  if (!match) return null
  const int = parseInt(match[1], 16)
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 }
}

function readableTextColor(hex: string): string {
  const rgb = parseHex(hex)
  if (!rgb) return '#F2F2F0'
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance > 0.6 ? '#0F0F0F' : '#F2F2F0'
}

function toCmyk({ r, g, b }: { r: number; g: number; b: number }): string {
  const rf = r / 255
  const gf = g / 255
  const bf = b / 255
  const k = 1 - Math.max(rf, gf, bf)
  if (k === 1) return '0 0 0 100'
  const c = Math.round(((1 - rf - k) / (1 - k)) * 100)
  const m = Math.round(((1 - gf - k) / (1 - k)) * 100)
  const y = Math.round(((1 - bf - k) / (1 - k)) * 100)
  return `${c} ${m} ${y} ${Math.round(k * 100)}`
}

function SwatchCard({ name, hex }: { name: string; hex: string }) {
  const [copied, setCopied] = useState(false)
  const textColor = readableTextColor(hex)
  const rgb = parseHex(hex)

  async function handleCopy() {
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <button type="button" className="swatch-card" style={{ background: hex, color: textColor }} onClick={handleCopy}>
      <span className="swatch-card__name">{name}</span>
      {rgb ? (
        <dl className="swatch-card__specs">
          <dt>CMYK</dt>
          <dd>{toCmyk(rgb)}</dd>
          <dt>RGB</dt>
          <dd>
            {rgb.r} {rgb.g} {rgb.b}
          </dd>
          <dt>HEX</dt>
          <dd>{copied ? 'Copied' : hex.replace('#', '')}</dd>
        </dl>
      ) : (
        <dl className="swatch-card__specs">
          <dt>RGBA</dt>
          <dd>{copied ? 'Copied' : hex}</dd>
        </dl>
      )}
    </button>
  )
}

export function Color() {
  return (
    <div>
      <div className="page-body">
      <p className="content__eyebrow">Brand Kit · Color</p>
      <p className="content__lede">
        Dark-mode-first, monochromatic base with two accent lanes and a semantic set. Color is reserved for
        meaning: brand identity, product identity, and state — never decoration.
      </p>

      {GROUPS.map((group) => (
        <div className="section" id={group.id} key={group.title}>
          <h2>{group.title}</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>{group.body}</p>
          <div className="swatch-grid">
            {group.swatches.map(([name, hex]) => (
              <SwatchCard name={name} hex={hex} key={name} />
            ))}
          </div>
        </div>
      ))}

      <div className="section" id="usage-rules">
        <h2>Usage rules</h2>
        <p>
          Every accent/semantic color ships with a paired low-contrast "Background" tone for tinted
          containers (badges, banners, chart fills) — pair them together rather than using the
          full-saturation color as a fill. No light-mode palette exists yet; this system is dark-first.
        </p>
      </div>
      </div>
    </div>
  )
}
