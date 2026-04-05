import { defineConfig, minimalPreset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimalPreset,
    apple: {
      ...minimalPreset.apple,
      resizeOptions: { background: '#ffffff', fit: 'contain' }
    },
    maskable: {
      ...minimalPreset.maskable,
      resizeOptions: { background: '#ffffff', fit: 'contain' }
    }
  },
  images: [
    'public/logo.png',
  ]
})
