<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ref} from "vue";

const modules = [Navigation, Pagination]


const {urls} = defineProps<{
  urls: string[]
}>()

const swiperInstance = ref<any>(null);
const goToFirstSlide = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(0);
  }
}
const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper;
};


defineExpose({ goToFirstSlide });

</script>
<template>
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
  </Swiper>
</template>
<style scoped lang="sass">
@use '../variables' as *

.slider
  position: relative // Permet de positionner la pagination correctement
  overflow: hidden
  width: 100%
  height: 100%

.slider-slide
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  //position: relative // Permet à l'image de ne pas cacher la pagination
  //z-index: 5 // Laisser la pagination au-dessus

  > img
    object-fit: cover
    min-height: 100%
    min-width: 100%

::v-deep(.swiper-pagination-bullet)
  background-color: $baseTextColor !important
  width: 12px
  height: 12px
  border-radius: 0

::v-deep(.swiper-pagination)

  //position: absolute
  //bottom: 0
  //left: 50%
  //transform: translateY(50px)
  z-index: 99




</style>