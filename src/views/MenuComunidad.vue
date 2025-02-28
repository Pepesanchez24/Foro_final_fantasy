<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLupa">
            <ion-icon :icon="searchOutline"></ion-icon>
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
      <div class="list-container">
        <h2 class="section-title">Sobre</h2>
        <div class="game-list">
          <ion-item 
            v-for="game in games" 
            :key="game.id" 
            class="game-item"
            lines="none"
            @click="goToGamePage(game.id)"
          >
            <ion-label>{{ game.name }}</ion-label>
            <ion-icon :icon="chevronForward" slot="end"></ion-icon>
          </ion-item>
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
  IonButtons,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/vue';
import { 
  searchOutline,
  settingsOutline,
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  chevronForward
} from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLupa = (): void => {
  router.push('/MenuLupa');
};

const goToConfig = (): void => {
  router.push('/MenuConfig');
};

const games = ref([
  { id: 1, name: 'Final Fantasy I' },
  { id: 2, name: 'Final Fantasy II' },
  { id: 3, name: 'Final Fantasy III' },
  { id: 4, name: 'Final Fantasy IV' },
  { id: 5, name: 'Final Fantasy V' },
  { id: 6, name: 'Final Fantasy VI' },
  { id: 7, name: 'Final Fantasy VII' },
]);

const goToGamePage = (gameId: number): void => {
  router.push(`/ComunidadEntradaFF${gameId}`);
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

.list-container {
  padding: 16px;
}

.section-title {
  color: white;
  font-size: 1.2rem;
  margin: 0 0 16px 4px;
  font-weight: 500;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.game-item {
  --background: rgba(0, 0, 0, 0.8);
  --border-radius: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --inner-padding-end: 0;
  margin: 0;
}

:deep(.game-item ion-label) {
  color: white;
  font-size: 1rem;
  margin: 0;
}

:deep(.game-item ion-icon) {
  color: white;
  opacity: 0.7;
  font-size: 1.2rem;
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