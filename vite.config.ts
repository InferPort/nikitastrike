import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
    {
      name: 'stub-node-fs-for-roomie',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('node_modules/roomie')) {
          return {
            code: code
              .replace(/import\s+{\s*promises\s+as\s+fs\s*}\s+from\s+["']node:fs["'];?/g, 'const fs = { promises: { readFile: () => Promise.reject("fs not available") } };')
              .replace(/import\s+fs\s+from\s+["']node:fs["'];?/g, 'const fs = { readFile: () => Promise.reject("fs not available") };')
              .replace(/import\s+path\s+from\s+["']node:path["'];?/g, 'const path = { basename: (p) => p.split(/[\\\/]/).pop() };')
              .replace(/import\s+{\s*EventEmitter\s*}\s+from\s+["']node:events["'];?/g, 'import { EventEmitter } from "events";'),
            map: null
          };
        }
      }
    }
  ],
  optimizeDeps: {
    exclude: ['roomie'],
    include: ['jszip'],
  },
})


