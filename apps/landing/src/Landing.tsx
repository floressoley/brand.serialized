import horizontalOnDark from './assets/serialized-horizontal-on-dark.svg'
import { HexHero, InteractiveGrid, ShinyButton } from '@serialized/ui'
import './Landing.css'

/**
 * Landing hero, v3 — centered composition (eyebrow/h1/lede/CTA stacked and
 * centered, like Gantry's hero). InteractiveGrid now runs full-bleed behind
 * the text as ambient background (a grid of dots that light up and connect
 * to the cursor, hue cycling with position). HexHero moved down to a strip
 * along the bottom edge of the hero instead of running as the background.
 *
 * MagnetLines and AsciiTrail are intentionally not used here anymore — kept
 * as components for reuse elsewhere, not deleted — since the split-layout
 * they were designed for no longer exists. The earlier SignalBars barcode
 * strip was removed outright (not kept for reuse).
 */

function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <a href="#" aria-label={label} className="landing-social__icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  )
}

export function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header__pill">
          <img src={horizontalOnDark} alt="Serialized" className="landing-header__logo" />
          <nav className="landing-header__nav">
            <a href="#docs" className="landing-header__link">
              Docs
            </a>
            <a href="#pricing" className="landing-header__link">
              Pricing
            </a>
            <a href="#build" className="landing-header__link">
              Build with us
            </a>
          </nav>
          <ShinyButton className="landing-header__cta">Get API Key</ShinyButton>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero__bg">
          <InteractiveGrid />
        </div>
        <div className="landing-hero__vignette" />

        <div className="landing-hero__content">
          <div className="landing-eyebrow">WSS \ REST API \ AGENTIC \ ONE API</div>
          <h1 className="landing-h1">
            Every block,
            <br />
            <span className="landing-h1__accent">deserialized</span>
          </h1>
          <p className="landing-lede">
            Real-time prices, metadata and wallet activity across every chain, normalized and served through one
            fast API.
          </p>
          <div className="landing-social">
            <SocialIcon
              label="X"
              path="M9.31 6.86 14.86 1h-1.34L8.72 5.96 4.99 1H0l5.82 8.24L0 15h1.34l5.1-5.28L10.5 15h4.99L9.31 6.86Zm-1.8 1.87-.59-.82L2.02 1.94h2.1l3.79 5.3.59.82 4.98 6.96H11.4L7.51 8.73Z"
            />
            <SocialIcon
              label="Telegram"
              path="M14.72 1.85 12.5 13.9c-.17.75-.6.93-1.22.58l-3.37-2.48-1.63 1.57c-.18.18-.33.33-.68.33l.24-3.44 6.27-5.67c.27-.24-.06-.38-.42-.14L4.1 8.75.85 7.74C.12 7.51.11 7.01.99 6.66L13.75 1.7c.6-.22 1.13.15.97 1.15Z"
            />
            <SocialIcon
              label="GitHub"
              path="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.48c-2.22.48-2.69-1.07-2.69-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.32.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.88.31-1.6.83-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.83a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.83 2.2-.83.44 1.11.16 1.93.08 2.13.52.56.83 1.27.83 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"
            />
          </div>
        </div>

        <div className="landing-hero__strip">
          <HexHero pace="live" />
        </div>
      </section>

      <footer className="landing-statusbar">
        <span className="landing-statusbar__cell">
          <span className="landing-statusbar__dot" />
          API: <strong>OPERATIONAL</strong>
        </span>
        <span className="landing-statusbar__cell landing-statusbar__cell--center">
          REST &amp; WEBSOCKET / SUB-100MS / REALTIME DATA
        </span>
        <span className="landing-statusbar__cell landing-statusbar__cell--right">100+ CHAINS</span>
      </footer>
    </div>
  )
}
