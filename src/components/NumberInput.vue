<script setup lang="ts">
import {ref, watch} from "vue";
import BasicButton from "./BasicButton.vue";

const {
  initialValue,
  max,
  min,
  changeCallback
} = defineProps<{
  initialValue: number
  max: number
  min: number
  changeCallback: (newValue: number) => void
}>()

const localValue = ref<number>(initialValue)
const validateInput = () => {
  if (localValue.value < min) localValue.value = min;
  if (localValue.value > max) localValue.value = max;
}
const incrementValue = () => {
  if (localValue.value < max) localValue.value++
}
const decrementValue = () => {
  if (localValue.value > min) localValue.value--
}

watch(localValue, (value, oldValue) => {
  if (value !== oldValue) changeCallback(value)
})


</script>
<template>
  <div class="input-container">
    <BasicButton text="-"
                 :on-click="decrementValue"
                 :disabled="false"
                 custom-class="bigger-font"
    />
    <input
        v-model="localValue"
        type="number"
        :min="min"
        :max="max"
        @input="validateInput"
        placeholder="Enter a number (1-20)"
    />
    <BasicButton text="+"
                 :on-click="incrementValue"
                 :disabled="false"
                 custom-class="bigger-font"
    />
  </div>
</template>
<style scoped lang="sass">
@use '../number_input_arrows_mixin' as *
@use '../variables' as *

.input-container
  @include hide-number-input-arrows
  margin-top: .75rem
  box-sizing: border-box
  display: flex
  align-items: stretch

  input
    margin: 0 1rem
    text-align: center
    background-color: transparent
    border-radius: 5px
    border: solid $baseTextColor 2px
    font-family: BigBlueTerm, sans-serif
    font-size: 1rem
    display: inline-block
    width: 3.5rem
    padding-top: 12px
    padding-bottom: 8px

    ::selection
      background-color: red

    &:focus
      border: solid $baseTextColor 2px
      outline: none

</style>