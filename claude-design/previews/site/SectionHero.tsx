import { MagnetLines } from '../../components/MagnetLines/MagnetLines'
import './SectionHero.css'

export interface SectionHeroProps {
  eyebrow: string
}

export function SectionHero({ eyebrow }: SectionHeroProps) {
  return (
    <div className="section-hero">
      <MagnetLines />
      <div className="section-hero__content">
        <p className="section-hero__eyebrow">{eyebrow}</p>
      </div>
    </div>
  )
}
