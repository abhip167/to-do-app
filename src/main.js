import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config';
import "primeflex/primeflex.css"
import "primevue/resources/themes/lara-light-teal/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(PrimeVue);

createApp(App).mount('#app')


