<script setup lang="ts">

const {text, onClick} = defineProps<{
  text: string
  onClick: () => void
}>()

</script>
<template>
  <button @click="onClick">{{ text }}</button>
</template>
<style scoped lang="sass">
@use '../variables' as *

button
  padding: 10px 20px
  font-size: 16px
  background-color: $baseBlue
  color: $baseTextColor
  border-radius: 5px
  cursor: pointer
  border-color: transparent
  outline: none
  user-select: none

  &:hover
    background-color: $baseTextColor
    color: $baseBlue

</style>