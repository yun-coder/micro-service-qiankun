/**
 * TypeScript 函数示例
 * 本文件展示了 TypeScript 中函数的定义和使用方法
 */

// ==================== 函数类型 ====================

// 命名函数
function add(x: number, y: number): number {
    return x + y;
}

// 匿名函数
const subtract = function (x: number, y: number): number {
    return x - y;
};

// 箭头函数
const multiply = (x: number, y: number): number => x * y;

console.log('基本函数示例:', add(10, 5), subtract(10, 5), multiply(10, 5));

// ==================== 函数类型表达式 ====================

// 定义函数类型
type MathFunction = (x: number, y: number) => number;

// 使用函数类型
const divide: MathFunction = (x, y) => {
    if (y === 0) {
        throw new Error("除数不能为零");
    }
    return x / y;
};

console.log('函数类型表达式:', divide(10, 2));

// ==================== 可选参数和默认参数 ====================

// 可选参数（使用?标记）
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return `${firstName} ${lastName}`;
    } else {
        return firstName;
    }
}

// 默认参数
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

console.log('可选参数:', buildName("John"));
console.log('使用全部参数:', buildName("John", "Doe"));
console.log('默认参数:', greet("Alice"));
console.log('覆盖默认参数:', greet("Bob", "Hi"));

// ==================== 剩余参数 ====================

// 剩余参数（使用...标记）
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log('剩余参数:', sum(1, 2, 3, 4, 5));

// ==================== 函数重载 ====================

// 函数重载签名
function reverse(string: string): string;
function reverse(array: any[]): any[];

// 函数实现
function reverse(stringOrArray: string | any[]): string | any[] {
    if (typeof stringOrArray === "string") {
        return stringOrArray.split("").reverse().join("");
    } else {
        return [...stringOrArray].reverse();
    }
}

console.log('函数重载 - 字符串:', reverse("hello"));
console.log('函数重载 - 数组:', reverse([1, 2, 3, 4, 5]));

// ==================== this参数 ====================

// 在TypeScript中，可以显式指定this的类型
interface User {
    id: number;
    name: string;
    email: string;
}

interface UserRepository {
    users: User[];

    findById(this: UserRepository, id: number): User | undefined;

    save(this: UserRepository, user: User): void;
}

const userRepository: UserRepository = {
    users: [
        {id: 1, name: "Alice", email: "alice@example.com"},
        {id: 2, name: "Bob", email: "bob@example.com"}
    ],

    findById(this: UserRepository, id: number): User | undefined {
        return this.users.find(user => user.id === id);
    },

    save(this: UserRepository, user: User): void {
        const existingUserIndex = this.users.findIndex(u => u.id === user.id);
        if (existingUserIndex >= 0) {
            this.users[existingUserIndex] = user;
        } else {
            this.users.push(user);
        }
    }
};

console.log('this参数 - 查找用户:', userRepository.findById(1));

// ==================== 回调函数 ====================

// 定义回调函数类型
type CallbackFunction = (error: Error | null, result?: any) => void;

// 使用回调函数的异步操作
function fetchData(url: string, callback: CallbackFunction): void {
    // 模拟异步请求
    setTimeout(() => {
        if (url.startsWith("https")) {
            callback(null, {data: "这是请求的数据"});
        } else {
            callback(new Error("无效的URL"));
        }
    }, 100);
}

// 使用回调函数
fetchData("https://example.com/api", (error, result) => {
    if (error) {
        console.error("发生错误:", error.message);
    } else {
        console.log("获取的数据:", result);
    }
});

// ==================== 函数中的泛型 ====================

// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 调用泛型函数
const output1 = identity<string>("myString");
const output2 = identity(42); // 类型推断为 number

console.log('泛型函数:', output1, output2);

// ==================== 高阶函数 ====================

// 返回函数的函数
function createMultiplier(factor: number): (x: number) => number {
    return function (x: number): number {
        return x * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('高阶函数:', double(5), triple(5));

// ==================== 函数组合 ====================

// 函数组合
function compose<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
    return functions.reduce(
        (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
        (value) => value
    );
}

// function composeFunc<T>(...functions: Array<(arg: T) => T>): (arg: T) => T {
//     return functions.reduce(
//         (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
//         (value) => value
//     );
// }

// 示例函数
const addOne = (x: number): number => x + 1;
const multiplyByTwo = (x: number): number => x * 2;
const subtractThree = (x: number): number => x - 3;

// 组合函数
const calculate = compose(addOne, multiplyByTwo, subtractThree);

console.log('函数组合:', calculate(5)); // ((5 + 1) * 2) - 3 = 9

// 导出模块
export {
    add,
    subtract,
    multiply,
    divide,
    buildName,
    greet,
    sum,
    reverse,
    UserRepository,
    CallbackFunction,
    fetchData,
    identity,
    createMultiplier,
    compose
};