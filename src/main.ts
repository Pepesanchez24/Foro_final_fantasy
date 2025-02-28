import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import '@ionic/vue/css/palettes/dark.system.css';
import './theme/variables.css';
import 'animate.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

import { IonRouterOutlet, IonTabs } from '@ionic/vue';

app.component('ion-router-outlet', IonRouterOutlet);
app.component('ion-tabs', IonTabs);

import { createRouter, createWebHistory } from 'vue-router';
import FinalFantasyPage from '@/views/ComunidadEntradaFF1.vue';

const routes = [
  {
    path: '/FinalFantasy/:id',
    name: 'FinalFantasy',
    component: FinalFantasyPage,
  },
];
;