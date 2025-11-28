# Qiankun 微前端项目

这是一个基于 qiankun 框架的现代化微前端架构项目，使用最新的技术栈构建。

## 🚀 技术栈

### 主应用 (Main App)
- **React 18** - 最新的 React 版本
- **TypeScript** - 类型安全
- **Vite 5** - 极速构建工具
- **React Router v6** - 路由管理
- **Ant Design 5** - UI 组件库
- **TailwindCSS** - 实用优先的 CSS 框架
- **Qiankun 2.10** - 微前端框架

### React 微应用
- **React 18** + **TypeScript**
- **Vite 5** + **vite-plugin-qiankun**
- **React Router v6**
- **Ant Design 5**
- **TailwindCSS**
- **Lucide Icons**

### Vue 微应用
- **Vue 3** + **Composition API**
- **TypeScript**
- **Vite 5** + **vite-plugin-qiankun**
- **Vue Router 4**
- **Pinia** - 状态管理
- **Ant Design Vue 4**
- **TailwindCSS**

## 📦 项目结构

```
qiankun-project/
├── main-app/                 # 主应用（容器应用）
│   ├── src/
│   │   ├── components/       # 组件
│   │   ├── config/          # 配置文件
│   │   ├── App.tsx          # 主应用入口
│   │   └── main.tsx         # 应用启动文件
│   ├── package.json
│   └── vite.config.ts
├── micro-apps/              # 微应用目录
│   ├── react-app/          # React 微应用
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── render.tsx  # qiankun 渲染逻辑
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── vue-app/            # Vue 微应用
│       ├── src/
│       │   ├── views/      # 页面
│       │   ├── stores/     # Pinia 状态管理
│       │   ├── App.vue
│       │   └── main.ts
│       ├── package.json
│       └── vite.config.ts
├── package.json            # 根 package.json
└── README.md
```

## 🛠️ 安装

### 前置要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装所有应用的依赖
npm run install:all

# 或者分别安装
npm run install:main    # 安装主应用依赖
npm run install:react   # 安装 React 微应用依赖
npm run install:vue     # 安装 Vue 微应用依赖
```

## 🚀 启动项目

### 同时启动所有应用（推荐）

```bash
npm run dev
```

这将同时启动：
- 主应用：http://localhost:8080
- React 微应用：http://localhost:8081
- Vue 微应用：http://localhost:8082

### 分别启动

```bash
# 启动主应用
npm run dev:main

# 启动 React 微应用
npm run dev:react

# 启动 Vue 微应用
npm run dev:vue
```

## 📝 构建

```bash
# 构建所有应用
npm run build

# 分别构建
npm run build:main
npm run build:react
npm run build:vue
```

## 🎯 功能特性

### 微前端特性
- ✅ **应用隔离** - JavaScript 沙箱和样式隔离
- ✅ **独立部署** - 每个微应用可以独立开发和部署
- ✅ **技术栈无关** - 支持 React、Vue 等不同框架
- ✅ **应用通信** - 通过 qiankun 提供的通信机制
- ✅ **预加载** - 支持微应用预加载，提升用户体验
- ✅ **生命周期** - 完整的应用生命周期管理

### 开发特性
- ✅ **TypeScript** - 全面的类型支持
- ✅ **热更新** - Vite HMR 极速开发体验
- ✅ **现代化 UI** - Ant Design 组件库
- ✅ **响应式设计** - TailwindCSS 实用工具类
- ✅ **路由管理** - React Router / Vue Router
- ✅ **状态管理** - Pinia (Vue)

## 🔧 配置说明

### 主应用配置

主应用在 `main-app/src/config/microApps.ts` 中配置微应用：

```typescript
export const microApps: MicroApp[] = [
  {
    name: 'react-app',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/react',
  },
  {
    name: 'vue-app',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/vue',
  },
]
```

### 微应用配置

每个微应用都使用 `vite-plugin-qiankun` 插件来支持 qiankun 集成。

## 📖 使用指南

### 访问应用

1. 启动所有应用后，访问 http://localhost:8080
2. 点击导航菜单切换不同的微应用：
   - **首页** - 主应用首页
   - **React 应用** - React 微应用
   - **Vue 应用** - Vue 微应用

### 独立运行微应用

每个微应用都支持独立运行：

```bash
# React 微应用
cd micro-apps/react-app
npm run dev
# 访问 http://localhost:8081

# Vue 微应用
cd micro-apps/vue-app
npm run dev
# 访问 http://localhost:8082
```

## 🎨 自定义开发

### 添加新的微应用

1. 在 `micro-apps/` 目录下创建新的应用
2. 配置 `vite-plugin-qiankun` 插件
3. 在主应用的 `microApps.ts` 中注册新应用
4. 在主应用的菜单中添加导航项

### 修改端口

在各应用的 `vite.config.ts` 中修改 `server.port` 配置。

## 🐛 常见问题

### 1. 微应用加载失败

确保所有应用都已启动，检查端口是否被占用。

### 2. 样式冲突

qiankun 已配置样式隔离，如遇问题可调整 `experimentalStyleIsolation` 配置。

### 3. 路由不匹配

检查主应用中的 `activeRule` 配置是否与微应用的 `routerBase` 一致。

## 📚 参考资料

- [Qiankun 官方文档](https://qiankun.umijs.org/)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
- [Vue 3 文档](https://vuejs.org/)
- [Ant Design](https://ant.design/)
- [TailwindCSS](https://tailwindcss.com/)

## 📄 License

MIT

## 👥 贡献

欢迎提交 Issue 和 Pull Request！
