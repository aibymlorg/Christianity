import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from any host (ngrok, tunneling services)
    port: 5173,
    strictPort: false,
    open: true, // Automatically open browser on server start
    allowedHosts: true, // Allow all hostnames (ngrok, custom domains, etc.)
    hmr: {
      protocol: 'ws', // Use WebSocket protocol
      host: undefined, // Use the current host
      clientPort: undefined, // Use the current port
    },
  }
})
