<script setup>
import router from "@/router/index.js";
import {ref} from "vue";
import {tr} from "vuetify/locale";

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
<!--        <v-icon :icon="$vuetify.icons.custom"></v-icon>-->
        <v-app-bar-nav-icon :icon="$vuetify.icons.custom" size="x-large" class="ml-md-15" style="font-size: 4vh" @click="router.push('/')"></v-app-bar-nav-icon>
        <div class="mx-auto d-sm-none d-none d-md-flex">
          <v-btn
            class="text-none"
            @click="router.replace('/admin/organizations')"
            v-if="isAdmin"
          >
            Организации
          </v-btn>
          <v-btn
              class="text-none"
              @click="router.replace('/dir/users')"
              v-if="isDirector"
          >
            Пользователи
          </v-btn>
          <v-btn class="text-none" v-if="!isAdmin" @click="router.replace('/')">
            О нас
          </v-btn>
          <v-btn v-if="!isAdmin" text="Загрузить видео" class="text-none" color="#007631" @click="router.push('/create_report')" variant="flat">
          </v-btn>
          <v-btn
              class="text-none"
              @click="router.replace('/admin/directors')"
              v-if="isAdmin"
          >
            Проверяющие
          </v-btn>
          <v-btn
              class="text-none"
              @click="router.replace('/admin/roads')"
              v-if="isAdmin"
          >
            Точки учета
          </v-btn>
          <v-btn
              class="text-none"
              @click="router.replace('/dir/profile')"
              v-if="isDirector"
          >
            Профиль
          </v-btn>
          <v-btn
              class="text-none"
              @click="router.replace('/profile')"
              v-if="isEmployee || isPhPerson"
          >
            Профиль
          </v-btn>
          <v-btn text="Карта" class="text-none" @click="router.replace('/map')">
          </v-btn>
        </div>
        <v-btn v-if="store.getters.getIsAuthenticated==='false' || store.getters.getIsAuthenticated==='' || store.getters.getIsAuthenticated==null" text="Войти" variant="outlined" color="var(--button-green)" class="text-none mr-md-15 d-sm-none d-none d-md-flex" @click="loginDialog=true"></v-btn>
        <v-btn v-if="store.getters.getIsAuthenticated==='true'" text="Выйти" variant="outlined" color="var(--button-green)" class="text-none mr-md-15 d-sm-none d-none d-md-flex" @click="logoutDialog=true"></v-btn>
        <v-btn text="Загрузить видео" class="text-none mx-auto d-md-none" @click="router.push('/create_report')" color="#007631" variant="flat"></v-btn>
        <div class="mr-md-15 d-md-none ">
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-menu" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list min-width="300" nav>
              <v-list-item link v-if="isAdmin" @click="router.replace('/admin/directors')">
                <v-list-item-title>Проверяющие</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="isAdmin" @click="router.replace('/admin/roads')">
                <v-list-item-title>Точки учета</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="isAdmin" @click="router.replace('/admin/organizations')">
                <v-list-item-title>Организации</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="!isAdmin">
                <v-list-item-title value="" @click="router.push('/')">О нас</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title @click="router.push('/map')">Карта</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="store.getters.getIsAuthenticated==='false' || store.getters.getIsAuthenticated===null" @click="loginDialog=true">
                <v-list-item-title>Войти</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="store.getters.getIsAuthenticated==='true'" @click="logoutDialog=true">
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
  <v-dialog
      v-model="loginDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center" height="100%"
    >
      <div class="w-33 px-15 py-15 flex-column align-center ga-3 justify-center h-100 ma-0 d-none d-md-flex" style="min-height: 60vh;background-color: var(--light-green)">
        <div class="text-h6 text-center">Регистрация</div>
        <div class="text-subtitle-2 text-center">Для создания аккаунта необходимо пройти процедуру регистрации</div>
        <v-btn variant="outlined" class="text-none" color="var(--button-green)" @click="loginDialog=false; registerDialog=true">Зарегистрироваться</v-btn>
      </div>
      <div class="w-sm-100 w-md-66 pa-10 pa-md-15">
        <div class="text-h6 mb-5 text-center">Авторизация</div>
        <div class="text-subtitle-2 text-center">Для входа необходимо ввести почту и пароль</div>
        <v-form @submit.prevent @submit="login()" ref="loginFormRef">
          <v-text-field
              label="Почта"
              type="email"
              v-model="loginForm.email"
              :rules="[v => !!v || 'Поле обязательно']"
          ></v-text-field>

          <v-text-field
              label="Пароль"
              type="password"
              v-model="loginForm.password"
              :rules="[v => !!v || 'Поле обязательно']"
          ></v-text-field>
          <v-btn variant="text" class="text-subtitle-1 pa-0 mb-2">Забыли пароль?</v-btn>
          <v-btn variant="text" class="text-none d-md-none mb-2" color="var(--button-green)" @click="loginDialog=false; registerDialog=true">Нет аккаунта? Зарегистрироваться</v-btn>
          <v-btn
              class="me-4 w-100 text-none"
              color="var(--button-green)"
              style="color: white"
              type="Войти"
          >
            Войти
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="registerDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center ma-0"  height="100%"
    >
      <v-form class="pa-5 pa-md-15" @submit.prevent="register()" ref="registerFormRef">
        <div class="text-h6 text-center">Регистрация</div>
        <v-text-field
            v-model="registerForm.surname"
            label="Фамилия"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
            required
        ></v-text-field>

        <v-text-field
            v-model="registerForm.firstName"
            label="Имя"
            type="text"
            :rules="[v => !!v || 'Поле обязательно']"
        ></v-text-field>

        <v-text-field
            v-model="registerForm.patronymic"
            label="Отчество (необязательно)"
            type="text"
        ></v-text-field>

        <v-text-field
            v-model="registerForm.email"
            label="Почта"
            type="email"
            :rules="[v => !!v || 'Поле обязательно']"
        ></v-text-field>

        <v-text-field
            v-model="registerForm.password"
            label="Пароль"
            type="password"
            :rules="[v => !!v || 'Поле обязательно']"
        ></v-text-field>

        <v-text-field
            label="Подтвердите пароль"
            type="confirm_password"
            v-model="registerForm.confirm_password"
            :rules="[v => !!v || 'Поле обязательно']"
        ></v-text-field>
        <v-btn variant="text" class="text-subtitle-1 pa-0 mb-2" @click="registerDialog=false; loginDialog=true">Уже есть аккаунт? Войти</v-btn>
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
  <v-dialog
      v-model="logoutDialog"
      width="auto"
  >
    <v-card
        class="d-flex flex-row align-center pa-5"  height="100%"
    >
      <v-form>
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h6 text-center">Вы действительно хотите выйти?</div>
          <v-btn
              icon="mdi-close"
              variant="text"
              @click="logoutDialog = false"
          ></v-btn>
        </v-card-title>

        <div class="d-flex mb-5 ml-5 ga-3 align-center">
          <v-btn
              class="text-none"
              color="var(--error)"
              style="color: white"
              @click="logout()"
          >
            Выйти
          </v-btn>
          <v-btn
              class="text-none"
              color="var(--button-green)"
              style="color: white"
              @click="logoutDialog=false"
          >
            Отмена
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

  import router from "@/router/index.js";
  import httpResource from "../http/httpResource";

  import {
    parseApierror,
    performLogout,
  } from "../utils/util";
  import store from "../store/index.js";
  import {ref} from "vue";
  import {ca} from "vuetify/locale";

  const registerFormRef = ref()
  const loginFormRef  = ref()

  export default {
    name: "Header",
    data: () => ({
      loginDialog: false,
      registerDialog: false,
      logoutDialog: false,
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        surname: "",
        firstName: "",
        patronymic: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      displayErrorMessage: false,
      errorMessage: "",
      loginInProcess: false,
      isLogin: false,
      notification: false,
      notificationText: "Успешно",
      notificationType: "success",
      notificationSnack: "success",
      isAdmin: false,
      isDirector: false,
      isPhPerson: false,
      isEmployee: false,
    }),
    mounted() {
      if (this.$store.getters.getIsAuthenticated==='true') {
        this.isLogin = true
        switch (this.$store.getters.getCurrentUser.role) {
          case 'ADMIN':
            this.isAdmin=true
            break;
          case 'DIRECTOR':
            this.isDirector=true
            break;
          case 'EMPLOYEE':
            this.isEmployee=true
            break;
          case 'PHYSICAL_PERSON':
            this.isPhPerson=true
            break;
          default:
            break;
        }
      }
    },
    watch: {
    },
    methods: {
      redirectTo() {
        return router.push({ path: '/map' })
      },
      setNotification(type,snack,text) {
        this.notificationType=type
        this.notificationSnack=snack
        this.notificationText=text
        this.notification=true
      },
      async login() {
        const loginRequest = {
          email: this.loginForm.email,
          password: this.loginForm.password
        };
        if (loginRequest.email==='' || loginRequest.password==='') {
          this.setNotification("error","var(--error)","Заполните все поля")
          return;
        }
        try {
          const response = await httpResource.post("/auth/signin", loginRequest,{
            headers: {

            }
          });
          if (response.status === 200) {
            store.commit("setIsAuthenticated", 'true');
            store.commit("setAccessToken", response.data.accessToken);
            store.commit("setRefreshToken", response.data.refreshToken);
            store.commit("setCurrentUser", response.data.userData);
            this.setNotification("success","success","Успешно")
            location.reload()
          }
        } catch (error) {
          // this.setNotification("error","var(--error)","Произошла ошибка. Проверьте введенные данные")
          const apierror = parseApierror(error);
          if (apierror.message===undefined) {
            if (error.response.data==='Please, check your email and activate account.') {
              this.setNotification("error","var(--error)","Активируйте аккаунт, вам отправлено письмо на почту.")
            }
          } else {
            this.setNotification("error","var(--error)",apierror.message)
          }
        }
      },
      async register() {
        if (this.registerForm.password!==this.registerForm.confirm_password) {
          this.setNotification("error","var(--error)","Пароли не совпадают")
          return;
        }
        // const {valid} = registerFormRef.value.validate()
        const registerRequest = {
          firstName: this.registerForm.firstName,
          surname: this.registerForm.surname,
          patronymic: this.registerForm.patronymic,
          email: this.registerForm.email,
          password: this.registerForm.password,
        };
        if (registerRequest.firstName==="" || registerRequest.surname==="" || registerRequest.email==="" || registerRequest.password==="") {
          this.setNotification("error","var(--error)","Заполните все поля")
          return;
        }
        try {
          const response = await httpResource.post("/auth/signup", registerRequest);
          if (response.status === 200) {
            this.setNotification("success","success","Регистрация прошла успешно, Вам было выслано письмо на почту со ссылкой для подтверждения аккаунта")
            this.registerDialog=false
          }
        } catch (error) {
          const apierror = parseApierror(error);
          this.setNotification("error","var(--error)",apierror.message)
        }
      },
      async logout() {
        performLogout();
        this.logoutDialog=false
        await router.push("/")
        location.reload()
      },
    },
    components() {
      VlsuIcon
    }
  }
</script>

<style scoped>

</style>