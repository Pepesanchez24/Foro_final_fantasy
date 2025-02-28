<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLupa">
            <ion-icon :icon="searchOutline"></ion-icon>
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
          <ion-button
            fill="clear"
            class="more-button"
            @click="openMenu"
          >
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>

          <div class="profile-header">
            <div class="profile-image-container">
              <img :src="profileData.avatar" alt="Profile picture" class="profile-image" />
            </div>
            <h2 class="profile-name">{{ profileData.name }}</h2>
            <p class="profile-bio">Nivel 99 · Platinum Member</p>
          </div>

          <div class="interests-section">
            <h3 class="interests-title">Descripción:</h3>
            <p class="description">{{ profileData.description }}</p>
          </div>

          <div class="interests-section">
            <h3 class="interests-title">Interesado en:</h3>
            <div class="interests-grid">
              <div v-for="game in displayedGames" :key="game.id" class="game-icon">
                <img :src="game.icon" :alt="game.name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar class="bottom-toolbar">
        <ion-tabs>
          <ion-router-outlet />
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
import { computed, onMounted, ref } from 'vue';
import { useProfileService } from '@/profileService';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  actionSheetController,
} from '@ionic/vue';
import {
  homeOutline,
  searchOutline,
  settingsOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  ellipsisVertical,
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const { profileData, loadProfile } = useProfileService();
const router = useRouter();

onMounted(() => {
  loadProfile();
});

const games = ref([
  { id: 1, name: 'Final Fantasy I', icon: '/src/images/FF1.jpg' },
  { id: 2, name: 'Final Fantasy II', icon: '/src/images/FF2.jpg' },
  { id: 3, name: 'Final Fantasy III', icon: '/src/images/FF3.jpg' },
  { id: 4, name: 'Final Fantasy IV', icon: '/src/images/FF4.jpg' },
  { id: 5, name: 'Final Fantasy V', icon: '/src/images/FF5.jpg' },
  { id: 6, name: 'Final Fantasy VI', icon: '/src/images/FF6.jpg' },
  { id: 7, name: 'Final Fantasy VII', icon: '/src/images/FF7.png' },
  { id: 8, name: 'Final Fantasy IX', icon: '/src/images/FF9.jpg' },
  { id: 9, name: 'Final Fantasy X', icon: '/src/images/FF10.jpg' },
  { id: 10, name: 'Final Fantasy XII', icon: '/src/images/FF12.jpg' },
  { id: 11, name: 'Final Fantasy XIII', icon: '/src/images/FF13.jpg' },
  { id: 12, name: 'Final Fantasy XV', icon: '/src/images/FF15.jpg' },
]);

const displayedGames = computed(() => {
  return games.value.filter((game) => profileData.value.selectedGames.includes(game.id));
});

const openMenu = async (): Promise<void> => {
  const actionSheet = await actionSheetController.create({
    header: 'Opciones',
    buttons: [
      {
        text: 'Editar perfil',
        handler: () => {
          router.push('/PerfilEditar');
        },
      },
    ],
  });
  await actionSheet.present();
};

const goToLupa = () => {
  router.push('/MenuLupa')
};

const goToConfig = () => {
  router.push('/MenuConfig');
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
  position: relative;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.profile-image-container {
  width: 100px;
  height: 100px;
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
  margin-bottom: 4px;
}

.profile-bio {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.interests-section {
  margin-bottom: 16px;
}

.interests-title {
  color: white;
  font-size: 1rem;
  margin: 0 0 8px 0;
}

.description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 16px 0;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.game-icon {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.more-button {
  --color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 16px;
  right: 16px;
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

ion-title {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

ion-icon {
  font-size: 24px;
}
</style>