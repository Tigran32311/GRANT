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
      class="ma-10"
  >
    <thead>
    <tr class="">
      <th class="text-left font-weight-bold">
        Наименование организации
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
              @click="() => {
                editOrgForm.id = item.id
                editOrganizationDialog = true
              }"
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
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="addOrg()" ref="registerFormRef">
        <div class="text-h6 text-center">Регистрация</div>
        <v-text-field
            v-model="editOrgForm.name"
            label="Наименование организации"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Регион"
            v-model="editOrgForm.region.id"
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
      v-model="editOrganizationDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="addOrg()" ref="registerFormRef">
        <div class="text-h6 text-center">Регистрация</div>
        <v-text-field
            v-model="addOrgForm.name"
            label="Наименование организации"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Регион"
            v-model="addOrgForm.region.id"
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
  name: "OrgList",
  components: {

  },
  data: () => ({
    roadModel: {},
    createOrganizationDialog: false,
    editOrganizationDialog: false,
    roads: [],
    regions: [],
    addOrgForm: {
      region: {
        id: null
      },
      name: null,
    },
    editOrgForm: {
      region: {
        id: null
      },
      name: null,
      id: null,
    },
    orgs: [],
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: ""
  }),
  created() {
    this.getOrgs()
    this.getRegions()
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
        try {
          await refreshToken()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    async addOrg() {
      if (this.addOrgForm.name==''  || this.addOrgForm.region.id==null) {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {

        const response = await httpResource.post("/admin/createOrg",this.addOrgForm,{
          headers: {
            Authorization: "Bearer "+store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success","success","Организация добавлена")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
        try {
          await refreshToken()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    async editOrg() {
      if (this.editOrgForm.name==''  || this.editOrgForm.region.id==null) {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {

        const response = await httpResource.post("/admin/createOrg",this.addOrgForm,{
          headers: {
            Authorization: "Bearer "+store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success","success","Организация добавлена")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
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