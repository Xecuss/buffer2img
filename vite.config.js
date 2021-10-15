import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs'
  },
  base: './',
  plugins: [svelte()],
  server: {
    port: 5000,
  },
})
