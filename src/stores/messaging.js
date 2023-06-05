import { defineStore } from 'pinia'

export const messagingStore = defineStore('messagingStore', {
  state: () => {
    return {
      selected: false,
      user: {
        
      }
    }
  },
  persist: true,
});