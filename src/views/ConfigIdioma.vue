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
          <h1 class="settings-title">Idioma</h1>
          
          <div class="language-section">
            <p class="language-subtitle">Selecciona tu idioma:</p>
            
            <div class="language-select-container">
              <ion-button 
                expand="block"
                fill="clear"
                class="language-select-button"
                @click="toggleLanguageDropdown"
              >
                <span>{{ selectedLanguage.name }}</span>
                <ion-icon :icon="chevronDown" slot="end"></ion-icon>
              </ion-button>

              <div v-if="isLanguageDropdownOpen" class="language-dropdown">
                <ion-item
                  v-for="language in availableLanguages"
                  :key="language.code"
                  button
                  @click="selectLanguage(language)"
                  :class="{ 'selected': language.code === selectedLanguage.code }"
                >
                  <ion-label>{{ language.name }}</ion-label>
                  <ion-icon
                    v-if="language.code === selectedLanguage.code"
                    :icon="checkmark"
                    slot="end"
                    class="selected-icon"
                  ></ion-icon>
                </ion-item>
              </div>
            </div>
          </div>

          <ion-button 
            expand="block" 
            class="save-button"
            :disabled="!hasChanges"
            @click="saveLanguage"
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
import { ref, computed } from 'vue';
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
  IonItem,
  IonLabel,
  toastController
} from '@ionic/vue';
import {
  arrowBack,
  settingsOutline,
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  chevronDown,
  checkmark
} from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Language {
  code: string;
  name: string;
}

const availableLanguages: Language[] = [
  { code: 'es', name: 'Español (ESP)' },
  { code: 'en', name: 'English (ENG)' },
  { code: 'fr', name: 'Français (FRA)' },
  { code: 'de', name: 'Deutsch (DEU)' },
  { code: 'it', name: 'Italiano (ITA)' },
  { code: 'pt', name: 'Português (POR)' }
];

const initialLanguage = ref<Language>(availableLanguages[0]);
const selectedLanguage = ref<Language>(initialLanguage.value);
const isLanguageDropdownOpen = ref(false);

const hasChanges = computed(() => {
  return selectedLanguage.value.code !== initialLanguage.value.code;
});

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

const selectLanguage = (language: Language) => {
  selectedLanguage.value = language;
  isLanguageDropdownOpen.value = false;
};

const saveLanguage = async () => {
  initialLanguage.value = selectedLanguage.value;
  
  const toast = await toastController.create({
    message: 'Idioma guardado correctamente',
    duration: 2000,
    position: 'bottom',
    color: 'success'
  });

  await toast.present();
};

const goBack = () => {
  router.go(-1);
};

const goToConfig = () => {
  router.push('/MenuConfig')
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

.language-section {
  margin-bottom: 32px;
}

.language-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 12px 0;
}

.language-select-container {
  position: relative;
}

.language-select-button {
  --background: rgba(255, 255, 255, 0.1);
  --background-activated: rgba(255, 255, 255, 0.15);
  --background-hover: rgba(255, 255, 255, 0.15);
  --color: white;
  --border-radius: 8px;
  margin: 0;
  height: 48px;
  font-weight: normal;
  text-transform: none;
  justify-content: space-between;
  width: 100%;
}

.language-select-button ion-icon {
  margin-left: 8px;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  margin-top: 8px;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.language-dropdown ion-item {
  --background: transparent;
  --color: white;
  --border-color: rgba(255, 255, 255, 0.1);
  --padding-start: 16px;
  --padding-end: 16px;
}

.language-dropdown ion-item.selected {
  --background: rgba(0, 255, 85, 0.1);
}

.selected-icon {
  color: rgb(0, 255, 85);
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