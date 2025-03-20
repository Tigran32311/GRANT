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
    Список пользователей
  </div>
  <div class="d-flex justify-end">
    <v-btn
        class="me-4 mb-4 text-none px-15"
        color="var(--button-green)"
        style="color: white"
        type="submit"
        @click="createDialog=true"
    >
      Добавить пользователя
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
<!--      <th class="text-left font-weight-bold">-->
<!--        Организация-->
<!--      </th>-->
      <th class="text-left font-weight-bold">
        Действия
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in emps"
        :key="item.id"
    >
      <td>{{ item.surname +" "+ item.firstname +" "+ item.patronymic}}</td>
      <td>{{ item.email }}</td>
<!--      <td>{{ // item.organization.name }}</td>-->
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
              icon="mdi-lock"
              density="compact"
              color="error"
              style="color: white"
              @click="setBanId(item)"
          >
          </v-btn>
          <v-btn
              icon="mdi-account-reactivate"
              density="compact"
              color="success"
              style="color: white"
              @click="setActivateId(item)"
          >
          </v-btn>
        </div>
      </td>
    </tr>
    </tbody>
  </v-table>

  <v-dialog
      v-model="createDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="addUser()" ref="registerFormRef">
        <div class="text-h6 text-center">Добавить проверяющего</div>
        <v-text-field
            v-model="addForm.surname"
            label="Фамилия"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addForm.firstname"
            label="Имя"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addForm.patronymic"
            label="Отчество (необязательно)"
            type="text"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addForm.email"
            label="Почта"
            type="email"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>
        <v-text-field
            v-model="addForm.password"
            label="Пароль"
            type="password"
            :rules="[v => !!v || 'Поле обязательно']"
            required
            min-width="250px"
        ></v-text-field>

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
      v-model="editDialog"
      width="auto"
      min-width="50%"
  >
    <v-card
        class="d-flex flex-row align-center justify-center" height="100%" style="min-width: 50%"
    >
      <v-form class="pa-15 w-100" @submit.prevent="editUser()">
        <div class="text-h6 text-center">Редактирование проверяющего</div>
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

<!--        <v-autocomplete-->
<!--            label="Организация"-->
<!--            v-model="editForm.organization.id"-->
<!--            :items=orgs-->
<!--            item-title="name"-->
<!--            item-value="id"-->
<!--            min-width="250px"-->
<!--            chips-->
<!--            deletable-chips-->
<!--            filled-->
<!--        ></v-autocomplete>-->
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
      v-model="banDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center pa-5 justify-center"  height="100%"
    >
      <v-form>
        <div class="text-h6 text-center">Вы действительно хотите заблокировать пользователя?</div>
        <div class="d-flex my-5 ga-3 align-center justify-center">
          <v-btn
              class="text-none"
              color="var(--error)"
              style="color: white"
              @click="banUser()"
          >
            Заблокировать
          </v-btn>
          <v-btn
              class="text-none"
              color="var(--button-green)"
              style="color: white"
              @click="banDialog=false"
          >
            Отмена
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="activateDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center pa-5 justify-center"  height="100%"
    >
      <v-form>
        <div class="text-h6 text-center">Вы действительно хотите активировать пользователя?</div>
        <div class="d-flex my-5 ga-3 align-center justify-center">
          <v-btn
              class="text-none"
              color="success"
              style="color: white"
              @click="activateUser()"
          >
            Активировать
          </v-btn>
          <v-btn
              class="text-none"
              color="primary"
              style="color: white"
              @click="activateDialog=false"
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
import {performLogout, refreshToken} from "@/utils/util.js";
import {dateFormat} from "@/utils/helper.js";
import router from "@/router/index.js";
import {toRaw} from "vue";
const { cookies } = useCookies();
export default {
  name: "UsersList",
  components: {

  },
  data: () => ({
    roadModel: {},
    emps: [],
    createDialog: false,
    editDialog: false,
    banDialog: false,
    banId: null,
    activateDialog: false,
    activeId: null,
    addForm: {
      firstname: null,
      patronymic: null,
      surname: null,
      email: null,
      password: null,
      organization: {
        id: null
      },
    },
    editForm: {
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
    notification: false,
    notificationText: "Успешно",
    notificationType: "success",
    notificationSnack: ""
  }),
  created() {
    this.getEmployees()
  },
  methods: {
    setNotification(type, snack, text) {
      this.notificationType = type
      this.notificationSnack = snack
      this.notificationText = text
      this.notification = true
    },
    async addUser() {
      if (this.addForm.email == '' || this.addForm.firstname == '' || this.addForm.surname == '' || this.addForm.password == '') {
        this.setNotification("error", "var(--error)", "Заполните все обязательные поля")
        return
      }
      try {
        const response = await httpResource.post("/director/createEmp", this.addForm, {
          headers: {
            Authorization: "Bearer " + store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success", "success", "Успешно")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
        try {
          await refreshToken()
          await this.addUser()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    async editUser() {
      if (this.editForm.email == '' || this.editForm.firstname == '' || this.editForm.surname == '' || this.editForm.id == '') {
        this.setNotification("error", "var(--error)", "Заполните все поля")
        return
      }
      try {
        const response = await httpResource.post("/director/editEmp", this.editForm, {
          headers: {
            Authorization: "Bearer " + store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success", "success", "Изменения применены")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
        try {
          await refreshToken()
          await this.editUser()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    setEdit(item) {
      this.editForm = structuredClone(toRaw(item))
      this.editForm.password = null
      this.editDialog = true
    },
    async banUser() {
      if (this.banId == null || this.banId == '') {
        this.setNotification("error", "var(--error)", "Пользователь не указан")
        return
      }
      try {
        const data = new FormData()
        data.append('empId',this.banId)
        const response = await httpResource.post("/director/banEmp", data, {
          headers: {
            Authorization: "Bearer " + store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success", "success", "Изменения применены")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
        try {
          await refreshToken()
          await this.banUser()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    async activateUser() {
      if (this.activeId == null || this.activeId == '') {
        this.setNotification("error", "var(--error)", "Пользователь не указан")
        return
      }
      try {
        const data = new FormData()
        data.append('empId',this.activeId)
        const response = await httpResource.post("/director/activateEmp", data, {
          headers: {
            Authorization: "Bearer " + store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.setNotification("success", "success", "Изменения применены")
          const timeout = window.setTimeout(function () {
            location.reload()
          }, 800)
        }
      } catch (error) {
        try {
          await refreshToken()
          await this.activateUser()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
    setBanId(item) {
      this.banDialog = true
      this.banId = item.id
    },
    setActivateId(item) {
      this.activateDialog = true
      this.activeId = item.id
    },
    async getEmployees() {
      try {
        const response = await httpResource.get("/director/getEmps", {
          headers: {
            Authorization: "Bearer " + store.getters.getAccessToken
          }
        });
        if (response.status === 200) {
          this.emps = response.data
        }
      } catch (error) {
        try {
          await refreshToken()
          await this.getEmployees()
        } catch (error) {
          performLogout()
          await router.push("/")
        }
      }
    },
  }
}
</script>


<style scoped>

</style>-