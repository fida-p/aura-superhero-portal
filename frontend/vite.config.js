import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at
  // https://<user>.github.io/aura-superhero-portal/
  // so built asset URLs must be relative to that sub-path.
  // Local dev (vite dev) is unaffected by `base`.
  base: '/aura-superhero-portal/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Proxy API calls to the Express backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});