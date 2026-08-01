import { useState } from 'react'
import './AssetActions.css'

export interface AssetActionsProps {
  svg: string
  href: string
  filename: string
  tone?: 'dark' | 'light'
}

export function AssetActions({ svg, href, filename, tone = 'dark' }: AssetActionsProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(svg)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function handleDownload() {
    const link = document.createElement('a')
    link.href = href
    link.download = filename
    link.click()
  }

  return (
    <div className={`asset-actions asset-actions--on-${tone}`}>
      <button type="button" className="asset-actions__btn" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy SVG'}
      </button>
      <button type="button" className="asset-actions__btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  )
}
