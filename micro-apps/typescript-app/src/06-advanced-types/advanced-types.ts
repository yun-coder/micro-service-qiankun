/**
 * TypeScript 高级类型示例
 * 本文件展示了 TypeScript 中的高级类型和类型操作
 */

// ==================== 交叉类型 ====================

// 交叉类型（Intersection Types）- 将多个类型合并为一个类型
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: number;
  department: string;
}

// 交叉类型：同时具有Person和Employee的所有属性
type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "张三",
  age: 30,
  employeeId: 12345,
  department: "研发部"
};

console.log('交叉类型示例:', employee);

// ==================== 联合类型 ====================

// 联合类型（Union Types）- 可以是几种类型之一
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  if (typeof id === "string") {
    console.log(`ID (string): ${id.toUpperCase()}`);
  } else {
    console.log(`ID (number): ${id.toFixed(0)}`);
  }
}

printId("abc123");
printId(123);

// 可辨识联合（Discriminated Unions）
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

const circle: Circle = { kind: "circle", radius: 5 };
const square: Square = { kind: "square", sideLength: 10 };

console.log('可辨识联合示例:', 
  `圆形面积: ${calculateArea(circle)}`,
  `正方形面积: ${calculateArea(square)}`
);

// ==================== 类型守卫 ====================

// 类型守卫（Type Guards）- 帮助TypeScript在条件块中缩小类型范围

// 1. typeof 类型守卫
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    // 在这个块中，TypeScript知道padding是number类型
    return " ".repeat(padding) + value;
  }
  // 在这个块中，TypeScript知道padding是string类型
  return padding + value;
}

console.log('typeof类型守卫:', padLeft("Hello", 4), padLeft("Hello", "---"));

// 2. instanceof 类型守卫
class Bird {
  fly() {
    console.log("鸟儿飞翔");
  }
  layEggs() {
    console.log("鸟儿下蛋");
  }
}

class Fish {
  swim() {
    console.log("鱼儿游泳");
  }
  layEggs() {
    console.log("鱼儿下蛋");
  }
}

function getRandomPet(): Bird | Fish {
  return Math.random() > 0.5 ? new Bird() : new Fish();
}

const pet = getRandomPet();

if (pet instanceof Bird) {
  // 在这个块中，TypeScript知道pet是Bird类型
  pet.fly();
} else {
  // 在这个块中，TypeScript知道pet是Fish类型
  pet.swim();
}

// 3. 自定义类型守卫
function isFish(pet: Bird | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pet2 = getRandomPet();
if (isFish(pet2)) {
  // 在这个块中，TypeScript知道pet2是Fish类型
  pet2.swim();
} else {
  // 在这个块中，TypeScript知道pet2是Bird类型
  pet2.fly();
}

// ==================== 类型别名 vs 接口 ====================

// 类型别名
type Point = {
  x: number;
  y: number;
};

// 接口
interface Point3D {
  x: number;
  y: number;
  z: number;
}

// 类型别名可以使用联合类型
type ID = number | string;

// 接口可以被类实现
class MyPoint implements Point3D {
  constructor(public x: number, public y: number, public z: number) {}
}

// 接口可以被扩展
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 类型别名也可以扩展其他类型
type Animal2 = {
  name: string;
};

type Dog2 = Animal2 & {
  breed: string;
};

// ==================== 索引类型 ====================

// 索引类型查询操作符 keyof
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// keyof User 等同于 "id" | "name" | "email" | "age"
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 30
};

console.log('索引类型查询:', 
  getProperty(user, "name"),
  getProperty(user, "age")
);

// 索引访问类型 T[K]
type UserKeys = keyof User; // "id" | "name" | "email" | "age"
type UserIdType = User["id"]; // number
type UserNameType = User["name"]; // string

// ==================== 映射类型 ====================

// 映射类型 - 从旧类型创建新类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type ReadonlyUser = Readonly<User>;
// 等同于:
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
// }

type PartialUser = Partial<User>;
// 等同于:
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

// 自定义映射类型
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// 等同于:
// {
//   id: number | null;
//   name: string | null;
//   email: string | null;
//   age: number | null;
// }

// ==================== 条件类型 ====================

// 条件类型 - 根据条件选择类型
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<number>;  // "number"
type T2 = TypeName<boolean>; // "boolean"
type T3 = TypeName<() => void>; // "function"
type T4 = TypeName<{}>; // "object"

// 分布式条件类型
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T5 = Diff<"a" | "b" | "c", "a" | "e">; // "b" | "c"
type T6 = Filter<"a" | "b" | "c", "a" | "e">; // "a"

// ==================== 内置工具类型 ====================

// 1. Partial<T> - 将所有属性设为可选
type PartialPoint = Partial<Point>;
// 等同于: { x?: number; y?: number; }

// 2. Required<T> - 将所有属性设为必需
type RequiredPoint = Required<PartialPoint>;
// 等同于: { x: number; y: number; }

// 3. Readonly<T> - 将所有属性设为只读
type ReadonlyPoint = Readonly<Point>;
// 等同于: { readonly x: number; readonly y: number; }

// 4. Record<K, T> - 创建具有指定键类型K和值类型T的对象类型
type UserRoles = Record<string, boolean>;
// 等同于: { [key: string]: boolean; }

// 5. Pick<T, K> - 从T中选择一组属性K
type NameAndEmail = Pick<User, "name" | "email">;
// 等同于: { name: string; email: string; }

// 6. Omit<T, K> - 从T中排除一组属性K
type UserWithoutId = Omit<User, "id">;
// 等同于: { name: string; email: string; age: number; }

// 7. Exclude<T, U> - 从T中排除可分配给U的类型
type T7 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// 8. Extract<T, U> - 提取T中可分配给U的类型
type T8 = Extract<"a" | "b" | "c", "a" | "b">; // "a" | "b"

// 9. NonNullable<T> - 从T中排除null和undefined
type T9 = NonNullable<string | number | undefined | null>; // string | number

// 10. ReturnType<T> - 获取函数类型的返回类型
type T10 = ReturnType<() => string>; // string
type T11 = ReturnType<(x: number) => void>; // void

// 11. InstanceType<T> - 获取构造函数类型的实例类型
class C {
  x = 0;
  y = 0;
}
type T12 = InstanceType<typeof C>; // C

// 导出模块
export {
  EmployeePerson,
  StringOrNumber,
  printId,
  Shape,
  calculateArea,
  padLeft,
  Bird,
  Fish,
  isFish,
  Point,
  Point3D,
  ID,
  MyPoint,
  Dog,
  Dog2,
  User,
  getProperty,
  Nullable,
  TypeName
};