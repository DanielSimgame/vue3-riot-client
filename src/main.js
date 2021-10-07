import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

// 导入所需图标 START
import { faThLarge,faUser } from '@fortawesome/free-solid-svg-icons'
library.add({faThLarge, faUser})
// 导入所需图标 END

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
