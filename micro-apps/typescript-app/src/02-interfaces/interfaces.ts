/**
 * TypeScript 接口示例
 * 接口是TypeScript的一个核心概念，用于定义对象的形状
 */

// ==================== 基本接口 ====================

// 定义一个简单的接口
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

// 使用接口作为类型
function greet(person: Person): string {
  return `Hello, ${person.firstName} ${person.lastName}`;
}

const john: Person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

console.log('基本接口示例:', greet(john));

// ==================== 可选属性 ====================

interface Configuration {
  color?: string;       // 可选属性
  width?: number;       // 可选属性
  height: number;       // 必需属性
}

function createBox(config: Configuration): { color: string; area: number } {
  // 使用默认值处理可选属性
  const color = config.color || "red";
  const width = config.width || 100;
  const area = width * config.height;
  
  return { color, area };
}

const box = createBox({ height: 50 });
console.log('可选属性示例:', box);

// ==================== 只读属性 ====================

interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // 错误：无法分配到"x"，因为它是只读属性

// 只读数组
const numbers: ReadonlyArray<number> = [1, 2, 3, 4];
// numbers.push(5); // 错误：类型"readonly number[]"上不存在属性"push"

console.log('只读属性示例:', point, numbers);

// ==================== 函数类型接口 ====================

// 定义函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 实现函数类型接口
const mySearch: SearchFunc = function(src: string, sub: string): boolean {
  return src.search(sub) > -1;
};

console.log('函数类型接口:', mySearch("Hello TypeScript", "Type"));

// ==================== 可索引类型 ====================

// 字符串索引签名
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred"];
console.log('可索引类型示例:', myArray[0]);

// 同时使用字符串和数字索引
interface Dictionary {
  [index: string]: number;
  length: number;      // 可以，length是number类型
  // name: string;     // 错误，类型"string"的属性"name"不能赋给字符串索引类型"number"
}

// ==================== 类类型接口 ====================

// 接口描述类的公共部分
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// 类实现接口
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  
  constructor(h: number, m: number) {
    this.setTime(new Date());
    this.currentTime.setHours(h);
    this.currentTime.setMinutes(m);
  }
  
  setTime(d: Date): void {
    this.currentTime = d;
  }
}

const clock = new Clock(12, 30);
console.log('类实现接口:', clock.currentTime);

// ==================== 接口继承 ====================

// 接口可以继承其他接口
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const square: Square = {
  color: "blue",
  sideLength: 10
};

// 接口可以继承多个接口
interface PenStroke {
  penWidth: number;
}

interface ColoredSquare extends Shape, PenStroke {
  sideLength: number;
}

const coloredSquare: ColoredSquare = {
  color: "red",
  sideLength: 10,
  penWidth: 5.0
};

console.log('接口继承示例:', square, coloredSquare);

// ==================== 混合类型 ====================

// 一个对象可以同时作为函数和对象使用，并带有额外的属性
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  const counter = function(start: number): string {
    return `Counter started at ${start}`;
  } as Counter;
  
  counter.interval = 123;
  counter.reset = function() {
    console.log('Counter reset');
  };
  
  return counter;
}

const counter = getCounter();
console.log(counter(10));
console.log('Counter interval:', counter.interval);
counter.reset();

// 导出模块
export {
  Person,
  Configuration,
  Point,
  SearchFunc,
  StringArray,
  Dictionary,
  ClockInterface,
  Clock,
  Shape,
  Square,
  Counter
};