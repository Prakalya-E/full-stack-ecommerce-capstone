import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/full-stack-ecommerce-capstone/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});




  


    







    
