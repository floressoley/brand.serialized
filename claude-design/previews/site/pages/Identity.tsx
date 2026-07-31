import horizontalOnDark from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-dark.svg'
import horizontalOnLight from '../../../../brand-kit/logo/serialized/serialized-horizontal-on-light.svg'
import markOnDark from '../../../../brand-kit/logo/serialized/serialized-logomark-on-dark.svg'
import markOnLight from '../../../../brand-kit/logo/serialized/serialized-logomark-on-light.svg'
import { PageHeader } from '../PageHeader'
import './Identity.css'

export function Identity() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand Kit · Core Identifiers"
        title="Core Identifiers"
        lede="Three diagonal parallelogram bars of increasing length — an abstracted slash/serial mark. Used standalone as the icon, or preceding the wordmark in horizontal lockups."
      />

      <div className="section">
        <h2>Horizontal lockup</h2>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark">
              <img src={horizontalOnDark} alt="Serialized horizontal logo, on dark" />
            </div>
            <div className="logo-pair__label">On dark — #1A1A19</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light">
              <img src={horizontalOnLight} alt="Serialized horizontal logo, on light" />
            </div>
            <div className="logo-pair__label">On light — #FAF9F6</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Logomark</h2>
        <div className="logo-pair">
          <div>
            <div className="logo-stage logo-stage--dark logo-stage--mark">
              <img src={markOnDark} alt="Serialized logomark, on dark" />
            </div>
            <div className="logo-pair__label">On dark</div>
          </div>
          <div>
            <div className="logo-stage logo-stage--light logo-stage--mark">
              <img src={markOnLight} alt="Serialized logomark, on light" />
            </div>
            <div className="logo-pair__label">On light</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Usage</h2>
        <ul className="rule-list">
          <li>Use <code>on-dark</code> variants on dark surfaces, <code>on-light</code> on light surfaces — never place a variant against a background it wasn't built for.</li>
          <li>Use the logomark alone where space is constrained (favicons, avatars, app icons) or alongside an already-established wordmark elsewhere on the page.</li>
          <li>This is the parent Serialized mark. For SerializedAudit.io, use the Audit lockup on the <a href="/sub-brands" style={{ color: 'var(--color-accent-serialized)' }}>Sub Brands</a> page instead.</li>
        </ul>
      </div>

      <div className="section">
        <h2>Clearspace</h2>
        <p style={{ marginBottom: 'var(--space-4)' }}>
          Unit <strong style={{ color: 'var(--color-text-primary)' }}>X</strong> = the width of a single bar
          in the mark, a consistent ~6.4% of the mark's height across both the logomark and the horizontal
          lockup — so <code>X = mark height ÷ 16</code>.
        </p>
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
              <td>Horizontal lockup</td>
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
              <td>Horizontal lockup</td>
              <td>120px width (≈21px height)</td>
              <td>25mm / 1in width</td>
            </tr>
          </tbody>
        </table>
        <p>Below these sizes the mark's thin parallel bars start to visually merge. Switch to the logomark alone rather than shrinking the horizontal lockup further.</p>
      </div>

      <div className="section">
        <h2>Known gap</h2>
        <div className="callout">
          The original export had <code>Serialized.Logomark (Dark Mode).svg</code> and{' '}
          <code>(Light Mode).svg</code> with swapped fills. The files in this kit are correct (matched by
          actual color, not filename) — but the source files in the design tool should be relabeled to avoid
          future confusion.
        </div>
      </div>
    </div>
  )
}
