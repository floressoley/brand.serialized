import { useState } from 'react'
import { AssetActions } from '../AssetActions'
import { SectionHero } from '../SectionHero'
import './MediaKit.css'

function assetLabel(path: string) {
  return path.split('/').pop()!.replace(/\.png$/i, '')
}

const LINKEDIN_COVERS = Object.entries(
  import.meta.glob<string>('../../../../brand-kit/banners/LinkedIn/*.png', { eager: true, import: 'default' }),
).sort(([a], [b]) => a.localeCompare(b))

const X_HEADERS = Object.entries(
  import.meta.glob<string>('../../../../brand-kit/banners/X/*.png', { eager: true, import: 'default' }),
).sort(([a], [b]) => a.localeCompare(b))

const X_POSTS = Object.entries(
  import.meta.glob<string>('../../../../brand-kit/banners/X Posts/*.png', { eager: true, import: 'default' }),
).sort(([a], [b]) => a.localeCompare(b))

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

function AssetCard({ src, path, dimensions }: { src: string; path: string; dimensions: string }) {
  const label = assetLabel(path)
  const tone = /light/i.test(label) ? 'light' : 'dark'

  return (
    <div className="asset-card">
      <div className="asset-card__preview">
        <img src={src} alt={label} loading="lazy" />
        <AssetActions href={src} filename={label} tone={tone} />
      </div>
      <div className="asset-card__meta">
        <span className="asset-card__name">{label}</span>
        <span className="asset-card__dimensions">{dimensions}</span>
      </div>
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

        <div className="section" id="social-covers">
          <h2>Ready-made covers &amp; posts</h2>
          <p style={{ marginBottom: 'var(--space-6)' }}>
            Final exports, ready to upload as-is — dark and light variants where the platform allows either.
          </p>

          <h3 className="media-kit__subhead">LinkedIn covers</h3>
          <div className="asset-grid asset-grid--wide">
            {LINKEDIN_COVERS.map(([path, src]) => (
              <AssetCard key={path} src={src} path={path} dimensions="1584 × 396" />
            ))}
          </div>

          <h3 className="media-kit__subhead">X headers</h3>
          <div className="asset-grid asset-grid--wide">
            {X_HEADERS.map(([path, src]) => (
              <AssetCard key={path} src={src} path={path} dimensions="1500 × 500" />
            ))}
          </div>

          <h3 className="media-kit__subhead">X posts</h3>
          <div className="asset-grid asset-grid--square">
            {X_POSTS.map(([path, src]) => (
              <AssetCard key={path} src={src} path={path} dimensions="1280 × 850" />
            ))}
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
