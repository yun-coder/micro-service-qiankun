/**
 * TypeScript 变量声明示例
 * 本文件展示了 TypeScript 中的变量声明方式和作用域规则
 */

// ==================== var声明 ====================

// var声明的变量可以在包含它的函数、模块、命名空间或全局作用域内部任何位置被访问
function varScoping() {
    var x = 10;
    if (true) {
        var x = 20; // 同一个变量!
        console.log('var内部块:', x); // 输出 20
    }
    console.log('var外部块:', x); // 输出 20，而不是 10
}

varScoping();

// ==================== let声明 ====================

// let声明的变量拥有块作用域
function letScoping() {
    let x = 10;
    if (true) {
        let x = 20; // 不同的变量
        console.log('let内部块:', x); // 输出 20
    }
    console.log('let外部块:', x); // 输出 10
}

letScoping();

// let的暂时性死区
function temporalDeadZone() {
    // console.log(y); // 错误: 在声明之前使用变量"y"
    let y = 10;
    console.log('let声明后:', y);
}

temporalDeadZone();

// ==================== const声明 ====================

// const声明是不可重新赋值的变量
function constExample() {
    const PI = 3.14159;
    // PI = 3.14; // 错误: 不能给常量赋值

    // 但是如果const变量是对象，其属性可以修改
    const person = {
        name: "John",
        age: 30
    };
    person.age = 31; // 可以修改属性
    // person = { name: "Jane", age: 25 }; // 错误: 不能重新赋值

    console.log('const对象修改后:', person);
}

constExample();

// ==================== 解构赋值 ====================

// 数组解构
function arrayDestructuring() {
    const array = [1, 2, 3, 4];
    const [first, second, ...rest] = array;
    console.log('数组解构:', first, second, rest); // 1, 2, [3, 4]

    // 忽略某些元素
    const [a, , c] = array;
    console.log('忽略元素:', a, c); // 1, 3

    // 交换变量
    let x = 10;
    let y = 20;
    [x, y] = [y, x];
    console.log('交换变量:', x, y); // 20, 10
}

arrayDestructuring();

// 对象解构
function objectDestructuring() {
    const person = {
        name: "John",
        age: 30,
        location: {
            city: "New York",
            country: "USA"
        }
    };

    // 基本解构
    const {name, age} = person;
    console.log('对象解构:', name, age); // John, 30

    // 重命名
    const {name: fullName, age: years} = person;
    console.log('重命名属性:', fullName, years); // John, 30

    // 默认值
    // @ts-ignore
    const {job = "Developer"} = person;
    console.log('默认值:', job); // Developer

    // 嵌套解构
    const {location: {city, country}} = person;
    console.log('嵌套解构:', city, country); // New York, USA
}

objectDestructuring();

// ==================== 展开运算符 ====================

function spreadOperator() {
    // 数组展开
    const first = [1, 2];
    const second = [3, 4];
    const combined = [...first, ...second];
    console.log('数组展开:', combined); // [1, 2, 3, 4]

    // 对象展开
    const defaults = {mode: "dark", fontSize: 16};
    const userSettings = {fontSize: 18};
    const finalSettings = {...defaults, ...userSettings};
    console.log('对象展开:', finalSettings); // { mode: "dark", fontSize: 18 }
}

spreadOperator();

// 导出模块
export {
    varScoping,
    letScoping,
    constExample,
    arrayDestructuring,
    objectDestructuring,
    spreadOperator
};