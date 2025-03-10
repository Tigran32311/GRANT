<script setup>

import {YandexMapDefaultMarker} from "vue-yandex-maps";
</script>

<template>
  <v-row class="flex-column">
    <v-col class="d-flex justify-center align-center flex-column text-center">
      <v-btn
          class="px-16 py-5 d-flex justify-center align-center"
          style="color: var(--button-green)"
          readonly
          elevation="0"
          variant="flat"
          color="var(--light-green)"
      ><div class="text-h6">Карта</div></v-btn>
      <div class="text-subtitle-1 mt-10">Выберите интересующую точку на карте слева и по ней появятся данные
        об интенсивности справа</div>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex flex-sm-column flex-column flex-md-row text-center ga-10">
      <yandex-map
          :settings="{
                location: {
                  center: [40.393079,56.134054],
                  zoom: 10,
                },
              }"
          style="min-height: 300px"
          class="w-sm-100 w-100 w-md-75 h-100"

      >
        <yandex-map-default-features-layer/>
        <yandex-map-default-scheme-layer/>
        <yandex-map-default-marker
            v-for="(marker, index) in markers"
            :key="index"
            :settings="marker"
        />
<!--        <yandex-map-marker-->
<!--            v-for="(marker, index) in markers"-->
<!--            :key="index"-->
<!--            :settings="marker"-->
<!--        >-->
<!--          <div class="mdi mdi-map-marker marker"/>-->
<!--        </yandex-map-marker>-->
      </yandex-map>
      <v-container class="w-md-50 w-sm-100">
        <v-row class="d-flex flex-column">
          <v-col class="max-h-1">
            <div class="d-flex flex-row">
              <div class="text-subtitle-1 text-left px-2 py-1" style="background-color: var(--light-green)">Дата</div>
              <div class="text-subtitle-1 text-left px-2 py-1">21.02.2025</div>
            </div>
          </v-col>
          <v-col class="max-h-1">
            <div class="d-flex flex-row">
              <div class="text-subtitle-1 text-left px-2 py-1" style="background-color: var(--light-green)">Местоположение</div>
              <div class="text-subtitle-1 text-left px-2 py-1">Нет положения</div>
            </div>
          </v-col>
          <v-col class="h-80">
            <div style="background-color: var(--light-green);">
              <div style="justify-content: space-between" class="d-flex">
                <div class="text-subtitle-1 font-weight-bold text-left py-3 px-8">Местоположение</div>
                <div class="text-subtitle-1 font-weight-bold text-left py-3 px-8">Нет положения</div>
              </div>
              <div class="mx-5 d-flex flex-column ga-1 pb-5">
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Автопоезд больше 30 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">45</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex">
                  <div class="text-subtitle-1 text-left py-2 px-4">Легковая машина</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">45</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex">
                  <div class="text-subtitle-1 text-left py-2 px-4">Легковая машина</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">45</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex">
                  <div class="text-subtitle-1 text-left py-2 px-4">Легковая машина</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">45</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex">
                  <div class="text-subtitle-1 text-left py-2 px-4">Легковая машина</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">45</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex mt-2">
                  <div style="color: var(--button-green)" class="text-subtitle-1 font-weight-bold text-left py-2 px-4">Итого</div>
                  <div style="color: var(--button-green)" class="text-subtitle-1 text-center font-weight-bold py-2 pr-15">45</div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-btn class="d-flex justify-start text-none rounded" color="var(--button-green)" style="color: white">Создать отчет</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapZoomControl
} from "vue-yandex-maps";

export default {
  name: "FooterSite",
  components: {YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapDefaultSchemeLayer, YandexMap,YandexMapZoomControl},
  data: () => ({
    markers: [
      {
        coordinates: [40.393079, 56.134054],
        draggable: true,
        color: "var(--button-green)",
      },
    ],
  }),
}
</script>

<style scoped>
.marker {
  /*position: relative;
  width: 30px;
  height: 30px;*/
  /*background: var(--button-green);
  border-radius: 50%;*/
  /*shape-outside: circle(50%);
  clip-path: circle(6rem at 12rem 8rem);*/
    /*border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);*/
  /*text-align: center;
  color: #fff;
  font-weight: bold;
  line-height: 20px;*/
}
</style>