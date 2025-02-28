<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="top-toolbar">
        <ion-buttons slot="start">
          <ion-button @click="goToLupa">
            <ion-icon :icon="searchOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>AMIGOS</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="goToConfig">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding gradient-background">
      <div class="users-container">
        <ion-button
          v-for="user in users"
          :key="user.id"
          class="user-card"
          fill="clear"
          @click="goToUserChat(user)"
        >
          <div class="user-info">
            <ion-avatar>
              <img :src="user.avatar" :alt="user.name" />
            </ion-avatar>
            <div class="user-details">
              <h2 class="user-name">{{ user.name }}</h2>
              <p class="user-status">{{ user.status }}</p>
            </div>
          </div>

          <div class="options-container">
            <ion-button
              fill="clear"
              class="options-button"
              @click.stop="showOptions(user)"
            >
              <ion-icon :icon="ellipsisVertical"></ion-icon>
            </ion-button>
          </div>
        </ion-button>
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

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonButton,
  IonButtons,
  IonAvatar,
  IonActionSheet,
  actionSheetController
} from '@ionic/vue';
import {
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  ellipsisVertical,
  searchOutline,
  settingsOutline,
} from 'ionicons/icons';

interface User {
  id: number;
  name: string;
  status: string;
  avatar: string;
}

export default defineComponent({
  name: 'CommunityPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonButton,
    IonButtons,
    IonAvatar,
    IonActionSheet
  },
  setup() {
    const router = useRouter();
    const selectedUser = ref<User | null>(null);

    const users = reactive<User[]>([
      {
        id: 1,
        name: 'Cloud Strife',
        status: 'Me llamo Zack',
        avatar: '/src/images/Cloud.jpg'
      },
      {
        id: 2,
        name: 'Squall Leonhart',
        status: 'No sirve',
        avatar: '/src/images/Squall.jpg'
      },
      {
        id: 3,
        name: 'Cecil Harvey',
        status: 'Si soy',
        avatar: '/src/images/Cecil.jpg'
      },
      {
        id: 4,
        name: 'Noctis Lucis',
        status: 'Crack',
        avatar: '/src/images/Noctis.jpg'
      }
    ]);

    const showOptions = async (user: User) => {
      try {
        const actionSheet = await actionSheetController.create({
          header: user.name,
          cssClass: 'custom-action-sheet',
          buttons: [
            {
              text: 'Ver perfil',
              handler: () => {
                router.push(`/AmigoPerfil${user.id}`);
              }
            },
            {
              text: 'Ver Chat',
              handler: () => {
                router.push(`/AmigoChat${user.id}`);
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

        actionSheet.onDidDismiss().then(() => {
        });
      } catch (error) {
        console.error('Error al mostrar el Action Sheet:', error);
      }
    };

    const goToUserChat = (user: User) => {
      router.push(`/AmigoChat${user.id}`);
    };

    const goToAmigos = () => {
      router.push('/MenuAmigos')
    };

    const goToHome = () => {
      router.push('/MenuHome')
    };

    const goToComunidad = () => {
      router.push('/MenuComunidad')
    };

    const goToPerfil = () => {
      router.push('/MenuPerfil')
    };

    const goToLupa = () => {
      router.push('/MenuLupa')
    };

    const goToConfig = () => {
      router.push('/MenuConfig')
    };

    return {
      users,
      selectedUser,
      showOptions,
      goToUserChat,
      goToHome,
      goToAmigos,
      goToComunidad,
      goToPerfil,
      goToLupa,
      goToConfig,
      homeOutline,
      peopleOutline,
      chatbubbleOutline,
      personOutline,
      ellipsisVertical,
      searchOutline,
      settingsOutline
    };
  }
});
</script>

<style scoped>
.custom-action-sheet {
  --background: black;
  --color: rgb(0, 0, 0);
  --button-color: rgb(0, 0, 0);
  --button-background: #333;
  --button-background-activated: #555;
}

.users-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-card {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-transform: none;
  --background: transparent;
  --box-shadow: none;
}

.user-card::part(native) {
  padding: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

ion-avatar {
  width: 48px;
  height: 48px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc(100% - 60px);
}

.user-name {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: left;
}

.user-status {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin: 0;
  text-align: left;
}

.options-container {
  margin-left: auto;
}

.options-button {
  --color: rgba(255, 255, 255, 0.6);
  --padding-start: 8px;
  --padding-end: 8px;
  margin: 0;
}

.gradient-background {
  --background: radial-gradient(
    circle at center,
    rgb(0, 255, 85) 0%,
    rgb(0, 100, 40) 50%,
    rgb(0, 20, 10) 100%
  );
}

.top-toolbar {
  --background: rgb(0, 0, 0);
  --color: white;
  align-items: center;
  justify-content: center;  
  --border-style: none;
}

.bottom-toolbar {
  --background: rgba(0, 0, 0, 0.993);
  --border-style: none;
}

ion-tab-bar {
  --background: transparent;
  --border: none;
}

ion-icon {
  font-size: 24px;
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