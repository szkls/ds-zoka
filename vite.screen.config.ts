// Builds one screen into a single self-contained HTML file (for sharing / artifacts):
//   SCREEN=login npx vite build --config vite.screen.config.ts   →  dist-screens/login.html
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath, URL } from 'node:url';

const screen = process.env.SCREEN ?? 'login';
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { outDir: 'dist-screens', emptyOutDir: false, rollupOptions: { input: `screens/${screen}.html` } },
});
