/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Readable class names in dev tools, e.g. "Post-module_card__u7c4f"
      generateScopedName: '[name]_[local]__[hash:base64:5]',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
