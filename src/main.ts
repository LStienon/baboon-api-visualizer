import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from 'swiper/element/bundle';
import {ApiService} from "./services/api_service.ts";
import {createPinia} from "pinia";

register();
ApiService.init()

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')