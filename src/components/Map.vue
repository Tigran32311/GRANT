<script setup>

import {YandexMapDefaultMarker} from "vue-yandex-maps";
</script>

<template>
  <v-snackbar
      close-on-content-click
      timeout="-1"
      location="top"
      v-model="notification"
      :color="notificationSnack"
  >
    <v-alert
        :text="notificationText"
        closable
        :type="notificationType"
        class="ma-0 pa-0 w-100 h-100"
    ></v-alert>
  </v-snackbar>
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
      <v-autocomplete
          label="Год учета"
          v-model="year"
          :items=years
          min-width="250px"
          @update:model-value="getMarkers"

          chips
          deletable-chips
          filled
          auto-select-first

      ></v-autocomplete>
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
              <div class="text-subtitle-1 text-left px-2 py-1">{{ chosenMarker.registrationDate ? chosenMarker.registrationDate : "Выберите точку"}}</div>
            </div>
          </v-col>
          <v-col class="max-h-1">
            <div class="d-flex flex-row">
              <div class="text-subtitle-1 text-left px-2 py-1" style="background-color: var(--light-green)">Местоположение</div>
              <div class=" text-left px-2 py-1">{{ chosenMarker.region.name ? chosenMarker.region.name+"," : "Выберите точку"}} {{chosenMarker.road.name}}</div>
            </div>
          </v-col>
          <v-col class="h-80">
            <div style="background-color: var(--light-green);">
              <div style="justify-content: space-between" class="d-flex">
                <div class="text-subtitle-1 font-weight-bold text-left py-3 px-8">Местоположение</div>
                <div class="text-subtitle-1 font-weight-bold text-left py-3 px-8">{{ chosenMarker.region.name ? chosenMarker.region.name+"," : "Выберите точку"}} {{chosenMarker.road.name}}</div>
              </div>
              <div class="mx-5 d-flex flex-column ga-1 pb-5">
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Автопоезд больше 30 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.roadTrainOver30TonsQuantity ? chosenMarker.roadTrainOver30TonsQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Автопоезд больше 20 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.roadTrain20TonsQuantity ? chosenMarker.roadTrain20TonsQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Автобусы</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.busQuantity ? chosenMarker.busQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики больше 14 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckOver14TonsQuantity ? chosenMarker.truckOver14TonsQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики до 14 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckUpTo14Tons ? chosenMarker.truckUpTo14Tons : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики до 8 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckUpTo8Tons ? chosenMarker.truckUpTo8Tons : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики до 6 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckUpTo6Tons ? chosenMarker.truckUpTo6Tons : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики до 2 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckUpTo2Tons ? chosenMarker.truckUpTo2Tons : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex rounded-lg">
                  <div class="text-subtitle-1 text-left py-2 px-4">Грузовики до 8 тонн</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{chosenMarker.truckUpTo8Tons ? chosenMarker.truckUpTo8Tons : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex">
                  <div class="text-subtitle-1 text-left py-2 px-4">Мотоциклы и мопеды</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{ chosenMarker.motorcyclesAndMopedsQuantity ? chosenMarker.motorcyclesAndMopedsQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex mt-2">
                  <div style="color: var(--button-green)" class="text-subtitle-1 font-weight-bold text-left py-2 px-4">Итого</div>
                  <div style="color: var(--button-green)" class="text-subtitle-1 text-center font-weight-bold py-2 pr-15">{{ chosenMarker.allQuantity ? chosenMarker.allQuantity : 0}}</div>
                </div>
                <div style="justify-content: space-between; background-color: white" class="d-flex mt-2" v-if="isIntensityCard">
                    <div class="text-subtitle-1 text-left py-2 px-4">Итоговая интенсивность</div>
                    <div class="text-subtitle-1 text-center py-2 pr-15">{{ intensityCard.result ? intensityCard.result : 0}}</div>
                  </div>
                  <div style="justify-content: space-between; background-color: white" class="d-flex" v-if="isIntensityCard">
                    <div class="text-subtitle-1 text-left py-2 px-4">Суточная интенсивность</div>
                  <div class="text-subtitle-1 text-center py-2 pr-15">{{ intensityCard.day ? intensityCard.day : 0}}</div>
                </div>
              </div>
            </div>
          </v-col>
          <v-col class="d-flex flex-column flex-md-row ga-5">
            <v-btn class="d-flex justify-start text-none rounded" color="var(--button-green)" style="color: white" @click="createReport">Создать отчет</v-btn>
            <v-btn class="d-flex justify-start text-none rounded" color="var(--button-green)" style="color: white" @click="checkIntensivity">Рассчитать интенсивность</v-btn>
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
import {generateDoc, getIntensity, getMarkersMap, getRegions, performLogout, refreshToken} from "@/utils/util.js";
import router from "@/router/index.js";

export default {
  name: "Map",
  components: {YandexMapDefaultFeaturesLayer, YandexMapMarker, YandexMapDefaultSchemeLayer, YandexMap,YandexMapZoomControl},
  data: () => ({
    markers: [
      // {
      //   coordinates: [40.393079, 56.134054],
      //   draggable: false,
      //   color: "var(--button-green)",
      //   onClick: ()=>{getCard("48e40ca2-08d0-4f57-bd94-8d9599b19acf")},
      //   // dataId: ,
      // },
      // {
      //   coordinates: [42.047150, 55.581302],
      //   draggable: false,
      //   color: "var(--button-green)",
      //   onClick: () => {
      //     console.log(123456)
      //   }
      // },
    ],
    years: [],
    year: new Date().getFullYear(),
    chosenMarker: {
      id: null,
      registrationDate: null,
      registrationEnd: null,
      registrationStart: null,
      busQuantity: null,
      roadTrain20TonsQuantity: null,
      smallRoadTrainQuantity: null,
      roadTrainOver30TonsQuantity: null,
      truckOver14TonsQuantity: null,
      truckUpTo2Tons: null,
      truckUpTo6Tons: null,
      truckUpTo8Tons: null,
      truckUpTo14Tons: null,
      passengerCarQuantity: null,
      pointKM: null,
      motorcyclesAndMopedsQuantity: null,
      inspectorFio: null,
      allQuantity: null,
      numberOfLanes: null,
      region: {
        name: null
      },
      road: {
        id: null,
        name: null,
      }
    },
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: "",
    isIntensityCard: false,
    intensityCard: {
      result: null,
      day: null,
    }
  }),
  created() {
    this.getMarkers()
    this.years = this.getYears()
  },
  methods: {
    setNotification(type,snack,text) {
      this.notificationType=type
      this.notificationSnack=snack
      this.notificationText=text
      this.notification=true
    },
    async getMarkers() {
      try {
        if (this.year==="" || this.year===null) {
          this.year=2025
        }
        const response = await getMarkersMap(this.year)
        if (response.status===200) {
          this.markers = []
          let that = this
          response.data.forEach(function (r) {
            that.markers.push({
              // coordinates: r.road.coordinates.split(',').map(Number),
              coordinates: [r.dolgota,r.shirota].map(Number),
              draggable: false,
              color: "var(--button-green)",
              dataId: r.id,
              onClick: ()=>{
                that.setMarker(r)
                that.isIntensityCard=false
              }
            })
          })
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    getYears() {
      var currentYear = new Date().getFullYear(), years = [];
      let startYear = 2024;
      while ( startYear <= currentYear ) {
        years.push(startYear++);
      }
      return years;
    },
    setMarker(data) {
      this.chosenMarker = data
    },
    async createReport() {
      if (this.chosenMarker.id===null) {
        this.setNotification("error","var(--error)","Выберите метку на карте, для формирования отчета по нему")
        return
      } else {
        this.notification=false
      }
      let date = new Date();
      try {
        // const fileName ="report_" + date.getFullYear() + date.getMonth() + date.getDate() + this.chosenMarker.id;
        const fileName = "file"
        const response = await generateDoc(fileName,this.chosenMarker.id)
        if (response.status===200) {
          const objectURL = URL.createObjectURL(response.data);
          let link = document.createElement('a');
          link.href = objectURL
          link.download = fileName+".docx";
          link.click();
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async checkIntensivity(){
      if (this.chosenMarker.id===null) {
        this.setNotification("error","var(--error)","Выберите метку на карте, для расчета интенсивности")
        return
      } else {
        this.notification=false
      }
      try {
        const response = await getIntensity(this.chosenMarker.id)
        if (response.status===200) {
          this.isIntensityCard = true
          this.intensityCard = {
            result: response.data[1],
            day: response.data[0]
          }
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
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