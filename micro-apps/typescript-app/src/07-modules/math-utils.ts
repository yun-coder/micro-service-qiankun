/**
 * TypeScript 模块示例 - 数学工具模块
 * 本文件展示了如何创建和导出模块
 */

// ==================== 导出声明 ====================

// 导出变量
export const PI = 3.14159;

// 导出函数
export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}

// 导出接口
export interface Shape {
  area(): number;
}

// 导出类
export class Circle implements Shape {
  constructor(private radius: number) {}
  
  area(): number {
    return PI * this.radius * this.radius;
  }
}

// ==================== 默认导出 ====================

// 默认导出函数
export default function multiply(x: number, y: number): number {
  return x * y;
}

// ==================== 非导出成员 ====================

// 模块内部使用的辅助函数，不导出
function square(x: number): number {
  return x * x;
}

// 使用辅助函数的导出函数
export function calculateHypotenuse(a: number, b: number): number {
  return Math.sqrt(square(a) + square(b));
}

// ==================== 导出重命名 ====================

function divide(x: number, y: number): number {
  return x / y;
}

// 导出时重命名
export { divide as division };