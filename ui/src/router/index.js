import { createRouter, createWebHistory } from 'vue-router';
import Places from '../views/places';
import PlaceAdd from '../views/placeadd';
import ItemAdd from '../views/itemadd';
import NIY from '../views/niy';

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
    path: '/placeadd',
    name: 'PlaceAdd',
    component: PlaceAdd,
  },
  {
    path: '/itemadd',
    name: 'ItemAdd',
    component: ItemAdd,
  },
  {
    path: '/itemview',
    name: 'NIY2',
    component: NIY,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
