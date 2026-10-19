/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// Web běží v podsložce https://milankocab.github.io/catchhotels-case-study/.
// Base platí pro dev server i build, takže lokálně je adresa stejná jako na GitHub Pages.
// Při přejmenování repozitáře je potřeba změnit BASE tady a v scripts/check-build.mjs.
const BASE = '/catchhotels-case-study/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  // Dvě stránky. Klikací prototyp v kořeni a případová studie na adrese /pripadova-studie/.
  // Stará adresa /prototyp/ přesměrovává do kořene (public/prototyp/index.html).
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        studie: fileURLToPath(new URL('./pripadova-studie/index.html', import.meta.url)),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
