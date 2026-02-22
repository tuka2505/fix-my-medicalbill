import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Output directory
    outDir: 'dist',
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Minify for production
    minify: 'terser',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enhanced terser options for better compression
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true,
        pure_funcs: ['console.debug'], // Remove only debug logs
        passes: 2 // Multiple compression passes
      },
      mangle: {
        safari10: true // Better Safari compatibility
      },
      format: {
        comments: false // Remove all comments
      }
    },
    // Rollup-specific options
    rollupOptions: {
      output: {
        // Manual chunking for better caching
        manualChunks: {
          'pdf-vendor': ['pdfjs-dist'],
          'canvas-vendor': ['html2canvas']
        },
        // Smaller chunk size for better compression
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Target modern browsers for smaller output
    target: 'es2020',
    // Chunk size warning limit
    chunkSizeWarningLimit: 600
  }
});
