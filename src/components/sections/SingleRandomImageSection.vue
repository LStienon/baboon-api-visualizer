<script setup lang="ts">
import BasicButton from "../BasicButton.vue"
import {onMounted, ref} from "vue";
import {BaboonApiService} from "../../services/baboon_api_service.ts";
import FailureMessage from "../FailureMessage.vue";
import LoadingIndicator from "../LoadingIndicator.vue";

const currentImageUrl = ref<string>("")
const loading = ref<boolean>(false)
const fetchNewImage = async () => {
  loading.value = true
  currentImageUrl.value = await BaboonApiService.getOneRandomImage()
  loading.value = false
}

onMounted(() => {
  fetchNewImage()
  const image = document.querySelector('.image-container > img')
})

</script>
<template>
  <div class="container">
    <div class="left-content">
      <div>
        <BasicButton
            text="Get an image !"
            :on-click="fetchNewImage"
            :disabled="loading"
        />
      </div>
    </div>
    <div class="right-content">
      <div class="image-container">
        <img
          :src="currentImageUrl"
          alt="image of a baboon"
          v-if="!loading && currentImageUrl !== ''"
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
@use '../../variables' as *

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

  @include for-mobile
    justify-content: end

  > div
    width: 50%
    @include for-mobile
      width: fit-content

.right-content
  display: flex
  align-items: center
  justify-content: end
  flex: 1

  @include for-mobile
    width: 100%
    margin-bottom: 2rem

.image-container
  aspect-ratio: 1/1
  height: 100%
  border: solid white 2px
  border-radius: 9px
  display: flex
  justify-content: center
  //align-items: center
  overflow: hidden

  @include for-mobile
    width: 100%

  > img
    min-height: 100%
    min-width: 100%
    object-fit: cover


</style>