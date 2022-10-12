import { defineConfig } from 'vite'
const path  = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  //构建选项
  build:{
    outDir:'dist',
    lib: {
      entry: path.resolve(__dirname, './bin/cli.js'),
      name: 'liu_cli',
      fileName: (format) => `liu_cli.${format}.js`
    },
  }
})
