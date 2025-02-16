<script setup lang="ts">
import BasicButton from "../BasicButton.vue"
import {onMounted, ref} from "vue";
import {BaboonApiService} from "../../services/baboon_api_service.ts";
import FailureMessage from "../FailureMessage.vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import BaboonSlider from "../BaboonSlider.vue";
import NumberInput from "../NumberInput.vue";
import {useClientStore} from "../../stores/client_store.ts";

const urls = ref<string[]>([])
const loading = ref<boolean>(false)
const fetchImages = async () => {
  loading.value = true
  urls.value = await BaboonApiService.getManyRandomImages(imageQuantity.value)
  if (mySwiperRef.value) {
    mySwiperRef.value.goToFirstSlide();
  }
  loading.value = false
}

const imageQuantity = ref<number>(3);
const changeImageQuantity = (newValue: number) => imageQuantity.value = newValue

const mySwiperRef = ref<InstanceType<typeof BaboonSlider> | null>(null);

onMounted(() => {
  fetchImages()
})

const clientStore = useClientStore()

</script>
<template>
  <div class="container">
    <div class="left-content">
      <div>
        <BasicButton
            text="Get a load of images !"
            :on-click="fetchImages"
            :disabled="loading"
        />
        <NumberInput :initial-value="imageQuantity"
                     :max="clientStore.isClientMobile ? 19 : 20"
                     :min="1"
                     :change-callback="changeImageQuantity"
        />
      </div>
    </div>
    <div class="right-content">
      <div class="image-container">
        <BaboonSlider ref="mySwiperRef" :urls="urls" v-if="urls && urls.length > 0" />
        <div v-else-if="!loading">
          <FailureMessage />
        </div>
        <div v-else>
          <LoadingIndicator />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@use '../../variables' as *

.input-container
  display: flex
  justify-content: center
  align-items: center

  input
    width: 100px
    padding: 8px
    font-size: 16px
    border: 2px solid $baseTextColor
    border-radius: 5px
    text-align: center
    outline: none
    transition: border 0.3s ease

    &:focus
      border: 2px solid $baseBlue

.image-container
  aspect-ratio: 1/1
  height: 100%

  display: flex
  justify-content: center
  align-items: center

  @include for-mobile
    width: 100%

.container
  display: flex
  width: 100%
  height: 450px
  margin-top: 3rem
  margin-bottom: 6rem

  @include for-mobile
    flex-direction: column-reverse
    margin-top: 2rem
    margin-bottom: 1rem
    height: unset

.left-content
  flex: 1
  display: flex
  align-items: center
  position: relative

  @include for-mobile
    justify-content: end

  > div
    width: 50%

    @include for-mobile
      width: 100%
      margin-top: .75rem

.right-content
  display: flex
  align-items: center
  justify-content: end
  flex: 1

  @include for-mobile
    width: 100%
    margin-bottom: 2rem

</style>