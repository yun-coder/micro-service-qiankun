import './style.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'

let app: VueApp<Element> | null = null

function render(props: any = {}) {
  const { container, routerBase } = props
  const history = createWebHistory(routerBase || '/vue')
  
  const router = createRouter({
    history,
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About },
    ],
  })

  const pinia = createPinia()

  app = createApp(App)
  app.use(router)
  app.use(pinia)
  app.use(Antd)

  const containerElement = container
    ? container.querySelector('#vue-app-root')
    : document.getElementById('vue-app-root')

  app.mount(containerElement || '#vue-app-root')
}

renderWithQiankun({
  mount(props) {
    console.log('[Vue微应用] 挂载', props)
    render(props)
  },
  bootstrap() {
    console.log('[Vue微应用] 启动')
  },
  unmount() {
    console.log('[Vue微应用] 卸载')
    app?.unmount()
    app = null
  },
  update(props) {
    console.log('[Vue微应用] 更新', props)
  },
})

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
