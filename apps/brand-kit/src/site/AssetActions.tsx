import { useState } from 'react'
import { triggerDownload } from './download'
import './AssetActions.css'

export interface AssetActionsProps {
  svg?: string
  href: string
  filename: string
  tone?: 'dark' | 'light'
}

// Renders the SVG onto an offscreen canvas at a fixed pixel density so the
// exported PNG stays crisp — logos have no natural raster size to draw from.
const PNG_EXPORT_SCALE = 4

async function rasterizeSvgToPng(svg: string): Promise<Blob> {
  const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)
  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = svgUrl
    })
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth * PNG_EXPORT_SCALE
    canvas.height = img.naturalHeight * PNG_EXPORT_SCALE
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('canvas export failed'))), 'image/png')
    })
  } finally {
    URL.revokeObjectURL(svgUrl)
  }
}

export function AssetActions({ svg, href, filename, tone = 'dark' }: AssetActionsProps) {
  const [renderingPng, setRenderingPng] = useState(false)

  function handleDownloadSvg() {
    triggerDownload(href, `${filename}.svg`)
  }

  function handleDownloadRasterPng() {
    triggerDownload(href, `${filename}.png`)
  }

  async function handleDownloadRenderedPng() {
    if (!svg || renderingPng) return
    setRenderingPng(true)
    try {
      const blob = await rasterizeSvgToPng(svg)
      const url = URL.createObjectURL(blob)
      triggerDownload(url, `${filename}.png`)
      URL.revokeObjectURL(url)
    } finally {
      setRenderingPng(false)
    }
  }

  return (
    <div className={`asset-actions asset-actions--on-${tone}`}>
      {svg ? (
        <>
          <button type="button" className="asset-actions__btn" onClick={handleDownloadSvg}>
            SVG
          </button>
          <button type="button" className="asset-actions__btn" onClick={handleDownloadRenderedPng} disabled={renderingPng}>
            {renderingPng ? '…' : 'PNG'}
          </button>
        </>
      ) : (
        <button type="button" className="asset-actions__btn" onClick={handleDownloadRasterPng}>
          Download
        </button>
      )}
    </div>
  )
}
