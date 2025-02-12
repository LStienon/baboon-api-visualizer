<script setup lang="ts">
import BasicButton from "../components/BasicButton.vue"
import {onMounted, ref} from "vue";
import {BaboonApiService} from "../services/baboon_api_service.ts";
import FailureMessage from "../components/FailureMessage.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import NumberInput from "../components/NumberInput.vue";

const url = ref<string>("")
const loading = ref<boolean>(false)
const fetchSizedImage = async () => {
  loading.value = true
  url.value = await BaboonApiService.getOneSizedRandomImage(imageSize.value.width, imageSize.value.height)
  loading.value = false
}

const imageSize = ref<{
  width: number
  height: number
}>({
  width: 1400,
  height: 500
});
const changeImageWidth = (newWidth: number) => imageSize.value.width = newWidth
const changeImageHeight = (newHeight: number) => imageSize.value.height = newHeight


onMounted(() => {
  fetchSizedImage()
})

const seeImage = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}


</script>
<template>
  <div class="container">
    <div class="left-content">
      <div>
        <BasicButton
            text="Size me an image !"
            :on-click="fetchSizedImage"
            :disabled="loading"
        />
        <p>Width</p>
        <NumberInput :initial-value="imageSize.width"
                     :max="5_000"
                     :min="10"
                     :increment="100"
                     :change-callback="changeImageWidth"
        />
        <p>Height</p>
        <NumberInput :initial-value="imageSize.height"
                     :max="5_000"
                     :min="10"
                     :increment="100"
                     :change-callback="changeImageHeight"
        />
      </div>
    </div>
    <div class="right-content" @click="() => seeImage(url)">
      <div class="image-container">
        <img
            :src="url"
            alt="image of a baboon"
            v-if="!loading && url !== ''"
            :draggable="false"
        >
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
  border: solid white 2px
  border-radius: 9px
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden

  @include for-mobile
    width: 100%

  > img
    max-height: 100%
    max-width: 100%
    object-fit: contain

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

  p
    margin: 2rem 0 0 0

.right-content
  display: flex
  align-items: center
  justify-content: end
  &:hover
    cursor: pointer

  @include for-mobile
    width: 100%
    margin-bottom: 2rem

</style>