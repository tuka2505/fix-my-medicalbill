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
    cssCodeSplit: true
  }
});
