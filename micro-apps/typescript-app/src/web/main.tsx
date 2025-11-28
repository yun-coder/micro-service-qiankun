import './index.css'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { render } from './render'

renderWithQiankun({
  mount(props) {
    console.log('[TypeScript微应用] 挂载', props)
    render(props)
  },
  bootstrap() {
    console.log('[TypeScript微应用] 启动')
  },
  unmount(props: any) {
    console.log('[TypeScript微应用] 卸载', props)
    const { container } = props
    const root = container ? container.querySelector('#typescript-app-root') : document.getElementById('typescript-app-root')
    if (root) {
      // React 18 unmount
      const reactRoot = (root as any)._reactRoot
      if (reactRoot) {
        reactRoot.unmount()
      }
    }
  },
  update(props: any) {
    console.log('[TypeScript微应用] 更新', props)
  },
})

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
