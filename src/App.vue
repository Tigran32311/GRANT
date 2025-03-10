<script setup>
import HeaderComponent from './components/Header.vue'
import MainPage from './components/MainPage.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>
  <v-app>
    <v-app-bar class="d-flex justify-space-between">
      <HeaderComponent/>
    </v-app-bar>
<!--    <div>-->
      <v-main class="w-100">
<!--        <MainPage></MainPage>-->
        <router-view/>
      </v-main>
      <v-footer color="var(--darker-green)">
        <FooterComponent/>
      </v-footer>
<!--    </div>-->
  </v-app>
<!--  <header><HeaderComponent /></header>-->
<!--    <main>-->
<!--      <MainPage />-->
<!--    </main>-->
<!--  <router-view/>-->
</template>

<style scoped>
</style>
