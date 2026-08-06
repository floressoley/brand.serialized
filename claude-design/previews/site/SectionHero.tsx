import './SectionHero.css'

export interface SectionHeroProps {
  eyebrow?: string
}

export function SectionHero({ eyebrow }: SectionHeroProps) {
  return (
    <div className="section-hero">
      {eyebrow && (
        <div className="section-hero__content">
          <p className="section-hero__eyebrow">{eyebrow}</p>
        </div>
      )}
    </div>
  )
}
