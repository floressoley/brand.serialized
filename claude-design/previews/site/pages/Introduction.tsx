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
  { to: '/voice', title: 'Voice & Messaging', desc: 'How Serialized sounds — pillars, tone, imagery direction.' },
  { to: '/identity', title: 'Marks & Lockups', desc: 'The mark, lockups, clearspace, minimum size.' },
  { to: '/color', title: 'Color', desc: 'Grayscale base, brand and product accent lanes, semantic states.' },
  { to: '/typography', title: 'Typography', desc: 'Fraunces, Satoshi, Roboto Mono — and when to use each.' },
  { to: '/sub-brands', title: 'Sub Brands', desc: 'Serialized.Audit — the product identity for SerializedAudit.io.' },
  { to: '/in-use', title: 'In Use', desc: 'The system applied — buttons, badges, cards, and data tables.' },
]

export function Introduction() {
  return (
    <div>
      <SectionHero eyebrow="Brand Kit · Introduction" />

      <div className="page-body">
        <h1 className="content__title">
          The onchain intelligence layer for builders who can't afford to be wrong.
        </h1>
        <p className="content__lede">
          Serialized is a B2B API platform that gives crypto builders an intelligence edge — read closed-source
          contracts, get clean onchain data, and route transactions with precision, all through a single
          platform. This is the monochromatic system built to carry that positioning: grayscale carries the
          structure, color is reserved for meaning. Here's what keeps it recognizable, and where each part lives.
        </p>

        <div className="pillars">
          {PILLARS.map((pillar, i) => (
            <div className="pillar" key={pillar.title}>
              <div className="pillar__index">0{i + 1}</div>
              <h3 className="pillar__title">{pillar.title}</h3>
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
