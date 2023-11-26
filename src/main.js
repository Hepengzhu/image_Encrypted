import './assets/main.css'
import axios from 'axios'
import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'
import { VueCookies } from 'vue-cookies'
import App from './App.vue'
import router from './router'
import cookies from 'vue-cookies' //引入cookie
axios.defaults.withCredentials = false;

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

router.beforeEach((to,from,next)=>{
  // console.log(cookies.get('username'));
  // if(cookies.get('username') && cookies.get('password')) {next()}
  // else {
  //   next('/')
  // }
  next()
})

// 关闭网页时清除菜单状态
