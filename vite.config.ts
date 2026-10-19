/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Web běží v podsložce https://milankocab.github.io/catchhotels-case-study/.
// Base platí pro dev server i build, takže lokálně je adresa stejná jako na GitHub Pages.
// Při přejmenování repozitáře je potřeba změnit BASE tady a v scripts/check-build.mjs.
const BASE = '/catchhotels-case-study/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
