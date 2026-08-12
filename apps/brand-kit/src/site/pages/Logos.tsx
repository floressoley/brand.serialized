import clearspace from '../../../brand-kit/logo/serialized/serialized-clearspace.svg'
import horizontalOnDark from '../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg'
import horizontalOnDarkRaw from '../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg?raw'
import horizontalOnLight from '../../../brand-kit/logo/serialized/serialized-horizontal-on-light.svg'
import horizontalOnLightRaw from '../../../brand-kit/logo/serialized/serialized-horizontal-on-light.svg?raw'
import markOnDark from '../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg'
import markOnDarkRaw from '../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg?raw'
import markOnLight from '../../../brand-kit/logo/serialized/serialized-logomark-on-light.svg'
import markOnLightRaw from '../../../brand-kit/logo/serialized/serialized-logomark-on-light.svg?raw'
import wordmarkOnDark from '../../../brand-kit/logo/serialized/serialized-wordmark-on-dark.svg'
import wordmarkOnDarkRaw from '../../../brand-kit/logo/serialized/serialized-wordmark-on-dark.svg?raw'
import wordmarkOnLight from '../../../brand-kit/logo/serialized/serialized-wordmark-on-light.svg'
import wordmarkOnLightRaw from '../../../brand-kit/logo/serialized/serialized-wordmark-on-light.svg?raw'
import fullLogoStretched from '../../../brand-kit/guidelines/misuse/full-logo-stretched.png'
import fullLogoOutline from '../../../brand-kit/guidelines/misuse/full-logo-outline.png'
import faviconDisplay from '../../../brand-kit/guidelines/in-use/favicon-display.png'
import faviconSvg from '../../../brand-kit/logo/serialized/serialized-favicon.svg'
import faviconSvgRaw from '../../../brand-kit/logo/serialized/serialized-favicon.svg?raw'
import { AssetActions } from '../AssetActions'
import { SectionHero } from '../SectionHero'
import './Logos.css'

export function Logos() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
      <p className="content__eyebrow">Brand Kit · Logos</p>
      <p className="content__lede">
        Three diagonal parallelogram bars of increasing length — an abstracted slash/serial mark, paired with
        a display wordmark. Full logo, wordmark, and logomark each have a distinct role — here's when to use
        which, and how to keep the mark intact.
      </p>

      <div className="logo-showcase" id="full-logo">
        <div className="logo-showcase__info">
          <h2>Full logo</h2>
          <p>
            The full logo pairs the raw slash mark with Fraunces' refined letterforms — a premium typographic
            treatment. The contrast between the raw slash and the refined letterforms suggests speed meeting
            precision.
          </p>
        </div>
        <div className="logo-showcase__previews">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On dark</span>
            <div className="logo-stage logo-stage--dark">
              <img src={horizontalOnDark} alt="Serialized full logo, on dark" />
              <AssetActions svg={horizontalOnDarkRaw} href={horizontalOnDark} filename="serialized-horizontal-on-dark" tone="dark" />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On white</span>
            <div className="logo-stage logo-stage--light">
              <img src={horizontalOnLight} alt="Serialized full logo, on light" />
              <AssetActions svg={horizontalOnLightRaw} href={horizontalOnLight} filename="serialized-horizontal-on-light" tone="light" />
            </div>
          </div>
        </div>
      </div>

      <div className="logo-showcase" id="wordmark">
        <div className="logo-showcase__info">
          <h2>Wordmark</h2>
          <p>
            "Serialized" set in Fraunces alone, without the slash mark — for contexts where the logomark
            already appears elsewhere on the page (browser chrome, app header) or where space is too tight for
            the full lockup at a legible size. See{' '}
            <a href="/typography" style={{ color: 'var(--color-accent-serialized)' }}>
              Typography
            </a>{' '}
            for the full type system.
          </p>
        </div>
        <div className="logo-showcase__previews">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On dark</span>
            <div className="logo-stage logo-stage--dark">
              <img src={wordmarkOnDark} alt="Serialized wordmark, on dark" />
              <AssetActions svg={wordmarkOnDarkRaw} href={wordmarkOnDark} filename="serialized-wordmark-on-dark" tone="dark" />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On white</span>
            <div className="logo-stage logo-stage--light">
              <img src={wordmarkOnLight} alt="Serialized wordmark, on light" />
              <AssetActions svg={wordmarkOnLightRaw} href={wordmarkOnLight} filename="serialized-wordmark-on-light" tone="light" />
            </div>
          </div>
        </div>
      </div>

      <div className="logo-showcase" id="logomark">
        <div className="logo-showcase__info">
          <h2>Logomark</h2>
          <p>
            The mark alone, no wordmark — used where space is constrained (favicons, avatars, app icons) or
            alongside an already-established wordmark elsewhere on the page.
          </p>
        </div>
        <div className="logo-showcase__previews">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On dark</span>
            <div className="logo-stage logo-stage--dark logo-stage--mark">
              <img src={markOnDark} alt="Serialized logomark, on dark" />
              <AssetActions svg={markOnDarkRaw} href={markOnDark} filename="serialized-logomark-on-dark" tone="dark" />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">On white</span>
            <div className="logo-stage logo-stage--light logo-stage--mark">
              <img src={markOnLight} alt="Serialized logomark, on light" />
              <AssetActions svg={markOnLightRaw} href={markOnLight} filename="serialized-logomark-on-light" tone="light" />
            </div>
          </div>
        </div>
      </div>

      <div className="logo-showcase" id="clearspace">
        <div className="logo-showcase__info">
          <h2>Clearspace</h2>
          <p>
            The clearspace unit is the logomark itself — one logomark-<strong style={{ color: 'var(--color-text-primary)' }}>width</strong> to
            the left and right, one logomark-<strong style={{ color: 'var(--color-text-primary)' }}>height</strong> above and below. Same
            rule whether the logomark stands alone or appears in the full lockup.
          </p>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Clearspace is measured from the outermost edge of the artwork, not the SVG bounding box. Nothing —
            text, imagery, UI chrome, other marks — may enter the clearspace zone.
          </p>
        </div>
        <div className="logo-showcase__content">
          <div className="logo-showcase__preview">
            <img src={clearspace} alt="Serialized logo clearspace grid" className="clearspace-diagram__img clearspace-diagram__img--dark" />
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
                <td>1 logomark-width left/right, 1 logomark-height top/bottom</td>
              </tr>
              <tr>
                <td>Full Logo</td>
                <td>1 logomark-width left/right, 1 logomark-height top/bottom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="logo-showcase" id="minimum-size">
        <div className="logo-showcase__info">
          <h2>Minimum size</h2>
          <p>
            Below these sizes the mark's thin parallel bars start to visually merge. Switch to the logomark
            alone rather than shrinking the full logo further.
          </p>
        </div>
        <div className="logo-showcase__content">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">Logomark</span>
            <div className="logo-stage logo-stage--dark">
              <img src={markOnDark} alt="Logomark at minimum digital size, 24 pixels" style={{ height: '24px', width: 'auto' }} />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag">Full logo</span>
            <div className="logo-stage logo-stage--dark">
              <img src={horizontalOnDark} alt="Full logo at minimum digital size, 120 pixels wide" style={{ width: '120px', height: 'auto' }} />
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
        </div>
      </div>

      <div className="logo-showcase" id="misuse">
        <div className="logo-showcase__info">
          <h2>Misuse</h2>
          <ul className="rule-list">
            <li>Don't substitute the parent Serialized mark for a sub-brand lockup, or vice versa — each signals a distinct context to the user.</li>
          </ul>
        </div>
        <div className="logo-showcase__content misuse-grid">
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Recolor the mark — no accent colors, gradients, or off-brand tones.</p>
            </div>
            <div className="misuse-card__stage">
              <div
                role="img"
                aria-label="Recolored logomark — incorrect"
                className="misuse-card__tint"
                style={{ WebkitMaskImage: `url(${markOnDark})`, maskImage: `url(${markOnDark})` }}
              />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Rotate, skew, or otherwise distort the mark's proportions.</p>
            </div>
            <div className="misuse-card__stage">
              <img src={markOnDark} alt="Rotated logomark — incorrect" style={{ height: '80px', width: 'auto', transform: 'rotate(24deg)' }} />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Add drop shadows, glows, or other effects.</p>
            </div>
            <div className="misuse-card__stage">
              <img
                src={markOnDark}
                alt="Logomark with a drop shadow — incorrect"
                style={{ height: '80px', width: 'auto', filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.7)) drop-shadow(0 0 6px rgba(126,171,245,0.8))' }}
              />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Place an <code>on-dark</code> variant on a light background, or vice versa.</p>
            </div>
            <div className="misuse-card__stage misuse-card__stage--light">
              <img src={markOnDark} alt="On-dark mark placed on a light background — nearly invisible" style={{ height: '80px', width: 'auto' }} />
              <span className="misuse-card__ghost-note">↑ barely there — same tone as the background</span>
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Recreate the wordmark in another typeface — always Fraunces.</p>
            </div>
            <div className="misuse-card__stage">
              <span className="misuse-card__fake-wordmark">Serialized</span>
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Stretch or squash the full logo — scale the lockup uniformly only.</p>
            </div>
            <div className="misuse-card__stage">
              <img src={fullLogoStretched} alt="Full logo stretched non-uniformly — incorrect" style={{ height: '24px', width: 'auto' }} />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Rearrange or add extra space between the mark and wordmark — the lockup's spacing is fixed.</p>
            </div>
            <div className="misuse-card__stage" style={{ gap: 'var(--space-8)' }}>
              <img src={wordmarkOnDark} alt="Wordmark and logomark reordered and separated — incorrect" style={{ height: '26px', width: 'auto' }} />
              <img src={markOnDark} alt="" style={{ height: '38px', width: 'auto' }} />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Use different colors for the mark and wordmark — they're always the same tone.</p>
            </div>
            <div className="misuse-card__stage" style={{ gap: 'var(--space-2)' }}>
              <div
                role="img"
                aria-label="Logomark and wordmark in mismatched colors — incorrect"
                style={{
                  height: '34px',
                  width: '34px',
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
              <img src={wordmarkOnDark} alt="" style={{ height: '24px', width: 'auto' }} />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Add an outline or stroke around the mark or wordmark.</p>
            </div>
            <div className="misuse-card__stage">
              <img src={fullLogoOutline} alt="Full logo with an outline stroke — incorrect" style={{ height: '34px', width: 'auto' }} />
            </div>
          </div>
          <div className="misuse-card">
            <div className="misuse-card__header">
              <span className="misuse-card__icon">✕</span>
              <p className="misuse-card__caption">Place the mark on an accent color or other low-contrast field.</p>
            </div>
            <div className="misuse-card__stage" style={{ background: 'var(--color-accent-serialized)' }}>
              <img src={markOnDark} alt="Logomark placed on an accent-color background — incorrect" style={{ height: '80px', width: 'auto' }} />
              <span className="misuse-card__ghost-note">↑ low contrast against the accent field</span>
            </div>
          </div>
        </div>
      </div>

      <div className="logo-showcase logo-showcase--stack" id="in-use">
        <div className="logo-showcase__info">
          <h2>In Use</h2>
          <ul className="rule-list">
            <li>Favicon, app icon, social avatars — logomark alone, on its native background color.</li>
            <li>Site headers, marketing, and documents — full logo, sized generously where space allows.</li>
            <li>This is the parent Serialized mark. For SerializedAudit.io, use the Audit lockup on the <a href="/sub-brands" style={{ color: 'var(--color-accent-serialized)' }}>Sub Brands</a> page instead.</li>
          </ul>
        </div>
        <div className="logo-showcase__content">
          <div className="in-use-row">
            <div className="in-use-row__text">
              <h3 className="in-use-row__title">Favicon</h3>
              <p>The logomark alone, matched to the system theme — reads clearly against both light and dark browser chrome.</p>
              <div className="in-use-row__actions">
                <AssetActions svg={faviconSvgRaw} href={faviconSvg} filename="serialized-favicon" tone="dark" />
              </div>
            </div>
            <div className="in-use-row__media">
              <img src={faviconDisplay} alt="Favicon shown in a browser tab, dark and light mode" className="in-use-row__img" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
