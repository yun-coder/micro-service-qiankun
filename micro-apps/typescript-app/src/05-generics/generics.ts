/**
 * TypeScript 泛型示例
 * 本文件展示了 TypeScript 中泛型的定义和使用方法
 */

// ==================== 基本泛型 ====================

// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用泛型函数
const output1 = identity<string>("Hello TypeScript");
const output2 = identity(42); // 类型推断为 number

console.log('基本泛型函数:', output1, output2);

// ==================== 泛型接口 ====================

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// 实现泛型接口
const myIdentity: GenericIdentityFn<number> = identity;
console.log('泛型接口:', myIdentity(100));

// 泛型接口描述对象结构
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

// 使用泛型接口
const pair1: KeyValuePair<string, number> = { key: "age", value: 25 };
const pair2: KeyValuePair<number, boolean> = { key: 1, value: true };

console.log('泛型接口描述对象:', pair1, pair2);

// ==================== 泛型类 ====================

// 泛型类
class GenericBox<T> {
  private content: T;
  
  constructor(value: T) {
    this.content = value;
  }
  
  getContent(): T {
    return this.content;
  }
  
  setContent(value: T): void {
    this.content = value;
  }
}

// 使用泛型类
const stringBox = new GenericBox<string>("Hello World");
const numberBox = new GenericBox(123); // 类型推断为 GenericBox<number>

console.log('泛型类:', stringBox.getContent(), numberBox.getContent());

// ==================== 泛型约束 ====================

// 使用接口定义约束
interface Lengthwise {
  length: number;
}

// 泛型函数使用约束
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(`输入参数的长度: ${arg.length}`);
  return arg;
}

// 使用泛型约束
loggingIdentity("测试字符串");
loggingIdentity([1, 2, 3]);
loggingIdentity({ length: 10, value: 3 });
// loggingIdentity(3); // 错误：类型"number"不满足约束"Lengthwise" 数字类型没有length属性

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "张三", age: 30, address: "北京" };
console.log('泛型约束获取属性:', getProperty(person, "name"), getProperty(person, "age"));
// console.log(getProperty(person, "job")); // 错误：类型""job""的参数不能赋给类型"keyof { name: string; age: number; address: string; }"的参数

// ==================== 泛型默认类型 ====================

// 泛型默认类型
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

// 使用默认泛型类型
const response1: ApiResponse = {
  data: { name: "产品1", price: 100 },
  status: 200,
  message: "成功"
};

// 指定泛型类型
interface Product {
  id: number;
  name: string;
  price: number;
}

const response2: ApiResponse<Product[]> = {
  data: [
    { id: 1, name: "产品1", price: 100 },
    { id: 2, name: "产品2", price: 200 }
  ],
  status: 200,
  message: "成功"
};

console.log('泛型默认类型:', response1, response2);

// ==================== 泛型工具类型 ====================

// 条件类型
type IsArray<T> = T extends any[] ? true : false;

type CheckString = IsArray<string>; // false
type CheckArray = IsArray<number[]>; // true

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyPerson = Readonly<{ name: string; age: number }>;
// 等同于: { readonly name: string; readonly age: number; }

// 索引访问类型
type Person = { name: string; age: number; address: string };
type Age = Person["age"]; // number

// 联合类型分发
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// ==================== 高级泛型模式 ====================

// 工厂模式
interface Constructor<T> {
  new(...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

class Point {
  constructor(public x: number, public y: number) {}
}

const point = createInstance(Point, 10, 20);
console.log('泛型工厂模式:', point);

// 混入模式
function mixin<T extends Constructor<{}>, U>(baseClass: T, mixinClass: Constructor<U>): Constructor<InstanceType<T> & U> {
  return class extends baseClass {
    constructor(...args: any[]) {
      super(...args);
      Object.assign(this, new mixinClass());
    }
  } as any;
}

class Timestamped {
  timestamp = Date.now();
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = mixin(User, Timestamped);
const user = new TimestampedUser("张三");
console.log('泛型混入模式:', user.name, user.timestamp);

// 递归类型
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const json: JSONValue = {
  name: "TypeScript",
  version: 4.5,
  features: ["泛型", "类型推断", "接口"],
  active: true,
  metadata: {
    releaseDate: "2021-11-17",
    stable: true
  }
};

console.log('递归泛型类型:', json);

// 导出模块
export {
  identity,
  GenericIdentityFn,
  KeyValuePair,
  GenericBox,
  Lengthwise,
  loggingIdentity,
  getProperty,
  ApiResponse,
  IsArray,
  Readonly,
  Constructor,
  createInstance,
  mixin,
  JSONValue
};