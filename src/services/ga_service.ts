import {useGtm} from "@gtm-support/vue-gtm";

export const GAService = {

  trackClick: (buttonName: string) => {
    const gtm = useGtm();
    gtm?.trackEvent({
      event: 'click_api_button',
      category: 'API Usage',
      action: 'click',
      label: buttonName
    })
  }

}