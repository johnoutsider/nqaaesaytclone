import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — barcha yo'llar nisbiy, sayt istalgan papkada/hostingda ishlaydi.
// "npm run build:html" — kompyuterda to'g'ridan-to'g'ri ochiladigan (file://) versiya:
// JS oddiy skript (module emas) qilib yig'iladi, chunki brauzer file:// da module skriptlarni bloklaydi.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    react(),
    mode === 'html' && {
      name: 'classic-script',
      enforce: 'post',
      transformIndexHtml(html) {
        return html
          .replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, '<script defer src="$1"></script>')
          .replace(/ crossorigin/g, '')
      },
    },
  ],
  build: {
    outDir: mode === 'html' ? 'dist-html' : 'dist',
    rollupOptions: mode === 'html' ? { output: { format: 'iife', inlineDynamicImports: true } } : {},
  },
  server: { host: '0.0.0.0', port: 5173 },
}))
