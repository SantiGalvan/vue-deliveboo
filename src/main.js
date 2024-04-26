import 'bootstrap/dist/css/bootstrap.min.css'


import { createApp } from 'vue'
//Importo il router
import { router } from './router'
import App from './App.vue'

// Importiamo la libreria generica di FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'

// Importiamo il componente di FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Importiamo le icone da utilizzare
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

// Icone da caricare
library.add(faArrowLeft);
library.add(faCompass);
library.add(faFacebook);

const app = createApp(App)
// Rendo le icone disponibili globalmente
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.use(router)

app.mount('#app')
