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
      <div class="profile-container">
        <div class="profile-card">
          <div class="avatar-section">
            <div class="avatar-container" @click="triggerImageUpload">
              <img :src="profileData.avatar" alt="Profile picture" class="profile-avatar" />
              <div class="avatar-overlay">
                <ion-icon :icon="camera"></ion-icon>
              </div>
            </div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
          </div>

          <div class="form-section">
            <div class="form-group">
              <label>Cambiar nombre:</label>
              <ion-input
                v-model="profileData.name"
                class="custom-input"
                placeholder="Tu nombre"
              ></ion-input>
            </div>

            <div class="form-group">
              <label>Cambiar descripción:</label>
              <ion-textarea
                v-model="profileData.description"
                class="custom-input"
                placeholder="Tu descripción"
                :rows="3"
                auto-grow="true"
              ></ion-textarea>
            </div>

            <div class="form-group">
              <label>Interesado en:</label>
              <div class="games-grid">
                <div
                  v-for="game in games"
                  :key="game.id"
                  class="game-item"
                  :class="{ selected: selectedGames.includes(game.id) }"
                  @click="toggleGameSelection(game.id)"
                >
                  <img :src="game.icon" :alt="game.name" />
                </div>
              </div>
            </div>
          </div>

          <ion-button
            expand="block"
            class="save-button"
            :disabled="!hasChanges"
            @click="saveProfile"
          >
            Guardar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonInput,
  IonTextarea,
} from '@ionic/vue';
import {
  arrowBack,
  settingsOutline,
  camera
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { saveAs } from 'file-saver';
import { toastController } from '@ionic/vue';
import { useProfileService } from '@/profileService';

const { profileData, updateProfile, loadProfile } = useProfileService();
const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedGames = ref<number[]>([...profileData.value.selectedGames]);

interface ProfileData {
  avatar: string;
  name: string;
  description: string;
  selectedGames: number[];
}

const initialProfile: ProfileData = {
  avatar: '/src/images/Perfil.jpg',
  name: 'Marc Sanchez',
  description: 'Nací por mi madre y moriré por Final Fantasy',
  selectedGames: [1, 2, 3, 4],
};

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

onMounted(() => {
  loadProfile();
  selectedGames.value = [...profileData.value.selectedGames];
});

const hasChanges = computed(() => {
  return (
    profileData.value.name !== initialProfile.name ||
    profileData.value.description !== initialProfile.description ||
    profileData.value.avatar !== initialProfile.avatar
  );
});

const triggerImageUpload = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        profileData.value.avatar = e.target.result as string;
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const toggleGameSelection = (gameId: number) => {
  const index = selectedGames.value.indexOf(gameId);
  if (index === -1) {
    selectedGames.value.push(gameId);
  } else {
    selectedGames.value.splice(index, 1);
  }
};

const saveProfile = async () => {
  try {
    const profileToSave = {
      ...profileData.value,
      selectedGames: selectedGames.value,
    };

    updateProfile(profileToSave);

    const blob = new Blob([JSON.stringify(profileToSave, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'profile.json');

    const toast = await toastController.create({
      message: 'Perfil guardado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    router.push('/MenuPerfil');
  } catch (error) {
    const errorToast = await toastController.create({
      message: 'Error al guardar el perfil',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    await errorToast.present();
  }
};

const goBack = () => {
  router.go(-1);
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
  margin-bottom: 100px;
}

.profile-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay ion-icon {
  color: white;
  font-size: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: white;
  font-size: 1rem;
}

.custom-input {
  --background: rgba(255, 255, 255, 0.1);
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.5);
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --border-radius: 8px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
}

.game-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}

.game-item:hover {
  transform: scale(1.05);
}

.game-item.selected {
  box-shadow: 0 0 0 2px rgb(0, 255, 85);
}

.game-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.hidden {
  display: none;
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