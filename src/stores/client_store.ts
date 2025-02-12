import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClientStore = defineStore('client', () => {
  const isClientMobile = ref(false)

  const setClientMobile = (value: boolean) => {
    isClientMobile.value = value
  }

  return { isClientMobile, setClientMobile }
})