# Brand Guidelines

## Pillars

**Trust** — Consistency and restraint over decoration. Grayscale-first UI, color only where it carries meaning (state, brand vs. product identity). No visual noise competing with the data being presented.

**Precision** — Monospace for anything literal (data, code, addresses, hashes). Tight, deliberate grid and spacing. Numbers and technical values are never styled as decoration — they're presented as-is, legibly.

**Excellence** — Editorial polish in the few places warmth is allowed (the Fraunces logo lockup), engineering rigor everywhere else (Satoshi headlines and body copy, Roboto Mono, systemized color/type tokens). The contrast between the two is the brand: premium *and* technical, not one at the expense of the other.

## Voice

- Direct, technical, unhyped. State findings/facts plainly — this is an audit tool, credibility depends on not sounding like marketing copy.
- Short Satoshi statements for emphasis; everything else in Satoshi, plain and clear.

## Imagery direction

Reference inspiration is **ASCII-art / terminal-native texture**, always monochrome-with-accent:

- **Hex/data dumps** — raw byte/address strings rendered as texture, with individual tokens (e.g. a field name like `market_cap`) syntax-highlighted in a single accent color against otherwise muted mono text.
- **ASCII-rendered landscapes/photography** — real imagery (terrain, skylines) re-rendered as character-based ASCII art in grayscale, occasionally with a cool accent tint. Signals "everything is data, even the visual."
- **Dot-matrix / hash grids** — sparse `#`/`+`/`*` character fields, used as ambient background texture, low-contrast.
- **Diagonal line-hatch textures** — subtle, dark, near-invisible directional hatching for background depth without adding visual weight.

Rule: imagery is generated *from* structure (characters, hex, grid) — never photographic/illustrative without that data-native treatment. This is what ties visuals back to Precision.

## Logo & color cross-reference

See `brand-kit/logo/README.md` for lockup rules and `brand-kit/colors/colors.md` for the full palette and accent-lane usage (Serialized blue vs. Audit green).
