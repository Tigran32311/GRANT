<script setup>

</script>

<template>
  <v-container class="d-flex flex-column py-10">
    <v-row
      style="color: white"
    >
      <v-col
        class="d-flex flex-column ga-3"
      >
        <v-btn
            v-for="(menuItem,i) in bottom_menu"
            :key="i"
            variant="text" class="text-none text-left w-50 d-flex justify-start">{{ menuItem }}</v-btn>
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
        <div class="text-h4">+7 (920) 104-69-78</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Footer",
  data:()=> ({
    "bottom_menu": ["Логотип","О нас","Загрузить видео","Карта","Личный кабинет"]
  })
}
</script>

<style scoped>

</style>