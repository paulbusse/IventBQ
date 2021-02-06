import { createRouter, createWebHistory } from 'vue-router';
import Places from '../views/Places.vue';
// import Item from '../views/Item.vue';
import NIY from '../views/niy.vue';

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
    path: '/itemadd',
    name: 'NIY1',
    component: NIY,
  },
  {
    path: '/itemview',
    name: 'NIY2',
    component: NIY,
  },
];

// eslint-disable-next-line new-cap
const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
