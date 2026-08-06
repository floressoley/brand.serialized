import { Link } from 'react-router-dom'
import { SectionHero } from '../SectionHero'
import '../../../components/Button/Button.css'
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
  { to: '/identity', title: 'Identity' },
  { to: '/logos', title: 'Logos' },
  { to: '/typography', title: 'Typography' },
  { to: '/color', title: 'Color' },
  { to: '/sub-brands', title: 'Sub Brands' },
  { to: '/in-use', title: 'In Use' },
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
          {PILLARS.map((pillar) => (
            <div className="pillar" key={pillar.title}>
              <div className="pillar__label">
                <span className="pillar__label-title">{pillar.title}</span>
              </div>
              <p className="pillar__body">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>In this kit</h2>
          <div className="map-links">
            {MAP.map((item) => (
              <Link className="btn btn--secondary" to={item.to} key={item.to}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
