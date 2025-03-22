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
    Список проверяющих
  </div>
  <div class="d-flex justify-end">
    <v-btn
        class="me-4 mb-4 text-none px-15"
        color="var(--button-green)"
        style="color: white"
        type="submit"
        @click="createDirDialog=true"
    >
      Добавить проверяющего
    </v-btn>
  </div>
  <v-table
      fixed-header
      class="ma-10"
  >
    <thead>
    <tr class="">
      <th class="text-left font-weight-bold">
        ФИО
      </th>
      <th class="text-left font-weight-bold">
        Почта
      </th>
      <th class="text-left font-weight-bold">
        Организация
      </th>
      <th class="text-left font-weight-bold">
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in directors"
        :key="item.id"
    >
      <td>{{ item.surname +" "+ item.firstname +" "+ item.patronymic}}</td>
      <td>{{ item.email }}</td>
      <td>{{ item.organization.name }}</td>
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
      v-model="createDirDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="addDirector()" ref="registerFormRef">
        <div class="text-h6 text-center">Добавить проверяющего</div>
        <v-text-field
            v-model="addDirForm.surname"
            label="Фамилия"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addDirForm.firstname"
            label="Имя"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addDirForm.patronymic"
            label="Отчество (необязательно)"
            type="text"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addDirForm.email"
            label="Почта"
            type="email"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addDirForm.password"
            label="Пароль"
            type="password"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Организация"
            v-model="addDirForm.organization.id"
            :items=orgs
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
      v-model="editDirDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="editDir()">
        <div class="text-h6 text-center">Редактирование проверяющего</div>
        <v-text-field
            v-model="editDirForm.surname"
            label="Фамилия"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="editDirForm.firstname"
            label="Имя"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="editDirForm.patronymic"
            label="Отчество (необязательно)"
            type="text"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="editDirForm.email"
            label="Почта"
            type="email"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <div class="text-right" style="color: var(--warning)">* Если не нужно менять пароль, оставьте поле пустым</div>
        <v-text-field
            v-model="editDirForm.password"
            label="Пароль"
            type="password"
            required
            min-width="250px"
        ></v-text-field>

        <v-autocomplete
            label="Организация"
            v-model="editDirForm.organization.id"
            :items=orgs
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
      v-model="deleteDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center pa-5 justify-center"  height="100%"
    >
      <v-form>
<!--        <v-card-title class="d-flex justify-space-between align-center" >-->
          <div class="text-h6 text-center">Вы действительно хотите удалить пользователя?</div>
<!--        </v-card-title>-->

        <div class="d-flex my-5 ga-3 align-center justify-center">
          <v-btn
              class="text-none"
              color="var(--error)"
              style="color: white"
              @click="deleteDir()"
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
  addDirector, deleteDirector,
  editDirector,
  getDirectors,
  getOrgs,
  parseApierror,
  performLogout,
  refreshToken
} from "@/utils/util.js";
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
    directors: [],
    addDirForm: {
      firstname: null,
      patronymic: null,
      surname: null,
      email: null,
      password: null,
      organization: {
        id: null
      },
    },
    editDirForm: {
      firstname: null,
      patronymic: null,
      surname: null,
      email: null,
      password: null,
      organization: {
        id: null
      },
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
    this.getDirectors()
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
        const response = await getOrgs()
        if (response.status===200) {
          this.orgs=response.data
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getDirectors() {
      try {
        const response = await getDirectors()
        if (response.status===200) {
          this.directors=response.data
        } else {
          this.setNotification("error","var(--error)",response.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addDirector() {
      if (this.addDirForm.email==''  || this.addDirForm.organization.id==null || this.addDirForm.firstname=='' || this.addDirForm.surname=='' || this.addDirForm.password=='') {
        this.setNotification("error","var(--error)","Заполните все обязательные поля")
        return
      }
      try {
        const response = await addDirector(this.addDirForm)
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
    async editDir() {
      if (this.editDirForm.email==''  || this.editDirForm.organization.id==null || this.editDirForm.firstname=='' || this.editDirForm.surname=='' || this.editDirForm.id=='') {
        this.setNotification("error","var(--error)","Заполните все поля")
        return
      }
      try {
        const response = await editDirector(this.editDirForm)
        if (response.status === 200) {
          this.setNotification("success","success","Изменения применены")
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
      this.editDirForm = structuredClone(toRaw(item))
      this.editDirForm.password=null
      this.editDirDialog=true
    },
    async deleteDir() {
      if (this.deleteId==null || this.deleteId=='') {
        this.setNotification("error","var(--error)","Пользователь не указан")
        return
      }
      try {
        const response = await deleteDirector(this.deleteId)
        if (response.status === 200) {
          this.setNotification("success","success","Изменения применены")
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