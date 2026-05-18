import { createApp } from 'vue'
import router from './router'
import '@/assets/styles/variables.css'
import '@/assets/styles/base.css'
import '@/assets/styles/transitions.css'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
