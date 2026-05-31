import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project sites, set base to "/<repo-name>/".
// Override via env var when building: VITE_BASE=/my-repo/ npm run build
const base = process.env.VITE_BASE ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
});
