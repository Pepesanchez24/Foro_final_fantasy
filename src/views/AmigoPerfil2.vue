<template>
    <ion-page>
      <ion-header>
        <ion-toolbar class="top-toolbar">
          <ion-buttons slot="start">
            <ion-button @click="goBack">
              <ion-icon :icon="arrowBack"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>PERFIL</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="goToConfig">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="gradient-background">
        <div class="profile-container">
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-image-container">
                <img 
                  :src="user.avatar" 
                  :alt="user.name"
                  class="profile-image"
                />
              </div>
              <h2 class="profile-name">{{ user.name }}</h2>
              <p class="profile-bio">Nivel 99 · Platinum Member</p>
          </div>

          <div class="interests-section">
            <h3 class="interests-title">Descripcion:</h3>
            <p class="description">
              Mi juego es una mierda.
            </p>
          </div>
  
            <div class="interests-section">
              <h3 class="interests-title">Interesado en:</h3>
              <div class="game-container">
                <img 
                  :src="user.interestedGame.image" 
                  :alt="user.interestedGame.name"
                  class="game-image"
                />
              </div>
            </div>
  
            <ion-button 
              expand="block" 
              class="add-friend-button"
              :disabled="friendRequestSent"
              @click="sendFriendRequest"
            >
              {{ friendRequestSent ? 'Solicitud enviada' : 'Agregar amigo' }}
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
  import { ref } from 'vue';
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
  
  const user = ref({
    name: 'Squall Leonhart',
    avatar: '/src/images/Squall.jpg',
    interestedGame: {
      name: 'FINAL FANTASY VIII',
      image: '/src/images/FF8.jpg'
    }
  });
  
  const friendRequestSent = ref(false);
  
  const sendFriendRequest = async () => {
    friendRequestSent.value = true;
    
    const toast = await toastController.create({
      message: 'Solicitud de amistad enviada',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
  
    await toast.present();
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
  
  .profile-container {
    padding: 16px;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  
  .profile-card {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 400px;
  }
  
  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .profile-image-container {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgb(0, 255, 85);
    margin-bottom: 16px;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-name {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  
  .interests-section {
    margin-bottom: 24px;
  }
  
  .interests-title {
  color: white;
  font-size: 1rem;
  margin: 0 0 8px 0;
}
  .game-container {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
  }
  
  .game-image {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .add-friend-button {
    --background: rgb(0, 255, 85);
    --background-activated: rgb(0, 200, 70);
    --background-hover: rgb(0, 220, 75);
    --color: rgb(0, 20, 10);
    --border-radius: 8px;
    margin: 0;
    text-transform: none;
    font-weight: 500;
  }
  
  .add-friend-button.button-disabled {
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

  .description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 16px 0;
}

.interests-title {
  color: white;
  font-size: 1rem;
  margin: 0 0 8px 0;
}

.profile-bio {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}
  </style>