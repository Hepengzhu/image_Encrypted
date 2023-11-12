import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ()=>import('/src/components/Login.vue')
    },
    {
      path:'/main',
      name:'main',
      component:()=>import('/src/components/Main.vue'),
      redirect:'/main/home',
      children:[
        {
          path:'home',
          name:'home',
          component:()=>import('/src/views/body/Home.vue')
        },
        {
          path:'myshare',
          name:'myshare',
          component:()=>import('/src/views/body/Share.vue')
        },
        {
          path:'my',
          name:'my',
          component:()=>import('/src/views/body/My.vue')
        },
      ]
    }
  ]
})

export default router
