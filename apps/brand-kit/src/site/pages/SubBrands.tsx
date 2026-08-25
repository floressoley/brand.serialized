import auditHorizontalOnDark from '../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg'
import auditHorizontalOnDarkRaw from '../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg?raw'
import auditHorizontalOnLight from '../../../brand-kit/logo/audit/audit-horizontal-on-light.svg'
import auditHorizontalOnLightRaw from '../../../brand-kit/logo/audit/audit-horizontal-on-light.svg?raw'
import auditMarkOnDark from '../../../brand-kit/logo/audit/audit-logomark-on-dark.svg'
import auditMarkOnDarkRaw from '../../../brand-kit/logo/audit/audit-logomark-on-dark.svg?raw'
import auditMarkOnLight from '../../../brand-kit/logo/audit/audit-logomark-on-light.svg'
import auditMarkOnLightRaw from '../../../brand-kit/logo/audit/audit-logomark-on-light.svg?raw'
import { AssetActions } from '../AssetActions'
import './Logos.css'

export function SubBrands() {
  return (
    <div>
      <div className="page-body">
      <p className="content__eyebrow">Brand Kit · Sub Brands</p>
      <p className="content__lede">
        The product identity for SerializedAudit.io — a B2C token scanning and auditing tool. Same mark, same
        type system, one signal difference: the mark and ".Audit" wordmark shift to Accent Audit green, marking
        it as a distinct product surface within the Serialized family.
      </p>

      <div className="logo-showcase">
        <div className="logo-showcase__info">
          <h2>Full logo</h2>
          <p>
            The Audit lockup pairs the same slash mark and Fraunces wordmark as the parent brand — the mark and
            ".Audit" suffix shift to Accent Audit green, signaling the product surface.
          </p>
        </div>
        <div className="logo-showcase__previews">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag logo-showcase__tag--audit">On dark</span>
            <div className="logo-stage logo-stage--dark">
              <img src={auditHorizontalOnDark} alt="Serialized.Audit full logo, on dark" />
              <AssetActions svg={auditHorizontalOnDarkRaw} href={auditHorizontalOnDark} filename="audit-horizontal-on-dark.svg" tone="dark" />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag logo-showcase__tag--audit">On white</span>
            <div className="logo-stage logo-stage--light">
              <img src={auditHorizontalOnLight} alt="Serialized.Audit full logo, on light" />
              <AssetActions svg={auditHorizontalOnLightRaw} href={auditHorizontalOnLight} filename="audit-horizontal-on-light.svg" tone="light" />
            </div>
          </div>
        </div>
      </div>

      <div className="logo-showcase">
        <div className="logo-showcase__info">
          <h2>Logomark</h2>
          <p>
            The mark alone, no wordmark — used where space is constrained (favicons, avatars, app icons) or
            alongside an already-established wordmark elsewhere on the page.
          </p>
        </div>
        <div className="logo-showcase__previews">
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag logo-showcase__tag--audit">On dark</span>
            <div className="logo-stage logo-stage--dark logo-stage--mark">
              <img src={auditMarkOnDark} alt="Serialized.Audit logomark, on dark" />
              <AssetActions svg={auditMarkOnDarkRaw} href={auditMarkOnDark} filename="audit-logomark-on-dark.svg" tone="dark" />
            </div>
          </div>
          <div className="logo-showcase__preview">
            <span className="logo-showcase__tag logo-showcase__tag--audit">On white</span>
            <div className="logo-stage logo-stage--light logo-stage--mark">
              <img src={auditMarkOnLight} alt="Serialized.Audit logomark, on light" />
              <AssetActions svg={auditMarkOnLightRaw} href={auditMarkOnLight} filename="audit-logomark-on-light.svg" tone="light" />
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Why a sub brand</h2>
        <p>
          SerializedAudit.io is the B2C surface of Serialized — the product a token holder actually visits to
          run a scan. It needs to feel connected to the parent brand (same mark, same monochrome system,
          same voice) while being visually distinct enough that "Audit" reads as its own product, not just a
          Serialized marketing page. Accent Audit green does that work: it's the only color departure from
          Serialized blue in the entire system, so it stays legible as a deliberate signal rather than
          decoration.
        </p>
      </div>

      <div className="section">
        <h2>Usage</h2>
        <ul className="rule-list">
          <li>Audit lockups are used exclusively on SerializedAudit.io product surfaces — scanning UI, reports, product marketing for Audit specifically.</li>
          <li>Never substitute the Audit lockup for the parent Serialized mark, or vice versa — each signals a distinct context to the user.</li>
          <li>Pair with Accent Audit (<code>#3DCF8E</code>) throughout the surface — buttons, active states, pass indicators — not Accent Serialized blue. See <a href="/color" style={{ color: 'var(--color-accent-audit)' }}>Color</a> for the full lane.</li>
          <li>Clearspace and minimum-size rules are identical to the parent mark — see <a href="/logos" style={{ color: 'var(--color-accent-audit)' }}>Logos</a>.</li>
        </ul>
      </div>
      </div>
    </div>
  )
}
