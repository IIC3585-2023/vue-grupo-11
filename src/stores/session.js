import { defineStore } from 'pinia'

export const sessionStore = defineStore('sessionStore', {
  state: () => {
    return {
      loggedIn: false,
      jwt: '',
      user: {}
    }
  },
  persist: true,
})