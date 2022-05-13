import { router } from './router';
import './main.less';
import { createPinia } from 'pinia';
import app from './app';

const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');

