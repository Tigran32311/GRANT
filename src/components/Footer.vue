<script setup>

import router from "@/router/index.js";
</script>

<template>
  <v-container class="d-flex flex-column py-10">
    <v-row
      style="color: white"
    >
      <v-col
        class="d-flex flex-column ga-3"
      >
        <v-icon class="icon__vlsu__footer" style="font-size: 10vh; max-height: 100px !important;" :icon="$vuetify.icons.footer"></v-icon>
        <v-btn
            v-for="(menuItem,i) in bottom_menu"
            :key="i"
            @click="router.push('/'+menuItem.link)"
            variant="text" class="text-none text-left w-50 d-flex justify-start">{{ menuItem.name }}</v-btn>
      </v-col>
      <v-col
        class="d-flex flex-column ga-3"
      >
        <v-btn
            class="d-flex px-0 w-50"
            style="color: var(--button-green)"
            readonly
            elevation="0"
            variant="flat"
            color="var(--light-green)"
        ><div class="text-subtitle-1">Свяжитесь с нами</div></v-btn>
        <div class="text-h4">pochta@mail.ru</div>
        <div class="text-h4">+7 (999) 999-99-99</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Footer",
  data:()=> ({
    "bottom_menu": [
      {
        name:"О нас",
        link: ""
      },
      {
        name:"Загрузить видео",
        link: "create_report"
      },
      {
        name:"Карта",
        link: "map"
      },
    ]
  })
}
</script>

<style scoped>
.icon__vlsu__footer svg {
  max-height: 100px!important;
  height: initial !important;
}
</style>