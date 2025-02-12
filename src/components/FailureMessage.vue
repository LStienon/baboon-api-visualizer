<script setup lang="ts">

</script>
<template>
  <div class="message-container">
    <p>The API call failed miserably :'( ...</p>
  </div>
</template>
<style scoped lang="sass">
@use '../variables' as *

.message-container
  p
    margin: 0

  @include for-mobile
    font-size: smaller

</style>