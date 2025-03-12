import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createYmaps } from 'vue-yandex-maps';

import App from './App.vue'
import router from './router'
import VlsuIcon from "@/components/icons/VlsuIcon.vue";

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
})

createApp(App)
    .use(vuetify)
    .use(router)
    .use(createYmaps({
        apikey: 'c0628e8f-8c50-4e23-92db-5c2e7e0ebbe0',
    }))
    .mount('#app')
