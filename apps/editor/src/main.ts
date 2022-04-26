import { createApp } from 'vue';
import App from './App.vue';
import { Project } from '@lowcode1024/shared';

console.log(Project.create());

const app = createApp(App);
app.mount('#app');
