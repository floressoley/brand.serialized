import auditHorizontalOnDark from '../../../../brand-kit/logo/audit/audit-horizontal-on-dark.svg'
import auditHorizontalOnLight from '../../../../brand-kit/logo/audit/audit-horizontal-on-light.svg'
import auditMarkOnDark from '../../../../brand-kit/logo/audit/audit-logomark-on-dark.svg'
import auditMarkOnLight from '../../../../brand-kit/logo/audit/audit-logomark-on-light.svg'
import { PageHeader } from '../PageHeader'
import './Identity.css'

export function SubBrands() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand Kit · Sub Brands"
        title="Serialized.Audit"
        lede="The product identity for SerializedAudit.io — a B2C token scanning and auditing tool. Same mark, same type system, one signal difference: the third bar and wordmark shift to Accent Audit green, marking it as a distinct product surface within the Serialized family."
      />

      <div className="section">
        <h2>Horizontal lockup</h2>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark">
              <img src={auditHorizontalOnDark} alt="Serialized.Audit horizontal logo, on dark" />
            </div>
            <div className="logo-pair__label">On dark</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light">
              <img src={auditHorizontalOnLight} alt="Serialized.Audit horizontal logo, on light" />
            </div>
            <div className="logo-pair__label">On light</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Logomark</h2>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark logo-stage--mark">
              <img src={auditMarkOnDark} alt="Serialized.Audit logomark, on dark" />
            </div>
            <div className="logo-pair__label">On dark</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light logo-stage--mark">
              <img src={auditMarkOnLight} alt="Serialized.Audit logomark, on light" />
            </div>
            <div className="logo-pair__label">On light</div>
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
          <li>Pair with Accent Audit (<code>#51DA4C</code>) throughout the surface — buttons, active states, pass indicators — not Accent Serialized blue. See <a href="/color" style={{ color: 'var(--color-accent-audit)' }}>Color</a> for the full lane.</li>
          <li>Clearspace and minimum-size rules are identical to the parent mark — see <a href="/identity" style={{ color: 'var(--color-accent-audit)' }}>Core Identifiers</a>.</li>
        </ul>
      </div>
    </div>
  )
}
