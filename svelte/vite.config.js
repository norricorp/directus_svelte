import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // base: "/directus_examples/",
  optimizeDeps: {
    include: ["dayjs/plugin/relativeTime.js"],
  },
  build: {
    emptyOutDir: false,
  },
  server: {
     host: true,
    fs: {
      allow: ["/GitWork/directus_svelte"]
    } 
/*     https: {
      key: fs.readFileSync('./localhost.key'),
      cert: fs.readFileSync('./localhost.crt'),
    }, */
  }
})
