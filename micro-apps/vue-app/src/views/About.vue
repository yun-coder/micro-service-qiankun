<template>
  <a-card class="shadow-lg">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">关于 Vue 微应用</h2>
    <div class="space-y-4 text-gray-600">
      <p>这是一个基于 Vue 3 + Composition API 构建的微前端应用。</p>
      
      <div class="bg-green-50 p-4 rounded-lg">
        <h3 class="font-semibold text-green-800 mb-2">技术栈：</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>Vue 3 + Composition API</li>
          <li>TypeScript</li>
          <li>Vue Router 4</li>
          <li>Pinia 状态管理</li>
          <li>Ant Design Vue 4</li>
          <li>TailwindCSS</li>
          <li>Vite 5</li>
        </ul>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg">
        <h3 class="font-semibold text-blue-800 mb-2">特性：</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>支持独立运行和微前端模式</li>
          <li>响应式状态管理</li>
          <li>TypeScript 类型安全</li>
          <li>现代化 UI 组件</li>
          <li>热模块替换 (HMR)</li>
        </ul>
      </div>

      <a-alert
        message="微前端架构"
        description="该应用可以独立运行，也可以作为微前端应用被主应用加载。通过 qiankun 框架实现应用间的隔离和通信。"
        type="info"
        show-icon
      />
    </div>
  </a-card>
</template>

<script setup lang="ts">
// About page component
</script>
