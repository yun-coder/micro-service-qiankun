import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qiankun from 'vite-plugin-qiankun'

export default defineConfig({
  plugins: [
    react(),
    qiankun('react-app', {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8081,
    cors: true,
    origin: 'http://localhost:8081',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      name: 'react-app',
      entry: './src/main.tsx',
      formats: ['umd'],
      fileName: 'react-app',
    },
  },
})
