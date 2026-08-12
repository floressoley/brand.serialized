export type FieldPreset = 'livecursor' | 'twin' | 'single' | 'perspective' | 'wave'

export interface Pole {
  x: number
  y: number
  sign: 1 | -1
}

export interface FieldSettings {
  preset: FieldPreset
  w: number
  h: number
  rows: number
  cols: number
  len: number
  thick: number
  noise: number
  bg: string
  line: string
  poles: Pole[]
  perspective: { start: number; end: number; foreshorten: number }
  wave: { amp: number; freq: number; rowShift: number; base: number }
  reactive: boolean
  poleSize: number
  fieldReach: number
  seed: number
  baseAngle: number
}

export const DEFAULT_FIELD_SETTINGS: FieldSettings = {
  preset: 'livecursor',
  w: 1200,
  h: 627,
  rows: 18,
  cols: 13,
  len: 17,
  thick: 1.4,
  noise: 0,
  bg: '#0a0a09',
  line: '#f0efec',
  poles: [
    { x: 0.35, y: 0.5, sign: 1 },
    { x: 0.65, y: 0.5, sign: -1 },
  ],
  perspective: { start: -70, end: 110, foreshorten: 1.4 },
  wave: { amp: 25, freq: 0.15, rowShift: 6, base: 20 },
  reactive: false,
  poleSize: 1,
  fieldReach: 0.02,
  seed: 1,
  baseAngle: -10,
}

export interface Bar {
  x1: number
  y1: number
  x2: number
  y2: number
}

export const PRESET_DEFAULTS: Record<FieldPreset, Partial<FieldSettings>> = {
  livecursor: { rows: 18, cols: 13, len: 17, thick: 1.4 },
  twin: {
    poles: [
      { x: 0.35, y: 0.5, sign: 1 },
      { x: 0.65, y: 0.5, sign: -1 },
    ],
    rows: 28,
    cols: 44,
    len: 18,
    thick: 2,
  },
  single: { poles: [{ x: 0.5, y: 0.5, sign: 1 }], rows: 28, cols: 44, len: 18, thick: 2 },
  perspective: { rows: 40, cols: 30, len: 18, thick: 2 },
  wave: { rows: 24, cols: 48, len: 18, thick: 2 },
}

function seededRand(i: number, seed: number): number {
  const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
  return x - Math.floor(x)
}

export function computeVortexAngle(
  px: number,
  py: number,
  poles: Pole[],
  fieldReach: number,
): number {
  let vx = 0
  let vy = 0
  poles.forEach((pole) => {
    const dx = px - pole.x
    const dy = py - pole.y
    const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001
    const ux = dx / dist
    const uy = dy / dist
    const tx = -uy * pole.sign
    const ty = ux * pole.sign
    const weight = 1 / (dist + fieldReach)
    vx += tx * weight
    vy += ty * weight
  })
  if (poles.length === 0) return 0
  return (Math.atan2(vy, vx) * 180) / Math.PI
}

function computeBar(
  nx: number,
  ny: number,
  row: number,
  rows: number,
  col: number,
  cols: number,
  settings: FieldSettings,
  mouseNorm?: { x: number; y: number },
): { angle: number; lenScale: number } {
  let angle = 0
  let lenScale = 1

  if (settings.preset === 'twin' || settings.preset === 'single') {
    let poles = settings.poles.slice()
    if (settings.reactive && mouseNorm) {
      poles = poles.concat([{ x: mouseNorm.x, y: mouseNorm.y, sign: 1 }])
    }
    angle = computeVortexAngle(nx, ny, poles, settings.fieldReach)
  } else if (settings.preset === 'perspective') {
    const t = row / Math.max(rows - 1, 1)
    angle = settings.perspective.start + t * (settings.perspective.end - settings.perspective.start)
    const rad = (angle * Math.PI) / 180
    lenScale = Math.pow(Math.abs(Math.cos(rad)), 1 / settings.perspective.foreshorten) * 0.85 + 0.15
  } else if (settings.preset === 'wave') {
    const colT = col + (row * settings.wave.rowShift) / Math.max(cols, 1)
    angle =
      settings.wave.base +
      settings.wave.amp * Math.sin(((colT * settings.wave.freq * 2 * Math.PI) / Math.max(cols, 1)) * (cols / 10))
  }

  const jitterIdx = row * 1000 + col
  angle += (seededRand(jitterIdx, settings.seed) - 0.5) * 2 * settings.noise
  return { angle, lenScale }
}

export function buildGrid(settings: FieldSettings, mouseNorm?: { x: number; y: number }): Bar[] {
  const pad = Math.min(settings.w, settings.h) * 0.06
  const usableW = settings.w - pad * 2
  const usableH = settings.h - pad * 2
  const bars: Bar[] = []

  for (let r = 0; r < settings.rows; r++) {
    for (let c = 0; c < settings.cols; c++) {
      const nx = settings.cols > 1 ? c / (settings.cols - 1) : 0.5
      const ny = settings.rows > 1 ? r / (settings.rows - 1) : 0.5
      const cx = pad + nx * usableW
      const cy = pad + ny * usableH
      const { angle, lenScale } = computeBar(nx, ny, r, settings.rows, c, settings.cols, settings, mouseNorm)
      const halfLen = (settings.len * lenScale) / 2
      const rad = (angle * Math.PI) / 180
      const dx = halfLen * Math.cos(rad)
      const dy = halfLen * Math.sin(rad)
      bars.push({ x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy })
    }
  }
  return bars
}

export function buildStandaloneSvg(settings: FieldSettings, lines: Bar[]): string {
  let content = `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.w}" height="${settings.h}" viewBox="0 0 ${settings.w} ${settings.h}">\n`
  content += `  <rect x="0" y="0" width="${settings.w}" height="${settings.h}" fill="${settings.bg}"/>\n`
  lines.forEach((b) => {
    content += `  <line x1="${b.x1.toFixed(1)}" y1="${b.y1.toFixed(1)}" x2="${b.x2.toFixed(1)}" y2="${b.y2.toFixed(1)}" stroke="${settings.line}" stroke-width="${settings.thick}" stroke-linecap="round"/>\n`
  })
  content += `</svg>`
  return content
}

export function buildLiveCursorCode(settings: FieldSettings): string {
  const bars = Array.from(
    { length: settings.rows * settings.cols },
    () =>
      `  <span class="magnet-lines__bar" style="width:${settings.thick}px;height:${settings.len}px;background:${settings.line};--rotate:${settings.baseAngle}deg;"></span>`,
  ).join('\n')

  return `<div class="magnet-lines" style="grid-template-columns:repeat(${settings.cols},1fr);grid-template-rows:repeat(${settings.rows},1fr);background:${settings.bg};width:${settings.w}px;height:${settings.h}px;position:relative;">
${bars}
</div>

<style>
.magnet-lines{display:grid;justify-items:center;align-items:center;}
.magnet-lines__bar{display:block;border-radius:1px;transform-origin:center;transform:rotate(var(--rotate,0deg));transition:transform 260ms cubic-bezier(0.22,0.61,0.36,1);will-change:transform;}
@media (prefers-reduced-motion: reduce){.magnet-lines__bar{transition:none;}}
</style>

<script>
(function(){
  var container = document.currentScript.previousElementSibling.previousElementSibling;
  var items = Array.from(container.querySelectorAll('.magnet-lines__bar'));
  var baseAngle = ${settings.baseAngle};
  items.forEach(function(item){ item._prev = baseAngle; });

  function onMove(pointer){
    items.forEach(function(item){
      var rect = item.getBoundingClientRect();
      var centerX = rect.x + rect.width/2;
      var centerY = rect.y + rect.height/2;
      var b = pointer.clientX - centerX;
      var a = pointer.clientY - centerY;
      var c = Math.sqrt(a*a+b*b) || 1;
      var r = ((Math.acos(b/c) * 180) / Math.PI) * (pointer.clientY > centerY ? 1 : -1);
      var prev = item._prev != null ? item._prev : baseAngle;
      var delta = r - (prev % 360);
      if(delta > 180) delta -= 360;
      else if(delta < -180) delta += 360;
      item._prev = prev + delta;
      item.style.setProperty('--rotate', item._prev + 'deg');
    });
  }

  window.addEventListener('pointermove', onMove, {passive:true});

  requestAnimationFrame(function(){
    var rect = container.getBoundingClientRect();
    onMove({
      clientX: rect.left - rect.width * 0.35,
      clientY: rect.top + rect.height * 0.55
    });
  });
})();
<\/script>`
}

export function buildDropInCode(settings: FieldSettings, bars: Bar[]): string {
  if (settings.preset === 'livecursor') {
    return buildLiveCursorCode(settings)
  }

  let cells = ''
  bars.forEach((b) => {
    const dx = b.x2 - b.x1
    const dy = b.y2 - b.y1
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI
    const len = Math.sqrt(dx * dx + dy * dy)
    cells += `    <span class="magnet-lines__bar" style="width:${len.toFixed(1)}px;--rotate:${angle.toFixed(1)}deg;"></span>\n`
  })

  let js = ''
  if ((settings.preset === 'twin' || settings.preset === 'single') && settings.reactive) {
    js = `
<script>
(function(){
  var container = document.currentScript.previousElementSibling;
  var poles = ${JSON.stringify(settings.poles)};
  var bars = container.querySelectorAll('.magnet-lines__bar');
  var rect;
  function updateRect(){ rect = container.getBoundingClientRect(); }
  updateRect();
  window.addEventListener('resize', updateRect);
  container.addEventListener('mousemove', function(e){
    var mx = (e.clientX - rect.left) / rect.width;
    var my = (e.clientY - rect.top) / rect.height;
    var cols = ${settings.cols}, rows = ${settings.rows};
    bars.forEach(function(bar, i){
      var col = i % cols, row = Math.floor(i / cols);
      var nx = cols>1 ? col/(cols-1) : 0.5;
      var ny = rows>1 ? row/(rows-1) : 0.5;
      var allPoles = poles.concat([{x:mx,y:my,sign:1}]);
      var vx=0, vy=0;
      allPoles.forEach(function(p){
        var dx = nx-p.x, dy = ny-p.y;
        var dist = Math.sqrt(dx*dx+dy*dy)+0.0001;
        var ux=dx/dist, uy=dy/dist;
        var tx=-uy*p.sign, ty=ux*p.sign;
        var w=1/(dist + ${settings.fieldReach});
        vx += tx*w; vy += ty*w;
      });
      var angle = Math.atan2(vy,vx)*180/Math.PI;
      bar.style.setProperty('--rotate', angle.toFixed(1)+'deg');
    });
  });
})();
<\/script>`
  }

  return `<div class="magnet-lines" style="grid-template-columns:repeat(${settings.cols},1fr);grid-template-rows:repeat(${settings.rows},1fr);background:${settings.bg};width:${settings.w}px;height:${settings.h}px;">\n${cells}</div>${js}\n\n<style>\n.magnet-lines__bar{height:${settings.thick}px;background:${settings.line};}\n</style>`
}
