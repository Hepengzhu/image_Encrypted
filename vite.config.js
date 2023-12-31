import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const  {createProxyMiddleware}  = require('http-proxy-middleware')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
  	https: false,
    proxy: {
      '/api': { // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
        target: 'http://10.38.141.147:5050/', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
        ws: true,  // 允许websocket代理
		  // 重写路径 --> 作用与vue配置pathRewrite作用相同
        rewrite: (path) => path.replace(/^\/api/, "")
      }
     },
  },

//   css: {
//     preprocessorOptions: {
//         additionalData: '@import "@/assets/scss/globalVar.scss";@import "@/assets/scss/globalMixin.scss";'
//     }
// }

})
