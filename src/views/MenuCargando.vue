<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="top-toolbar">
          <ion-buttons slot="start">
            <ion-button @click="goToLupa">
              <ion-icon :icon="searchOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>INICIOS</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToConfig">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="gradient-background">
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
    IonButtons,
    IonButton
  } from '@ionic/vue';
  import { 
    searchOutline,
    settingsOutline,
    homeOutline,
    peopleOutline,
    chatbubbleOutline,
    personOutline,
  } from 'ionicons/icons';
  import {IonRouterOutlet } from '@ionic/vue'
  import router from '@/router';
  import { onMounted } from 'vue';

const goToLupa = () => {
  router.push('/MenuLupa')
};

const goToConfig = () => {
  router.push('/MenuConfig')
};

const redirectToAnotherPage = () => {
  setTimeout(() => {
    router.push('/MenuHome');
  }, 200);
};
  onMounted(() => {
  redirectToAnotherPage();
});
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
  
  .top-toolbar {
    --background: rgba(0, 0, 0, 0.8);
    --color: white;
    align-items: center;
    justify-content: center;  
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