import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

// 导入所需图标 START
import { faThLarge,faUser } from '@fortawesome/free-solid-svg-icons'
library.add({faThLarge, faUser})
// 导入所需图标 END

const app = createApp(App)

// const app = createApp({ /* 根组件 */ })

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 将 store 实例作为插件安装
app.use(store)
app.use(router)
app.mount('#app')
