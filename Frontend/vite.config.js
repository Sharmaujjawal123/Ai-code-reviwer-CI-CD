import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Expose Vite server to all network interfaces
    port: 5173,        // Ensure Vite listens on port 5173 inside the container
    proxy: {
      '/ai': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: path => path,
      }
    }
  },
})
