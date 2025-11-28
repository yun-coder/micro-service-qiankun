<template>
  <div class="space-y-6">
    <a-card class="bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg">
      <div class="text-center">
        <h3 class="text-xl font-semibold mb-4">计数器示例</h3>
        <div class="text-5xl font-bold mb-4">{{ count }}</div>
        <a-space>
          <a-button size="large" @click="increment">增加</a-button>
          <a-button size="large" @click="decrement">减少</a-button>
          <a-button size="large" @click="reset">重置</a-button>
        </a-space>
      </div>
    </a-card>

    <h2 class="text-2xl font-bold text-gray-800">仪表盘</h2>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总订单数"
            :value="8520"
            :prefix="h(ShoppingCartOutlined)"
            :value-style="{ color: '#3f8600' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="待处理"
            :value="320"
            :prefix="h(ClockCircleOutlined)"
            :value-style="{ color: '#1890ff' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="已完成"
            :value="8200"
            :prefix="h(CheckCircleOutlined)"
            :value-style="{ color: '#52c41a' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="成功率"
            :value="96.2"
            suffix="%"
            :precision="1"
            :value-style="{ color: '#722ed1' }"
          />
        </a-card>
      </a-col>
    </a-row>

    <a-card title="最近活动" class="shadow-md">
      <a-list :data-source="activities" item-layout="horizontal">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.time">
              <template #title>
                <span>{{ item.title }}</span>
              </template>
              <template #avatar>
                <a-avatar :style="{ backgroundColor: item.color }">
                  {{ item.icon }}
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { 
  ShoppingCartOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons-vue'
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
const count = ref(counterStore.count)

const increment = () => {
  counterStore.increment()
  count.value = counterStore.count
}

const decrement = () => {
  counterStore.decrement()
  count.value = counterStore.count
}

const reset = () => {
  counterStore.reset()
  count.value = counterStore.count
}

const activities = [
  { title: '新订单创建', time: '2 分钟前', icon: '📦', color: '#1890ff' },
  { title: '用户注册', time: '15 分钟前', icon: '👤', color: '#52c41a' },
  { title: '订单已发货', time: '1 小时前', icon: '🚚', color: '#722ed1' },
  { title: '支付成功', time: '2 小时前', icon: '💰', color: '#faad14' },
  { title: '评价提交', time: '3 小时前', icon: '⭐', color: '#eb2f96' },
]
</script>
