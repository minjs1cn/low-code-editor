import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import paths from 'vite-tsconfig-paths';
import viteMocker from 'vite-plugin-mocker';

export default defineConfig({
	plugins: [
		viteMocker({
			delay: [0, 1000],
		}),
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
