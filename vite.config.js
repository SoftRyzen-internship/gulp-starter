import { defineConfig } from 'vite';
import path from 'path';
import nunjucks from 'vite-plugin-nunjucks';
import { createHtmlPlugin } from 'vite-plugin-html';
import data from './src/assets/json/data.json';

// other config settings: https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hmr: true,
  },
  build: {
    outDir: '../build',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/app.min.js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: assetInfo => {
          const fileName = assetInfo.name;
          const extName = path.extname(fileName);

          switch (true) {
            case fileName === 'style.css':
              return 'assets/css/style.css';

            case extName === '.jpg' ||
              extName === '.jpeg' ||
              extName === '.png' ||
              extName === '.webp' ||
              extName === '.svg' ||
              extName === '.gif':
              return `assets/images/[name][extname]`;

            default:
              return 'assets/[name][extname]';
          }
        },
      },
    },
  },
  plugins: [
    nunjucks({
      variables: { 'index.html': data },
      nunjucksConfigure: { autoescape: false },
    }),
    createHtmlPlugin({
      // https://github.com/vbenjs/vite-plugin-html/tree/main?tab=readme-ov-file#minifyoptions
      minify: {
        // collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      },
    }),
  ],
});
