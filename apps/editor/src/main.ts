import { createApp } from 'vue';
import App from './App.vue';
import { sum } from '@lw/shared';

console.log(sum(1, 2));

const app = createApp(App);
app.mount('#app');
