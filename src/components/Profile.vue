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
  <div class="d-flex flex-column">
    <div class="d-flex flex-column flex-sm-column flex-md-row justify-md-space-between align-center">
      <div class="text-h4 font-weight-bold pa-md-10 py-5">
        Профиль
      </div>
      <div class="pa-md-10 py-5">
        <v-btn
            v-if="!isEdit"
            prepend-icon="mdi-pencil"
            class="text-none px-5"
            color="warning"
            style="color: white"
            type="submit"
            text="Редактировать профиль"
            @click="isEdit=true"
        >
        </v-btn>
        <v-btn
            v-if="isEdit"
            prepend-icon="mdi-eye"
            class="text-none px-5"
            color="var(--button-green)"
            style="color: white"
            type="submit"
            text="Вернуться к просмотру"
            @click="isEdit=false"
        >
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-column" v-if="!isEdit">
      <div class="text-h5 font-weight-bold py-2 py-md-5 px-10">ФИО: {{userData.surname}} {{userData.firstname}} {{userData.patronymic}}</div>
      <div class="text-h6 font-weight-bold py-2 py-md-5 px-10">
        Электронная почта: {{userData.email}}
      </div>
    </div>
    <v-form class="pa-15 w-100" @submit.prevent="editUser()" v-if="isEdit">
      <div class="text-h6 font-weight-bold">Редактирование профиля</div>
      <v-text-field
          v-model="editForm.surname"
          label="Фамилия"
          type="text"
          :rules="[v => !!v || 'Поле обязательно']"
          required
          min-width="250px"
      ></v-text-field>
      <v-text-field
          v-model="editForm.firstname"
          label="Имя"
          type="text"
          :rules="[v => !!v || 'Поле обязательно']"
          required
          min-width="250px"
      ></v-text-field>
      <v-text-field
          v-model="editForm.patronymic"
          label="Отчество (необязательно)"
          type="text"
          required
          min-width="250px"
      ></v-text-field>
      <v-text-field
          v-model="editForm.email"
          label="Почта"
          type="email"
          :rules="[v => !!v || 'Поле обязательно']"
          required
          min-width="250px"
      ></v-text-field>
      <div class="text-right" style="color: var(--warning)">* Если не нужно менять пароль, оставьте поле пустым</div>
      <v-text-field
          v-model="editForm.password"
          label="Пароль"
          type="password"
          required
          min-width="250px"
      ></v-text-field>
      <v-btn
          class="me-4 text-none"
          color="var(--button-green)"
          style="color: white"
          type="submit"
      >
        Созранить изменения
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import httpResource from "@/http/httpResource.js";
import { useCookies } from "vue3-cookies";
import store from "@/store/index.js";
import {editProfile, editProfileDir, getProfile, getProfileDir, performLogout, refreshToken} from "@/utils/util.js";
import {dateFormat} from "@/utils/helper.js";
import router from "@/router/index.js";
import {toRaw} from "vue";
const { cookies } = useCookies();
export default {
  name: "DirectorList",
  components: {

  },
  data: () => ({
    roadModel: {},
    createDirDialog: false,
    editDirDialog: false,
    deleteDialog: false,
    deleteId: null,
    isEdit: false,
    directors: [],
    userData: {
      firstname: null,
      patronymic: null,
      surname: null,
      email: null,
      organization: {
        id: null,
        name: null
      },
    },
    editForm: {
      firstname: null,
      patronymic: null,
      surname: null,
      email: null,
      password: null,
      id: null,
    },
    orgs: [],
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: ""
  }),
  created() {
    this.getProfile()
  },
  methods: {
    setNotification(type,snack,text) {
      this.notificationType=type
      this.notificationSnack=snack
      this.notificationText=text
      this.notification=true
    },
    async getProfile() {
      try {
        const response = await getProfile()
        if (response.status===200) {
          this.userData=response.data
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editUser() {
      if (this.editForm.email=='' || this.editForm.firstname=='' || this.editForm.surname=='' || this.editForm.id=='') {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {
        const response = await editProfile(this.editForm)
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
  },
}
</script>


<style scoped>

</style>