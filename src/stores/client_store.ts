import { defineStore } from 'pinia'
import { ref } from 'vue'
import {UAParser} from "ua-parser-js"

export type BrowserType = 'Firefox' | 'Chrome' | 'Safari' | 'Unknown'

export const useClientStore = defineStore('client', () => {
  const isClientMobile = ref(false)
  const clientBrowser = ref<BrowserType>('Unknown')

  const detectClientMobile = () => {
    const aspectRatio: number = window.innerWidth / window.innerHeight
    isClientMobile.value = aspectRatio < 1.2
  }

  const detectBrowser = () => {
    const parser = new UAParser(navigator.userAgent)
    const browser = parser.getBrowser()

    switch (browser.name) {
      case 'Firefox':
        clientBrowser.value = 'Firefox'
        break
      case 'Chrome':
        clientBrowser.value = 'Chrome'
        break
      case 'Safari':
        clientBrowser.value = 'Safari'
        break
      default:
        clientBrowser.value = 'Unknown'
    }
  }

  const initThingies = () => {
    detectClientMobile()
    detectBrowser()
  }

  return { isClientMobile, clientBrowser, initThingies }
})