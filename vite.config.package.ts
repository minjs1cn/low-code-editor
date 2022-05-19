import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { getName } from 'pkg-get';
import fs from 'fs';
import path from 'path';

const [ pkgName ] = process.argv.slice(-1);
const pkgDirPath = path.join(__dirname, `./packages/${pkgName}`);
const pkgPath = path.join(pkgDirPath, 'package.json');

if (!fs.existsSync(pkgPath)) {
  console.error('\n\neg: yarn build:p image\n\n');
  process.exit(1);
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(pkgPath);
const name = getName(pkg.name);

export default defineConfig({
  plugins: [ vue() ],
  build: {
    lib: {
      entry: path.join(pkgDirPath, 'src/index.ts'),
      name,
      fileName: `${pkg.name.replace('@lowcode1024/', '')}.${pkg.version}`,
      formats: [ 'umd' ],
    },
    outDir: path.join(__dirname, `public/${name}`),
  },
});
