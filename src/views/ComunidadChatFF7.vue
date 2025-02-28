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
            <h2 class="game-title">Final Fantasy VII</h2>
          </div>
          <ion-buttons slot="end">
            <ion-button @click="goToConfig">
              <ion-icon :icon="settingsOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true" class="gradient-background" ref="contentRef">
        <div class="chat-container" ref="chatContainer">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            class="message-wrapper"
            :class="{ 'own-message': message.isOwn }"
          >
            <div class="message-avatar">
              <ion-avatar>
                <img :src="message.avatar" :alt="message.username" />
              </ion-avatar>
            </div>
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
              @click="openFilePicker"
            >
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
    settingsOutline,
    sendOutline,
    homeOutline,
    peopleOutline,
    chatbubbleOutline,
    personOutline,
    attachOutline
  } from 'ionicons/icons';
  import {IonRouterOutlet } from '@ionic/vue'
  import router from '@/router';
  
  const goToConfig = () => {
    router.push('/MenuConfig')
  };
  
  interface ChatMessage {
    id: number;
    text?: string;
    isOwn: boolean;
    username: string;
    avatar: string;
    timestamp: Date;
    type: 'text' | 'image' | 'file';
    fileUrl?: string;
    fileName?: string;
  }
  
  const contentRef = ref();
  const chatContainer = ref();
  const newMessage = ref('');
  const fileInput = ref<HTMLInputElement | null>(null);
  
  const messages = ref<ChatMessage[]>([
    {
      id: 1,
      text: 'Puf, aerith!',
      isOwn: false,
      username: 'User1',
      avatar: '/src/images/Cloud.jpg',
      timestamp: new Date(),
      type: 'text'
    },
    {
      id: 2,
      text: 'Hola, grupo!',
      isOwn: true,
      username: 'Me',
      avatar: '/src/images/Perfil.jpg',
      timestamp: new Date(),
      type: 'text'
    }
    ,
    {
      id: 3,
      text: 'Joder, esto si que es un juego, normal tanto hate al mio.',
      isOwn: false,
      username: 'User2',
      avatar: '/src/images/Squall.jpg',
      timestamp: new Date(),
      type: 'text'
    }
    ,
    {
      id: 4,
      text: 'Pa tu casa, gay.',
      isOwn: false,
      username: 'User1',
      avatar: '/src/images/Cloud.jpg',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
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
        username: 'Me',
        avatar: '/src/images/Perfil.jpg',
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
          username: 'Me',
          avatar: '/src/images/Perfil.jpg',
          timestamp: new Date(),
          type: 'image',
          fileUrl: fileUrl
        });
      } else {
        messages.value.push({
          id: messages.value.length + 1,
          isOwn: true,
          username: 'Me',
          avatar: '/src/images/Perfil.jpg',
          timestamp: new Date(),
          type: 'file',
          fileUrl: fileUrl,
          fileName: file.name
        });
      }
  
      scrollToBottom();
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
  
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  .game-title {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
  }
  
  .chat-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    overflow-y: auto;
  }
  
  .message-wrapper {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  
  .message-wrapper.own-message {
    flex-direction: row-reverse;
  }
  
  .message-avatar {
    flex-shrink: 0;
  }
  
  .message-avatar ion-avatar {
    width: 32px;
    height: 32px;
  }
  
  .message-bubble {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 8px 16px;
    border-radius: 16px;
    border-top-left-radius: 4px;
    max-width: 80%;
    word-break: break-word;
  }
  
  .message-bubble.own-message {
    background: rgb(0, 255, 85);
    color: rgb(0, 20, 10);
    border-top-left-radius: 16px;
    border-top-right-radius: 4px;
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
  
  ion-buttons ion-button {
    --color: white;
  }
  </style>