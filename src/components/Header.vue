<script setup>
import {useRoute,useRouter} from "vue-router";
import router from "@/router/index.js";
import VlsuIcon from "@/components/icons/VlsuIcon.vue";
</script>

<template>
<!--        <v-icon :icon="$vuetify.icons.custom"></v-icon>-->
        <v-app-bar-nav-icon :icon="$vuetify.icons.custom" size="x-large" class="ml-md-15" style="font-size: 4vh" @click="router.push('/')"></v-app-bar-nav-icon>
        <div class="mx-auto d-sm-none d-none d-md-flex">
          <v-btn class="text-none" @click="router.replace('/')">
            О нас
          </v-btn>
          <v-btn text="Загрузить видео" class="text-none" color="#007631" @click="router.push('/create_report')" variant="flat">
          </v-btn>
          <v-btn text="Карта" class="text-none" @click="router.replace('/map')">
          </v-btn>
        </div>
        <v-btn text="Войти" variant="outlined" color="var(--button-green)" class="text-none mr-md-15 d-sm-none d-none d-md-flex" @click="loginDialog=true"></v-btn>
        <v-btn text="Загрузить видео" class="text-none mx-auto d-md-none" @click="router.push('/create_report')" color="#007631" variant="flat"></v-btn>
        <div class="mr-md-15 d-md-none">
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-menu" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list min-width="300" nav>
              <v-list-item link>
                <v-list-item-title value="" @click="router.push('/')">О нас</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title @click="router.push('/map')">Карта</v-list-item-title>
              </v-list-item>
              <v-list-item link v-if="!isLogin">
                <v-list-item-title>Войти</v-list-item-title>
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
      <div class="w-33 px-15 py-15 d-flex flex-column align-center ga-3 justify-center h-100 ma-0" style="min-height: 60vh;background-color: var(--light-green)">
        <div class="text-h6 text-center">Регистрация</div>
        <div class="text-subtitle-2 text-center">Для создания аккаунта необходимо пройти процедуру регистрации</div>
        <v-btn variant="outlined" class="text-none" color="var(--button-green)" @click="loginDialog=false; registerDialog=true">Зарегистрироваться</v-btn>
      </div>
      <div class="w-66 px-15 py-15">
        <div class="text-h6 mb-5 text-center">Авторизация</div>
        <div class="text-subtitle-2 text-center">Для входа необходимо ввести почту и пароль</div>
        <form @submit.prevent @submit="login()">
          <v-text-field
              label="Почта"
              type="email"
              v-model="loginForm.email"
          ></v-text-field>

          <v-text-field
              label="Пароль"
              type="password"
              v-model="loginForm.password"
          ></v-text-field>
          <v-btn variant="text" class="text-subtitle-1 pa-0 mb-2">Забыли пароль?</v-btn>
          <v-btn
              class="me-4 w-100 text-none"
              color="var(--button-green)"
              style="color: white"
              type="Войти"
          >
            Войти
          </v-btn>
        </form>
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
      <form class="pa-15" @submit.prevent>
        <div class="text-h6 text-center">Регистрация</div>
        <v-text-field
            v-model="loginForm.email"
            label="Почта"
            type="email"
        ></v-text-field>

        <v-text-field
            v-model="loginForm.password"
            label="Пароль"
            type="password"
        ></v-text-field>

        <v-text-field
            label="Подтвердите пароль"
            type="confirm_password"
        ></v-text-field>
        <v-btn variant="text" class="text-subtitle-1 pa-0 mb-2" @click="registerDialog=false; loginDialog=true">Уже есть аккаунт? Войти</v-btn>
        <v-btn
            class="me-4 w-100 text-none"
            color="var(--button-green)"
            style="color: white"
            type="Войти"
            @submit="login()"
        >
          Зарегистрироваться
        </v-btn>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>

  import router from "@/router/index.js";
  import httpResource from "../http/httpResource";

  import {
    parseApierror,
    performLogout,
    getAuthenticatedUser
  } from "../utils/util";
  import store from "../store/index.js";
  import {tr} from "vuetify/locale";
  export default {
    name: "Header",
    data: () => ({
      loginDialog: false,
      registerDialog: false,
      loginForm: {
        email: "",
        password: ""
      },
      displayErrorMessage: false,
      errorMessage: "",
      loginInProcess: false,
      isLogin: false,
    }),
    mounted() {
      console.log(this.$store.getters)
      if (this.$store.getters.isAuthenticated) {
        this.isLogin = true
      }
    },
    watch: {
    },
    methods: {
      redirectTo(e) {
        console.log(this)
        return router.push({ path: '/map' })
      },
      async login() {
        this.loginInProcess = true;
        let canNavigate = false;
        const loginRequest = {
          email: this.loginForm.email,
          password: this.loginForm.password
        };
        try {
          const response = await httpResource.post("/auth/signin", loginRequest); 
          if (response.status === 200) {
            store.commit("setAccessToken", response.data.accessToken);
            store.commit("setRefreshToken", response.data.refreshToken);
            store.commit("setCurrentUser", response.data.userData);
            store.commit("isAuthenticated", true);
            console.log(this.$store.getters)
            // await getAuthenticatedUser();
          }
        } catch (error) {
          performLogout();
          const apierror = parseApierror(error);
          this.displayErrorMessage = true;
          this.errorMessage = apierror.message;
        }
        this.loginInProcess = false;

        if (canNavigate) {
          // await router.replace("/");
        }
      }
    },
    components() {
      VlsuIcon
    }
  }
</script>

<style scoped>

</style>