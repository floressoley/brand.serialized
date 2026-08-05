import { Link } from 'react-router-dom'
import { SectionHero } from '../SectionHero'
import './Introduction.css'

const PILLARS = [
  {
    title: 'Intelligence',
    body: 'Raw data becomes signal. Closed-source contracts decompiled, onchain activity structured and interpreted — builders get meaning, not just a feed.',
  },
  {
    title: 'Excellence',
    body: 'Editorial polish where warmth is allowed, engineering rigor everywhere else. Premium and technical, not one at the expense of the other.',
  },
  {
    title: 'Accuracy',
    body: "Wrong isn't an option when real money moves through the pipes. Verification and confidence are built into the product, not bolted on after.",
  },
  {
    title: 'Premium',
    body: 'Premium, not exclusive. The bar is high because the stakes are high — not to gatekeep who gets to build.',
  },
]

const MAP = [
  { to: '/identity', title: 'Identity', desc: 'What Serialized is, why it exists, and what it stands for — plus voice and tone.' },
  { to: '/logos', title: 'Logos', desc: 'The mark, lockups, clearspace, minimum size.' },
  { to: '/typography', title: 'Typography', desc: 'Fraunces, Satoshi, Roboto Mono — and when to use each.' },
  { to: '/color', title: 'Color', desc: 'Grayscale base, brand and product accent lanes, semantic states.' },
  { to: '/sub-brands', title: 'Sub Brands', desc: 'Serialized.Audit — the product identity for SerializedAudit.io.' },
  { to: '/in-use', title: 'In Use', desc: 'The system applied — buttons, badges, cards, and data tables.' },
]

export function Introduction() {
  return (
    <div>
      <SectionHero />

      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Introduction</p>
        <p className="intro-statement">
          Serialized is the onchain intelligence layer for builders who can't afford to be wrong. Grayscale
          carries the structure; color is reserved for meaning.
        </p>

        <div className="pillars">
          {PILLARS.map((pillar, i) => (
            <div className="pillar" key={pillar.title}>
              <div className="pillar__label">
                <span className="pillar__label-index">0{i + 1}</span>
                <span className="pillar__label-title">{pillar.title.toUpperCase()}</span>
              </div>
              <p className="pillar__body">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>In this kit</h2>
          <div className="map-grid">
            {MAP.map((item) => (
              <Link className="map-card" to={item.to} key={item.to}>
                <p className="map-card__title">{item.title}</p>
                <p className="map-card__desc">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
