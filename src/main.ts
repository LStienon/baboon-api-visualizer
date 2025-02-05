import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { register } from 'swiper/element/bundle';
import {ApiService} from "./services/api_service.ts";

register();
ApiService.init()

createApp(App).mount('#app')