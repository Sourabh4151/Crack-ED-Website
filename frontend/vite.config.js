import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@backend-data': path.resolve(__dirname, '../backend'),
    },
  },
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('@tiptap') || id.includes('prosemirror') || id.includes('dompurify')) return 'editor'
          if (id.includes('react-toastify')) return 'toast'
          if (id.includes('@microsoft/clarity')) return 'clarity'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react-dom') || id.includes('react/')) return 'react-vendor'
        },
      },
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
