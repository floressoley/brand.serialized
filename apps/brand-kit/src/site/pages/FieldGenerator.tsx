import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react'
import { computeBarAngle } from '@serialized/ui/MagnetLines/angle'
import { triggerDownload } from '../download'
import { SectionHero } from '../SectionHero'
import {
  DEFAULT_FIELD_SETTINGS,
  PRESET_DEFAULTS,
  buildDropInCode,
  buildGrid,
  buildStandaloneSvg,
} from './fieldGeneratorMath'
import type { Bar, FieldPreset, FieldSettings, Pole } from './fieldGeneratorMath'
import '@serialized/ui/MagnetLines/MagnetLines.css'
import './FieldGenerator.css'

const STORAGE_KEY = 'serialized-line-field-settings'

const PRESET_OPTIONS: { value: FieldPreset; label: string }[] = [
  { value: 'livecursor', label: 'Live cursor (reference port)' },
  { value: 'twin', label: 'Twin swirl' },
  { value: 'single', label: 'Single vortex' },
  { value: 'perspective', label: 'Perspective sweep' },
  { value: 'wave', label: 'Diagonal wave' },
]

const POLE_SIGN_OPTIONS: { value: 1 | -1; label: string }[] = [
  { value: 1, label: 'Swirl clockwise' },
  { value: -1, label: 'Swirl counter-clockwise' },
]

const SIZE_PRESETS = [
  { label: 'X banner', w: 1500, h: 500 },
  { label: 'LinkedIn cover', w: 1584, h: 396 },
  { label: 'Square', w: 1080, h: 1080 },
  { label: 'Story', w: 1080, h: 1920 },
]

const LINE_SWATCHES = ['#F0EFEC', '#B4B2A9', '#5F5E5A']
const BG_SWATCHES = ['#0A0A09', '#F0EFEC']

function isValidHex(v: string) {
  return /^#([0-9a-fA-F]{6})$/.test(v)
}

function displaySize(w: number, h: number) {
  const displayW = Math.min(w, 640)
  const displayH = displayW * (h / w)
  return { displayW, displayH }
}

function RangeField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}) {
  return (
    <div className="field-gen__control">
      <div className="field-gen__label-row">
        <label>{label}</label>
        <span className="field-gen__val">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

function NumberStepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  function step(dir: 1 | -1) {
    const next = Math.min(max, Math.max(min, value + dir * 10))
    onChange(next)
  }
  return (
    <div className="field-gen__number-field">
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || min)}
      />
      <span className="field-gen__stepper">
        <button type="button" aria-label="Increase" onClick={() => step(1)}>
          <CaretUp size={8} weight="bold" />
        </button>
        <button type="button" aria-label="Decrease" onClick={() => step(-1)}>
          <CaretDown size={8} weight="bold" />
        </button>
      </span>
    </div>
  )
}

interface SelectOption<T extends string | number> {
  value: T
  label: string
}

function FieldSelect<T extends string | number>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T
  options: SelectOption<T>[]
  onChange: (v: T) => void
  ariaLabel: string
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => options.findIndex((o) => o.value === value))
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDocPointerDown)
    return () => document.removeEventListener('pointerdown', onDocPointerDown)
  }, [])

  useEffect(() => {
    if (open) setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)))
  }, [open, value, options])

  function commit(index: number) {
    const opt = options[index]
    if (!opt) return
    onChange(opt.value)
    setOpen(false)
  }

  function handleKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(options.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveIndex(options.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      commit(activeIndex)
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  const current = options.find((o) => o.value === value)

  return (
    <div className="field-gen__select" ref={rootRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`field-gen__select-trigger${open ? ' field-gen__select-trigger--open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current?.label ?? ''}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`field-gen__select-caret${open ? ' field-gen__select-caret--open' : ''}`}
        />
      </button>
      {open && (
        <ul className="field-gen__select-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((opt, i) => {
            const selected = opt.value === value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={`field-gen__select-option${i === activeIndex ? ' field-gen__select-option--active' : ''}${selected ? ' field-gen__select-option--selected' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => commit(i)}
              >
                <span>{opt.label}</span>
                {selected && <Check size={12} weight="bold" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function ColorField({
  label,
  hex,
  onChange,
}: {
  label: string
  hex: string
  onChange: (hex: string) => void
}) {
  const [draft, setDraft] = useState(hex.toUpperCase())

  useEffect(() => setDraft(hex.toUpperCase()), [hex])

  function commitDraft() {
    if (isValidHex(draft)) onChange(draft)
    else setDraft(hex.toUpperCase())
  }

  return (
    <div className="field-gen__color-field">
      <input type="color" value={hex} onChange={(e) => onChange(e.target.value)} />
      <input
        type="text"
        className="field-gen__hexinput"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commitDraft}
        onKeyDown={(e) => e.key === 'Enter' && commitDraft()}
      />
      <span className="field-gen__color-label">{label}</span>
    </div>
  )
}

interface SavedPayload extends FieldSettings {
  savedAt: number
}

function formatSavedTime(ts: number) {
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.toDateString() === today.toDateString()
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return sameDay ? time : `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${time}`
}

export function FieldGenerator() {
  const [settings, setSettings] = useState<FieldSettings>(DEFAULT_FIELD_SETTINGS)
  const [mouseNorm, setMouseNorm] = useState<{ x: number; y: number } | undefined>(undefined)
  const [savedPanelOpen, setSavedPanelOpen] = useState(false)
  const [saved, setSaved] = useState<SavedPayload | null>(null)
  const [toast, setToast] = useState('')
  const [exportText, setExportText] = useState('')
  const [sizePresetActive, setSizePresetActive] = useState<string | null>(null)

  const svgRef = useRef<SVGSVGElement | null>(null)
  const liveStageRef = useRef<HTMLDivElement | null>(null)
  const liveBarsRef = useRef<(HTMLSpanElement & { _prev?: number })[]>([])
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 1400)
  }

  function patch(next: Partial<FieldSettings>) {
    setSettings((s) => ({ ...s, ...next }))
  }

  function applyPreset(preset: FieldPreset) {
    setSizePresetActive(null)
    setSettings((s) => ({ ...s, preset, ...PRESET_DEFAULTS[preset] }))
  }

  // --- live cursor preset: page-owned bars, driven by the shared rotation math ---
  useEffect(() => {
    if (settings.preset !== 'livecursor') return
    const stage = liveStageRef.current
    if (!stage) return

    const items = liveBarsRef.current
    items.forEach((item) => {
      item._prev = settings.baseAngle
    })

    function onMove(pointer: { clientX: number; clientY: number }) {
      for (const item of items) {
        const rect = item.getBoundingClientRect()
        const centerX = rect.x + rect.width / 2
        const centerY = rect.y + rect.height / 2
        const prev = item._prev ?? settings.baseAngle
        item._prev = computeBarAngle(centerX, centerY, pointer.clientX, pointer.clientY, prev)
        item.style.setProperty('--rotate', `${item._prev}deg`)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    const raf = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect()
      onMove({ clientX: rect.left - rect.width * 0.35, clientY: rect.top + rect.height * 0.55 })
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.preset, settings.rows, settings.cols, settings.baseAngle])

  const { displayW, displayH } = displaySize(settings.w, settings.h)

  const bars: Bar[] = useMemo(() => {
    if (settings.preset === 'livecursor') return []
    return buildGrid(settings, settings.reactive ? mouseNorm : undefined)
  }, [settings, mouseNorm])

  function handleSvgMouseMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!settings.reactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseNorm({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
  }

  function handlePoleDrag(idx: number) {
    return (e: ReactPointerEvent<SVGCircleElement>) => {
      e.preventDefault()
      const svg = svgRef.current
      if (!svg) return
      function move(ev: PointerEvent) {
        const rect = svg!.getBoundingClientRect()
        const nx = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width))
        const ny = Math.min(1, Math.max(0, (ev.clientY - rect.top) / rect.height))
        setSettings((s) => {
          const poles = s.poles.slice()
          poles[idx] = { ...poles[idx], x: nx, y: ny }
          return { ...s, poles }
        })
      }
      function up() {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    }
  }

  // --- current lines snapshot, for export (reads live DOM angles for the cursor preset) ---
  function getCurrentLines(): Bar[] {
    if (settings.preset === 'livecursor') {
      const { displayW: dw, displayH: dh } = displaySize(settings.w, settings.h)
      const scaleX = settings.w / dw
      const scaleY = settings.h / dh
      const stage = liveStageRef.current
      if (!stage) return []
      const stageRect = stage.getBoundingClientRect()
      return liveBarsRef.current.map((item) => {
        const r = item.getBoundingClientRect()
        const cx = (r.x + r.width / 2 - stageRect.x) * scaleX
        const cy = (r.y + r.height / 2 - stageRect.y) * scaleY
        const rot = item._prev ?? settings.baseAngle
        const rad = (rot * Math.PI) / 180
        const half = settings.len / 2
        const dx = half * Math.sin(rad)
        const dy = -half * Math.cos(rad)
        return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy }
      })
    }
    return buildGrid(settings)
  }

  function openExport(text: string) {
    setExportText(text)
  }

  function handleCopySvg() {
    const text = buildStandaloneSvg(settings, getCurrentLines())
    openExport(text)
    navigator.clipboard.writeText(text).then(() => showToast('SVG copied — paste into Figma'))
  }

  function handleCopyCode() {
    const text = buildDropInCode(settings, getCurrentLines())
    openExport(text)
    navigator.clipboard.writeText(text).then(() => showToast('Drop-in code copied'))
  }

  function handleDownloadSvg() {
    const text = buildStandaloneSvg(settings, getCurrentLines())
    const blob = new Blob([text], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    triggerDownload(url, 'serialized-line-field.svg')
    URL.revokeObjectURL(url)
    showToast('SVG downloaded')
  }

  function handleDownloadPng() {
    try {
      const lines = getCurrentLines()
      const canvas = document.createElement('canvas')
      canvas.width = settings.w
      canvas.height = settings.h
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = settings.bg
      ctx.fillRect(0, 0, settings.w, settings.h)
      ctx.strokeStyle = settings.line
      ctx.lineWidth = settings.thick
      ctx.lineCap = 'round'
      lines.forEach((b) => {
        ctx.beginPath()
        ctx.moveTo(b.x1, b.y1)
        ctx.lineTo(b.x2, b.y2)
        ctx.stroke()
      })
      canvas.toBlob((blob) => {
        if (!blob) {
          showToast('PNG export failed')
          return
        }
        const url = URL.createObjectURL(blob)
        triggerDownload(url, 'serialized-line-field.png')
        URL.revokeObjectURL(url)
        showToast('PNG downloaded')
      }, 'image/png')
    } catch {
      showToast('PNG export failed')
    }
  }

  function handleReset() {
    setSettings(DEFAULT_FIELD_SETTINGS)
    setSizePresetActive(null)
    showToast('Reset to defaults')
  }

  function handleSave() {
    try {
      const payload: SavedPayload = { ...settings, savedAt: Date.now() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      setSaved(payload)
      showToast('Settings saved')
    } catch {
      showToast('Could not save settings')
    }
  }

  function handleLoadSaved() {
    if (!saved) return
    const { savedAt, ...rest } = saved
    void savedAt
    setSettings({ ...DEFAULT_FIELD_SETTINGS, ...rest })
    setSizePresetActive(null)
    showToast('Loaded saved settings')
  }

  function handleDeleteSaved() {
    localStorage.removeItem(STORAGE_KEY)
    setSaved(null)
    showToast('Saved settings cleared')
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const payload = JSON.parse(raw) as SavedPayload
        setSaved(payload)
        const { savedAt, ...rest } = payload
        void savedAt
        setSettings({ ...DEFAULT_FIELD_SETTINGS, ...rest })
      }
    } catch {
      // ignore corrupt storage
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showReactiveSection = settings.preset === 'twin' || settings.preset === 'single'
  const showNoise = settings.preset !== 'livecursor'

  return (
    <div>
      <SectionHero />
      <div className="page-body">
        <p className="content__eyebrow">Brand Kit · Media Kit · Field Generator</p>
        <p className="content__lede">
          Generative magnetic line field tool. Tune the field, export SVG for Figma, or copy CSS/HTML matching the
          site's <code>.magnet-lines</code> system.
        </p>

        <div className="section" id="generator">
          <div className="field-gen">
            <div className="field-gen__controls">
              <div className="field-gen__actions-row">
                <button type="button" className="field-gen__btn" onClick={handleReset}>
                  Reset
                </button>
                <button type="button" className="field-gen__btn" onClick={handleSave}>
                  Save settings
                </button>
              </div>
              <button
                type="button"
                className="field-gen__btn field-gen__btn--full"
                onClick={() => setSavedPanelOpen((o) => !o)}
              >
                View saved settings
              </button>
              {savedPanelOpen && (
                <div className="field-gen__saved-panel">
                  {!saved ? (
                    <p className="field-gen__empty">
                      No saved settings yet. Tune the field the way you like it, then hit "Save settings" to keep it
                      for next time.
                    </p>
                  ) : (
                    <>
                      <div className="field-gen__saved-row">
                        <span>Saved</span>
                        <span>{formatSavedTime(saved.savedAt)}</span>
                      </div>
                      <div className="field-gen__saved-row">
                        <span>Pattern</span>
                        <span>{PRESET_OPTIONS.find((p) => p.value === saved.preset)?.label ?? saved.preset}</span>
                      </div>
                      <div className="field-gen__saved-row">
                        <span>Canvas</span>
                        <span>
                          {saved.w} × {saved.h}
                        </span>
                      </div>
                      <div className="field-gen__saved-row">
                        <span>Grid</span>
                        <span>
                          {saved.rows} rows × {saved.cols} cols
                        </span>
                      </div>
                      <div className="field-gen__saved-actions">
                        <button type="button" className="field-gen__btn" onClick={handleLoadSaved}>
                          Load
                        </button>
                        <button type="button" className="field-gen__btn field-gen__btn--danger" onClick={handleDeleteSaved}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="field-gen__export-sticky">
                <div className="field-gen__export-grid">
                  <button
                    type="button"
                    className="field-gen__btn field-gen__btn--primary"
                    onClick={handleCopySvg}
                  >
                    Copy SVG
                  </button>
                  <button type="button" className="field-gen__btn" onClick={handleCopyCode}>
                    Copy code
                  </button>
                  <button type="button" className="field-gen__btn" onClick={handleDownloadSvg}>
                    Download .svg
                  </button>
                  <button type="button" className="field-gen__btn" onClick={handleDownloadPng}>
                    Download .png
                  </button>
                </div>
              </div>
              {exportText && (
                <div className="field-gen__export-panel">
                  <textarea readOnly value={exportText} onFocus={(e) => e.target.select()} />
                </div>
              )}

              <div className="field-gen__section">
                <label>Field pattern</label>
                <FieldSelect
                  value={settings.preset}
                  options={PRESET_OPTIONS}
                  onChange={applyPreset}
                  ariaLabel="Field pattern"
                />

                {settings.preset === 'livecursor' && (
                  <RangeField
                    label="Base angle"
                    value={settings.baseAngle}
                    display={`${settings.baseAngle}°`}
                    min={-180}
                    max={180}
                    onChange={(v) => patch({ baseAngle: v })}
                  />
                )}
                {settings.preset === 'single' && (
                  <div className="field-gen__control">
                    <label style={{ display: 'block', marginBottom: 4 }}>Pole polarity</label>
                    <FieldSelect
                      value={settings.poles[0]?.sign ?? 1}
                      options={POLE_SIGN_OPTIONS}
                      onChange={(sign) => setSettings((s) => ({ ...s, poles: [{ ...s.poles[0], sign }] }))}
                      ariaLabel="Pole polarity"
                    />
                  </div>
                )}
                {settings.preset === 'perspective' && (
                  <>
                    <RangeField
                      label="Sweep start"
                      value={settings.perspective.start}
                      display={`${settings.perspective.start}°`}
                      min={-180}
                      max={180}
                      onChange={(v) => patch({ perspective: { ...settings.perspective, start: v } })}
                    />
                    <RangeField
                      label="Sweep end"
                      value={settings.perspective.end}
                      display={`${settings.perspective.end}°`}
                      min={-180}
                      max={270}
                      onChange={(v) => patch({ perspective: { ...settings.perspective, end: v } })}
                    />
                    <RangeField
                      label="Foreshorten"
                      value={settings.perspective.foreshorten}
                      display={`${settings.perspective.foreshorten}`}
                      min={0.5}
                      max={3}
                      step={0.1}
                      onChange={(v) => patch({ perspective: { ...settings.perspective, foreshorten: v } })}
                    />
                  </>
                )}
                {settings.preset === 'wave' && (
                  <>
                    <RangeField
                      label="Amplitude"
                      value={settings.wave.amp}
                      display={`${settings.wave.amp}°`}
                      min={0}
                      max={90}
                      onChange={(v) => patch({ wave: { ...settings.wave, amp: v } })}
                    />
                    <RangeField
                      label="Frequency"
                      value={settings.wave.freq}
                      display={`${settings.wave.freq}`}
                      min={0.02}
                      max={0.6}
                      step={0.01}
                      onChange={(v) => patch({ wave: { ...settings.wave, freq: v } })}
                    />
                    <RangeField
                      label="Base angle"
                      value={settings.wave.base}
                      display={`${settings.wave.base}°`}
                      min={-90}
                      max={90}
                      onChange={(v) => patch({ wave: { ...settings.wave, base: v } })}
                    />
                  </>
                )}
              </div>

              <div className="field-gen__section">
                <label>Canvas size</label>
                <div className="field-gen__sizepresets">
                  {SIZE_PRESETS.map((sp) => (
                    <button
                      key={sp.label}
                      type="button"
                      className={`field-gen__btn${sizePresetActive === sp.label ? ' field-gen__btn--active' : ''}`}
                      onClick={() => {
                        setSizePresetActive(sp.label)
                        patch({ w: sp.w, h: sp.h })
                      }}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
                <div className="field-gen__row">
                  <NumberStepper
                    value={settings.w}
                    min={200}
                    max={3000}
                    onChange={(v) => {
                      setSizePresetActive(null)
                      patch({ w: v })
                    }}
                  />
                  <span className="field-gen__muted">×</span>
                  <NumberStepper
                    value={settings.h}
                    min={200}
                    max={3000}
                    onChange={(v) => {
                      setSizePresetActive(null)
                      patch({ h: v })
                    }}
                  />
                </div>
              </div>

              <div className="field-gen__section">
                <RangeField
                  label="Rows"
                  value={settings.rows}
                  display={`${settings.rows}`}
                  min={4}
                  max={70}
                  onChange={(v) => patch({ rows: v })}
                />
                <RangeField
                  label="Columns"
                  value={settings.cols}
                  display={`${settings.cols}`}
                  min={4}
                  max={90}
                  onChange={(v) => patch({ cols: v })}
                />
              </div>

              <div className="field-gen__section">
                <RangeField
                  label="Line length"
                  value={settings.len}
                  display={`${settings.len}px`}
                  min={4}
                  max={60}
                  onChange={(v) => patch({ len: v })}
                />
                <RangeField
                  label="Line thickness"
                  value={settings.thick}
                  display={`${settings.thick}px`}
                  min={0.5}
                  max={8}
                  step={0.1}
                  onChange={(v) => patch({ thick: v })}
                />
                {showNoise && (
                  <RangeField
                    label="Noise / jitter"
                    value={settings.noise}
                    display={`${settings.noise}°`}
                    min={0}
                    max={25}
                    onChange={(v) => patch({ noise: v })}
                  />
                )}
              </div>

              <div className="field-gen__section">
                <label>Colors</label>
                <ColorField label="Background" hex={settings.bg} onChange={(hex) => patch({ bg: hex })} />
                <ColorField label="Lines" hex={settings.line} onChange={(hex) => patch({ line: hex })} />
                <div className="field-gen__swatches">
                  {LINE_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      className={`field-gen__sw${settings.line.toLowerCase() === hex.toLowerCase() ? ' field-gen__sw--active' : ''}`}
                      style={{ background: hex }}
                      title={hex}
                      onClick={() => patch({ line: hex })}
                    />
                  ))}
                  {BG_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      className={`field-gen__sw${settings.bg.toLowerCase() === hex.toLowerCase() ? ' field-gen__sw--active' : ''}`}
                      style={{ background: hex, borderColor: hex === '#0A0A09' ? '#444' : undefined }}
                      title={hex}
                      onClick={() => patch({ bg: hex })}
                    />
                  ))}
                </div>
              </div>

              {showReactiveSection && (
                <div className="field-gen__section">
                  <RangeField
                    label="Pole marker size"
                    value={settings.poleSize}
                    display={`${settings.poleSize.toFixed(1)}x`}
                    min={0.3}
                    max={3}
                    step={0.1}
                    onChange={(v) => patch({ poleSize: v })}
                  />
                  <RangeField
                    label="Field reach"
                    value={settings.fieldReach}
                    display={settings.fieldReach.toFixed(2)}
                    min={0}
                    max={0.6}
                    step={0.01}
                    onChange={(v) => patch({ fieldReach: v })}
                  />
                  <div className="field-gen__checkbox-row">
                    <input
                      type="checkbox"
                      id="reactive"
                      checked={settings.reactive}
                      onChange={(e) => patch({ reactive: e.target.checked })}
                    />
                    <label htmlFor="reactive" style={{ textTransform: 'none', fontSize: 12 }}>
                      Mouse-reactive preview (vortex only)
                    </label>
                  </div>
                  <button
                    type="button"
                    className="field-gen__btn field-gen__btn--full"
                    onClick={() => patch({ seed: Math.random() * 1000 })}
                  >
                    Shuffle jitter seed
                  </button>
                </div>
              )}

            </div>

            <div className="field-gen__stage-wrap">
              <div className="field-gen__stage" style={{ width: displayW, height: displayH }}>
                {settings.preset === 'livecursor' ? (
                  <div
                    ref={liveStageRef}
                    className="magnet-lines"
                    style={{
                      background: settings.bg,
                      gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
                      gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
                    }}
                  >
                    {Array.from({ length: settings.rows * settings.cols }, (_, i) => (
                      <span
                        key={i}
                        ref={(el) => {
                          if (el) liveBarsRef.current[i] = el
                        }}
                        className="magnet-lines__bar"
                        style={
                          {
                            width: `${settings.thick}px`,
                            height: `${settings.len}px`,
                            background: settings.line,
                            '--rotate': `${settings.baseAngle}deg`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <svg
                    ref={svgRef}
                    viewBox={`0 0 ${settings.w} ${settings.h}`}
                    width={displayW}
                    height={displayH}
                    onPointerMove={handleSvgMouseMove}
                  >
                    <rect x={0} y={0} width={settings.w} height={settings.h} fill={settings.bg} />
                    {bars.map((b, i) => (
                      <line
                        key={i}
                        x1={b.x1.toFixed(1)}
                        y1={b.y1.toFixed(1)}
                        x2={b.x2.toFixed(1)}
                        y2={b.y2.toFixed(1)}
                        stroke={settings.line}
                        strokeWidth={settings.thick}
                        strokeLinecap="round"
                      />
                    ))}
                    {(settings.preset === 'twin' || settings.preset === 'single') &&
                      settings.poles.map((p: Pole, i) => {
                        const px = p.x * settings.w
                        const py = p.y * settings.h
                        const r = settings.w * 0.012 * settings.poleSize
                        return p.sign > 0 ? (
                          <circle
                            key={i}
                            className="field-gen__pole"
                            cx={px}
                            cy={py}
                            r={r}
                            fill={settings.line}
                            opacity={0.85}
                            onPointerDown={handlePoleDrag(i)}
                          />
                        ) : (
                          <circle
                            key={i}
                            className="field-gen__pole"
                            cx={px}
                            cy={py}
                            r={r}
                            fill="none"
                            stroke={settings.line}
                            strokeWidth={Math.max(1.5, settings.w * 0.002)}
                            opacity={0.85}
                            onPointerDown={handlePoleDrag(i)}
                          />
                        )
                      })}
                  </svg>
                )}
              </div>
              <p className="field-gen__hint">
                {settings.preset === 'livecursor'
                  ? 'Move your cursor anywhere over the page — each bar rotates to point at it, exactly like the production component.'
                  : 'Drag the pole markers to reshape the field. Presets set sensible defaults — every parameter is yours to override.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`field-gen__toast${toast ? ' field-gen__toast--show' : ''}`}>{toast}</div>
    </div>
  )
}
