import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$API_URL = 'https://backend-vue.onrender.com'
const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.use(router)

app.mount('#app')
