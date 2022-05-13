import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';

export default defineConfig({
  plugins: [ vue() ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: `${pkg.name.replace(/(@lowcode1024\/l)c-([a-z])/, (a, b, c) => `Lc${c.toUpperCase()}`)}`,
      fileName: `${pkg.name.replace('@lowcode1024/', '')}.${pkg.version}`,
      formats: [ 'umd' ],
    },
  },
});
