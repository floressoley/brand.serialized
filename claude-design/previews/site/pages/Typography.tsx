import { PageHeader } from '../PageHeader'
import './Typography.css'

export function Typography() {
  return (
    <div>
      <PageHeader
        eyebrow="Brand Kit · Typography"
        title="Typography"
        lede="A variable display serif, a workhorse sans, and a mono for data — each with a distinct job, no overlap. Fraunces and Roboto Mono are sourced from Google Fonts; Satoshi from Fontshare."
      />

      <div className="section">
        <div className="specimen">
          <div className="specimen__meta">
            <span className="specimen__name">Fraunces</span>
            <span className="specimen__use">Headlines, titles — short text only</span>
          </div>
          <div
            className="specimen__display"
            style={{
              fontFamily: 'var(--font-display)',
              fontVariationSettings: "'opsz' 38, 'wght' 360, 'SOFT' 17, 'WONK' 0.36",
            }}
          >
            Trust, Precision
          </div>
          <div className="specimen__alphabet" style={{ fontFamily: 'var(--font-display)' }}>
            AaBbCcDdEeFf 0123456789
          </div>
          <table className="axis-table">
            <thead>
              <tr>
                <th>Axis</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Optical size (opsz)</td>
                <td>38</td>
              </tr>
              <tr>
                <td>Weight (wght)</td>
                <td>360</td>
              </tr>
              <tr>
                <td>Soft (SOFT)</td>
                <td>17</td>
              </tr>
              <tr>
                <td>Wonk (WONK)</td>
                <td>0.36</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Not for body copy or long-form text — used sparingly, in short bursts, where the brand wants
            warmth and editorial weight against an otherwise cold/precise system.
          </p>
        </div>

        <div className="specimen">
          <div className="specimen__meta">
            <span className="specimen__name">Satoshi</span>
            <span className="specimen__use">Body, paragraphs, buttons, links</span>
          </div>
          <div
            className="specimen__display"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-body-weight)',
              letterSpacing: 'var(--font-body-letter-spacing)',
            }}
          >
            Trust, Precision
          </div>
          <div
            className="specimen__alphabet"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 'var(--font-body-weight)',
              letterSpacing: 'var(--font-body-letter-spacing)',
            }}
          >
            AaBbCcDdEeFf 0123456789
          </div>
          <table className="axis-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weight</td>
                <td>400 (Regular)</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>16px</td>
              </tr>
              <tr>
                <td>Letter-spacing</td>
                <td>0.2px</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 'var(--space-4)' }}>
            The default text face everywhere Fraunces isn't explicitly called for. Carries all
            reading-length content. Rendered Regular with a touch of tracking — deliberate without going
            quiet.
          </p>
        </div>

        <div className="specimen">
          <div className="specimen__meta">
            <span className="specimen__name">Roboto Mono</span>
            <span className="specimen__use">Labels, data, code</span>
          </div>
          <div className="specimen__display" style={{ fontFamily: 'var(--font-mono)', fontSize: 40 }}>
            0xA0b8...eB48
          </div>
          <div className="specimen__alphabet" style={{ fontFamily: 'var(--font-mono)' }}>
            AaBbCcDdEeFf 0123456789
          </div>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Labels, data values, code, tabular/numeric content, decorative technical accents (hashes,
            addresses, timestamps). This is the typeface doing the "Precision" work — reserved for literal
            data/code, not stylistic emphasis on prose.
          </p>
        </div>
      </div>
    </div>
  )
}
