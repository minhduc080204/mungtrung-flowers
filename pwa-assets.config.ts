import { defineConfig, minimalPreset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimalPreset,
    apple: {
      ...minimalPreset.apple,
      resizeOptions: { background: '#2563eb', fit: 'contain' }
    },
    maskable: {
      ...minimalPreset.maskable,
      resizeOptions: { background: '#2563eb', fit: 'contain' }
    }
  },
  images: [
    'public/logo.png',
  ]
})
