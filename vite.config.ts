import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: [
      {
        find: '@crema',
        replacement: fileURLToPath(new URL('./src/@crema', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(
          new URL('./src/@components', import.meta.url),
        ),
      },
      {
        find: '@constants',
        replacement: fileURLToPath(
          new URL('./src/@constants', import.meta.url),
        ),
      },
      {
        find: '@contexts',
        replacement: fileURLToPath(new URL('./src/@contexts', import.meta.url)),
      },
    ],
  },
});
