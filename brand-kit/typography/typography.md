# Typography

Three-family system: a variable display serif, a workhorse sans, and a mono for data — each with a distinct job, no overlap.

## Fraunces — Display / short text only

Headlines, titles, hero statements. **Not for body copy or long-form text** — used sparingly, in short bursts, where the brand wants warmth and editorial weight against an otherwise cold/precise system.

Variable font axes (locked values):

| Axis | Value |
|---|---|
| Optical size (`opsz`) | 38 |
| Weight (`wght`) | 360 |
| Soft (`SOFT`) | 17 |
| Wonk (`WONK`) | 0.36 |

```css
font-variation-settings: 'opsz' 38, 'wght' 360, 'SOFT' 17, 'WONK' 0.36;
```

## Satoshi — Body / UI

Body copy, paragraphs, buttons, links, UI labels. The default text face everywhere Fraunces isn't explicitly called for. Sourced from Fontshare, not Google Fonts.

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

- Fraunces stays short: page titles, section headers, standalone statements — never paragraphs.
- Satoshi carries all reading-length content.
- Roboto Mono is reserved for literal data/code, not for stylistic emphasis on prose.

## Sourcing

Fraunces and Roboto Mono are on Google Fonts. Satoshi is sourced from Fontshare:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,100..900,0..100,0..1&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" rel="stylesheet">
```
