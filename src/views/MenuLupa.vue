<template>
    <ion-page>
      <ion-content :fullscreen="true" class="gradient-background">
        <div class="search-container">
          <div class="search-bar">
            <ion-searchbar
              v-model="searchQuery"
              placeholder="Buscar..."
              :debounce="300"
              @ionInput="handleSearch"
              class="custom-searchbar"
            ></ion-searchbar>
          </div>
  
          <div class="results-card" :class="{ 'has-results': hasResults }">
            <div v-if="loading" class="loading-container">
              <ion-spinner name="crescent"></ion-spinner>
            </div>
  
            <div v-else-if="hasResults" class="results-list">
              <ion-item v-for="result in searchResults" :key="result.id" class="result-item">
                <ion-thumbnail slot="start">
                  <img :src="result.image" :alt="result.title" />
                </ion-thumbnail>
                <ion-label>
                  <h2>{{ result.title }}</h2>
                  <p>{{ result.description }}</p>
                </ion-label>
              </ion-item>
            </div>
  
            <div v-else-if="searchQuery" class="no-results">
              <ion-icon :icon="searchOutline" class="no-results-icon"></ion-icon>
              <p>No se encontraron resultados</p>
            </div>
  
            <div v-else class="empty-state">
              <ion-icon :icon="searchOutline" class="empty-icon"></ion-icon>
              <p>Busca juegos, usuarios o contenido</p>
            </div>
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
  IonContent,
  IonFooter,
  IonToolbar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonSearchbar,
  IonSpinner,
  IonItem,
  IonThumbnail,
  IonLabel
} from '@ionic/vue';
import {
  homeOutline,
  peopleOutline,
  chatbubbleOutline,
  personOutline,
  searchOutline
} from 'ionicons/icons';
import {IonRouterOutlet } from '@ionic/vue'

interface SearchResult {
  id: number;
  title: string;
  description: string;
  image: string;
}

const searchQuery = ref('');
const loading = ref(false);
const searchResults = ref<SearchResult[]>([]);

const hasResults = computed(() => searchResults.value.length > 0);

const data = [
  {
    id: 1,
    title: 'Final Fantasy 1',
    description: 'El primer juego de la saga Final Fantasy',
    image: '/placeholder.svg?height=60&width=60'
  },
  {
    id: 2,
    title: 'Final Fantasy 2',
    description: 'La secuela del primer Final Fantasy',
    image: '/placeholder.svg?height=60&width=60'
  },
  {
    id: 3,
    title: 'Cyber Adventure',
    description: 'Juego de rol futurista',
    image: '/placeholder.svg?height=60&width=60'
  },
  {
    id: 4,
    title: 'Space Warriors',
    description: 'Batalla espacial multijugador',
    image: '/placeholder.svg?height=60&width=60'
  },
  {
    id: 5,
    title: 'Dragon Quest',
    description: 'Aventura medieval fantástica',
    image: '/placeholder.svg?height=60&width=60'
  }
];

const handleSearch = async (event: CustomEvent) => {
  const query = event.detail.value;
  if (!query) {
    searchResults.value = [];
    return;
  }

  loading.value = true;

  setTimeout(() => {

    searchResults.value = data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    loading.value = false;
  }, 1000);
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
  
  .search-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    gap: 16px;
  }
  
  .search-bar {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .custom-searchbar {
    --background: rgba(0, 0, 0, 0.8);
    --color: white;
    --placeholder-color: rgba(255, 255, 255, 0.6);
    --icon-color: rgba(255, 255, 255, 0.6);
    --clear-button-color: rgba(255, 255, 255, 0.6);
    --border-radius: 12px;
    padding: 0;
  }
  
  .results-card {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .loading-container,
  .no-results,
  .empty-state {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
  }
  
  .no-results-icon,
  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }
  
  .results-list {
    padding: 8px;
  }
  
  .result-item {
    --background: transparent;
    --background-hover: rgba(255, 255, 255, 0.1);
    --border-color: rgba(255, 255, 255, 0.1);
    --padding-start: 16px;
    --padding-end: 16px;
    --padding-top: 12px;
    --padding-bottom: 12px;
  }
  
  .result-item ion-label {
    --color: white;
  }
  
  .result-item ion-label h2 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .result-item ion-label p {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .result-item ion-thumbnail {
    --size: 60px;
    --border-radius: 8px;
  }
  
  ion-spinner {
    --color: rgb(0, 255, 85);
    width: 48px;
    height: 48px;
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
  </style>  