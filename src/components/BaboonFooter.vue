<script setup lang="ts">
import GithubIcon from '../assets/icons/github-brands-solid.svg';
import BookIcon from '../assets/icons/book-solid.svg'

const goToGithub = () => {
  window.open("https://github.com/LStienon/baboon-api-visualizer", '_blank')
}
const goToApiDoc = () => {
  const url = import.meta.env.VITE_BABOON_API_DOC_URL ?? "https://www.google.com/"
  window.open(url, '_blank')
}
const goToCv = () => {
  window.open("https://laurentstienon.com/", '_blank')
}
</script>
<template>
  <footer class="footer">
    <div class="icon-wrapper doc" @click="goToApiDoc">
      <BookIcon />
      <p>Baboon API Documentation</p>
    </div>
    <div class="icon-wrapper signature" @click="goToCv">
      <p>Made by Laurent (Piece Of Mind)</p>
    </div>
    <div class="icon-wrapper right" @click="goToGithub">
      <GithubIcon />
    </div>
  </footer>
</template>
<style scoped lang="sass">
@use '../variables' as *

.footer
  display: flex
  height: 30px
  padding: .5rem

.icon-wrapper
  flex: 1
  &:hover
    cursor: pointer
  > svg
    box-sizing: border-box
    height: 100%
    fill: $baseTextColor !important

.right
  display: flex
  justify-content: end

.doc
  display: flex
  align-items: center
  p
    margin: 0 0 0 .5rem
  > svg
    height: 90%

.signature
  display: flex
  align-items: center
  justify-content: center
  p
    margin: 0

</style>