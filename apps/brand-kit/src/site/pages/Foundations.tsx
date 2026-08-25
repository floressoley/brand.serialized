import './Foundations.css'

const ELEVATION = [
  { level: 'L0', name: 'Canvas', varName: '--color-background', body: 'Page background only. Nothing else uses this value.' },
  { level: 'L1', name: 'Band', varName: '--color-surface-subtle', body: 'Alternating section bands, slightly-raised panels.' },
  { level: 'L2', name: 'Surface', varName: '--color-surface', body: 'Cards, table headers, inputs, chips.' },
  { level: 'L3', name: 'Raised', varName: '--color-surface-strong', body: "Hover, active, popovers — one rung above surface." },
]

const ELEVATION_RULES = [
  'Border always — every raised surface gets a 1px border: Border Default at rest, Border Strong on hover. The border does the work shadow can\'t on a dark background.',
  'Hover = +1 rung — interactive states move up the same ladder rather than adding glow or scale. A card at L2 hovers to L3.',
  'Max 3 rungs deep — nest components no more than three levels before returning to Canvas. Depth signals structure; past three levels it stops reading as anything.',
]

const RHYTHM = [
  { name: 'Canvas', body: 'Default page background between sections.', varName: '--color-background' },
  { name: 'Band', body: 'Alternating section background for rhythm across a long scroll.', varName: '--color-surface-subtle' },
  { name: 'Inverse', body: 'Rare, high-contrast pause — light text-colored field for a single emphatic section.', varName: '--color-text-primary' },
  { name: 'Glow', body: 'A radial accent wash behind a hero or CTA — used once per page at most.', varName: '--color-accent-serialized-bg' },
  { name: 'Panel', body: 'A contained, boxed area within a section — same value as Surface.', varName: '--color-surface' },
]

export function Foundations() {
  return (
    <div>
      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Foundations</p>
        <p className="content__lede">
          The structural rules underneath every page — how depth, rhythm, motion, and texture behave. Dark
          that has depth: grayscale carries the structure, color only carries meaning, and depth comes from a
          fixed surface ladder, never from shadow or guessing.
        </p>

        <div className="section" id="elevation">
          <h2>Elevation</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Four surface values, each one step lighter than the last. Anything raised goes exactly one rung
            up — never two, never a shadow instead.
          </p>
          <div className="elevation-ladder">
            {ELEVATION.map((step) => (
              <div className="elevation-card" key={step.level}>
                <div className="elevation-card__swatch" style={{ background: `var(${step.varName})` }} />
                <div className="elevation-card__body">
                  <span className="elevation-card__level">{step.level}</span>
                  <span className="elevation-card__name">{step.name}</span>
                  <code className="elevation-card__var">{step.varName}</code>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          <ul className="rule-list" style={{ marginTop: 'var(--space-6)' }}>
            {ELEVATION_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="section" id="rhythm">
          <h2>Section rhythm</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Five tones sequence a long page so it doesn't read as one flat scroll. Marketing sections use
            generous 120px vertical padding; denser product UI drops to 32–48px.
          </p>
          <div className="rhythm-grid">
            {RHYTHM.map((tone) => (
              <div className="rhythm-card" key={tone.name}>
                <div
                  className="rhythm-card__swatch"
                  style={
                    tone.name === 'Glow'
                      ? { background: `radial-gradient(circle at 50% 30%, var(${tone.varName}), var(--color-background) 70%)` }
                      : { background: `var(${tone.varName})` }
                  }
                />
                <span className="rhythm-card__name">{tone.name}</span>
                <p>{tone.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section" id="motion">
          <h2>Motion</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Two speeds, nothing else. Quick and linear for direct feedback; slower and eased for content
            entering the viewport.
          </p>
          <div className="motion-grid">
            <div className="motion-card">
              <div className="motion-card__stage">
                <div className="motion-card__demo motion-card__demo--hover" />
              </div>
              <span className="motion-card__label">Hover · hover the swatch</span>
              <code>120ms ease</code>
              <p>Buttons, links, nav items — anything reacting directly to the pointer.</p>
            </div>
            <div className="motion-card">
              <div className="motion-card__stage">
                <div className="motion-card__demo motion-card__demo--reveal" />
              </div>
              <span className="motion-card__label">Scroll reveal · replays on refresh</span>
              <code>400ms cubic-bezier(.2,.7,.2,1), 12px rise</code>
              <p>Sections entering the viewport fade up from 12px below their resting position.</p>
            </div>
          </div>
        </div>

        <div className="section" id="texture">
          <h2>Ambient texture</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Near-invisible, generative background patterns — never photographic, never illustrative without a
            data-native treatment. Structure, not decoration.
          </p>
          <div className="texture-grid">
            <div className="texture-swatch texture-swatch--dots">
              <span className="texture-swatch__label">Dot matrix · 12px grid</span>
            </div>
            <div className="texture-swatch texture-swatch--hatch">
              <span className="texture-swatch__label">Diagonal hatch · 135°, 7px pitch</span>
            </div>
            <div className="texture-swatch texture-swatch--hex">
              <pre className="texture-swatch__hex">
                {'0x3D74FF  0x2C2C2A  0x1A1A19\n0x0F0F0F  '}
                <span>0xF2F2F0</span>
                {'  0x9C9C99\n0x6B6B68  0x2A2A28  0x3A3938'}
              </pre>
              <span className="texture-swatch__label">Hex dump · one token accent-highlighted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
