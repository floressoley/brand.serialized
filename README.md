# brand.serialized
Brand kit, design system, and marketing site for Serialized &amp; SerializedAudit.io.

npm workspaces monorepo:
- `apps/brand-kit` — internal brand-kit / design-system doc site
- `apps/landing` — public marketing landing page
- `packages/design-tokens` — shared CSS token layer, consumed by both apps
- `packages/ui` — shared React component library, consumed by both apps

## Getting started
```
npm install
npm run dev:brand-kit   # doc site, http://localhost:5173
npm run dev:landing     # marketing page, http://localhost:5173 (own port if brand-kit is also running)
```

Other scripts: `npm run build` (builds both apps), `npm run preview:brand-kit`, `npm run preview:landing`.

## Known warnings

**OneDrive EPERM error on `npm run dev`**
This project lives inside a OneDrive-synced folder. OneDrive periodically locks files while syncing, which can make Vite's dependency-cache cleanup fail with:
```
Error: EPERM: operation not permitted, rmdir '...\node_modules\.vite\deps_temp_*'
```
This is harmless — the dev server keeps running and the app works normally. A `predev` script prints a warning about this automatically. To get rid of it entirely, either move the project outside OneDrive, or right-click the `node_modules` folder in File Explorer and choose "Always keep on this device" / exclude it from sync.
