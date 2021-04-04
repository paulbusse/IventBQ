import { createRouter, createWebHistory } from 'vue-router';
import Places from '../views/places';
import PlaceAdd from '../views/placeadd';
import ItemAdd from '../views/itemadd';
import ItemView from '../views/itemview';
// import NIY from '../views/niy';

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
    name: 'ItemView',
    component: ItemView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
