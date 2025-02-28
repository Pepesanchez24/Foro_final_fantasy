<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>DENUNCIAR</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="report-container">
        <div class="report-card">
          <h1 class="report-title">Denunciar</h1>
          <p class="report-subtitle">
            Explica porque denuncias a esta persona
          </p>

          <div class="textarea-container">
            <ion-textarea
              v-model="reportText"
              placeholder="Escribe tu explicación aquí..."
              :counter="true"
              :maxlength="500"
              :rows="8"
              class="report-textarea"
            ></ion-textarea>
          </div>

          <ion-button 
            expand="block" 
            class="submit-button"
            @click="submitReport"
          >
            <ion-spinner v-if="isSubmitting" name="crescent"></ion-spinner>
            <span v-else>Enviar</span>
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
  IonTextarea,
  IonSpinner,
  toastController,
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

const reportText = ref('');
const isSubmitting = ref(false);

const submitReport = async () => {
  if (reportText.value.trim().length < 10) {
    const toast = await toastController.create({
      message: 'La explicación debe tener al menos 10 caracteres',
      duration: 2000,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
    return;
  }

  try {
    isSubmitting.value = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    const toast = await toastController.create({
      message: 'Denuncia enviada correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();

    reportText.value = '';
    router.push('/Denuncia2');
  } catch (error) {
    const errorToast = await toastController.create({
      message: 'Error al enviar la denuncia',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await errorToast.present();
  } finally {
    isSubmitting.value = false;
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

.report-container {
  padding: 16px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.report-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
}

.report-title {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.report-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0 0 24px 0;
}

.textarea-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
}

.report-textarea {
  --background: transparent;
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.5);
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
}

.submit-button {
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

.submit-button.button-disabled {
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

ion-spinner {
  --color: rgb(0, 20, 10);
}
</style>