import horizontalOnDark from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg'
import horizontalOnDarkRaw from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg?raw'
import horizontalOnLight from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-light.svg'
import horizontalOnLightRaw from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-light.svg?raw'
import markOnDark from '../../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg'
import markOnDarkRaw from '../../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg?raw'
import markOnLight from '../../../../brand-kit/logo/serialized/serialized-logomark-on-light.svg'
import markOnLightRaw from '../../../../brand-kit/logo/serialized/serialized-logomark-on-light.svg?raw'
import wordmarkOnDark from '../../../../brand-kit/logo/serialized/serialized-wordmark-on-dark.svg'
import wordmarkOnDarkRaw from '../../../../brand-kit/logo/serialized/serialized-wordmark-on-dark.svg?raw'
import wordmarkOnLight from '../../../../brand-kit/logo/serialized/serialized-wordmark-on-light.svg'
import wordmarkOnLightRaw from '../../../../brand-kit/logo/serialized/serialized-wordmark-on-light.svg?raw'
import fullLogoStretched from '../../../../brand-kit/guidelines/misuse/full-logo-stretched.png'
import fullLogoOutline from '../../../../brand-kit/guidelines/misuse/full-logo-outline.png'
import faviconAsset from '../../../../brand-kit/logo/serialized/serialized-favicon.png'
import iconGrid from '../../../../brand-kit/guidelines/in-use/icon-grid.svg'
import faviconTabDark from '../../../../brand-kit/guidelines/in-use/favicon-tab-dark.svg'
import faviconTabLight from '../../../../brand-kit/guidelines/in-use/favicon-tab-light.svg'
import iosAppDock from '../../../../brand-kit/guidelines/in-use/ios-app-dock.png'
import { AssetActions } from '../AssetActions'
import { SectionHero } from '../SectionHero'
import './Identity.css'

export function Identity() {
  return (
    <div>
      <SectionHero eyebrow="Brand Kit · Marks & Lockups" />

      <div className="page-body">
      <p className="content__lede">
        Three diagonal parallelogram bars of increasing length — an abstracted slash/serial mark, paired with
        a display wordmark. Full logo, wordmark, and logomark each have a distinct role — here's when to use
        which, and how to keep the mark intact.
      </p>

      <div className="section">
        <h2>Full Logo</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          The full logo pairs the raw slash mark with Fraunces' refined letterforms — a premium typographic
          treatment. The contrast between the raw slash and the refined letterforms suggests speed meeting
          precision.
        </p>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark">
              <img src={horizontalOnDark} alt="Serialized full logo, on dark" />
              <AssetActions svg={horizontalOnDarkRaw} href={horizontalOnDark} filename="serialized-horizontal-on-dark.svg" tone="dark" />
            </div>
            <div className="logo-pair__label">On dark — #0F0F0F</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light">
              <img src={horizontalOnLight} alt="Serialized full logo, on light" />
              <AssetActions svg={horizontalOnLightRaw} href={horizontalOnLight} filename="serialized-horizontal-on-light.svg" tone="light" />
            </div>
            <div className="logo-pair__label">On light — #FAF9F6</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Wordmark</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          "Serialized" set in Fraunces alone, without the slash mark — for contexts where the logomark already
          appears elsewhere on the page (browser chrome, app header) or where space is too tight for the full
          lockup at a legible size. See <a href="/typography" style={{ color: 'var(--color-accent-serialized)' }}>Typography</a> for
          the full type system.
        </p>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark">
              <img src={wordmarkOnDark} alt="Serialized wordmark, on dark" />
              <AssetActions svg={wordmarkOnDarkRaw} href={wordmarkOnDark} filename="serialized-wordmark-on-dark.svg" tone="dark" />
            </div>
            <div className="logo-pair__label">On dark</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light">
              <img src={wordmarkOnLight} alt="Serialized wordmark, on light" />
              <AssetActions svg={wordmarkOnLightRaw} href={wordmarkOnLight} filename="serialized-wordmark-on-light.svg" tone="light" />
            </div>
            <div className="logo-pair__label">On light</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Logomark</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          The mark alone, no wordmark — used where space is constrained (favicons, avatars, app icons) or
          alongside an already-established wordmark elsewhere on the page.
        </p>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark logo-stage--mark">
              <img src={markOnDark} alt="Serialized logomark, on dark" />
              <AssetActions svg={markOnDarkRaw} href={markOnDark} filename="serialized-logomark-on-dark.svg" tone="dark" />
            </div>
            <div className="logo-pair__label">On dark</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light logo-stage--mark">
              <img src={markOnLight} alt="Serialized logomark, on light" />
              <AssetActions svg={markOnLightRaw} href={markOnLight} filename="serialized-logomark-on-light.svg" tone="light" />
            </div>
            <div className="logo-pair__label">On light</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Clearspace</h2>
        <p style={{ marginBottom: 'var(--space-4)' }}>
          Unit <strong style={{ color: 'var(--color-text-primary)' }}>X</strong> = the width of a single bar
          in the mark, a consistent ~6.4% of the mark's height across both the logomark and the full
          logo — so <code>X = mark height ÷ 16</code>.
        </p>
        <div className="clearspace-grid">
          <div className="clearspace-diagram">
            <div className="clearspace-diagram__zone clearspace-diagram__zone--mark">
              <img src={markOnDark} alt="Serialized logomark clearspace diagram" />
              <span className="clearspace-tick clearspace-tick--top">1X</span>
              <span className="clearspace-tick clearspace-tick--right">1X</span>
              <span className="clearspace-tick clearspace-tick--bottom">1X</span>
              <span className="clearspace-tick clearspace-tick--left">1X</span>
            </div>
            <div className="clearspace-diagram__caption">Logomark — 1X on all sides</div>
          </div>
          <div className="clearspace-diagram">
            <div className="clearspace-diagram__zone clearspace-diagram__zone--lockup">
              <img src={horizontalOnDark} alt="Serialized full logo clearspace diagram" />
              <span className="clearspace-tick clearspace-tick--top">1X</span>
              <span className="clearspace-tick clearspace-tick--right">2X</span>
              <span className="clearspace-tick clearspace-tick--bottom">1X</span>
              <span className="clearspace-tick clearspace-tick--left">2X</span>
            </div>
            <div className="clearspace-diagram__caption">Full Logo — 1X top/bottom, 2X left/right</div>
          </div>
        </div>
        <table className="spec-table">
          <thead>
            <tr>
              <th>Lockup</th>
              <th>Minimum clearspace</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Logomark</td>
              <td>1X on all four sides</td>
            </tr>
            <tr>
              <td>Full Logo</td>
              <td>1X top/bottom, 2X left/right</td>
            </tr>
          </tbody>
        </table>
        <p>
          Clearspace is measured from the outermost edge of the artwork, not the SVG bounding box. Nothing —
          text, imagery, UI chrome, other marks — may enter the clearspace zone.
        </p>
      </div>

      <div className="section">
        <h2>Minimum size</h2>
        <div className="minsize-grid">
          <div className="minsize-card">
            <div className="minsize-card__stage">
              <img src={markOnDark} alt="Logomark at minimum digital size, 24 pixels" style={{ height: '24px', width: 'auto' }} />
            </div>
            <div className="minsize-card__caption">Logomark — 24px min height (digital)</div>
          </div>
          <div className="minsize-card">
            <div className="minsize-card__stage">
              <img src={horizontalOnDark} alt="Full logo at minimum digital size, 120 pixels wide" style={{ width: '120px', height: 'auto' }} />
            </div>
            <div className="minsize-card__caption">Full Logo — 120px min width (digital)</div>
          </div>
        </div>
        <table className="spec-table">
          <thead>
            <tr>
              <th>Lockup</th>
              <th>Digital (screen)</th>
              <th>Print</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Logomark (standalone)</td>
              <td>24px height</td>
              <td>6mm / 0.25in height</td>
            </tr>
            <tr>
              <td>Full Logo</td>
              <td>120px width (≈21px height)</td>
              <td>25mm / 1in width</td>
            </tr>
          </tbody>
        </table>
        <p>Below these sizes the mark's thin parallel bars start to visually merge. Switch to the logomark alone rather than shrinking the full logo further.</p>
      </div>

      <div className="section">
        <h2>Color</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          The mark is always monochrome — it never takes an accent color. See <a href="/color" style={{ color: 'var(--color-accent-serialized)' }}>Color</a> for
          the full grayscale and accent system.
        </p>
        <div className="logo-colors">
          <div className="logo-color-card">
            <div className="logo-color-card__fill" style={{ background: '#1A1A19' }} />
            <div className="logo-color-card__meta">
              <p className="logo-color-card__name">Used on light</p>
              <p className="logo-color-card__hex">#1A1A19</p>
            </div>
          </div>
          <div className="logo-color-card">
            <div className="logo-color-card__fill" style={{ background: '#FAF9F6' }} />
            <div className="logo-color-card__meta">
              <p className="logo-color-card__name">Used on dark</p>
              <p className="logo-color-card__hex">#FAF9F6</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Misuse</h2>
        <div className="misuse-grid">
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <div
                role="img"
                aria-label="Recolored logomark — incorrect"
                className="misuse-card__tint"
                style={{ WebkitMaskImage: `url(${markOnDark})`, maskImage: `url(${markOnDark})` }}
              />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Recolor the mark — no accent colors, gradients, or off-brand tones.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <img src={markOnDark} alt="Rotated logomark — incorrect" style={{ height: '64px', width: 'auto', transform: 'rotate(24deg)' }} />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Rotate, skew, or otherwise distort the mark's proportions.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <img
                src={markOnDark}
                alt="Logomark with a drop shadow — incorrect"
                style={{ height: '64px', width: 'auto', filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.7)) drop-shadow(0 0 6px rgba(126,171,245,0.8))' }}
              />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Add drop shadows, glows, or other effects.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage misuse-card__stage--light">
              <img src={markOnDark} alt="On-dark mark placed on a light background — nearly invisible" style={{ height: '64px', width: 'auto' }} />
              <span className="misuse-card__ghost-note">↑ barely there — same tone as the background</span>
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Place an <code>on-dark</code> variant on a light background, or vice versa.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <span className="misuse-card__fake-wordmark">Serialized</span>
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Recreate the wordmark in another typeface — always Fraunces.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <img src={fullLogoStretched} alt="Full logo stretched non-uniformly — incorrect" style={{ height: '20px', width: 'auto' }} />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Stretch or squash the full logo — scale the lockup uniformly only.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage" style={{ gap: 'var(--space-8)' }}>
              <img src={wordmarkOnDark} alt="Wordmark and logomark reordered and separated — incorrect" style={{ height: '22px', width: 'auto' }} />
              <img src={markOnDark} alt="" style={{ height: '32px', width: 'auto' }} />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Rearrange or add extra space between the mark and wordmark — the lockup's spacing is fixed.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage" style={{ gap: 'var(--space-2)' }}>
              <div
                role="img"
                aria-label="Logomark and wordmark in mismatched colors — incorrect"
                style={{
                  height: '28px',
                  width: '28px',
                  background: 'var(--color-accent-serialized)',
                  WebkitMaskImage: `url(${markOnDark})`,
                  maskImage: `url(${markOnDark})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                }}
              />
              <img src={wordmarkOnDark} alt="" style={{ height: '20px', width: 'auto' }} />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Use different colors for the mark and wordmark — they're always the same tone.</p>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__stage">
              <img src={fullLogoOutline} alt="Full logo with an outline stroke — incorrect" style={{ height: '28px', width: 'auto' }} />
            </div>
            <span className="misuse-card__badge">✕ DO NOT</span>
            <p className="misuse-card__caption">Add an outline or stroke around the mark or wordmark.</p>
          </div>
        </div>
        <ul className="rule-list" style={{ marginTop: 'var(--space-6)' }}>
          <li>Don't substitute the parent Serialized mark for a sub-brand lockup, or vice versa — each signals a distinct context to the user.</li>
        </ul>
      </div>

      <div className="section">
        <h2>In Use</h2>
        <ul className="rule-list">
          <li>Favicon, app icon, social avatars — logomark alone, on its native background color.</li>
          <li>Site headers, marketing, and documents — full logo, sized generously where space allows.</li>
          <li>This is the parent Serialized mark. For SerializedAudit.io, use the Audit lockup on the <a href="/sub-brands" style={{ color: 'var(--color-accent-serialized)' }}>Sub Brands</a> page instead.</li>
        </ul>

        <div className="in-use-grid">
          <div className="in-use-card">
            <p className="in-use-card__eyebrow">Icon grid</p>
            <div className="in-use-card__stage">
              <img src={iconGrid} alt="Favicon icon grid — construction keylines" className="in-use-card__img" style={{ maxWidth: '140px' }} />
            </div>
            <p className="in-use-card__caption">The logomark built to Apple's rounded-square keyline system.</p>
          </div>
          <div className="in-use-card">
            <p className="in-use-card__eyebrow">Favicon / app icon</p>
            <div className="in-use-card__stage">
              <img src={faviconAsset} alt="Favicon — dark rounded-square app icon" className="in-use-card__img" style={{ maxWidth: '140px' }} />
            </div>
            <p className="in-use-card__caption">Gradient and grain texture, reserved for this one application.</p>
          </div>
          <div className="in-use-card">
            <p className="in-use-card__eyebrow">iOS home screen</p>
            <div className="in-use-card__stage in-use-card__stage--bleed-tr">
              <img src={iosAppDock} alt="App icon shown in the iOS dock" className="in-use-card__img" />
            </div>
            <p className="in-use-card__caption">Sits in the dock like any native app icon — no adjustments needed.</p>
          </div>
        </div>

        <div className="browser-tab-row">
          <div className="in-use-card">
            <p className="in-use-card__eyebrow">Browser tab — dark mode</p>
            <div className="in-use-card__stage in-use-card__stage--bleed-br in-use-card__stage--browser in-use-card__stage--tab-dark">
              <img src={faviconTabDark} alt="Favicon shown in a browser tab, dark mode" className="in-use-card__img" />
            </div>
            <p className="in-use-card__caption">Reads clearly at 16px, even against dark browser chrome.</p>
          </div>
          <div className="in-use-card">
            <p className="in-use-card__eyebrow">Browser tab — light mode</p>
            <div className="in-use-card__stage in-use-card__stage--bleed-br in-use-card__stage--browser in-use-card__stage--tab-light">
              <img src={faviconTabLight} alt="Favicon shown in a browser tab, light mode" className="in-use-card__img" />
            </div>
            <p className="in-use-card__caption">Same icon, unchanged — it's designed to hold up on both.</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
