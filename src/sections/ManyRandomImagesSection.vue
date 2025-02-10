<script setup lang="ts">
import BasicButton from "../components/BasicButton.vue"
import {onMounted, ref} from "vue";
import {BaboonApiService} from "../services/baboon_api_service.ts";
import FailureMessage from "../components/FailureMessage.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import BaboonSlider from "../components/BaboonSlider.vue";
import NumberInput from "../components/NumberInput.vue";

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
                     :max="20"
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
@use '../variables' as *

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

.container
  display: flex
  width: 100%
  height: 450px
  margin-top: 3rem
  margin-bottom: 6rem

.left-content
  flex: 1
  display: flex
  align-items: center
  position: relative

  > div
    width: 50%

.right-content
  display: flex
  align-items: center
  justify-content: end

</style>