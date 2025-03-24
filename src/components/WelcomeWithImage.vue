<script setup>

import router from "@/router/index.js";
</script>

<template>
  <v-row class="main__page__image mt-0.5 d-sm-none d-none d-md-flex">
    <v-col class="center__img d-flex justify-center flex-column align-center">
      <!--          <v-img src="/src/assets/car.jpg" class="rounded-sm center__img" style="width: 2500px" cover>-->
      <div class="text-h1 pa-15">ИНТЕНСИВОСЧЕТ</div>
      <div class="text-h6">Загрузите видео и получите отчет по нему</div>
      <div><v-btn text="Загрузить видео" class="text-none" style="color: var(--button-green)" @click="router.push('/create_report')"></v-btn></div>
      <!--          </v-img>-->
    </v-col>
  </v-row>
  <v-row
    class="d-md-none"
  >
    <v-col class="d-flex justify-center flex-column align-center">
      <div class="text-h5 pa-15">ИНТЕНСИВОСЧЕТ</div>
      <div class="text-h6">Загрузите видео и получите отчет по нему</div>
      <div><v-btn text="Загрузить видео" class="text-none" style="color: var(--button-green)" @click="router.push('/create_report')"></v-btn></div>
    </v-col>
  </v-row>
</template>

<style scoped>
.main__page__image {
  height: 80vh;
  /*-webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  background-image: url("/src/assets/car.jpg");
  background-size: 100% auto;
  border-radius: 16px;
  color: white;
  width: 115em;
  height: 115em;
  opacity: 0.95;
  filter: brightness(90%);*/
  color: white;
}

.center__img {
  height: 100%;
  background: url("/src/assets/car.jpg") center/cover no-repeat;
  background-size: 100% auto;
  border-radius: 0.5rem;
  position: relative;
  color: white;
  max-width: 120rem;
  padding: 0 3rem;
  margin: auto;
}

/*img {
  max-width: 100%;
  height: auto;
}*/
</style>