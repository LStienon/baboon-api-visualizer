<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {onMounted, ref} from "vue";

const modules = [Navigation, Pagination]


const {urls} = defineProps<{
  urls: string[]
}>()

const swiperInstance = ref<any>(null);
const goToFirstSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(0)
  }
}
const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper
}

const myPagination = ref<HTMLElement | null>(null);
onMounted(() => {
  if (swiperInstance.value && myPagination.value) {
    const paginationElement = swiperInstance.value.pagination.el
    if (paginationElement) {
      myPagination.value.appendChild(paginationElement)
    }
  }
})

defineExpose({ goToFirstSlide });
</script>
<template>
  <div class="slider-container">
    <Swiper
        class="slider"
        :slides-per-view="1"
        :space-between="0"
        :centered-slides="true"
        :pagination="true"
        :modules="modules"
        :grab-cursor="true"
        @swiper="onSwiperInit"
    >
      <SwiperSlide v-for="(url, key) in urls" class="slider-slide">
        <img :src="url" :key="key" alt="image of a baboon">
      </SwiperSlide>
      <template #pagination>
        <div ref="myPagination" class="my-pagination"></div>
      </template>
    </Swiper>
    <div class="external-pagination">
      <div ref="myPagination" class="my-pagination"></div>
    </div>
  </div>
</template>
<style scoped lang="sass">
@use '../variables' as *

// ENGLOBING TAG STYLES
.slider-container
  width: 100%
  height: 100%
  aspect-ratio: 1/1
  position: relative
  overflow: visible !important

// INLINE SWIPER STYLES
.slider
  overflow: hidden !important
  border: solid white 2px
  border-radius: 9px
  width: 100%
  height: 100%
  aspect-ratio: 1/1

.slider-slide
  height: 100%
  display: flex
  justify-content: center
  align-items: center

  > img
    object-fit: cover
    min-height: 100%
    min-width: 100%

// PAGINATION STYLES
::v-deep(.swiper-pagination-bullet)
  background-color: $baseTextColor !important
  width: 12px
  height: 12px
  border-radius: 0

.external-pagination
  width: 100%
  height: 30px
  bottom: 0
  position: absolute
  transform: translateY(45px)

.my-pagination
  display: flex
  justify-content: center
  margin-top: 20px

</style>