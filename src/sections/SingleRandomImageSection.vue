<script setup lang="ts">
import BasicButton from "../components/BasicButton.vue"
import {onMounted, ref} from "vue";
import {BaboonApiService} from "../services/baboon_api_service.ts";
import FailureMessage from "../components/FailureMessage.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";

const currentImageUrl = ref<string>("")
const loading = ref<boolean>(false)
const fetchNewImage = async () => {
  loading.value = true
  currentImageUrl.value = await BaboonApiService.getOneRandomImage()
  loading.value = false
}

onMounted(() => {
  fetchNewImage()
})

</script>
<template>
  <div class="container">
    <div class="left-content">
      <BasicButton text="Get an image !" :on-click="fetchNewImage" />
    </div>
    <div class="right-content">
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
</template>
<style scoped lang="sass">
@use '../variables' as *

.container
  display: flex
  width: 100%
  height: 450px
  margin-top: 3rem
  margin-bottom: 6rem

.left-content
  flex: 1
  display: flex
  justify-content: center
  align-items: center

.right-content
  flex: 2
  display: flex
  align-items: center
  justify-content: end

  > div

  > img
    max-height: 100%
    max-width: 100%




</style>