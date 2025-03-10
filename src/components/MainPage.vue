<script setup>
import WelcomeWithImage from "@/components/WelcomeWithImage.vue";
import AboutUs from "@/components/AboutUs.vue";
import HowItWork from "@/components/HowItWork.vue";
import { ref } from 'vue'
</script>

<template>
    <v-container class="d-flex flex-column ga-15" fluid>
      <WelcomeWithImage />
      <AboutUs/>
      <HowItWork />
    </v-container>
</template>

<script>
export default {
  name: 'MainPage',
  data: () => ({

  })
}
</script>

<style scoped>

</style>