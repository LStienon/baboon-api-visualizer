import axios, { AxiosError } from 'axios'
import {ServerDownException, UnexpectedException} from "../custom_exceptions.ts";

const createException = (e: any): Error => {
  if (e instanceof AxiosError) {

    // 1. CHECK IF WE EVEN GOT A RESPONSE
    if (!e.response) {
      return new ServerDownException()
    }

    // 2. DEPENDING ON THE RESPONSE MESSAGE, THROW A MORE GLOBAL TYPE OF ERROR
    switch (e.response!.data.message) {

      // THE 2 SERVER EXCEPTIONS
      case "DATABASE_UNREACHABLE":
        return new ServerDownException()

      // THE 2 UNEXPECTED EXCEPTION
      case "UNEXPECTED_DATABASE_ERROR":
      default:
        return new UnexpectedException()
    }
  }
  else {
    return new UnexpectedException()
  }
}

export const ApiService = {

  // TO BE CALLED IN THE MAIN.TS
  init: () => {
    axios.defaults.baseURL = import.meta.env.VITE_BABOON_API_BASE_URL
  },

  // FOR EVERY GET REQUEST
  get: async (endpoint: string): Promise<any> => {
    try {
      const result = await axios.get(endpoint)
      return result.data
    }
    catch (e) {
      throw createException(e)
    }
  },

}