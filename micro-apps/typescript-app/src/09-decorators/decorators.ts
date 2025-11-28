/**
 * TypeScript 装饰器示例
 * 本文件展示了 TypeScript 中装饰器的定义和使用方法
 * 注意：使用装饰器需要在tsconfig.json中启用experimentalDecorators选项
 */

// ==================== 类装饰器 ====================

// 类装饰器 - 应用于类构造函数，可以用来观察、修改或替换类定义
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
  console.log(`类 ${constructor.name} 已被密封`);
}

// 带参数的类装饰器
function classDecorator(value: string) {
  return function (constructor: Function) {
    console.log(`类 ${constructor.name} 被装饰，值为: ${value}`);
  };
}

// 修改类的构造函数的装饰器
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    reportingURL = "http://reporting.example.com";
    
    constructor(...args: any[]) {
      super(...args);
      console.log(`创建了一个新实例，报告URL: ${this.reportingURL}`);
    }
  };
}

// 应用类装饰器
@sealed
@classDecorator("示例值")
@reportableClassDecorator
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  greet() {
    return "Hello, " + this.greeting;
  }
}

// ==================== 方法装饰器 ====================

// 方法装饰器 - 应用于方法的属性描述符，可以用来观察、修改或替换方法定义
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
    console.log(`方法 ${propertyKey} 的可枚举性被设置为 ${value}`);
  };
}

// 日志方法装饰器
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 保存原始方法
  const originalMethod = descriptor.value;
  
  // 替换方法
  descriptor.value = function(...args: any[]) {
    console.log(`调用方法 ${propertyKey} 参数:`, args);
    
    // 调用原始方法
    const result = originalMethod.apply(this, args);
    
    console.log(`方法 ${propertyKey} 返回:`, result);
    return result;
  };
  
  return descriptor;
}

// 应用方法装饰器
class Calculator {
  @enumerable(false)
  @log
  add(a: number, b: number): number {
    return a + b;
  }
  
  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// ==================== 访问器装饰器 ====================

// 访问器装饰器 - 应用于访问器的属性描述符
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
    console.log(`访问器 ${propertyKey} 的可配置性被设置为 ${value}`);
  };
}

class Point {
  private _x: number;
  private _y: number;
  
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
  
  @configurable(false)
  get x() {
    return this._x;
  }
  
  @configurable(false)
  get y() {
    return this._y;
  }
}

// ==================== 属性装饰器 ====================

// 属性装饰器 - 应用于类的属性
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    // 属性值
    let value: any;
    
    // 属性getter
    const getter = function() {
      return value;
    };
    
    // 属性setter
    const setter = function(newVal: any) {
      value = formatString.replace("%s", newVal.toString());
    };
    
    // 替换属性
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
    
    console.log(`属性 ${propertyKey} 被格式化为 ${formatString}`);
  };
}

class Notification {
  @format("NOTICE: %s")
  message: string;
  
  constructor(message: string) {
    this.message = message;
  }
}

// ==================== 参数装饰器 ====================

// 参数装饰器 - 应用于方法的参数
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`方法 ${String(propertyKey)} 的参数 ${parameterIndex} 被标记为必需`);
  
  // 可以在这里存储元数据，需要使用reflect-metadata库
}

// 验证参数装饰器
function validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    // 检查参数是否为空
    for (let i = 0; i < args.length; i++) {
      if (args[i] === undefined || args[i] === null) {
        throw new Error(`参数 ${i} 不能为空`);
      }
    }
    
    return method.apply(this, args);
  };
  
  return descriptor;
}

class UserService {
  @validate
  createUser(@required name: string, @required email: string, age?: number) {
    return { name, email, age };
  }
}

// ==================== 装饰器工厂 ====================

// 装饰器工厂 - 返回装饰器的函数
function timeout(milliseconds: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      console.log(`设置方法 ${propertyKey} 超时为 ${milliseconds}ms`);
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const result = originalMethod.apply(this, args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, milliseconds);
      });
    };
    
    return descriptor;
  };
}

class ApiClient {
  @timeout(1000)
  async fetchData(url: string) {
    console.log(`从 ${url} 获取数据`);
    return { success: true, data: "示例数据" };
  }
}

// ==================== 装饰器组合 ====================

// 多个装饰器可以组合使用
function first() {
  console.log("first(): 工厂求值");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("first(): 装饰器调用");
  };
}

function second() {
  console.log("second(): 工厂求值");
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): 装饰器调用");
  };
}

class ExampleClass {
  // 装饰器组合（从上到下求值，从下到上调用）
  @first()
  @second()
  method() {}
}

// 导出模块
export {
  sealed,
  classDecorator,
  reportableClassDecorator,
  Greeter,
  enumerable,
  log,
  Calculator,
  configurable,
  Point,
  format,
  Notification,
  required,
  validate,
  UserService,
  timeout,
  ApiClient
};