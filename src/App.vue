<script setup lang="ts">
import SectionLayout from "./layouts/SectionLayout.vue";
import SingleRandomImageSection from "./components/sections/SingleRandomImageSection.vue";
import AIGeneratedImageSection from "./components/sections/AIGeneratedImageSection.vue";
import SizedRandomImageSection from "./components/sections/SizedRandomImageSection.vue";
import ManyRandomImagesSection from "./components/sections/ManyRandomImagesSection.vue";
import BaboonFooter from "./components/BaboonFooter.vue";
import {onMounted} from "vue";
import {useClientStore} from "./stores/client_store.ts";
const {initThingies} = useClientStore()

onMounted(() => {
  initThingies()
})

</script>
<template>
  <main>
    <header>
      <h1>Baboon API Visualization Website</h1>
    </header>
    <section>

      <!-- SIMPLE SECTION WITH RANDOM IMAGE BUTTON -->
      <SectionLayout
          title="Random image of a baboon"
          description="The first thing you can do with the Baboon API is to request a random image of a baboon. Look how beautiful this one is !"
      >
        <SingleRandomImageSection />
      </SectionLayout>

      <!-- SIMPLE SECTION WITH RANDOM IMAGE BUTTON -->
      <SectionLayout
          title="MORE random images of baboons"
          description="What's better that 1 image of an ugly baboon ? MANY images of ugly baboons. Nobody asked for it, but here it is : an endpoint to fetch a bunch of images at once. Now I'll let you enjoy this lil' slider I made just for you, and you can play with it too ! Just change the setting to vary the number of images inside the carousel."
      >
        <ManyRandomImagesSection />
      </SectionLayout>

      <!-- SIMPLE SECTION WITH RANDOM IMAGE BUTTON -->
      <SectionLayout
          title="The golden age of AI, baby !"
          description="Nowadays, everything comes shipped with AI features. ChatGPT here, Copilot there, ... They're everywhere, and especially where you don't want them. But here, it was a god given mission to provide an endpoint that creates a brand new, AI generated, image of a baboon. Thanks to OpenAI's SDK, your Baboon API is able to make this work !"
      >
        <AIGeneratedImageSection />
      </SectionLayout>

      <!-- SIMPLE SECTION WITH RANDOM IMAGE BUTTON -->
      <SectionLayout
          title="A baboon image for every occasion"
          description="Oh, and there is also an endpoint for you to get a sized image of a random baboon. Just give it the dimensions in pixels and it will get you an image, cropped to your desire. Honestly I can't imagine ANYONE using that endpoint lmao"
      >
        <SizedRandomImageSection />
      </SectionLayout>

    </section>
    <br>
    <br>
    <br>
    <br>
    <br>
    <BaboonFooter />
  </main>
</template>
<style lang="sass">
@use './variables' as *

// GENERAL STYLES HERE
main
  width: 100%
  display: flex
  flex-direction: column

header
  @include for-mobile
    h1
      font-size: 2rem
      width: 100%

.test
  background-color: blue

</style>
