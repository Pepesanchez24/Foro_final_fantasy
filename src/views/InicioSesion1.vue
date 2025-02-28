<template>
  <ion-page>
    <ion-content :fullscreen="true" class="gradient-background">
      <div class="login-container">
        <div class="login-box">
          <h1>INICIO DE SESIÓN</h1>
          <div class="form-group">
            <ion-input
              v-model="email"
              type="email"
              placeholder="Email"
              class="custom-input"
              fill="solid"
              :class="{ 'input-error': emailError }"
              @input="validateEmail"
            ></ion-input>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
          </div>
          
          <div class="form-group">
            <ion-input
              v-model="password"
              type="password"
              placeholder="Contraseña"
              class="custom-input"
              fill="solid"
              :class="{ 'input-error': passwordError }"
              @input="validatePassword"
            ></ion-input>
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </div>

          <ion-button
            expand="block"
            class="login-button"
            :disabled="!isFormValid"
            @click="handleLogin"
          >
            ENTRAR
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/vue';
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const emailError = ref('');
const passwordError = ref('');

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value) {
    emailError.value = 'El correo electrónico es obligatorio.';
  } else if (!emailPattern.test(email.value)) {
    emailError.value = 'Ingresa un correo electrónico válido.';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'La contraseña es obligatoria.';
  } else if (password.value.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres.';
  } else {
    passwordError.value = '';
  }
};

const isFormValid = computed(() => {
  return (
    !emailError.value &&
    !passwordError.value &&
    email.value !== '' &&
    password.value !== ''
  );
});

const handleLogin = () => {
  if (isFormValid.value) {
    router.push('/InicioSesion2')
  } else {
    alert('Por favor, completa el formulario correctamente.');
  }
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.login-box {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  padding: 30px 20px;
  width: 100%;
  max-width: 320px;
}

h1 {
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 20px;
}

.custom-input {
  --background: rgba(255, 255, 255, 0.1);
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.5);
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 16px;
  --padding-bottom: 16px;
}

.input-error {
  --background: rgba(255, 0, 0, 0.1);
  --border-color: red;
}

.login-button {
  --background: rgb(0, 255, 85);
  --background-hover: rgb(0, 220, 73);
  --color: black;
  --border-radius: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
  font-weight: bold;
  margin-top: 30px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
}

:deep(.native-input) {
  color: white !important;
}

:deep(.input-fill-solid) {
  --ion-item-background: rgba(255, 255, 255, 0.1);
}
</style>