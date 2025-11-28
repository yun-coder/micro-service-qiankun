import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { microApps } from './config/microApps'

function App() {
  useEffect(() => {
    // 注册微应用
    registerMicroApps(microApps, {
      beforeLoad: [
        app => {
          console.log('[主应用] 开始加载微应用:', app.name)
          return Promise.resolve()
        },
      ],
      beforeMount: [
        app => {
          console.log('[主应用] 微应用挂载前:', app.name)
          return Promise.resolve()
        },
      ],
      afterMount: [
        app => {
          console.log('[主应用] 微应用挂载完成:', app.name)
          return Promise.resolve()
        },
      ],
      afterUnmount: [
        app => {
          console.log('[主应用] 微应用卸载完成:', app.name)
          return Promise.resolve()
        },
      ],
    })

    // 启动 qiankun
    start({
      prefetch: true, // 预加载
      sandbox: {
        strictStyleIsolation: false, // 样式隔离
        experimentalStyleIsolation: true, // 实验性样式隔离
      },
      singular: false, // 是否为单实例场景
    })
  }, [])

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
