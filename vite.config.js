import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./test-setup.js"],
    environment: 'jsdom',
    coverage: {
      exclude: [
        '**/*.config.js',
        'vite.config.js',
        'eslint.config.js',
        'test-setup.js',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        'src/data/**',
        'src/index.jsx',
        'coverage/**',
        'dist/**',
        'build/**'
      ]
    }
  }
})
