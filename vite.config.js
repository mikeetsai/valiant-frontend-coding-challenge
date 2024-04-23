import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: /@\/components\/((?!.*[.](ts|js|vue)$).*$)/,
        replacement: fileURLToPath(
          new URL('./src/components/$1/index.vue', import.meta.url)
        ),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
