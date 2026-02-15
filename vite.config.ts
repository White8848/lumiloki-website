import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function preloadHeroImage(): Plugin {
  return {
    name: 'preload-hero-image',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      const asset = Object.keys(ctx.bundle ?? {}).find(f => f.includes('lumi-pro') && f.endsWith('.webp'))
      if (!asset) return html
      const tag = `<link rel="preload" href="/${asset}" as="image" type="image/webp" fetchpriority="high" />`
      return html.replace('</head>', `${tag}\n  </head>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadHeroImage()],
  base: '/',
})
