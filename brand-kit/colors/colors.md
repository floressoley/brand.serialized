# Color System

Dark-mode-first, monochromatic base with two accent lanes and a semantic set. Aiming for **Trust, Precision, Excellence** — grayscale carries the UI; color is reserved for meaning (brand identity, product identity, state).

## Base (grayscale)

| Name | Hex | Usage |
|---|---|---|
| Background | `#1A1A19` | App/page background |
| Surface | `#2C2C2A` | Cards, panels, raised surfaces |
| Border Default | `#3F3E3C` | Default dividers, input borders |
| Border Strong | `#4F4F4F` | Emphasized borders, hover states |
| Text Primary | `#FAF9F6` | Headlines, primary body text |
| Text Secondary | `#C2BDB9` | Secondary copy, descriptions |
| Muted | `#989898` | Placeholder text, disabled, captions |

## Accent — Serialized (brand)

| Name | Hex | Usage |
|---|---|---|
| Accent Serialized | `#7EABF5` | Serialized brand highlights, links, primary CTA on dark |
| Accent Background | `#0F1829` | Tinted surface behind Serialized accent content |

## Accent — Audit (product: SerializedAudit.io)

| Name | Hex | Usage |
|---|---|---|
| Accent Audit | `#51DA4C` | Audit product accent — pass states, primary actions in the audit UI |
| Accent Audit 16% | `#51DA4C` @ 16% opacity | Subtle fills, chart areas, hover backgrounds |
| Audit Background | `#1D282C` | Tinted surface behind Audit accent content |

## Semantic

| Name | Hex | Usage |
|---|---|---|
| Warning | `#FB923C` | Caution states, medium-risk flags |
| Warning Background | `#2E2010` | Warning banners/badges background |
| Error | `#F87171` | Errors, high-risk / failed audit flags |
| Error Background | `#2E1010` | Error banners/badges background |
| Info | `#60A5FA` | Informational states, neutral callouts |
| Info Background | `#101828` | Info banners/badges background |

## Usage rules

- Default to grayscale for structure (backgrounds, borders, text hierarchy). Color is never used decoratively.
- **Accent Serialized (blue)** = brand-level surfaces (marketing site, `Serialized` product family).
- **Accent Audit (green)** = SerializedAudit.io product surfaces only (risk/pass states, product-specific CTAs). Do not mix blue and green as competing primaries on the same screen — pick one per surface based on brand vs. product context.
- Warning/Error/Info are reserved for audit result severity and system states — never for branding or emphasis.
- Every accent/semantic color ships with a paired low-contrast "Background" tone for tinted containers (badges, banners, chart fills) — pair them together rather than using the full-saturation color as a fill.

No light-mode palette exists yet — this system is dark-first. A light-mode variant is a Phase 2 addition once the light logo lockup exists (see `brand-kit/logo`).
