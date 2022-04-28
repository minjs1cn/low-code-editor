import { createApp } from 'vue';
import App from './App.vue';
import { Project, IMaterial } from '@lowcode1024/shared';
import { loadScript } from './utils';
import { router } from './router';
import './main.less';

console.log(Project.create());

const materialList: IMaterial[] = [
	{
		id: 1,
		type: 'component',
		category: {
			name: '基础组件',
		},
		version: '0.0.1',
		source: '/lc-image.umd.js',
		name: 'LcImage',
		title: '图片',
		thumbnail: '',
		data: [
			{
				version: '0.0.1',
				source: '/lc-image.0.0.1.umd.js',
			},
		],
	},
];

Promise.all(materialList.map((m) => loadScript(m.source))).then(() => {
	const app = createApp(App);
	materialList.forEach((m) => {
		const { render } = (window as any)[m.name];
		app.component(m.name, render);
	});
	app.use(router);
	app.mount('#app');
});
