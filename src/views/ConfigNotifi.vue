<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="top-toolbar">
          <ion-buttons slot="start">
            <ion-button @click="goBack">
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>USUARIO</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToConfig">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="gradient-background">
        <div class="settings-container">
          <div class="settings-card">
            <h1 class="settings-title">Notificaciones</h1>
            
            <div class="notifications-list">
              <div class="notification-item">
                <span class="notification-label">Chats:</span>
                <ion-toggle
                  v-model="notifications.chats"
                  class="custom-toggle"
                ></ion-toggle>
              </div>
  
              <div class="notification-item">
                <span class="notification-label">Noticias:</span>
                <ion-toggle
                  v-model="notifications.news"
                  class="custom-toggle"
                ></ion-toggle>
              </div>
            </div>
  
            <ion-button 
              expand="block" 
              class="save-button"
              :disabled="!hasChanges"
              @click="saveSettings"
            >
              Guardar
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
  import { ref, reactive, computed } from 'vue';
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
    IonToggle,
    toastController
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

  interface NotificationSettings {
    chats: boolean;
    news: boolean;
  }
  
  const initialSettings = {
    chats: true,
    news: true
  };
  
  const notifications = reactive<NotificationSettings>({ ...initialSettings });
  const savedSettings = ref<NotificationSettings>({ ...initialSettings });
  
  const hasChanges = computed(() => {
    return notifications.chats !== savedSettings.value.chats ||
           notifications.news !== savedSettings.value.news;
  });
  
  const saveSettings = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      savedSettings.value = { ...notifications };
      
      const toast = await toastController.create({
        message: 'Configuración guardada correctamente',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      
      await toast.present();
    } catch (error) {
      const errorToast = await toastController.create({
        message: 'Error al guardar la configuración',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      
      await errorToast.present();
    }
  };
  
  const goBack = () => {
  router.go(-1);
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
  
  .settings-card {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
  }
  
  .settings-title {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 24px 0;
  }
  
  .notifications-list {
    margin-bottom: 32px;
  }
  
  .notification-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
  }
  
  .notification-item:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .notification-label {
    color: white;
    font-size: 1rem;
  }
  
  .custom-toggle {
    --background: rgba(255, 255, 255, 0.2);
    --background-checked: rgb(0, 255, 85);
    --handle-background: white;
    --handle-background-checked: white;
  }
  
  .save-button {
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
  
  .save-button.button-disabled {
    --background: rgba(0, 255, 85, 0.5);
    --opacity: 1;
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