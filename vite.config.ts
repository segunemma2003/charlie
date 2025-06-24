import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  define: {
    global: 'globalThis', // Required for blockchain libraries
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    host: true, // Allow external connections for Telegram testing
    port: 3000,
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wagmi: ['wagmi', 'viem', '@rainbow-me/rainbowkit'],
          animations: ['framer-motion', 'lottie-react'],
          utils: ['dayjs', 'clsx'],
        },
      },
    },
    // Optimize for Telegram
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
  },
  preview: {
    host: true,
    port: 3000,
  },
})