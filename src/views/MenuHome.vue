<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLupa">
            <ion-icon :icon="searchOutline" color="light"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>INICIO</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToConfig">
            <ion-icon :icon="settingsOutline" color="light"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="gradient-background">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="isUploadModalOpen = true" color="success">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <div class="feed-container">
        <div class="post-card" v-for="(post, index) in posts" :key="index">
          <div class="post-header">
            <ion-avatar class="post-avatar">
              <img :src="post.avatar" alt="User Avatar">
            </ion-avatar>
            <h2 class="post-username">{{ post.username }}</h2>
          </div>
          <div class="image-container">
            <img :src="post.image" alt="Post Image" class="post-image">
          </div>
          <div class="post-actions">
            <ion-button fill="clear" @click="likePost(index)" class="action-button">
              <ion-icon :icon="post.liked ? heart : heartOutline" color="success"></ion-icon>
            </ion-button>
            <ion-button fill="clear" @click="toggleChat(index)" class="action-button">
              <ion-icon :icon="chatbubbleOutline" color="success"></ion-icon>
            </ion-button>
          </div>
          <div class="post-likes">
            <strong>{{ post.likes }} likes</strong>
          </div>
          <div class="post-caption">
            <strong>{{ post.username }}</strong> {{ post.caption }}
          </div>

          <div v-if="post.showChat" class="chat-floating">
            <div class="chat-header">
              <h3>Comentarios</h3>
              <ion-button fill="clear" @click="toggleChat(index)">
                <ion-icon :icon="closeOutline" color="light"></ion-icon>
              </ion-button>
            </div>
            <div class="chat-messages">
              <div v-for="(message, msgIndex) in post.chatMessages" :key="msgIndex" class="message">
                <strong>{{ message.user }}:</strong> {{ message.text }}
              </div>
            </div>
            <div class="chat-input">
              <ion-input v-model="post.newMessage" placeholder="Escribe un mensaje..." color="light"></ion-input>
              <ion-button @click="sendMessage(index)" color="light">
                <ion-icon :icon="sendOutline" color="light"></ion-icon>
              </ion-button>
            </div>
          </div>
        </div>
      </div>

      <ion-modal :is-open="isUploadModalOpen" @didDismiss="isUploadModalOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>Crear publicación</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="isUploadModalOpen = false">
                <ion-icon :icon="closeOutline" color="success"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="modal-content">
          <div class="upload-container">
            <ion-item>
              <ion-label position="stacked"></ion-label>
              <ion-input type="file" @change="handleImageUpload"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Descripción</ion-label>
              <ion-textarea v-model="newPostCaption" placeholder="Escribe una descripción..."></ion-textarea>
            </ion-item>
            <ion-button expand="block" @click="createPost" color="success">
              Publicar
            </ion-button>
          </div>
        </ion-content>
      </ion-modal>
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
  IonAvatar,
  IonFab,
  IonFabButton,
  IonInput,
  IonModal,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/vue';
import { 
  searchOutline,
  settingsOutline,
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  heartOutline,
  heart,
  sendOutline,
  addOutline,
  closeOutline
} from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([
  {
    username: 'Cloud Strife',
    avatar: '/src/images/Cloud.jpg',
    image: '/src/images/Aerith.jpg',
    caption: 'Aun no te supero.',
    likes: 123,
    liked: false,
    showChat: false,
    chatMessages: [] as { user: string; text: string }[],
    newMessage: ''
  },
  {
    username: 'Noctis Lucis',
    avatar: '/src/images/Noctis.jpg',
    image: '/src/images/Lunafreya.jpg',
    caption: 'Porfin juntos.',
    likes: 456,
    liked: false,
    showChat: false,
    chatMessages: [] as { user: string; text: string }[],
    newMessage: ''
  },
  {
    username: 'Cecil Harvey',
    avatar: '/src/images/Cecil.jpg',
    image: '/src/images/RosaCecil.jpg',
    caption: 'Mi mujer preciosa.',
    likes: 789,
    liked: false,
    showChat: false,
    chatMessages: [] as { user: string; text: string }[],
    newMessage: ''
  }
]);

onMounted(() => {
  const savedPosts = localStorage.getItem('posts');
  if (savedPosts) {
    posts.value = JSON.parse(savedPosts);
  }
});

const likePost = (index: number) => {
  posts.value[index].liked = !posts.value[index].liked;
  posts.value[index].likes += posts.value[index].liked ? 1 : -1;
  savePostsToLocalStorage();
};

const toggleChat = (index: number) => {
  posts.value[index].showChat = !posts.value[index].showChat;
};

const sendMessage = (index: number) => {
  if (posts.value[index].newMessage.trim()) {
    posts.value[index].chatMessages.push({ user: 'Tú', text: posts.value[index].newMessage });
    posts.value[index].newMessage = '';
    savePostsToLocalStorage();
  }
};

const isUploadModalOpen = ref(false);
const newPostImage = ref<File | null>(null);
const newPostCaption = ref('');

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    newPostImage.value = input.files[0];
  }
};

const createPost = () => {
  if (newPostImage.value && newPostCaption.value.trim()) {
    const reader = new FileReader();
    reader.onload = (e) => {
      posts.value.unshift({
        username: 'Tú',
        avatar: '/src/images/Perfil.jpg',
        image: e.target?.result as string,
        caption: newPostCaption.value,
        likes: 0,
        liked: false,
        showChat: false,
        chatMessages: [],
        newMessage: ''
      });
      isUploadModalOpen.value = false;
      newPostImage.value = null;
      newPostCaption.value = '';
      savePostsToLocalStorage();
    };
    reader.readAsDataURL(newPostImage.value);
  }
};

const savePostsToLocalStorage = () => {
  localStorage.setItem('posts', JSON.stringify(posts.value));
};

const router = useRouter();

const goToLupa = () => {
  router.push('/MenuLupa')
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

.feed-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 16px;
  overflow: hidden;
  position: relative;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}

.post-username {
  color: white;
  font-size: 1rem;
  margin: 0;
}

.image-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.post-actions {
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.action-button {
  width: 55px;
  height: 30px;
}

.action-button ion-icon {
  font-size: 32px;
}

.post-likes {
  color: white;
  font-size: 0.9rem;
  margin-top: 8px;
}

.post-caption {
  color: white;
  font-size: 0.9rem;
  margin-top: 8px;
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

.upload-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: black;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.modal-content {
  --background: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
}

.chat-floating {
  position: absolute;
  bottom: 80px;
  right: 16px;
  width: 300px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chat-header {
  display: flex;
  justify-content: space-between;
  color: blanchedalmond;
  align-items: center;
  margin-bottom: 12px;
}

.chat-messages {
  max-height: 200px;
  overflow-y: auto;
  color: antiquewhite;
  margin-bottom: 12px;
}

.message {
  color: white;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.chat-input {
  display: flex;
  color: aliceblue;
  gap: 8px;
}

.chat-input ion-button {
  --background: var(--ion-color-success);
  --color: white;
}
</style>