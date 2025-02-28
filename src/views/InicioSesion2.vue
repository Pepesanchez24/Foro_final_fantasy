<template>
  <ion-page>
    <ion-content :fullscreen="true" class="gradient-background">
      <div class="loading-container">
        <div class="loading-box">
          <h1>INICIO DE SESIÓN</h1>
          <ion-spinner name="circular" class="custom-spinner"></ion-spinner>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonSpinner } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

const redirectToAnotherPage = () => {
  setTimeout(() => {
    router.push('/MenuCargando');
  }, 2000);
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.loading-box {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 30px 20px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

h1 {
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0;
}

.custom-spinner {
  --color: white;
  width: 40px;
  height: 40px;
}
</style>