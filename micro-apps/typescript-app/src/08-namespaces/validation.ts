/**
 * TypeScript 命名空间示例
 * 本文件展示了如何定义和使用命名空间
 */

// ==================== 基本命名空间 ====================

// 定义一个命名空间
namespace Validation {
  // 命名空间内的接口
  export interface StringValidator {
    isValid(s: string): boolean;
  }
  
  // 命名空间内的常量
  export const numberRegexp = /^[0-9]+$/;
  
  // 命名空间内的类
  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
  
  // 命名空间内部使用的辅助函数（不导出）
  function checkLength(s: string): boolean {
    return s.length === 5;
  }
  
  // 命名空间内的另一个类（导出）
  export class PhoneNumberValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.length === 10 && numberRegexp.test(s);
    }
  }
}

// 使用命名空间中的成员
let zipValidator = new Validation.ZipCodeValidator();
let phoneValidator = new Validation.PhoneNumberValidator();

console.log('邮编验证 "12345":', zipValidator.isValid("12345"));
console.log('邮编验证 "1234":', zipValidator.isValid("1234"));
console.log('电话验证 "1234567890":', phoneValidator.isValid("1234567890"));

// ==================== 嵌套命名空间 ====================

namespace App {
  // 嵌套命名空间
  export namespace Utils {
    export function formatDate(date: Date): string {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    
    export function formatCurrency(amount: number): string {
      return `¥${amount.toFixed(2)}`;
    }
  }
  
  // 主命名空间中的函数
  export function getCurrentDate(): Date {
    return new Date();
  }
}

// 使用嵌套命名空间
console.log('当前日期:', App.Utils.formatDate(App.getCurrentDate()));
console.log('格式化金额:', App.Utils.formatCurrency(1234.56));

// ==================== 命名空间别名 ====================

// 为命名空间创建别名
import DateUtils = App.Utils;

console.log('使用命名空间别名:', DateUtils.formatDate(new Date()));

// ==================== 拆分命名空间 ====================

// 命名空间可以跨多个文件拆分
// 这里我们在同一个文件中演示，实际使用时通常在不同文件中

// 扩展已有的命名空间
namespace Validation {
  // 添加新的验证器
  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      const emailRegexp = /^[^@]+@[^@]+\.[^@]+$/;
      return emailRegexp.test(s);
    }
  }
}

// 使用扩展后的命名空间
let emailValidator = new Validation.EmailValidator();
console.log('邮箱验证 "test@example.com":', emailValidator.isValid("test@example.com"));
console.log('邮箱验证 "invalid-email":', emailValidator.isValid("invalid-email"));

// ==================== 命名空间与模块的结合 ====================

// 导出命名空间，使其可以被其他模块导入
export { Validation, App };