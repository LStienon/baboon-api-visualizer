<script setup lang="ts">
import BasicButton from "../BasicButton.vue"
import {ref} from "vue";
import {BaboonApiService} from "../../services/baboon_api_service.ts";
import FailureMessage from "../FailureMessage.vue";
import LoadingIndicator from "../LoadingIndicator.vue";
import {GAService} from "../../services/ga_service.ts";

const currentImageUrl = ref<string>("")
const loading = ref<boolean>(false)
const initDone = ref<boolean>(false)
const fetchNewImage = async () => {
  if (!initDone.value) initDone.value = true
  loading.value = true
  currentImageUrl.value = await BaboonApiService.getOneMadeByAI()
  loading.value = false
}
const clickAction = async () => {
  await fetchNewImage()
  GAService.trackClick("ai_image")
}

</script>
<template>
  <div class="container">
    <div :class="`left-content ${initDone ? 'makePlacePlease' : ''}`">
      <div>
        <BasicButton
            text="Create an image !"
            :on-click="clickAction"
            :disabled="loading"
        />
        <p v-if="initDone">(don't worry, it usually takes about 16 seconds to complete)</p>
      </div>
    </div>
    <div class="right-content">
      <div class="image-container">
        <img
          :src="currentImageUrl"
          alt="ai generated image of a baboon"
          v-if="!loading && currentImageUrl !== ''"
          :draggable="false"
        >
        <div v-else-if="!loading">
          <FailureMessage v-if="initDone" />
          <p v-else>Click the button, if you dare !</p>
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

.image-container
  aspect-ratio: 1/1
  height: 100%
  border: solid $baseTextColor 2px
  border-radius: 9px
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden

  @include for-mobile
    width: 100%

  > img
    min-height: 100%
    min-width: 100%
    object-fit: cover

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

.makePlacePlease
  @include for-mobile
    margin-bottom: 3rem

.left-content
  flex: 1
  display: flex
  align-items: center
  position: relative

  @include for-mobile
    justify-content: end

  > div
    width: 50%
    position: relative
    @include for-mobile
      width: fit-content

    > p
      position: absolute
      width: 500px
      top: 85%
      left: 50%
      transform: translateX(-50%)
      text-align: center

      @include for-mobile
        text-align: end
        width: 350px
        left: 22%

.right-content
  display: flex
  align-items: center
  justify-content: end
  flex: 1

  @include for-mobile
    width: 100%
    margin-bottom: 2rem

</style>