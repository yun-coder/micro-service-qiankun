import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

let root: ReactDOM.Root | null = null

export function render(props: any = {}) {
  const { container, routerBase } = props
  const containerElement = container
    ? container.querySelector('#react-app-root')
    : document.getElementById('react-app-root')

  if (!containerElement) {
    console.error('容器元素未找到')
    return
  }

  // 保存 root 实例以便卸载
  if (!root) {
    root = ReactDOM.createRoot(containerElement)
    ;(containerElement as any)._reactRoot = root
  }

  root.render(
    <React.StrictMode>
      <BrowserRouter basename={routerBase || '/react'}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
