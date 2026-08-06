import type { ReactNode } from 'react'
import hatchTexture from '../../../../brand-kit/guidelines/imagery-inspo/hatch-texture.png'
import hexDump from '../../../../brand-kit/guidelines/imagery-inspo/hex-dump-highlight.png'
import { SectionHero } from '../SectionHero'
import './Identity.css'

const AUDIENCE = [
  { title: 'Dev teams', body: 'Building DeFi products, integrating onchain data and routing into their own stack.' },
  { title: 'Security researchers & auditors', body: 'Reading closed-source contracts, verifying behavior before it ships or gets exploited.' },
  { title: 'Crypto funds & protocols', body: 'Moving real capital, needing signal they can act on without re-verifying it themselves.' },
]

const BELIEFS = [
  {
    name: 'Trust',
    body: 'Restraint over decoration. Grayscale carries the structure; color only where it means something.',
  },
  {
    name: 'Speed',
    body: "Answers at the pace decisions get made. Signal that's late is just history.",
  },
  {
    name: 'Precision',
    body: 'Monospace for anything literal. Data and technical values, presented exactly as they are.',
  },
  {
    name: 'Accuracy',
    body: "No hedging, no soft claims. What's verified is stated as verified — nothing rounded up.",
  },
  {
    name: 'Premium',
    body: 'Confident restraint, not luxury signaling. High bar, not a velvet rope.',
  },
]

const VALUES = [
  { title: 'Clarity over cleverness', body: 'Say the true thing plainly. If a sentence needs unpacking, it needed rewriting.' },
  { title: 'Evidence over opinion', body: "Show the reasoning, not just the verdict. A risk score without a 'why' is just a number." },
  { title: 'Systems over one-offs', body: 'Build the standard once, apply it everywhere — a rule that only holds sometimes is not a rule.' },
  { title: 'Builders over gatekeepers', body: 'Premium is a bar, not a velvet rope. The standard stays high; who gets to meet it stays open.' },
]

const DIFFERENTIATION = [
  { others: 'Raw onchain data', serialized: 'Interpreted, structured intelligence' },
  { others: "Can't read closed-source contracts", serialized: 'Proprietary decompilation' },
  { others: 'Generic endpoints', serialized: 'Audit · Data · Routing — purpose-built APIs' },
  { others: 'Firehose', serialized: 'Signal' },
]

const VIBES = ['Austere', 'Engineered', 'Unhyped', 'Legible', 'Composed']

const IMAGERY = [
  { src: hexDump, caption: 'Hex/data dumps — tokens syntax-highlighted against muted mono text' },
  { src: hatchTexture, caption: 'Diagonal line-hatch — near-invisible directional background texture' },
]

const PROMISES = [
  "We'll never dress up a probability as a certainty.",
  "We'll always show the reasoning, not just the number.",
  'We read closed-source contracts other tools can\'t.',
  'We ship purpose-built APIs — Audit, Data, Routing — not generic endpoints.',
]

const VOICE_RULES = [
  'State findings and facts plainly — this is an audit tool, not a pitch.',
  'Short Fraunces statements for emphasis; everything else in Satoshi, plain and clear.',
  'Never editorialize a risk score. Report the number and the reasoning, not a verdict dressed as opinion.',
]

const VOICE_EXAMPLES = [
  { dont: 'Revolutionary AI-powered contract analysis!', do: 'Decompiles unverified bytecode into readable, auditable source.' },
  { dont: 'Blazing-fast results, every time.', do: 'Median decompile: 1.8s.' },
]

interface RowProps {
  index: string
  label: string
  children: ReactNode
}

function Row({ index, label, children }: RowProps) {
  return (
    <div className="identity-row" id={label.toLowerCase()}>
      <div className="identity-row__label">
        <span className="identity-row__index">{index}</span>
        <span>{label}</span>
      </div>
      <div className="identity-row__content">{children}</div>
    </div>
  )
}

export function Identity() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Identity</p>
        <p className="content__lede">
          What Serialized is, why it exists, and what it won't compromise on — the source of truth for
          everything else in this kit.
        </p>

        <div className="identity-rows">
          <Row index="01" label="Purpose">
            <h2>Why we exist</h2>
            <p className="identity-statement">
              Onchain data is abundant; understanding it isn't. Serialized turns opaque, high-stakes systems —
              closed-source contracts, raw onchain events — into something a builder can read, trust, and act
              on immediately.
            </p>
          </Row>

          <Row index="02" label="Audience">
            <h2>Who it's for</h2>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Dev teams, security researchers, funds and protocols — what they share is that they're moving
              fast, handling real money, and need to be right.
            </p>
            <div className="identity-audience">
              {AUDIENCE.map((item) => (
                <div className="identity-audience__card" key={item.title}>
                  <p className="identity-audience__title">{item.title}</p>
                  <p className="identity-audience__body">{item.body}</p>
                </div>
              ))}
            </div>
          </Row>

          <Row index="03" label="Feeling">
            <h2>How we make them feel</h2>
            <p>
              <strong style={{ color: 'var(--color-text-primary)' }}>Smart.</strong> Like they have an edge
              others don't — not because we make things simpler, but because we make things clearer. Our
              customers don't just get data, they get signal.
            </p>
          </Row>

          <Row index="04" label="Beliefs">
            <h2>Beliefs</h2>
            <p style={{ marginBottom: 'var(--space-6)' }}>What we hold to, no matter what we ship.</p>
            <div className="identity-beliefs">
              {BELIEFS.map((b) => (
                <div className="identity-belief" key={b.name}>
                  <h3 className="identity-belief__name">{b.name}</h3>
                  <p className="identity-belief__body">{b.body}</p>
                </div>
              ))}
            </div>
          </Row>

          <Row index="05" label="Vision">
            <h2>Where we're going</h2>
            <p className="identity-statement">
              Serialized starts as the layer that makes closed-source contracts and onchain activity legible.
              Where it's headed is broader: audit, data, and routing under one standard of rigor, so "verified
              by Serialized" means something on its own.
            </p>
          </Row>

          <Row index="06" label="Values">
            <h2>Brand values</h2>
            <div className="identity-values">
              {VALUES.map((v) => (
                <div className="identity-value" key={v.title}>
                  <h3 className="identity-value__title">{v.title}</h3>
                  <p className="identity-value__body">{v.body}</p>
                </div>
              ))}
            </div>
          </Row>

          <Row index="07" label="Difference">
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
          </Row>

          <Row index="08" label="Vibes">
            <h2>Brand vibes</h2>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              If Serialized were a room, it's a clean workstation at 2am — no clutter, one accent light,
              everything exactly where it should be. Visually, that shows up as ASCII-art and terminal-native
              texture, always monochrome-with-accent — imagery generated <em>from</em> structure, never
              photographic or illustrative without that data-native treatment.
            </p>
            <div className="identity-vibes">
              {VIBES.map((v) => (
                <span className="identity-vibe" key={v}>
                  {v}
                </span>
              ))}
            </div>
            <div className="identity-imagery">
              {IMAGERY.map((item) => (
                <div className="identity-imagery__card" key={item.caption}>
                  <img src={item.src} alt={item.caption} />
                  <div className="identity-imagery__caption">{item.caption}</div>
                </div>
              ))}
            </div>
          </Row>

          <Row index="09" label="Promises">
            <h2>Product promises</h2>
            <ul className="identity-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Row>

          <Row index="10" label="Voice">
            <h2>Tone of voice</h2>
            <p style={{ marginBottom: 'var(--space-6)' }}>
              Direct, technical, unhyped. Serialized states findings and facts plainly — credibility depends on
              not sounding like marketing copy, especially on SerializedAudit.io, where the product's entire
              value is trustworthy data.
            </p>
            <ul className="identity-promises">
              {VOICE_RULES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <table className="spec-table" style={{ marginTop: 'var(--space-6)' }}>
              <thead>
                <tr>
                  <th>Don't</th>
                  <th>Do</th>
                </tr>
              </thead>
              <tbody>
                {VOICE_EXAMPLES.map((ex) => (
                  <tr key={ex.dont}>
                    <td>{ex.dont}</td>
                    <td>{ex.do}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: 'var(--space-4)' }}>
              For naming conventions ("Serialized" capitalization, "SerializedAudit.io" vs. "Audit") and
              copy-paste boilerplate, see{' '}
              <a href="/media-kit#boilerplate" style={{ color: 'var(--color-accent-serialized)' }}>
                Media Kit
              </a>
              .
            </p>
          </Row>
        </div>
      </div>
    </div>
  )
}
