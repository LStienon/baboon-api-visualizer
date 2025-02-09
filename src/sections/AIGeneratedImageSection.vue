<script setup lang="ts">
import BasicButton from "../components/BasicButton.vue"
import {ref} from "vue";
import {BaboonApiService} from "../services/baboon_api_service.ts";
import FailureMessage from "../components/FailureMessage.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

const currentImageUrl = ref<string>("")
const loading = ref<boolean>(false)
const initDone = ref<boolean>(false)
const fetchNewImage = async () => {
  if (!initDone.value) initDone.value = true
  loading.value = true
  currentImageUrl.value = await BaboonApiService.getOneMadeByAI()
  loading.value = false
}

</script>
<template>
  <div class="container">
    <div class="left-content">
      <div>
        <BasicButton
            text="Create an image !"
            :on-click="fetchNewImage"
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
@use '../variables' as *

.image-container
  aspect-ratio: 1/1
  height: 100%
  border: solid white 2px
  border-radius: 9px
  display: flex
  justify-content: center
  align-items: center
  overflow: hidden

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

.left-content
  flex: 1
  display: flex
  align-items: center
  position: relative

  > div
    width: 50%
    position: relative

    > p
      position: absolute
      width: 500px
      top: 85%
      left: 50%
      transform: translateX(-50%)
      text-align: center



.right-content
  display: flex
  align-items: center
  justify-content: end

</style>