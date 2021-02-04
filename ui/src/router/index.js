import { createRouter, createWebHistory } from 'vue-router';
import Places from '../views/Places.vue';
import Item from '../views/Item.vue';

const routes = [
  {
    path: '/',
    redirect: '/places',
  },
  {
    path: '/places',
    name: 'Places',
    component: Places,
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
  },
];

// eslint-disable-next-line new-cap
const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
