import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactMdx from 'vite-plugin-react-mdx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactMdx()],
});
