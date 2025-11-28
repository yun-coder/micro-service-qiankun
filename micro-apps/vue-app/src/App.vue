<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <HomeOutlined class="text-green-600 text-3xl" />
            <h1 class="text-3xl font-bold text-gray-800">Vue 微应用</h1>
          </div>
          <a-space>
            <router-link to="/">
              <a-button type="primary">
                <template #icon><HomeOutlined /></template>
                首页
              </a-button>
            </router-link>
            <router-link to="/about">
              <a-button>
                <template #icon><InfoCircleOutlined /></template>
                关于
              </a-button>
            </router-link>
          </a-space>
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
</script>
