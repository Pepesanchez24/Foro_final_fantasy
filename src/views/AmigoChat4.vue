<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <div class="chat-header">
          <ion-avatar>
            <img :src="chatPartner.avatar" :alt="chatPartner.name" />
          </ion-avatar>
          <ion-title>{{ chatPartner.name }}</ion-title>
        </div>

        <ion-buttons slot="end">
          <ion-button @click="openMenu">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <div class="chat-container" ref="chatContainer">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          class="message-wrapper"
          :class="{ 'own-message': message.isOwn }"
        >
          <div class="message-bubble" :class="{ 'own-message': message.isOwn }">
            <template v-if="message.type === 'text'">
              {{ message.text }}
            </template>
            <template v-else-if="message.type === 'image'">
              <img :src="message.fileUrl" alt="Imagen enviada" class="message-image" />
            </template>
            <template v-else-if="message.type === 'file'">
              <a :href="message.fileUrl" target="_blank" class="message-file">
                {{ message.fileName }}
              </a>
            </template>
          </div>
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar class="message-input-toolbar">
        <div class="message-input-container">
          <ion-input
            v-model="newMessage"
            placeholder="Mensaje..."
            class="message-input"
            @keyup.enter="sendMessage"
          ></ion-input>
          <ion-button 
            fill="clear" 
            class="send-button"
            :disabled="!newMessage.trim()"
            @click="sendMessage"
          >
            <ion-icon :icon="sendOutline"></ion-icon>
          </ion-button>
          <input 
            type="file" 
            ref="fileInput" 
            style="display: none;" 
            @change="handleFileUpload"
            accept="image/*, .pdf, .doc, .docx"
          />
          <ion-button 
            fill="clear" 
            class="file-button"
            @click="openFilePicker">
            <ion-icon :icon="attachOutline"></ion-icon>
          </ion-button>
        </div>
      </ion-toolbar>

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
import { ref, onMounted, nextTick } from 'vue';
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
  IonAvatar,
  IonInput,
  actionSheetController
} from '@ionic/vue';
import {
  arrowBack,
  ellipsisVertical,
  sendOutline,
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  attachOutline
} from 'ionicons/icons';
import {IonRouterOutlet } from '@ionic/vue'
import router from '@/router';

interface Message {
  id: number;
  text?: string;
  isOwn: boolean;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
}

const chatPartner = ref({
  name: 'Noctis Lucis',
  avatar: '/src/images/Noctis.jpg'
});

const messages = ref<Message[]>([
  {
    id: 1,
    text: 'Hola buenos dias!',
    isOwn: false,
    timestamp: new Date(),
    type: 'text'
  },
  {
    id: 2,
    text: 'Hola!',
    isOwn: true,
    timestamp: new Date(),
    type: 'text'
  }
]);

const newMessage = ref('');
const chatContainer = ref<HTMLElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      text: newMessage.value,
      isOwn: true,
      timestamp: new Date(),
      type: 'text'
    });
    newMessage.value = '';
    scrollToBottom();
  }
};

const goBack = () => {
  router.go(-1);
};

const openFilePicker = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith('image/')) {
      messages.value.push({
        id: messages.value.length + 1,
        isOwn: true,
        timestamp: new Date(),
        type: 'image',
        fileUrl: fileUrl
      });
    } else {
      messages.value.push({
        id: messages.value.length + 1,
        isOwn: true,
        timestamp: new Date(),
        type: 'file',
        fileUrl: fileUrl,
        fileName: file.name
      });
    }

    scrollToBottom();
  }
};

const openMenu = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Noctis Lucis',
    buttons: [
      {
        text: 'Ver perfil',
        handler: () => {
          router.push('/AmigoPerfil4');
        }
      },
      {
        text: 'Denunciar',
        handler: () => {
          router.push('/Denuncia1');
        }
      }
    ]
  });
  await actionSheet.present();
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

.top-toolbar {
  --background: rgba(0, 0, 0, 0.8);
  --color: white;
  --border-style: none;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-header ion-avatar {
  width: 36px;
  height: 36px;
}

.chat-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  overflow-y: auto;
}

.message-wrapper {
  display: flex;
  justify-content: flex-start;
}

.message-wrapper.own-message {
  justify-content: flex-end;
}

.message-bubble {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 16px;
  max-width: 80%;
  word-break: break-word;
}

.message-bubble.own-message {
  background: rgb(0, 255, 85);
  color: rgb(0, 20, 10);
}

.message-image {
  max-width: 100%;
  border-radius: 8px;
}

.message-file {
  color: rgb(0, 20, 10);
  text-decoration: none;
  font-weight: bold;
}

.message-input-toolbar {
  --background: rgba(0, 0, 0, 0.8);
  --border-style: none;
  padding: 8px;
}

.message-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 4px 4px 4px 16px;
}

.message-input {
  --background: transparent;
  --color: white;
  --placeholder-color: rgba(255, 255, 255, 0.6);
  --padding-start: 0;
  margin: 0;
}

.send-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --color: rgb(0, 255, 85);
  margin: 0;
}

.send-button.button-disabled {
  --color: rgba(255, 255, 255, 0.3);
}

.file-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --color: rgb(255, 255, 255, 0.3);
  margin: 0;
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
  font-size: 1.1rem;
  font-weight: 600;
}

ion-buttons ion-button {
  --color: white;
}
</style>