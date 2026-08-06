import { useState } from 'react'
import auditLogoOnDark from '../../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg'
import logomarkOnDark from '../../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg'
import { SectionHero } from '../SectionHero'
import './MediaKit.css'

const BOILERPLATE = [
  {
    label: 'One-liner',
    text: 'Serialized makes opaque onchain systems readable.',
  },
  {
    label: 'Short (~25 words)',
    text: 'Serialized turns opaque, high-stakes onchain systems — closed-source contracts, raw onchain events — into something a builder can read, trust, and act on.',
  },
  {
    label: 'Long (~60 words)',
    text: "Onchain data is abundant; understanding it isn't. Serialized turns opaque, high-stakes systems — closed-source contracts, raw onchain events — into something a builder can read, trust, and act on immediately. It starts as the layer that makes closed-source contracts and onchain activity legible, and is headed toward audit, data, and routing under one standard of rigor.",
  },
]

const NAMING_RULES = [
  '"Serialized" is one word, capital S — never "Serialised," "serialized" lowercase mid-sentence subject, or split as two words.',
  '"SerializedAudit.io" in full on first reference within a piece; "Audit" alone on later references.',
]

function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="copy-block">
      <div className="copy-block__header">
        <span className="copy-block__label">{label}</span>
        <button type="button" className="copy-block__btn" onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="copy-block__text">{text}</p>
    </div>
  )
}

export function MediaKit() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Media Kit</p>
        <p className="content__lede">
          Ready-to-use templates and copy for press, social, and partner placements — banners, screenshot
          framing, and boilerplate text. For the logo files themselves, see{' '}
          <a href="/logos" style={{ color: 'var(--color-accent-serialized)' }}>
            Logos
          </a>
          .
        </p>

        <div className="section" id="banners">
          <h2>Social &amp; OG banners</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Shared grammar across every banner: ambient texture behind, mark bottom-left, one Fraunces line.
            Never more than that — a banner is a signature, not a poster.
          </p>
          <div className="banner-grid">
            <div className="banner-card">
              <div className="banner-preview banner-preview--og">
                <img src={logomarkOnDark} alt="" className="banner-preview__mark" />
                <span className="banner-preview__line">Dark that has depth.</span>
              </div>
              <div className="banner-card__meta">
                <span className="banner-card__name">OG banner</span>
                <code>1200 × 630</code>
              </div>
              <p>Dot-matrix texture with a radial glow behind the headline.</p>
            </div>
            <div className="banner-card">
              <div className="banner-preview banner-preview--profile-brand">
                <img src={logomarkOnDark} alt="" className="banner-preview__mark" />
                <span className="banner-preview__line">Serialized</span>
              </div>
              <div className="banner-card__meta">
                <span className="banner-card__name">Profile header — Brand</span>
                <code>1500 × 500</code>
              </div>
              <p>Diagonal hatch texture, brand-blue accent only.</p>
            </div>
            <div className="banner-card">
              <div className="banner-preview banner-preview--profile-audit">
                <img src={auditLogoOnDark} alt="" className="banner-preview__mark banner-preview__mark--wide" />
                <span className="banner-preview__line">SerializedAudit.io</span>
              </div>
              <div className="banner-card__meta">
                <span className="banner-card__name">Profile header — Audit</span>
                <code>1500 × 500</code>
              </div>
              <p>Same grammar, green radial glow in place of blue.</p>
            </div>
          </div>
        </div>

        <div className="section" id="press">
          <h2>Press screenshots</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Product screenshots ship framed, never bare. A consistent frame reads as credible documentation
            rather than a random crop.
          </p>
          <div className="press-example">
            <div className="press-example__chrome">
              <span className="press-example__dot" />
              <span className="press-example__dot" />
              <span className="press-example__dot" />
            </div>
            <div className="press-example__body">
              <div className="press-example__row">
                <span>Contract</span>
                <code>0xA0b8...eB48</code>
              </div>
              <div className="press-example__row">
                <span>Risk score</span>
                <code>92 / 100</code>
              </div>
            </div>
            <div className="press-example__caption">Audit summary — SerializedAudit.io</div>
          </div>
          <ul className="rule-list" style={{ marginTop: 'var(--space-6)' }}>
            <li>Frame in a Surface field with generous inset — never a bare, edge-to-edge crop.</li>
            <li>Include a browser-chrome-style header bar and a caption strip below.</li>
            <li>Never crop mid-component, and never annotate directly over the UI.</li>
          </ul>
        </div>

        <div className="section" id="boilerplate">
          <h2>Boilerplate &amp; naming</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Drop-in copy for bios, directory listings, and partner pages — pick the length that fits.
          </p>
          <div className="copy-block-list">
            {BOILERPLATE.map((item) => (
              <CopyBlock key={item.label} label={item.label} text={item.text} />
            ))}
          </div>
          <h3 className="media-kit__subhead">Naming</h3>
          <ul className="rule-list">
            {NAMING_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
