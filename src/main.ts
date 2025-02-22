import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import mainRouter from './router'

const app = createApp(App)

app.use(createPinia())
app.use(mainRouter)

app.mount('#app')
