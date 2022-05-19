import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

console.log(routes);

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
