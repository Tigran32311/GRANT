<script setup>
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'

</script>

<template>
  <div class="d-flex justify-center">
    <v-alert
        v-model="notification"
        :text="notificationText"
        position="fixed"
        closable
        :type="notificationType"
        class=""
        style="min-width: 50px;display: grid;
  place-items: center; z-index: 99"
    ></v-alert>
  </div>
  <div>
    <div class="text-h5 font-weight-bold pa-10">
      Загрузить видео
    </div>
    <form class="px-10" @submit.prevent="sendForm">
      <div class="text-subtitle-1">Номер учетного пункта указывается согласно <a href="https://скдф.рф/roads" target="_blank">реестру</a></div>
      <v-text-field
          v-model="formModel.pointKM"
          label="Номер учетного пункта"
          required
      ></v-text-field>
      <v-date-input
          label="Дата учета"
          v-model="formModel.registrationDate"
      ></v-date-input>
      <v-text-field
          v-model="formModel.registrationStart"
          :active="menu2"
          :focus="menu2"
          label="Время начала учета"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
      >
        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            activator="parent"
            transition="scale-transition"
        >
          <v-time-picker
              v-if="menu2"
              v-model="formModel.registrationStart"
              format="24hr"
              full-width
          ></v-time-picker>
        </v-menu>
      </v-text-field>
      <v-text-field
          v-model="formModel.registrationEnd"
          :active="menu3"
          :focus="menu3"
          label="Время конца учета"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
      >
        <v-menu
            v-model="menu3"
            :close-on-content-click="false"
            activator="parent"
            transition="scale-transition"
        >
          <v-time-picker
              v-if="menu3"
              v-model="formModel.registrationEnd"
              format="24hr"
              full-width
          ></v-time-picker>
        </v-menu>
      </v-text-field>
      <v-text-field
          label="Километр"
          v-model="formModel.pointKM"
          required
      ></v-text-field>
      <v-text-field
          label="Количество полос"
          v-model="formModel.numberOfLanes"
          required
      ></v-text-field>
      <v-text-field
          label="Должность проверяющего"
          v-model="formModel.inspectorPost"
          required
      ></v-text-field>
      <v-text-field
          label="ФИО проверяющего"
          v-model="formModel.inspectorFio"
          required
      ></v-text-field>
      <v-autocomplete
          label="Регион"
          v-model="formModel.region.id"
          :items=regions
          item-title="name"
          item-value="id"

          chips
          deletable-chips
          filled

      ></v-autocomplete>
      <v-autocomplete
          label="Дорога"
          v-model="formModel.road.id"
          :items=roads
          item-title="name"
          item-value="id"

          chips
          deletable-chips
          filled

      ></v-autocomplete>
      <v-checkbox v-model="formModel.visibleStatus" label="Доступен для просмотра пользователям?"></v-checkbox>
      <div class="text-subtitle-1">Загрузите видеоролик (доступные форматы: mp4, avi)*</div>
      <div class="mb-5">
      <v-file-upload
          clearable
          v-model="fileVideo"
          density="comfortable"
          variant="comfortable"
          title="Выберите или перетащите файл"
          browse-text="Local Filesystem"
          divider-text="or choose locally"
      ></v-file-upload></div>
      <v-btn
          class="me-4 mb-4 text-none px-15"
          color="var(--button-green)"
          style="color: white"
          size="large"
          type="submit"
      >
        Отправить
      </v-btn>
    </form>
  </div>
</template>

<script>
  import httpResource from "@/http/httpResource.js";
  import { useCookies } from "vue3-cookies";
  import store from "@/store/index.js";
  import {performLogout, refreshToken} from "@/utils/util.js";
  import {dateFormat} from "@/utils/helper.js";
  import router from "@/router/index.js";
  const { cookies } = useCookies();
  export default {
    name: "CreateReportForm",
    components: {
      VFileUpload,
    },
    data: () => ({
      time: "",
      menu2: false,
      time2: "",
      menu3: false,
      fileVideo: null,
      roadModel: {},
      roads: [],
      regions: [],
      formModel: {
        pointKM: "",
        registrationDate: null,
        registrationStart: null,
        registrationEnd: null ,
        visibleStatus: true,
        region: {
          id: null
        },
        road: {
          id: null
        },
        inspectorFio: "",
        inspectorPost: "",
        numberOfLanes: "",
      },
      notification: false,
      notificationText: "Успешно",
      notificationType: "success"
    }),
    created() {
      this.getRoads()
      this.getRegions()
    },
    methods: {
      async getRoads() {
        try {
          const response = await httpResource.get("/getRoads",{
            headers: {
              Authorization: "Bearer "+store.getters.getAccessToken
            }
          });
          if (response.status === 200) {
            this.roads = response.data
          }
        } catch (error) {
          console.log(error)
          try {
            await refreshToken()
          } catch (error) {
            performLogout()
            await router.push("/")
          }
        }
      },
      async getRegions() {
        try {
          const response = await httpResource.get("/getRegions",{
            headers: {
              Authorization: "Bearer "+store.getters.getAccessToken
            }
          });
          if (response.status === 200) {
            this.regions = response.data
          }
        } catch (error) {
          console.log(error)
          try {
            await refreshToken()
          } catch (error) {
            performLogout()
            await router.push("/")
          }
        }
      },
      async sendForm() {
        try {
          const data = new FormData()
          data.append("file",this.fileVideo)
          this.formModel.registrationDate = dateFormat(this.formModel.registrationDate)
          this.formModel.registrationStart = this.formModel.registrationStart+":00"
          this.formModel.registrationEnd = this.formModel.registrationEnd+":00"
          data.append("videoData",new Blob([JSON.stringify(this.formModel)],{type: 'application/json'}))
          const response = await httpResource.post("/video/upload",data,{
            headers: {
              'Accept': 'application/json',
              Authorization: "Bearer "+store.getters.getAccessToken,
              "Content-Type": "multipart/form-data",
            }
          });
          if (response.status===200) {
            this.notificationType="success"
            this.notificationText="Видеоролик успешно загружен и поставлен в очередь на обработку"
            this.notification=true
          }
        } catch(error) {
          try {
            await refreshToken()
          } catch (error) {
            performLogout()
            await router.push("/")
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>