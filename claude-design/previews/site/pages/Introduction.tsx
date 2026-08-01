import { Link } from 'react-router-dom'
import { SectionHero } from '../SectionHero'
import './Introduction.css'

const PILLARS = [
  {
    title: 'Trust',
    body: 'Consistency and restraint over decoration. Grayscale-first UI, color only where it carries meaning. No visual noise competing with the data being presented.',
  },
  {
    title: 'Precision',
    body: 'Monospace for anything literal — data, code, addresses, hashes. A tight, deliberate grid. Numbers are presented as-is, legibly, never as decoration.',
  },
  {
    title: 'Excellence',
    body: 'Editorial polish where warmth is allowed, engineering rigor everywhere else. Premium and technical, not one at the expense of the other.',
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
        <p className="content__lede">
          A monochromatic system built for Trust, Precision, and Excellence. Grayscale carries the structure;
          color is reserved for meaning — brand identity, product identity, and state. Here's what keeps it
          recognizable, and where each part lives.
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
