# brand.serialized
Brand kit and design system for Serialized &amp; SerializedAudit.io

## Getting started
```
npm install
npm run dev
```

## Known warnings

**OneDrive EPERM error on `npm run dev`**
This project lives inside a OneDrive-synced folder. OneDrive periodically locks files while syncing, which can make Vite's dependency-cache cleanup fail with:
```
Error: EPERM: operation not permitted, rmdir '...\node_modules\.vite\deps_temp_*'
```
This is harmless — the dev server keeps running and the app works normally. A `predev` script prints a warning about this automatically. To get rid of it entirely, either move the project outside OneDrive, or right-click the `node_modules` folder in File Explorer and choose "Always keep on this device" / exclude it from sync.
