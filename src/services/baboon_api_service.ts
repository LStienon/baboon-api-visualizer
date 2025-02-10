import {ApiService} from "./api_service.ts";

export const BaboonApiService = {

  getOneRandomImage: async (): Promise<string> => {
    try {
      const res = await ApiService.get('/baboon/random') as { url: string }
      return res.url
    }
    catch (e) {
      console.log(e)
      return ""
    }
  },

  getOneSizedRandomImage: async (width: number, height: number): Promise<string> => {
    try {
      const res = await ApiService.get(`/baboon/random/${width}/${height}`) as { url: string }
      return res.url
    }
    catch (e) {
      console.log(e)
      return ""
    }
  },

  getOneMadeByAI: async (): Promise<string> => {
    try {
      const res = await ApiService.get('/baboon/ai') as { url: string }
      return res.url
    }
    catch (e) {
      console.log(e)
      return ""
    }
  },

  getManyRandomImages: async (quantity: number): Promise<string[]> => {
    try {
      const res = await ApiService.get(`/baboon/random/many?quantity=${quantity}`) as { urls: string[] }
      return res.urls
    }
    catch (e) {
      console.log(e)
      return []
    }
  }

}