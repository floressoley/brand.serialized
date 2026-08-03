import hatchTexture from '../../../../brand-kit/guidelines/imagery-inspo/hatch-texture.png'
import hexDump from '../../../../brand-kit/guidelines/imagery-inspo/hex-dump-highlight.png'
import { SectionHero } from '../SectionHero'
import './Voice.css'

const PILLARS = [
  {
    name: 'Intelligence',
    body: "Every response should read as interpreted signal, not a data dump. Decompiled contracts, structured onchain events, routed transactions — the product's job is to turn the firehose into something a builder can act on immediately.",
  },
  {
    name: 'Excellence',
    body: 'Editorial polish in the few places warmth is allowed (Fraunces headlines), engineering rigor everywhere else (Roboto Mono, systemized color/type tokens). The contrast between the two is the brand: premium and technical, not one at the expense of the other.',
  },
  {
    name: 'Accuracy',
    body: "No hedging language, no soft claims. State what's verified as verified, and don't dress up a probability as a certainty. When something can't be confirmed, say so plainly instead of rounding up.",
  },
  {
    name: 'Premium',
    body: 'Confident restraint, not luxury signaling. Premium here means the bar for correctness and clarity is high — not velvet-rope exclusivity or ornamental design.',
  },
]

const AUDIENCE = [
  { title: 'Dev teams', body: 'Building DeFi products, integrating onchain data and routing into their own stack.' },
  { title: 'Security researchers & auditors', body: 'Reading closed-source contracts, verifying behavior before it ships or gets exploited.' },
  { title: 'Crypto funds & protocols', body: 'Moving real capital, needing signal they can act on without re-verifying it themselves.' },
]

const DIFFERENTIATION = [
  { others: 'Raw onchain data', serialized: 'Interpreted, structured intelligence' },
  { others: "Can't read closed-source contracts", serialized: 'Proprietary decompilation' },
  { others: 'Generic endpoints', serialized: 'Audit · Data · Routing — purpose-built APIs' },
  { others: 'Firehose', serialized: 'Signal' },
]

const IMAGERY = [
  { src: hexDump, caption: 'Hex/data dumps — tokens syntax-highlighted against muted mono text' },
  { src: hatchTexture, caption: 'Diagonal line-hatch — near-invisible directional background texture' },
]

export function Voice() {
  return (
    <div>
      <SectionHero eyebrow="Brand Kit · Voice & Messaging" />

      <div className="page-body">
        <p className="content__lede">
          Direct, technical, unhyped. Serialized states findings and facts plainly — credibility depends on not
          sounding like marketing copy, especially on SerializedAudit.io, where the product's entire value is
          trustworthy data.
        </p>

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
          <h2>Who it's for</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Dev teams, security researchers, funds and protocols — what they share is that they're moving fast,
            handling real money, and need to be right.
          </p>
          <div className="audience-grid">
            {AUDIENCE.map((item) => (
              <div className="audience-card" key={item.title}>
                <p className="audience-card__title">{item.title}</p>
                <p className="audience-card__body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>How we make them feel</h2>
          <p>
            <strong style={{ color: 'var(--color-text-primary)' }}>Smart.</strong> Like they have an edge others
            don't — not because we make things simpler, but because we make things clearer. Our customers don't
            just get data, they get signal.
          </p>
        </div>

        <div className="section">
          <h2>What makes us different</h2>
          <table className="spec-table">
            <thead>
              <tr>
                <th>Others</th>
                <th>Serialized</th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENTIATION.map((row) => (
                <tr key={row.others}>
                  <td>{row.others}</td>
                  <td>{row.serialized}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  )
}
