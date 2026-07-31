import type { ReactNode } from 'react'

export interface PageHeaderProps {
  eyebrow: string
  title: string
  lede: ReactNode
}

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <>
      <p className="content__eyebrow">{eyebrow}</p>
      <h1 className="content__title">{title}</h1>
      <p className="content__lede">{lede}</p>
    </>
  )
}
