import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue-app', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8082,
    cors: true,
    origin: 'http://localhost:8082',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      name: 'vue-app',
      entry: './src/main.ts',
      formats: ['umd'],
      fileName: 'vue-app',
    },
  },
})
