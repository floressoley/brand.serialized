import hatchTexture from '../../../../brand-kit/guidelines/imagery-inspo/hatch-texture.png'
import hexDump from '../../../../brand-kit/guidelines/imagery-inspo/hex-dump-highlight.png'
import dotMatrix from '../../../../brand-kit/guidelines/imagery-inspo/dot-matrix-grid.png'
import asciiMountain from '../../../../brand-kit/guidelines/imagery-inspo/ascii-mountain.png'
import asciiFrost from '../../../../brand-kit/guidelines/imagery-inspo/ascii-frost.png'
import { PageHeader } from '../PageHeader'
import './Voice.css'

const PILLARS = [
  {
    name: 'Trust',
    body: 'Consistency and restraint over decoration. Grayscale-first UI, color only where it carries meaning (state, brand vs. product identity). No visual noise competing with the data being presented.',
  },
  {
    name: 'Precision',
    body: 'Monospace for anything literal (data, code, addresses, hashes). Tight, deliberate grid and spacing. Numbers and technical values are never styled as decoration — they’re presented as-is, legibly.',
  },
  {
    name: 'Excellence',
    body: 'Editorial polish in the few places warmth is allowed (Fraunces headlines), engineering rigor everywhere else (Roboto Mono, systemized color/type tokens). The contrast between the two is the brand: premium and technical, not one at the expense of the other.',
  },
]

const IMAGERY = [
  { src: hexDump, caption: 'Hex/data dumps — tokens syntax-highlighted against muted mono text' },
  { src: asciiMountain, caption: 'ASCII-rendered landscapes — real imagery re-rendered as character art' },
  { src: asciiFrost, caption: 'ASCII-rendered texture — cool accent tint over grayscale character art' },
  { src: dotMatrix, caption: 'Dot-matrix / hash grids — sparse character fields as ambient texture' },
  { src: hatchTexture, caption: 'Diagonal line-hatch — near-invisible directional background texture' },
]

export function Voice() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand Kit · Voice & Messaging"
        title="Voice & Messaging"
        lede="Direct, technical, unhyped. Serialized states findings and facts plainly — credibility depends on not sounding like marketing copy, especially on SerializedAudit.io, where the product's entire value is trustworthy data."
      />

      <div className="section">
        <h2>Pillars</h2>
        <div className="pillar-list">
          {PILLARS.map((p) => (
            <div className="pillar-row" key={p.name}>
              <div className="pillar-row__name">{p.name}</div>
              <div className="pillar-row__body">
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Voice rules</h2>
        <ul className="voice-rules">
          <li>State findings and facts plainly — this is an audit tool, not a pitch.</li>
          <li>Short Fraunces statements for emphasis; everything else in Satoshi, plain and clear.</li>
          <li>Never editorialize a risk score. Report the number and the reasoning, not a verdict dressed as opinion.</li>
        </ul>
      </div>

      <div className="section">
        <h2>Imagery direction</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          ASCII-art and terminal-native texture, always monochrome-with-accent. Imagery is generated{' '}
          <em>from</em> structure — characters, hex, grids — never photographic or illustrative without that
          data-native treatment. This is what ties visuals back to Precision.
        </p>
        <div className="imagery-grid">
          {IMAGERY.map((item) => (
            <div className="imagery-card" key={item.caption}>
              <img src={item.src} alt={item.caption} />
              <div className="imagery-card__caption">{item.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
