import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [react(), glsl()],
  base: '/my-portfolio/',
  css: {
    postcss: './postcss.config.js',
  },
  optimizeDeps: {
    include: ['lenis', 'three', 'gsap'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-bundle': ['three'],
          'gsap-bundle': ['gsap'],
        },
      },
    },
  },
})