import './Typography.css'

const PRIMARY_VARIANTS = [
  {
    role: 'Headlines',
    name: 'Satoshi',
    style: { fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: 'var(--font-body-letter-spacing)' },
    alphabetStyle: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      letterSpacing: 'var(--font-body-letter-spacing)',
    },
  },
  {
    role: 'Body copy',
    name: 'Satoshi',
    style: { fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: 'var(--font-body-letter-spacing)' },
    alphabetStyle: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-body-weight)',
      letterSpacing: 'var(--font-body-letter-spacing)',
    },
  },
]

const SECONDARY_VARIANTS = [
  {
    role: 'Labels, data, code',
    name: 'Roboto Mono',
    style: {
      fontFamily: 'var(--font-mono)',
      letterSpacing: 'var(--font-mono-letter-spacing)',
    },
  },
]

const TYPE_SCALE = [
  {
    name: 'Display Large',
    font: 'Satoshi Medium',
    tracking: '-2%',
    lineHeight: '95%',
    className: 'text-display-large',
    sample: 'Big Headline',
  },
  {
    name: 'Headline Large',
    font: 'Satoshi Medium',
    tracking: '-2%',
    lineHeight: '95%',
    className: 'text-headline-large',
    sample: 'Headline',
  },
  {
    name: 'Headline',
    font: 'Satoshi Medium',
    tracking: '-1%',
    lineHeight: '105%',
    className: 'text-headline',
    sample: 'Medium Headline',
  },
  {
    name: 'Sub Headline',
    font: 'Satoshi Medium',
    tracking: '-1%',
    lineHeight: '110%',
    className: 'text-subheadline',
    sample: 'Sub Headline',
  },
  {
    name: 'Body',
    font: 'Satoshi Regular',
    tracking: '0.2px',
    lineHeight: '110%',
    className: 'text-body',
    sample: 'Body copy',
  },
  {
    name: 'Tertiary',
    font: 'Roboto Mono Regular',
    tracking: '2%',
    lineHeight: '120%',
    className: 'text-tertiary',
    sample: 'SUBTITLE / SUBTITLE',
  },
]

export function Typography() {
  return (
    <div>
      <div className="page-body">
      <p className="content__eyebrow">Brand Kit · Typography</p>
      <p className="content__lede">
        Two fonts, two jobs — Satoshi for everything you read, Roboto Mono for anything literal. Fraunces is
        retired from live text; it lives on only in the logo lockup.
      </p>

      <div className="font-showcase font-showcase--label-left" id="primary-fonts">
        <div className="font-showcase__info">
          <div className="font-showcase__label">
            <span>Typography</span>
            <span>Primary font</span>
          </div>
          <p>
            Satoshi is the primary typeface for the Serialized brand — headlines, big statements, and
            everything you read all run on it now.
          </p>
          <p style={{ marginTop: 'var(--space-6)' }}>
            Use Satoshi Medium for headline roles and Regular for body copy — see Type usage below for the
            exact sizes. Fraunces no longer appears anywhere in live UI; it's reserved exclusively for the{' '}
            <a href="/logos" style={{ color: 'var(--color-accent-serialized)' }}>
              logo lockup
            </a>
            , where it's baked into the artwork rather than rendered as text.
          </p>
        </div>
        <div className="font-showcase__content">
          <div className="font-showcase__cards">
            {PRIMARY_VARIANTS.map((v) => (
              <div className="font-showcase__card" key={v.name}>
                <span className="font-showcase__card-role">{v.role}</span>
                <div className="font-showcase__card-name" style={v.style}>
                  {v.name}
                </div>
                <div className="font-showcase__card-alphabet" style={v.alphabetStyle}>
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  0123456789
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="font-showcase font-showcase--label-left font-showcase--no-divider" id="secondary-font">
        <div className="font-showcase__info">
          <div className="font-showcase__label">
            <span>Typography</span>
            <span>Secondary font</span>
          </div>
          <p>
            Roboto Mono is the secondary typeface for the Serialized brand. Anything literal goes here — data,
            code, addresses, labels.
          </p>
          <p style={{ marginTop: 'var(--space-6)' }}>
            Always use Regular weight, never bold or italic. It's how we show precision: numbers and values
            presented exactly as they are, never styled for decoration.
          </p>
        </div>
        <div className="font-showcase__content">
          <div className="font-showcase__cards font-showcase__cards--single">
            {SECONDARY_VARIANTS.map((v) => (
              <div className="font-showcase__card" key={v.name}>
                <span className="font-showcase__card-role">{v.role}</span>
                <div className="font-showcase__card-name" style={v.style}>
                  {v.name}
                </div>
                <div className="font-showcase__card-alphabet" style={v.style}>
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  0123456789
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section" id="type-usage">
        <h2>Type usage</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>
          Six sizes, each with its font, spacing, and line height already dialed in. Pick from this list
          instead of choosing a one-off size.
        </p>
        <div className="type-scale">
          {TYPE_SCALE.map((row) => (
            <div className="type-scale__row" key={row.name}>
              <div className="type-scale__meta">
                <span className="type-scale__meta-name">{row.name}</span>
                <span className="type-scale__meta-detail">{row.font}</span>
                <span className="type-scale__meta-detail">Tracking {row.tracking}</span>
                <span className="type-scale__meta-detail">Line height {row.lineHeight}</span>
              </div>
              <div className={`type-scale__sample ${row.className}`}>{row.sample}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
