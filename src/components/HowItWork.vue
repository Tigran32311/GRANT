<script setup>

</script>

<template>
  <v-row
      class="mt-16 d-flex flex-column px-15 py-12"
      style="background-color: var(--light-green)"
      color="var(--light-green)"
  >
    <v-col class="d-flex justify-center align-center flex-column text-center">
      <v-btn
          class="px-16 py-5 d-flex justify-center align-center"
          style="color: white"
          readonly
          elevation="0"
          variant="flat"
          color="var(--button-green)"
      ><div class="text-subtitle-1">Как это работает?</div></v-btn>
      <div class="text-h3 mt-5 d-sm-none d-none d-md-flex">Нейронная сеть выделяет на видео<br/> машины по категориям</div>
      <div class="text-h6 mt-5 d-md-none">Нейронная сеть выделяет на видео<br/> машины по категориям</div>
    </v-col>
    <v-col class="d-flex justify-center align-center flex-row ga-5">
      <v-img :src="getImageUrl"></v-img>
      <v-img :src="getImageUrl"></v-img>
    </v-col>
  </v-row>
  <v-row class="mb-5">

  </v-row>
</template>

<script>
export default {
  data () {
    return {
      getImageUrl: new URL(`/src/assets/car_detected.png`, import.meta.url).href
    }
  }
}
</script>


<style scoped>

</style>