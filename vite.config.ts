import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' lets the same build work on GitHub Pages project URLs
// like https://solaris37rus.github.io/cleaner/ and on any static hosting.
export default defineConfig({
  base: './',
  plugins: [react()],
})
