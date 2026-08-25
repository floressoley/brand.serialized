# Logo

## Mark

Three diagonal parallelogram bars of increasing length — an abstracted slash/serial mark. Used standalone as the icon (`logomark`) or preceding the wordmark in horizontal lockups.

## Files

| File | Lockup | Size | Colors | Use on |
|---|---|---|---|---|
| `serialized/serialized-horizontal-on-dark.svg` | Wordmark + mark | 510×90 | Mark `#3D74FF` / Wordmark `#FFFFFF` | Dark backgrounds |
| `serialized/serialized-horizontal-on-light.svg` | Wordmark + mark | 510×89 | Mark `#3D74FF` / Wordmark `#1A1A19` | Light backgrounds |
| `serialized/serialized-logomark-on-dark.svg` | Mark only | 512×512 | `#3D74FF` | Dark backgrounds |
| `serialized/serialized-logomark-on-light.svg` | Mark only | 512×512 | `#3D74FF` | Light backgrounds |
| `audit/audit-horizontal-on-dark.svg` | "Serialized / Audit" wordmark + mark | 487×57 | Mark + "Audit" `#3DCF8E` / "Serialized" `#FFFFFF` | Dark backgrounds |
| `audit/audit-horizontal-on-light.svg` | "Serialized / Audit" wordmark + mark | 487×57 | Mark + "Audit" `#3DCF8E` / "Serialized" `#0F0F0F` | Light backgrounds |
| `audit/audit-logomark-on-dark.svg` | Mark only, Audit variant | 114×214 | `#3DCF8E` | Dark backgrounds |
| `audit/audit-logomark-on-light.svg` | Mark only, Audit variant | 114×214 | `#3DCF8E` | Light backgrounds |

> **Mark color rule:** as of 2026-08, the logomark (the three slash bars) is always its accent color and never switches to white on dark / near-black on light. Parent Serialized uses Accent Serialized `#3D74FF`; the Audit lockup uses Accent Audit `#3DCF8E` (the entire mark, not just the third bar, plus the ".Audit" wordmark). In both families, only the "Serialized" wordmark text still swaps `#FFFFFF`/`#1A1A19` (or `#0F0F0F` for Audit) by background.

## Usage

- **Serialized lockups** (blue-accent brand) for the parent brand — marketing site, brand-level surfaces.
- **Audit lockups** (green mark + ".Audit" wordmark) exclusively for SerializedAudit.io product surfaces. Never substitute one lockup for the other's context.
- Use `on-dark` variants on dark surfaces (`--color-background` `#1A1A19` or similar), `on-light` on light surfaces. Never place a variant against a background it wasn't built for — contrast is the whole point.
- Use `logomark`-only variants where space is constrained (favicons, avatars, app icons) or alongside an already-established wordmark elsewhere on the page.

## Clearspace

Unit **X** = the width of a single bar in the mark, measured at the mark's own scale. Across both the logomark (512×512) and the horizontal lockup (90px tall), a bar's width is a consistent **~6.4% of the mark's height** — so `X = mark height ÷ 16`.

- **Logomark**: minimum clearspace = `1X` on all four sides (e.g. at a 320px-tall mark, X ≈ 20px of clear margin on every side).
- **Horizontal lockup**: minimum clearspace = `1X` on top/bottom, `2X` on left/right (wordmarks need more lateral breathing room than the compact mark).
- Clearspace is measured from the outermost edge of the artwork (bar tips / letterforms), not the SVG's bounding box.
- Nothing — text, imagery, UI chrome, other marks — may enter the clearspace zone.

## Minimum size

Below these sizes the mark's three thin parallel bars start to visually merge, and the wordmark's fine strokes lose legibility.

| Lockup | Digital (screen) | Print |
|---|---|---|
| Logomark (standalone) | 24px height | 6mm / 0.25in height |
| Horizontal lockup | 120px width (≈21px height) | 25mm / 1in width |

If a placement needs to go smaller than these, switch to the logomark alone rather than shrinking the horizontal lockup further.
