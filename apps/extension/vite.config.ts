import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx, defineManifest } from '@crxjs/vite-plugin';
import path from 'path';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Cloakify',
  version: '1.0.0',
  description: 'Production-ready Chrome Extension monorepo',
  action: {
    default_popup: 'index.html',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content/index.ts'],
      matches: ['<all_urls>'],
    },
  ],
  permissions: ['storage'],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
