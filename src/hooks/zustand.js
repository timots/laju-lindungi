import { create } from 'zustand';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  tokenId: '',
  projectId: '',
  companyId: '',
  languageId: 'en',
  location: '',
  stripePublicKey: '',

  setProjectId: (data) => {
    set({
      projectId: data,
    });
  },
  setStripePublicKey: (data) => {
    set({
      stripePublicKey: data,
    });
  },

  setCompanyId: (data) => {
    set({
      companyId: data,
    });
  },

  setIsLoggedIn: (data) => {
    set({
      isLoggedIn: data,
    });
  },

  setTokenId: (data) => {
    set({
      tokenId: data,
    });
  },

  setLanguageId: (data) => {
    set({
      languageId: data,
    });
  },
  setLocation: (data) => {
    set({
      location: data,
    });
  },
}));

export default useUserStore;
