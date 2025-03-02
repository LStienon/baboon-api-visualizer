import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from 'swiper/element/bundle'
import {ApiService} from "./services/api_service.ts"
import {createPinia} from "pinia"
import VueGtag from 'vue-gtag-next'

const pinia = createPinia()

register()
ApiService.init()

const app = createApp(App)
    .use(VueGtag, {
      property: {
        id: import.meta.env.VITE_GOOGLE_ANALYTICS_MEASURE_ID
      },
      useDebugger: true
    })
    .use(pinia)

app.mount('#app')