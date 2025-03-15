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
    Список организаций
  </div>
  <div class="d-flex justify-end">
    <v-btn
        class="me-4 mb-4 text-none px-15"
        color="var(--button-green)"
        style="color: white"
        type="submit"
        @click="createOrganizationDialog=true"
    >
      Добавить организацию
    </v-btn>
  </div>
  <v-table
      fixed-header
  >
    <thead>
    <tr>
      <th class="text-left">
        Наименование организации
      </th>
      <th class="text-left">
        Регион
      </th>
      <th class="text-left">
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in orgs"
        :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.region.name }}</td>
      <td>
        <div class="d-flex flex-row ga-5">
          <v-btn
              icon="mdi-pencil"
              density="compact"
              color="warning"
              style="color: white"
          >
          </v-btn>
          <v-btn
              icon="mdi-trash-can"
              density="compact"
              color="error"
              style="color: white"
          >
          </v-btn>
        </div>
      </td>
    </tr>
    </tbody>
  </v-table>

  <v-dialog
      v-model="createOrganizationDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center ma-0"  height="100%"
    >
      <v-form class="pa-15" @submit.prevent="register()" ref="registerFormRef">
        <div class="text-h6 text-center">Регистрация</div>
        <v-text-field
            v-model="registerForm.surname"
            label="Наименование организации"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
        ></v-text-field>

        <v-autocomplete
            label="Дорога"
            v-model="formModel.region.id"
            :items=regions
            item-title="name"
            item-value="id"

            chips
            deletable-chips
            filled
        ></v-autocomplete>
        <v-btn variant="text" class="text-subtitle-1 pa-0 mb-2" @click="createOrganizationDialog=false;">Уже есть аккаунт? Войти</v-btn>
        <v-btn
            class="me-4 w-100 text-none"
            color="var(--button-green)"
            style="color: white"
            type="submit"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>
    </v-card>
  </v-dialog>
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

  },
  data: () => ({
    roadModel: {},
    createOrganizationDialog: false,
    roads: [],
    regions: [],
    formModel: {
      pointKM: "",
      orgName: null,
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
    registerForm: {
      surname: "",
      firstName: "",
      patronymic: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    orgs: [],
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: ""
  }),
  created() {
    this.getOrgs()
    // this.getRegions()
  },
  methods: {
    setNotification(type,snack,text) {
      this.notificationType=type
      this.notificationSnack=snack
      this.notificationText=text
      this.notification=true
    },
    async getOrgs() {
      try {
        const response = await httpResource.get("/getOrgs",{
          headers: {
            Authorization: "Bearer "+store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.orgs = response.data
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
  },
}
</script>


<style scoped>

</style>