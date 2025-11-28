export interface MicroApp {
  name: string
  entry: string
  container: string
  activeRule: string
  props?: Record<string, any>
}

export const microApps: MicroApp[] = [
  {
    name: 'react-app',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/react',
    props: {
      routerBase: '/react',
    },
  },
  {
    name: 'vue-app',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/vue',
    props: {
      routerBase: '/vue',
    },
  },
  {
    name: 'typescript-app',
    entry: '//localhost:8083',
    container: '#subapp-container',
    activeRule: '/typescript',
    props: {
      routerBase: '/typescript',
    },
  },
]

export const menuItems = [
  {
    key: '/',
    label: '首页',
    path: '/',
  },
  {
    key: '/react',
    label: 'React 应用',
    path: '/react',
  },
  {
    key: '/vue',
    label: 'Vue 应用',
    path: '/vue',
  },
  {
    key: '/typescript',
    label: 'TypeScript 应用',
    path: '/typescript',
  },
]
