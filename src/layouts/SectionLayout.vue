<script setup lang="ts">

const {title, description} = defineProps<{
  title: string
  description: string
}>()



</script>
<template>
  <article class="container">
    <h2 class="title">{{ title }}</h2>
    <p class="explanation">{{ description }}</p>
    <div class="content">
      <slot />
    </div>
  </article>
</template>
<style scoped lang="sass">
@use "../variables" as *

.container
  padding: 0 10%
  margin-bottom: 6rem
  h2, p
    margin: 1rem 0
    text-align: left
    width: 75%

  @include for-mobile
    padding: 0 5%
    margin-bottom: 1.75rem

.title
  width: fit-content

.explanation
  text-align: left

</style>