import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  // yeh output folder define karta hai
  },
  server: {
    port: 3000      // local server ka port
  }
});
