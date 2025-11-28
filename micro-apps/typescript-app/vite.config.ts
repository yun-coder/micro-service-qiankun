import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    react(),
    qiankun('typescript-app', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8083,
    cors: true,
    origin: 'http://localhost:8083',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      name: 'typescript-app',
      entry: './src/web/main.tsx',
      formats: ['umd'],
      fileName: 'typescript-app',
    },
  },
})
