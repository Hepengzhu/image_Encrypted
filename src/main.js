import './assets/main.css'

import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { VueCookies } from 'vue-cookies'
import App from './App.vue'
import router from './router'
import cookies from 'vue-cookies' //引入cookie

// 引入字体图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App,{
  onMounted() {
    console.log("应用程序加载完成");
  }
  })
// element 字体图表注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(cookies)

app.mount('#app')


// 关闭网页时清除菜单状态
