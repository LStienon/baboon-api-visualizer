<script setup lang="ts">
import {VueSpinnerSquare} from "vue3-spinners"

</script>
<template>
  <div class="spinner-container">
    <VueSpinnerSquare
        size="50"
    />
  </div>
</template>
<style scoped lang="sass">
@use "../variables" as *

.spinner-container
  padding: .5rem
  width: fit-content
  height: fit-content
  > *
    background-color: $baseTextColor !important
    display: block !important

</style>