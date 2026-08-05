// Warns when the project lives inside a OneDrive-synced folder.
// OneDrive can lock files in node_modules/.vite while it syncs, which makes
// Vite's dep-cache cleanup fail with EPERM. The dev server still works —
// this is just a heads-up so the error doesn't look like a real crash.
if (/onedrive/i.test(process.cwd())) {
  console.warn(
    "\n\x1b[33m[warning]\x1b[0m This project is inside a OneDrive-synced folder.\n" +
      "  You may see 'EPERM: operation not permitted, rmdir ...node_modules\\.vite\\deps_temp_*'\n" +
      "  during dev. It's caused by OneDrive syncing node_modules and is safe to ignore —\n" +
      "  the dev server still runs. See README.md > Known warnings for details.\n"
  );
}
