import { useState, type KeyboardEvent } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { AssetActions } from './AssetActions'
import './AssetCarousel.css'

export interface AssetCarouselItem {
  path: string
  src: string
}

function assetLabel(path: string) {
  return path.split('/').pop()!.replace(/\.png$/i, '')
}

export function AssetCarousel({ items, dimensions }: { items: AssetCarouselItem[]; dimensions: string }) {
  const [index, setIndex] = useState(0)

  if (items.length === 0) return null

  const current = items[index]
  const label = assetLabel(current.path)
  const tone = /light/i.test(label) ? 'light' : 'dark'

  function go(delta: number) {
    setIndex((i) => (i + delta + items.length) % items.length)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  return (
    <div className="asset-carousel" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="asset-carousel__stage">
        {items.length > 1 && (
          <button
            type="button"
            className="asset-carousel__nav asset-carousel__nav--prev"
            onClick={() => go(-1)}
            aria-label="Previous banner"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
        )}

        <div className="asset-carousel__preview">
          <img src={current.src} alt={label} />
          <AssetActions href={current.src} filename={label} tone={tone} />
        </div>

        {items.length > 1 && (
          <button
            type="button"
            className="asset-carousel__nav asset-carousel__nav--next"
            onClick={() => go(1)}
            aria-label="Next banner"
          >
            <CaretRight size={18} weight="bold" />
          </button>
        )}
      </div>

      <div className="asset-carousel__meta">
        <span className="asset-carousel__name">{label}</span>
        <span className="asset-carousel__count">
          {index + 1} / {items.length} · {dimensions}
        </span>
      </div>

      {items.length > 1 && (
        <div className="asset-carousel__thumbs">
          {items.map((item, i) => (
            <button
              key={item.path}
              type="button"
              className={`asset-carousel__thumb${i === index ? ' asset-carousel__thumb--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show ${assetLabel(item.path)}`}
              aria-current={i === index}
            >
              <img src={item.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
