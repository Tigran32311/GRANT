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
import httpResource from "@/http/httpResource.js";
import store from "@/store/index.js";
import {performLogout, refreshToken} from "@/utils/util.js";
import router from "@/router/index.js";

export default {
  name: "Map",
  components: {YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapDefaultSchemeLayer, YandexMap,YandexMapZoomControl},
  data: () => ({
    markers: [
      {
        coordinates: [40.393079, 56.134054],
        draggable: true,
        color: "var(--button-green)",
        onClick: ()=>{getCard("48e40ca2-08d0-4f57-bd94-8d9599b19acf")},
        // dataId: ,
      },
      // {
      //   coordinates: [42.047150, 55.581302],
      //   draggable: true,
      //   color: "var(--button-green)",
      //   onClick: () => {
      //     console.log(123456)
      //   }
      // },
    ],
    chosenMarker: {
      id: null,
      registration_date: null,
      bus_quantity: null,
      road_train_20_tons_quantity: null,
      small_road_train_quantity: null,
      road_train_over_30_tons_quantity: null,
      truck_over_14_tons_quantity: null,
      truck_up_to_2_tons: null,
      truck_up_to_6_tons: null,
      truck_up_to_8_tons: null,
      truck_up_to_14_tons: null,
      passenger_car_quantity: null,
      motorcycles_and_mopeds_quantity: null,
      all_quantity: null,
      road: {
        id: null,
        name: null,
      }
    },
  }),
  created() {
    this.getMarkers()
  },
  methods: {
    async getMarkers() {
      try {
        const response = await httpResource.get("/getMyDownloads",{
          headers: {
            Authorization: "Bearer "+store.getters.getAccessToken
          }
        });
        // this.markers.push({
        //   coordinates: response.data[0].road.coordinates.split(',').map(Number),
        //   draggable: true,
        //   color: "var(--button-green)",
        // })
        if (response.status === 200) {
          let that = this
          response.data.forEach(function (r) {
            that.markers.push({
              coordinates: r.road.coordinates.split(',').map(Number),
              draggable: true,
              color: "var(--button-green)",
              dataId: "",
            })
          })
          // this.markers = that
          console.log(response)
        }
      } catch (error) {
        try {
          if (error.status===401) {
            const refresh = await refreshToken()
            if (refresh===200) {
              await this.getMarkers()
            } else {
              await router.push("/")
              location.reload()
            }
          } else {
            this.setNotification("error","var(--error)",error.response.data['message'])
          }
        } catch (error) {
          performLogout()
          await router.push("/")
          location.reload()
        }
      }
    },
  }
}

async function getCard(dataId) {
  try {
    const response = await httpResource.get("/getIntensity?trafficRegCardId=" + dataId, {
      headers: {
        Authorization: "Bearer " + store.getters.getAccessToken
      }
    });
    // this.markers.push({
    //   coordinates: response.data[0].road.coordinates.split(',').map(Number),
    //   draggable: true,
    //   color: "var(--button-green)",
    // })
    if (response.status === 200) {
      let that = this
      response.data.forEach(function (r) {
        that.markers.push({
          coordinates: r.road.coordinates.split(',').map(Number),
          draggable: true,
          color: "var(--button-green)",
          dataId: "",
        })
      })
      // this.markers = that
      console.log(this.markers)
    }
  } catch (error) {
    try {
      if (error.status === 401) {
        const refresh = await refreshToken()
        if (refresh === 200) {
          await this.getMarkers()
        } else {
          await router.push("/")
          location.reload()
        }
      } else {
        this.setNotification("error", "var(--error)", error.response.data['message'])
      }
    } catch (error) {
      // performLogout()
      // await router.push("/")
      // location.reload()
    }
  }
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