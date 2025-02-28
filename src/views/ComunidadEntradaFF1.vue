<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="top-toolbar">
          <ion-buttons slot="start">
            <ion-button @click="goBack">
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>COMUNIDAD</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToConfig">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="gradient-background">
        <div class="game-container">
          <div class="game-card">
            <h1 class="game-title">Final Fantasy I</h1>
            
            <div class="game-description">
              <p>
                Final Fantasy es un videojuego de rol creado por Hironobu 
                Sakaguchi, desarrollado y publicado en Japón por Square 
                Co. en 1987 y publicado en Estados Unidos por Nintendo 
                of America, Inc. en 1990. Es el primer juego de la 
                serie Final Fantasy.
              </p>
            </div>
  
            <ion-button 
              expand="block" 
              class="chat-button"
              @click="enterChat"
            >
              Entrar al chat comunitario
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
    IonButtons
  } from '@ionic/vue';
  import {
    arrowBack,
    settingsOutline,
    homeOutline,
    peopleOutline,
    chatbubbleOutline,
    personOutline
  } from 'ionicons/icons';
  import {IonRouterOutlet } from '@ionic/vue'
  import router from '@/router';

const goToConfig = () => {
  router.push('/MenuConfig')
};
  
  
  const goBack = () => {
    router.go(-1);
  };
  
  const enterChat = () => {
    router.push('/ComunidadChatFF1')
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
  
  .game-container {
    padding: 16px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  
  .game-card {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .game-title {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  
  .game-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .game-description p {
    margin: 0;
  }
  
  .chat-button {
    --background: rgb(0, 255, 85);
    --background-activated: rgb(0, 200, 70);
    --background-hover: rgb(0, 220, 75);
    --color: rgb(0, 20, 10);
    --border-radius: 8px;
    margin: 0;
    text-transform: none;
    font-weight: 500;
    height: 44px;
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