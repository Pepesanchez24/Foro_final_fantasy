<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLupa">
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>AJUSTES</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="settings-container">
        <div class="menu-card">
          <ion-button 
            class="menu-button"
            expand="block"
            fill="clear"
            @click="handleIdioma"
          >
            Idioma
          </ion-button>

          <ion-button 
            class="menu-button"
            expand="block"
            fill="clear"
            @click="handleNotificaciones"
          >
            Notificaciones
          </ion-button>

          <ion-button 
            class="menu-button logout-button"
            expand="block"
            fill="clear"
            @click="handleLogout"
          >
            {{ logoutButtonText }}
          </ion-button>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar class="bottom-toolbar">
        <ion-tabs>
          <ion-router-outlet/>
          <ion-tab-bar slot="bottom">
            <ion-tab-button tab="MenuHome" href="/MenuHome">
              <ion-icon :icon="homeOutline"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="MenuAmigos" href="/MenuAmigos">
              <ion-icon :icon="peopleOutline"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="MenuComunidad" href="/MenuComunidad">
              <ion-icon :icon="chatbubbleOutline"></ion-icon>
            </ion-tab-button>

            <ion-tab-button tab="MenuPerfil" href="/MenuPerfil">
              <ion-icon :icon="personOutline"></ion-icon>
            </ion-tab-button>
          </ion-tab-bar>
        </ion-tabs>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
  
<script setup lang="ts">
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/vue';
import {
  searchOutline,
  settingsOutline,
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline
} from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logoutClickCount = ref(0);
const logoutButtonText = ref('Cerrar sesión');

const goToLupa = () => {
  router.push('/MenuLupa');
};

const handleIdioma = () => {
  router.push('/ConfigIdioma');
};

const handleNotificaciones = () => {
  router.push('/ConfigNotifi');
};

const handleLogout = async () => {
  logoutClickCount.value++;

  if (logoutClickCount.value === 1) {
    logoutButtonText.value = '¿Seguro? Haz clic de nuevo para cerrar sesión';
  } else if (logoutClickCount.value === 2) {
            router.push('/InicioSesion1');
  }
};
</script>
  
<style scoped>
  .gradient-background {
    --background: radial-gradient(
      circle at center,
      rgb(0, 255, 85) 0%,
      rgb(0, 100, 40) 50%,
      rgb(0, 20, 10) 100%
    );
  }
  
  .settings-container {
    padding: 16px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  
  .menu-card {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .menu-button {
    --background: rgba(255, 255, 255, 0.1);
    --background-hover: rgba(255, 255, 255, 0.15);
    --background-activated: rgba(255, 255, 255, 0.2);
    --color: white;
    --border-radius: 8px;
    --padding-top: 16px;
    --padding-bottom: 16px;
    margin: 0;
    text-transform: none;
    font-weight: normal;
  }
  
  .logout-button {
    --color: rgb(255, 59, 48);
    margin-top: 8px;
  }
  
  .top-toolbar {
    --background: rgba(0, 0, 0, 0.8);
    --color: white;
    --border-style: none;
  }
  
  .bottom-toolbar {
    --background: rgba(0, 0, 0, 0.8);
    --border-style: none;
  }
  
  ion-tab-bar {
    --background: transparent;
    --border: none;
  }
  
  ion-tab-button {
    --color: rgba(255, 255, 255, 0.6);
    --color-selected: rgb(0, 255, 85);
  }
  
  ion-icon {
    font-size: 24px;
  }
  
  ion-title {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  ion-buttons ion-button {
    --color: white;
  }
  </style>  