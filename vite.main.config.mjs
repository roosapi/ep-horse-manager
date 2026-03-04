import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'electron',
        'better-sqlite3',
      ],
    },
    // This tells Vite to output CommonJS, required for native modules
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
  },
  optimizeDeps: {
    exclude: ['better-sqlite3'],
  },
});