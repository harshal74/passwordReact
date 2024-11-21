import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/passwordGeneratorByReact/', // Replace with your repository name
  plugins: [react()],
});
