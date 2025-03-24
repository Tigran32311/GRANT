<script setup>

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
  <div class="text-h4 font-weight-bold pa-10">
    Список дорог
  </div>
  <div class="d-flex justify-end">
    <v-btn
        class="me-4 mb-4 text-none px-15"
        color="var(--button-green)"
        style="color: white"
        type="submit"
        @click="createRoadDialog=true"
    >
      Добавить дорогу
    </v-btn>
  </div>
  <v-table
      fixed-header
      class="ma-10"
  >
    <thead>
    <tr class="">
      <th class="text-left font-weight-bold">
        Наименование дороги
      </th>
      <th class="text-left font-weight-bold">
        Координаты
      </th>
      <th class="text-left font-weight-bold">
        Регион
      </th>
      <th class="text-left font-weight-bold">
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in roads"
        :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.coordinates }}</td>
      <td>{{ item.region.name }}</td>
      <td>
        <div class="d-flex flex-row ga-5">
          <v-btn
              icon="mdi-pencil"
              density="compact"
              color="warning"
              style="color: white"
              @click="setEdit(item)"
          >
          </v-btn>
          <v-btn
              icon="mdi-trash-can"
              density="compact"
              color="error"
              style="color: white"
              @click="setDeleteId(item)"
          >
          </v-btn>
        </div>
      </td>
    </tr>
    </tbody>
  </v-table>

  <v-dialog
      v-model="createRoadDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="addRoadFunc()" ref="registerFormRef">
        <div class="text-h6 text-center">Добавление дороги</div>
        <v-text-field
            v-model="addRoad.name"
            label="Наименование дороги"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-text-field
            v-model="addRoad.coordinates"
            label="Координаты"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Регион"
            v-model="addRoad.region.id"
            :items=regions
            item-title="name"
            item-value="id"
            min-width="250px"
            chips
            deletable-chips
            filled
        ></v-autocomplete>
        <v-btn
            class="me-4 w-100 text-none"
            color="var(--button-green)"
            style="color: white"
            type="submit"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="editRoadDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="editRoad()">
        <div class="text-h6 text-center">Редактирование дороги</div>
        <v-text-field
            v-model="editRoadForm.name"
            label="Наименование дороги"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-text-field
            v-model="editRoadForm.coordinates"
            label="Координаты"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Регион"
            v-model="editRoadForm.region.id"
            :items=regions
            item-title="name"
            item-value="id"
            min-width="250px"
            chips
            deletable-chips
            filled
        ></v-autocomplete>
        <v-btn
            class="me-4 w-100 text-none"
            color="var(--button-green)"
            style="color: white"
            type="submit"
        >
          Редактировать
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="deleteDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center pa-5 justify-center"  height="100%"
    >
      <v-form>
<!--        <v-card-title class="d-flex justify-space-between align-center">-->
          <div class="text-h6 text-center">Вы действительно хотите удалить организацию?</div>
<!--        </v-card-title>-->

        <div class="d-flex my-5 ga-3 align-center justify-center">
          <v-btn
              class="text-none"
              color="var(--error)"
              style="color: white"
              @click="deleteRoad()"
          >
            Удалить
          </v-btn>
          <v-btn
              class="text-none"
              color="var(--button-green)"
              style="color: white"
              @click="deleteDialog=false"
          >
            Отмена
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import httpResource from "@/http/httpResource.js";
import { useCookies } from "vue3-cookies";
import store from "@/store/index.js";
import {
  addDirector,
  addRoadFunc, deleteRoad, editRoad,
  getDirectors,
  getRegions,
  getRoads,
  performLogout,
  refreshToken
} from "@/utils/util.js";
import {dateFormat} from "@/utils/helper.js";
import router from "@/router/index.js";
import {toRaw} from "vue";
const { cookies } = useCookies();
export default {
  name: "OrgList",
  components: {

  },
  data: () => ({
    roadModel: {},
    createRoadDialog: false,
    editRoadDialog: false,
    deleteDialog: false,
    deleteId: null,
    roads: [],
    regions: [],
    addRoad: {
      region: {
        id: null
      },
      name: null,
      coordinates: null,
    },
    editRoadForm: {
      region: {
        id: null,
      },
      name: null,
      coordinates: null,
      id: null,
    },
    orgs: [],
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: ""
  }),
  mounted() {
    this.getRoads()
    this.getRegions()
  },
  methods: {
    async getRoads() {
      try {
        const response = await getRoads()
        if (response.status===200) {
          this.roads=response.data
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    setNotification(type,snack,text) {
      this.notificationType=type
      this.notificationSnack=snack
      this.notificationText=text
      this.notification=true
    },
    async getRegions() {
      try {
        const response = await getRegions()
        if (response.status===200) {
          this.regions=response.data
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addRoadFunc() {
      if (this.addRoad.name==''  || this.addRoad.region.id==null || this.addRoad.coordinates=='') {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {
        const response = await addRoadFunc(this.addRoad)
        if (response.status === 200) {
          this.setNotification("success","success","Успешно")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editRoad() {
      if (this.editRoadForm.id=='' ||this.editRoadForm.name=='' || this.editRoadForm.coordinates=='' || this.editRoadForm.region.id==null) {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {
        const response = await editRoad(this.editRoadForm)
        if (response.status === 200) {
          this.setNotification("success","success","Успешно")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    setEdit(item) {
      this.editRoadForm = structuredClone(toRaw(item))
      this.editRoadDialog=true
    },
    async deleteRoad() {
      if (this.deleteId==null || this.deleteId=='') {
        this.setNotification("error","var(--error)","Организация не указана")
        return
      }
      try {
        const data = new FormData()
        data.set("roadId",this.deleteId)
        const response = await deleteRoad(data)
        if (response.status === 200) {
          this.setNotification("success","success","Успешно")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    setDeleteId(item) {
      this.deleteDialog=true
      this.deleteId=item.id
    }
  },
}
</script>


<style scoped>

</style>-