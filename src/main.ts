import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from 'swiper/element/bundle'
import {ApiService} from "./services/api_service.ts"
import {createPinia} from "pinia"
import {createGtm} from "@gtm-support/vue-gtm";

const pinia = createPinia()

register()
ApiService.init()

// console.log(import.meta.env.VITE_GOOGLE_ANALYTICS_MEASURE_ID)

const app = createApp(App)
app
    .use(createGtm({
      id: import.meta.env.VITE_GOOGLE_ANALYTICS_MEASURE_ID
    }))
    .use(pinia)
    .mount('#app')