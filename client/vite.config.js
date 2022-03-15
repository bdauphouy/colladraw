const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/index.html'),
        profile: resolve(__dirname, '/profile.html'),
        canvas: resolve(__dirname, '/canvas.html'),
      },
    },
  },
})
