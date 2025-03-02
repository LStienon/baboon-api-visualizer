import {useGtag} from 'vue-gtag-next'

export const GAService = {

  trackClick: (buttonName: string, data: Record<string, any> = {}) => {
    const {event} = useGtag()
    event("click", {
      event: 'click_api_button',
      category: 'API Usage',
      label: buttonName,
      ...data,
    })
  }

}