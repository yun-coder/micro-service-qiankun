/**
 * TypeScript 类型断言示例
 * 类型断言是一种告诉编译器某个值的确切类型的方式
 */

// ==================== 类型断言的两种形式 ====================

// 1. 尖括号语法
let someValue: any = "这是一个字符串";
let strLength1: number = (<string>someValue).length;
console.log('尖括号语法类型断言:', strLength1);

// 2. as 语法（在JSX中只能使用这种形式）
let strLength2: number = (someValue as string).length;
console.log('as语法类型断言:', strLength2);

// ==================== 类型断言的常见用途 ====================

// 1. 将一个联合类型断言为其中一个类型
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getSmallPet(): Fish | Bird {
  // 假设这个函数返回Fish或Bird
  return {
    swim: () => console.log('游泳'),
    layEggs: () => console.log('下蛋')
  } as Fish;
}

let pet = getSmallPet();
// 只能访问联合类型中共有的成员
pet.layEggs();

// 使用类型断言访问特定类型的成员
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else {
  (pet as Bird).fly();
}

// 2. 将父类断言为更具体的子类
class ApiError extends Error {
  code: number = 0;
}

class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  return (error as ApiError).code !== undefined;
}

const error = new ApiError();
console.log('是否为ApiError:', isApiError(error));

// 3. 将any断言为具体类型
// const canvas = document.getElementById('canvas') as HTMLCanvasElement;
// 等同于
// const canvas = <HTMLCanvasElement>document.getElementById('canvas');

// 4. 将unknown类型断言为具体类型
const maybeString: unknown = "这是一个字符串";
const definitelyString: string = maybeString as string;
console.log('unknown断言为string:', definitelyString);

// 5. 断言为const（TypeScript 3.4+）
// 将字面量断言为const，使其成为只读的字面量类型
const colors = ["red", "green", "blue"] as const;
// 等同于 readonly ["red", "green", "blue"]
// colors.push("yellow"); // 错误：属性"push"不存在于类型"readonly ["red", "green", "blue"]"上

// 6. 非空断言（TypeScript 2.0+）
// 在变量名后添加 ! 表示该变量不会为null或undefined
function liveDangerously(x?: number | null) {
  // 非空断言，告诉编译器x一定不为null或undefined
  console.log(x!.toFixed(2));
}

// 导出模块
export {
  isApiError,
  liveDangerously
};