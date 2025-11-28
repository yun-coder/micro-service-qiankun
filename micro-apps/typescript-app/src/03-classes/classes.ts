/**
 * TypeScript 类示例
 * 本文件展示了 TypeScript 中类的定义和使用方法
 */

// ==================== 基本类 ====================

// 定义一个基本的类
class Animal {
  // 属性
  name: string;
  
  // 构造函数
  constructor(name: string) {
    this.name = name;
  }
  
  // 方法
  move(distance: number = 0): void {
    console.log(`${this.name} 移动了 ${distance} 米`);
  }
}

// 创建类的实例
const cat = new Animal("猫");
cat.move(10);

// ==================== 继承 ====================

// 子类继承父类
class Dog extends Animal {
  // 子类可以有自己的属性
  breed: string;
  
  // 子类构造函数
  constructor(name: string, breed: string) {
    // 调用父类构造函数
    super(name);
    this.breed = breed;
  }
  
  // 重写父类方法
  move(distance: number = 5): void {
    console.log(`${this.name} 是一只 ${this.breed}，`);
    // 调用父类方法
    super.move(distance);
  }
  
  // 子类自己的方法
  bark(): void {
    console.log('汪汪!');
  }
}

const dog = new Dog("小黄", "金毛");
dog.move();
dog.bark();

// ==================== 访问修饰符 ====================

class Person {
  // public 修饰符（默认）- 可以在任何地方访问
  public name: string;
  
  // private 修饰符 - 只能在类内部访问
  private age: number;
  
  // protected 修饰符 - 可以在类内部和子类中访问
  protected address: string;
  
  // readonly 修饰符 - 只读属性，必须在声明或构造函数中初始化
  readonly birthDate: Date;
  
  constructor(name: string, age: number, address: string, birthDate: Date) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.birthDate = birthDate;
  }
  
  // 获取私有属性的方法
  getAge(): number {
    return this.age;
  }
  
  // 设置私有属性的方法
  setAge(age: number): void {
    if (age > 0 && age < 120) {
      this.age = age;
    } else {
      throw new Error("年龄必须在1-120之间");
    }
  }
}

// 参数属性 - 在构造函数参数中使用访问修饰符
class Employee {
  // 简写形式，自动创建并初始化同名属性
  constructor(
    public name: string,
    private salary: number,
    protected department: string,
    readonly employeeId: number
  ) {}
  
  getSalary(): number {
    return this.salary;
  }
}

const employee = new Employee("张三", 10000, "研发部", 1001);
console.log(`员工: ${employee.name}, ID: ${employee.employeeId}`);
// console.log(employee.salary); // 错误：属性"salary"为私有属性，只能在类"Employee"中访问

// ==================== 存取器 ====================

class Account {
  private _balance: number = 0;
  
  // getter - 获取属性值
  get balance(): number {
    console.log("获取余额");
    return this._balance;
  }
  
  // setter - 设置属性值
  set balance(amount: number) {
    console.log("设置余额");
    if (amount >= 0) {
      this._balance = amount;
    } else {
      throw new Error("余额不能为负数");
    }
  }
  
  deposit(amount: number): void {
    this.balance += amount;
  }
  
  withdraw(amount: number): void {
    this.balance -= amount;
  }
}

const account = new Account();
account.balance = 1000;
account.deposit(500);
console.log(`账户余额: ${account.balance}`);

// ==================== 静态属性和方法 ====================

class MathHelper {
  // 静态属性 - 属于类本身，而不是实例
  static PI: number = 3.14159;
  
  // 静态方法 - 可以直接通过类名调用
  static calculateCircleArea(radius: number): number {
    return MathHelper.PI * radius * radius;
  }
  
  // 实例方法 - 需要通过实例调用
  calculateCircumference(radius: number): number {
    return 2 * MathHelper.PI * radius;
  }
}

console.log(`圆周率: ${MathHelper.PI}`);
console.log(`半径为5的圆面积: ${MathHelper.calculateCircleArea(5)}`);

const mathHelper = new MathHelper();
console.log(`半径为5的圆周长: ${mathHelper.calculateCircumference(5)}`);

// ==================== 抽象类 ====================

// 抽象类 - 不能被直接实例化，只能被继承
abstract class Shape {
  // 抽象属性 - 子类必须实现
  abstract color: string;
  
  // 普通属性
  name: string;
  
  protected constructor(name: string) {
    this.name = name;
  }
  
  // 抽象方法 - 子类必须实现
  abstract calculateArea(): number;
  
  // 普通方法
  display(): void {
    console.log(`这是一个${this.name}，颜色是${this.color}`);
  }
}

// 实现抽象类
class Circle extends Shape {
  // 实现抽象属性
  color: string;
  
  // 自己的属性
  radius: number;
  
  constructor(color: string, radius: number) {
    super("圆形");
    this.color = color;
    this.radius = radius;
  }
  
  // 实现抽象方法
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle("红色", 5);
circle.display();
console.log(`面积: ${circle.calculateArea()}`);

// ==================== 类实现接口 ====================

// 定义接口
interface Printable {
  print(): void;
}

interface Loggable {
  log(message: string): void;
}

// 类实现多个接口
class Printer implements Printable, Loggable {
  print(): void {
    console.log("打印文档");
  }
  
  log(message: string): void {
    console.log(`日志: ${message}`);
  }
}

const printer = new Printer();
printer.print();
printer.log("文档已打印");

// 导出模块
export {
  Animal,
  Dog,
  Person,
  Employee,
  Account,
  MathHelper,
  Shape,
  Circle,
  Printable,
  Loggable,
  Printer
};