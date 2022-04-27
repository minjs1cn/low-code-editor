import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pkg from './package.json';

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'LcImage',
			fileName: `lc-image.${pkg.version}`,
			formats: ['umd'],
		},
	},
});
