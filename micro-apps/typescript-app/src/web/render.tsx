import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

export function render(props: any = {}) {
  const { container, routerBase } = props
  const root = container ? container.querySelector('#typescript-app-root') : document.getElementById('typescript-app-root')
  
  if (root) {
    const reactRoot = ReactDOM.createRoot(root)
    ;(root as any)._reactRoot = reactRoot
    
    reactRoot.render(
      <React.StrictMode>
        <BrowserRouter basename={routerBase || '/typescript'}>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  }
}
