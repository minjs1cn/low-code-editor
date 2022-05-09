import { createApp } from 'vue';
import App from './App.vue';
import { loadMaterials, loadScript } from './utils';
import { router } from './router';
import './main.less';
import { getMaterialRenderFun, materialList } from './data';
import { createPinia } from 'pinia';

const pinia = createPinia();

loadMaterials(materialList).then(() => {
	const app = createApp(App);
	materialList.forEach((m) => {
		const renderFun = getMaterialRenderFun(m);
		app.component(m.name, renderFun);
	});
	app.use(router);
	app.use(pinia);
	app.mount('#app');
});
