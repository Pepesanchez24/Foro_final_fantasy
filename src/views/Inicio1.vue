<template>
  <ion-page>
    <ion-content :fullscreen="true" class="gradient-background">
      <transition name="fade">
        <div v-if="showImage" class="image-container">
          <img src="/src/images/Foro.png" alt="Imagen centrada" class="centered-image" />
        </div>
      </transition>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const showImage = ref(false);
const redirectToAnotherPage = () => {
  setTimeout(() => {
    showImage.value = false;
    setTimeout(() => {
      router.push('/InicioSesion1');
    }, 1000);
  }, 3000);
};

onMounted(() => {
  setTimeout(() => {
    showImage.value = true;
  }, 1000);
  redirectToAnotherPage();
});
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.centered-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.gradient-background {
  --background: radial-gradient(
    circle at center,
    rgb(0, 255, 85) 0%,
    rgb(0, 100, 40) 50%,
    rgb(0, 20, 10) 100%
  );
}

ion-toolbar {
  --background: transparent;
  --color: white;
}
</style>