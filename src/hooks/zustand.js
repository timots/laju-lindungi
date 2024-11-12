
import { create } from 'zustand';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  tokenId: '',
  projectId: '',
  companyId: '',
  languageId: 'en',

  setProjectId: (data) => {
    set({
      projectId: data,
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
}));

export default useUserStore;
