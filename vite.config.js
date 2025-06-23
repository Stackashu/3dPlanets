import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Update this if hosting under a subpath
  build: {
    outDir: "dist", // Default output directory
    chunkSizeWarningLimit: 1500,
  },
})
