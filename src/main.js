import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Import for Bootstrap 5
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// Import Custom Styles
import './css/app.scss'


createApp(App)
    .use(store)
    .use(router)
    .mount('#app')