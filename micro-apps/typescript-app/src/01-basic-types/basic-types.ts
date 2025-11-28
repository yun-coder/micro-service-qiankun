/**
 * TypeScript 基础类型示例
 * 本文件展示了 TypeScript 中的所有基本数据类型及其用法
 */

// ==================== 基本类型 ====================

// 布尔值 (Boolean)
const isCompleted: boolean = false;
console.log('布尔值示例:', isCompleted);

// 数字 (Number) - 支持十进制、十六进制、二进制和八进制
const decimal: number = 10;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
console.log('数字类型示例:', decimal, hex, binary, octal);

// 字符串 (String) - 支持单引号、双引号和模板字符串
const firstName: string = 'John';
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`;
console.log('字符串示例:', fullName);

// 数组 (Array) - 两种声明方式
const list1: number[] = [1, 2, 3];
const list2: Array<number> = [1, 2, 3];
console.log('数组示例:', list1, list2);

// 元组 (Tuple) - 表示一个已知元素数量和类型的数组
const tuple: [string, number] = ['hello', 10];
console.log('元组示例:', tuple[0].substring(1), tuple[1].toFixed(2));

// 枚举 (Enum) - 为一组数值赋予友好的名字
enum Color {
  Red,      // 0
  Green,    // 1
  Blue      // 2
}
const color: Color = Color.Green;
console.log('枚举示例:', color, Color[color]); // 输出: 1 "Green"

// 自定义枚举起始值
enum Status {
  Active = 1,
  Inactive = 2,
  Pending = 4,
  Deleted = 8
}
console.log('自定义枚举值:', Status.Active, Status.Deleted);

// Any - 在编译时可选择地包含或移除类型检查
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
console.log('Any类型示例:', notSure);

// Void - 表示没有任何类型，通常用于函数返回值
function warnUser(): void {
  console.log("This is a warning message");
}
warnUser();

// Null 和 Undefined - 它们是所有其他类型的子类型
let u: undefined = undefined;
let n: null = null;
console.log('Null和Undefined:', u, n);

// Never - 表示永不存在的值的类型
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // 无限循环，永不返回
  }
}

// Object - 表示非原始类型
const obj: object = { key: 'value' };
console.log('对象示例:', obj);

// ==================== 类型断言 ====================

// 类型断言 - 告诉编译器你比它更了解这个类型
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
console.log('类型断言示例:', strLength1, strLength2);

// ==================== 字面量类型 ====================

// 字符串字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";
let animationEasing: Easing = "ease-in";
// animationEasing = "linear"; // 错误：不能将类型"linear"分配给类型"Easing"

// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let diceResult: DiceRoll = 6;
// diceResult = 7; // 错误：不能将类型"7"分配给类型"DiceRoll"

console.log('字面量类型示例:', animationEasing, diceResult);

// ==================== 类型别名 ====================

// 类型别名 - 为类型创建新名称
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

console.log('类型别名示例:', getName("John"), getName(() => "John"));

// 导出模块，使其可以被其他文件导入
export {
  Color,
  Status,
  Easing,
  DiceRoll,
  getName
};