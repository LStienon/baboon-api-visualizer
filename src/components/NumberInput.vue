<script setup lang="ts">
import {ref, watch} from "vue"
import BasicButton from "./BasicButton.vue"

const {
  initialValue,
  max,
  min,
  increment = 1,
  changeCallback
} = defineProps<{
  initialValue: number
  max: number
  min: number
  increment?: number
  changeCallback: (newValue: number) => void
}>()

const localValue = ref<number>(initialValue)
const validateInput = () => {
  let newValue = localValue.value
  newValue = Math.round(newValue)
  newValue = Math.max(min, Math.min(max, newValue))
  localValue.value = newValue
}

const incrementValue = () => {
  const newValue = localValue.value + increment
  if (newValue <= max) {
    if (localValue.value % increment !== 0) {
      localValue.value = localValue.value - (localValue.value % increment) + increment
    }
    else {
      localValue.value = newValue
    }
  }
  else {
    localValue.value = max
  }
}
const decrementValue = () => {
  const newValue = localValue.value - increment
  if (newValue >= min) {
    if (localValue.value % increment !== 0) {
      localValue.value = localValue.value - (localValue.value % increment)
    }
    else {
      localValue.value = newValue
    }
  }
  else {
    localValue.value = min
  }
}

watch(localValue, (value, oldValue) => {
  if (value !== oldValue) changeCallback(value)
})


</script>
<template>
  <div class="input-container">
    <BasicButton
        text="-"
        :on-click="decrementValue"
        :disabled="localValue <= min"
        custom-class="bigger-font"
    />
    <input
        v-model.number="localValue"
        type="number"
        :min="min"
        :max="max"
        @focusout="validateInput"
    />
    <BasicButton
        text="+"
        :on-click="incrementValue"
        :disabled="localValue >= max"
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

    &:focus
      border: solid $baseTextColor 2px
      outline: none

</style>