import { SectionHero } from '../SectionHero'
import './Color.css'

const GROUPS = [
  {
    title: 'Base (grayscale)',
    body: 'Default to grayscale for structure — backgrounds, borders, text hierarchy. Color is never used decoratively.',
    swatches: [
      ['Background', '#0F0F0F'],
      ['Surface', '#1F1F1F'],
      ['Surface Subtle', '#1A1A19'],
      ['Surface Strong', '#2C2C2A'],
      ['Border Default', '#3F3E3C'],
      ['Border Strong', '#4F4F4F'],
      ['Text Primary', '#F2F2F0'],
      ['Text Secondary', '#9C9C99'],
      ['Muted', '#6B6B68'],
    ],
  },
  {
    title: 'Accent — Serialized (brand)',
    body: 'Brand-level surfaces — marketing site, Serialized product family. Links, highlights, primary CTA on dark.',
    swatches: [
      ['Accent Serialized', '#7EABF5'],
      ['Accent Background', '#0F1829'],
    ],
  },
  {
    title: 'Accent — Audit (product)',
    body: 'SerializedAudit.io surfaces only — pass states, primary actions. Do not mix with Serialized blue as competing primaries on the same screen.',
    swatches: [
      ['Accent Audit', '#51DA4C'],
      ['Accent Audit 16%', 'rgba(81,218,76,0.16)'],
      ['Audit Background', '#1D282C'],
    ],
  },
  {
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

export function Color() {
  return (
    <div>
      <SectionHero eyebrow="Brand Kit · Color" />

      <div className="page-body">
      <p className="content__lede">
        Dark-mode-first, monochromatic base with two accent lanes and a semantic set. Color is reserved for
        meaning: brand identity, product identity, and state — never decoration.
      </p>

      {GROUPS.map((group) => (
        <div className="section" key={group.title}>
          <h2>{group.title}</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>{group.body}</p>
          <div className="swatch-grid">
            {group.swatches.map(([name, hex]) => (
              <div className="swatch-card" key={name}>
                <div className="swatch-card__fill" style={{ background: hex }} />
                <div className="swatch-card__meta">
                  <p className="swatch-card__name">{name}</p>
                  <p className="swatch-card__hex">{hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="section">
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
