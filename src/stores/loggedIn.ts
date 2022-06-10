import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => ({
    loggedIn: useStorage<boolean>('login', false),
    mail: useStorage<string>('usermail', ''),
  }),
  actions: {
    login(mail: string) {
      this.loggedIn = true;
      this.mail = mail;
    },
    logout() {
      this.loggedIn = false;
      this.mail = '';
    },
  },
});
