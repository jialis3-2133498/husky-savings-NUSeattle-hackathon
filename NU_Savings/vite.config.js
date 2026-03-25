import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/husky-savings-NUSeattle-hackathon/',
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) {
            return 'react-vendor'
          }

          return undefined
        },
      },
    },
  },
})
