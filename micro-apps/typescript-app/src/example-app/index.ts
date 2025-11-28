/**
 * 任务管理器应用入口文件
 * 
 * 本文件演示如何导入和使用任务管理器模块
 */

import { TaskManager } from './task-manager';

console.log('=== TypeScript 任务管理器示例应用 ===');
console.log('这个应用展示了TypeScript的各种特性在实际项目中的应用\n');

// 创建任务管理器实例
const taskManager = new TaskManager();

// 添加几个示例任务
console.log('添加示例任务...');

// 添加开发任务
taskManager.addTask({
  title: '实现用户认证功能',
  description: '创建登录、注册和密码重置功能',
  priority: 'high',
  status: 'in-progress',
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 一周后
  tags: ['前端', '安全', 'API']
});

// 添加学习任务
taskManager.addTask({
  title: '学习React Hooks',
  description: '深入理解useState, useEffect, useContext等钩子函数',
  priority: 'medium',
  status: 'pending',
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 两周后
  tags: ['学习', 'React', '前端']
});

// 添加会议任务
taskManager.addTask({
  title: '团队周会',
  description: '讨论本周进度和下周计划',
  priority: 'critical',
  status: 'pending',
  dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 两天后
  tags: ['会议', '团队']
});

// 添加已完成任务
taskManager.addTask({
  title: '项目环境搭建',
  description: '初始化项目并配置开发环境',
  priority: 'high',
  status: 'completed',
  tags: ['开发环境', '配置']
});

// 获取所有任务并展示
console.log('\n所有任务:');
const allTasks = taskManager.getAllTasks();
if (allTasks.success && allTasks.data) {
  allTasks.data.forEach(task => {
    console.log(`- [${task.status}] ${task.title} (${task.priority})`);
    if (task.description) {
      console.log(`  描述: ${task.description}`);
    }
    if (task.dueDate) {
      console.log(`  截止日期: ${task.dueDate.toLocaleDateString()}`);
    }
    console.log(`  标签: ${task.tags.join(', ')}`);
    console.log('');
  });
}

// 按优先级过滤任务
console.log('\n高优先级任务:');
const highPriorityTasks = taskManager.filterTasks('priority', 'high');
if (highPriorityTasks.success && highPriorityTasks.data) {
  highPriorityTasks.data.forEach(task => {
    console.log(`- ${task.title}`);
  });
}

// 按状态过滤任务
console.log('\n进行中的任务:');
const inProgressTasks = taskManager.filterTasks('status', 'in-progress');
if (inProgressTasks.success && inProgressTasks.data) {
  inProgressTasks.data.forEach(task => {
    console.log(`- ${task.title}`);
  });
}

// 搜索任务
console.log('\n搜索包含"前端"标签的任务:');
const frontendTasks = taskManager.searchTasks(['前端']);
if (frontendTasks.success && frontendTasks.data) {
  frontendTasks.data.forEach(task => {
    console.log(`- ${task.title}`);
  });
}

// 显示任务统计
console.log('\n任务统计:');
const [pending, inProgress, completed, cancelled] = taskManager.getStatistics();
console.log(`待处理: ${pending}, 进行中: ${inProgress}, 已完成: ${completed}, 已取消: ${cancelled}`);

console.log('\n=== 示例应用运行完毕 ===');