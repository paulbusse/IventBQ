import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import TabMenu from 'primevue/tabmenu';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import mdiVue from 'mdi-vue';
import * as mdijs from '@mdi/js';

import App from './App';
import router from './router';

import 'primevue/resources/themes/vela-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@mdi/font/css/materialdesignicons.css';

import service from './utils/ivts';

axios.defaults.baseURL = 'http://localhost:4000';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(router);
app.use(mdiVue, { icons: mdijs });
app.use(PrimeVue);
app.use(ToastService);

app.component('Button', Button);
app.component('Card', Card);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('TabMenu', TabMenu);
app.component('Toast', Toast);

service.app = app;
app.mount('#app');
