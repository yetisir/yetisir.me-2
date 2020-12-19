import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Button from 'primevue/card'

import 'swiper/swiper-bundle.min.css'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/md-dark-indigo/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue)
app.component('Card', Card)
app.component('Button', Button)

app.mount('#app')
