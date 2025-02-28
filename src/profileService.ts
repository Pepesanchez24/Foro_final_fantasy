import { ref } from 'vue';

interface ProfileData {
  avatar: string;
  name: string;
  description: string;
  selectedGames: number[];
}

const initialProfile: ProfileData = {
  avatar: '/src/images/Perfil.jpg',
  name: 'Marc Sanchez',
  description: 'Nací por mi madre y moriré por Final Fantasy',
  selectedGames: [1, 2, 3, 4],
};

const profileData = ref<ProfileData>({ ...initialProfile });

const updateProfile = (newProfile: ProfileData) => {
  profileData.value = { ...newProfile };
  localStorage.setItem('profileData', JSON.stringify(newProfile));
};

const loadProfile = () => {
  const savedProfile = localStorage.getItem('profileData');
  if (savedProfile) {
    profileData.value = JSON.parse(savedProfile);
  }
};

export const useProfileService = () => {
  return {
    profileData,
    updateProfile,
    loadProfile,
  };
};