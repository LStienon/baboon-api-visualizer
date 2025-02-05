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

  getManyRandomImages: async (): Promise<string[]> => {
    return []
  }

}