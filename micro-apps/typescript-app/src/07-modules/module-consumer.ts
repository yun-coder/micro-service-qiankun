/**
 * TypeScript 模块示例 - 模块消费者
 * 本文件展示了如何导入和使用模块
 */

// ==================== 导入声明 ====================

// 导入特定导出
import { PI, add, Circle } from './math-utils';

console.log('PI值:', PI);
console.log('加法结果:', add(5, 3));

const circle = new Circle(5);
console.log('圆形面积:', circle.area());

// ==================== 导入默认导出 ====================

// 导入默认导出
import multiply from './math-utils';

console.log('乘法结果:', multiply(4, 6));

// ==================== 导入重命名 ====================

// 导入时重命名
import { subtract as minus } from './math-utils';

console.log('减法结果:', minus(10, 4));

// ==================== 导入所有内容 ====================

// 导入模块中的所有内容
import * as MathUtils from './math-utils';

console.log('除法结果:', MathUtils.division(20, 4));
console.log('勾股定理计算:', MathUtils.calculateHypotenuse(3, 4));

// ==================== 动态导入 ====================

// 动态导入（ES2020）
async function loadMathModule() {
  // 动态导入返回一个Promise
  const mathModule = await import('./math-utils');
  console.log('动态导入PI值:', mathModule.PI);
  return mathModule;
}

// 调用动态导入函数
loadMathModule().then(module => {
  console.log('动态导入加法结果:', module.add(7, 8));
});