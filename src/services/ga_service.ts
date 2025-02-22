import { event } from 'vue-gtag'

export const GAService = {

  trackClick: (buttonName: string) => {
    event('click_api_button', {
      event_category: 'API Usage',
      event_label: buttonName,
    });
  }

}