<script setup lang="ts">

const {text, onClick, disabled} = defineProps<{
  text: string
  onClick: () => void
  disabled: boolean
  customClass?: string
}>()

</script>
<template>
  <button :disabled="disabled"
          @click="onClick"
          :class="customClass"
  >
    {{ text }}
  </button>
</template>
<style scoped lang="sass">
@use '../variables' as *

.bigger-font
  font-size: 1.5rem
  line-height: 1.2rem
  width: 3.5rem
  padding-left: 0
  padding-right: 0

button
  //padding: 10px 20px
  font-size: 16px
  background-color: $baseBlue
  color: $baseTextColor
  border-radius: 5px
  cursor: pointer
  outline: none
  user-select: none
  min-width: 3.5rem

  line-height: 1.2
  padding-top: 12px
  padding-bottom: 8px
  border: 2px solid transparent

  &:hover
    background-color: $baseTextColor
    color: $baseBlue

  &:disabled
    background-color: $baseTextColor
    color: $baseBlue

</style>