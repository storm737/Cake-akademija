import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import seo from './scripts/seo-plugin.mjs';

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
});
