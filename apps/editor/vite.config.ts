import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		// TODO 不生效的原因？
		paths({
			loose: true,
		}),
		vue(),
		Pages({
			exclude: ['**/components/*'],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
