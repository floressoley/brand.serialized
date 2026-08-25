# Typography

Two-family system for live UI: a workhorse sans and a mono for data — each with a distinct job, no overlap.
Fraunces, the former display serif, is retired from live text and now lives only in the logo lockup artwork
(baked into the SVG paths, not rendered via CSS) — see `brand-kit/logo`.

## Satoshi — Display / Body / UI

Headlines, titles, hero statements, body copy, paragraphs, buttons, links, UI labels — everything. Use
Medium (500) weight for headline roles, Regular (400) for body copy. Sourced from Fontshare, not Google Fonts.

Default rendering: **Regular (400)** weight, **16px**, with **0.2px** letter-spacing — a light touch of tracking without going Light/quiet. Components may override weight/size for intentional emphasis (e.g. buttons, active nav states).

```css
font-family: 'Satoshi', sans-serif;
font-weight: 400;
font-size: 16px;
letter-spacing: 0.2px;
```

## Roboto Mono — Data / code

Labels, data values, code, tabular/numeric content, decorative technical accents (hashes, addresses, timestamps). This is the typeface doing the "Precision" work — always paired with the ASCII/terminal imagery direction (see `brand-kit/guidelines`).

## Usage rules

- Satoshi carries all reading-length content and all headline roles.
- Roboto Mono is reserved for literal data/code, not for stylistic emphasis on prose.
- Fraunces never appears as live, CSS-rendered text — it exists only inside the logo SVG artwork.

## Sourcing

Roboto Mono is on Google Fonts. Satoshi is sourced from Fontshare:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet">
```
