import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import {createApp, inject} from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createYmaps } from 'vue-yandex-maps';
import * as Vuex from 'vuex';

import store from "./store";

import App from './App.vue'
import router from './router'
import VlsuIcon from "@/components/icons/VlsuIcon.vue";
import VueCookies from 'vue3-cookies'
import { globalCookiesConfig } from "vue3-cookies";
import {ru} from "vuetify/locale";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        // values: {
        //     custom: { // name of our custom icon
        //         component: VlsuIcon, // our custom component
        //     },
        // },
        custom: VlsuIcon,
        sets: {
            mdi,
        },
    },
    locale: {
        locale: 'Ru-ru',
        fallback: 'ru',
        messages: { ru },
    },
})

globalCookiesConfig({
    expireTimes: "30d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

createApp(App)
    .use(vuetify)
    .use(router)
    .use(store)
    .use(VueCookies, { expires: '7d',   path: "/",
        domain: "",
        secure: true,
        sameSite: "None",})
    .use(Vuex)
    .use(createYmaps({
        apikey: 'c0628e8f-8c50-4e23-92db-5c2e7e0ebbe0',
    }))
    .mount('#app')