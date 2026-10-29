import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'icons.svg'],
    manifest: false,
    workbox: { navigateFallback: '/index.html', globPatterns: ['**/*.{js,css,html,svg,webmanifest}'] },
  })],
})
