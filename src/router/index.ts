import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import InicioSesion1 from '@/views/InicioSesion1.vue';
import InicioSesion2 from '@/views/InicioSesion2.vue';
import MenuHome from '@/views/MenuHome.vue';
import Inicio1 from '../views/Inicio1.vue';
import MenuPerfil from '@/views/MenuPerfil.vue';
import MenuAmigos from '@/views/MenuAmigos.vue';
import MenuComunidad from '@/views/MenuComunidad.vue';
import MenuCargando from '@/views/MenuCargando.vue';
import MenuConfig from '@/views/MenuConfig.vue';
import MenuLupa from '@/views/MenuLupa.vue';
import ConfigIdioma from '@/views/ConfigIdioma.vue';
import ConfigNotifi from '@/views/ConfigNotifi.vue';
import PerfilEditar from '@/views/PerfilEditar.vue';
import ComunidadEntradaFF1 from '@/views/ComunidadEntradaFF1.vue';
import ComunidadChatFF1 from '@/views/ComunidadChatFF1.vue';
import Denuncia1 from '@/views/Denuncia1.vue';
import Denuncia2 from '@/views/Denuncia2.vue';
import ComunidadEntradaFF3 from '@/views/ComunidadEntradaFF3.vue';
import ComunidadEntradaFF2 from '@/views/ComunidadEntradaFF2.vue';
import ComunidadEntradaFF4 from '@/views/ComunidadEntradaFF4.vue';
import ComunidadEntradaFF5 from '@/views/ComunidadEntradaFF5.vue';
import ComunidadEntradaFF6 from '@/views/ComunidadEntradaFF6.vue';
import ComunidadEntradaFF7 from '@/views/ComunidadEntradaFF7.vue';
import ComunidadChatFF4 from '@/views/ComunidadChatFF4.vue';
import ComunidadChatFF5 from '@/views/ComunidadChatFF5.vue';
import ComunidadChatFF6 from '@/views/ComunidadChatFF6.vue';
import ComunidadChatFF7 from '@/views/ComunidadChatFF7.vue';
import ComunidadChatFF3 from '@/views/ComunidadChatFF3.vue';
import ComunidadChatFF2 from '@/views/ComunidadChatFF2.vue';
import AmigoPerfil1 from '@/views/AmigoPerfil1.vue';
import AmigoChat1 from '@/views/AmigoChat1.vue';
import AmigoChat2 from '@/views/AmigoChat2.vue';
import AmigoChat3 from '@/views/AmigoChat3.vue';
import AmigoChat4 from '@/views/AmigoChat4.vue';
import AmigoPerfil2 from '@/views/AmigoPerfil2.vue';
import AmigoPerfil3 from '@/views/AmigoPerfil3.vue';
import AmigoPerfil4 from '@/views/AmigoPerfil4.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Inicio1',
  }
  ,
  {
    path: '/Inicio1',
    name: 'Inicio1',
    component: Inicio1
  }
,
  {
    path: '/InicioSesion1',
    name: 'InicioSesion1',
    component: InicioSesion1
  }
,
  {
    path: '/InicioSesion2',
    name: 'InicioSesion2',
    component: InicioSesion2
  }
  ,
  {
    path: '/MenuCargando',
    name: 'MenuCargando',
    component: MenuCargando
  }
  ,
  {
    path: '/MenuHome',
    name: 'MenuHome',
    component: MenuHome
  }
  ,
  {
    path: '/MenuPerfil',
    name: 'MenuPerfil',
    component: MenuPerfil
  }
  ,
  {
    path: '/MenuAmigos',
    name: 'MenuAmigos',
    component: MenuAmigos
  }
  ,
  {
    path: '/MenuComunidad',
    name: 'MenuComunidad',
    component: MenuComunidad
  }
  ,
  {
    path: '/MenuConfig',
    name: 'MenuConfig',
    component: MenuConfig
  }
  ,
  {
    path: '/MenuLupa',
    name: 'MenuLupa',
    component: MenuLupa
  }
  ,
  {
    path: '/AmigoPerfil1',
    name: 'AmigoPerfil1',
    component: AmigoPerfil1
  }
  ,
  {
    path: '/AmigoChat1',
    name: 'AmigoChat1',
    component: AmigoChat1
  }
  ,
  {
    path: '/AmigoPerfil2',
    name: 'AmigoPerfil2',
    component: AmigoPerfil2
  }
  ,
  {
    path: '/AmigoChat2',
    name: 'AmigoChat2',
    component: AmigoChat2
  }
  ,
  {
    path: '/AmigoPerfil3',
    name: 'AmigoPerfil3',
    component: AmigoPerfil3
  }
  ,
  {
    path: '/AmigoChat3',
    name: 'AmigoChat3',
    component: AmigoChat3
  }
  ,
  {
    path: '/AmigoPerfil4',
    name: 'AmigoPerfil4',
    component: AmigoPerfil4
  }
  ,
  {
    path: '/AmigoChat4',
    name: 'AmigoChat4',
    component: AmigoChat4
  }
  ,
  {
    path: '/ConfigNotifi',
    name: 'ConfigNotifi',
    component: ConfigNotifi
  }
  ,
  {
    path: '/ConfigIdioma',
    name: 'ConfigIdioma',
    component: ConfigIdioma
  }
  ,
  {
    path: '/PerfilEditar',
    name: 'PerfilEditar',
    component:PerfilEditar
  }
  ,
  {
    path: '/ComunidadEntradaFF1',
    name: 'ComunidadEntradaFF1',
    component: ComunidadEntradaFF1
  }
  ,
  {
    path: '/ComunidadChatFF1',
    name: 'ComunidadChatFF1',
    component: ComunidadChatFF1
  }
  ,
  {
    path: '/ComunidadEntradaFF2',
    name: 'ComunidadEntradaFF2',
    component: ComunidadEntradaFF2
  }
  ,
  {
    path: '/ComunidadChatFF2',
    name: 'ComunidadChatFF2',
    component: ComunidadChatFF2
  }
  ,
  {
    path: '/ComunidadEntradaFF3',
    name: 'ComunidadEntradaFF3',
    component: ComunidadEntradaFF3
  }
  ,
  {
    path: '/ComunidadChatFF3',
    name: 'ComunidadChatFF3',
    component: ComunidadChatFF3
  }
  ,
  {
    path: '/ComunidadEntradaFF4',
    name: 'ComunidadEntradaFF4',
    component: ComunidadEntradaFF4
  }
  ,
  {
    path: '/ComunidadChatFF4',
    name: 'ComunidadChatFF4',
    component: ComunidadChatFF4
  }
  ,
  {
    path: '/ComunidadEntradaFF5',
    name: 'ComunidadEntradaFF5',
    component: ComunidadEntradaFF5
  }
  ,
  {
    path: '/ComunidadChatFF5',
    name: 'ComunidadChatFF5',
    component: ComunidadChatFF5
  }
  ,
  {
    path: '/ComunidadEntradaFF6',
    name: 'ComunidadEntradaFF6',
    component: ComunidadEntradaFF6
  }
  ,
  {
    path: '/ComunidadChatFF6',
    name: 'ComunidadChatFF6',
    component: ComunidadChatFF6
  }
  ,
  {
    path: '/ComunidadEntradaFF7',
    name: 'ComunidadEntradaFF7',
    component: ComunidadEntradaFF7
  }
  ,
  {
    path: '/ComunidadChatFF7',
    name: 'ComunidadChatFF7',
    component: ComunidadChatFF7
  }
  ,
  {
    path: '/Denuncia1',
    name: 'Denuncia1',
    component: Denuncia1
  }
  ,
  {
    path: '/Denuncia2',
    name: 'Denuncia2',
    component: Denuncia2
  }
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
