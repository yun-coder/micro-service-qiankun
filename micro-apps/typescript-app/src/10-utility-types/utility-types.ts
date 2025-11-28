/**
 * TypeScript 实用工具类型示例
 * 本文件展示了 TypeScript 内置的工具类型及其用法
 */

// ==================== 基础接口 ====================

// 定义一个基础接口用于演示
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  address: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
}

// ==================== Partial<T> ====================

// Partial<T> - 将类型的所有属性设为可选
type PartialUser = Partial<User>;

// 使用示例
function updateUser(userId: number, updates: Partial<User>) {
  console.log(`更新用户 ${userId} 的信息:`, updates);
  // 在实际应用中，这里会更新数据库
}

// 只更新部分字段
updateUser(1, { name: "张三", email: "zhangsan@example.com" });

// ==================== Required<T> ====================

// Required<T> - 将类型的所有属性设为必需
type RequiredUser = Required<PartialUser>;

// 使用示例
function createUser(user: RequiredUser) {
  console.log("创建完整用户:", user);
  // 在实际应用中，这里会插入数据库
}

// ==================== Readonly<T> ====================

// Readonly<T> - 将类型的所有属性设为只读
type ReadonlyUser = Readonly<User>;

// 使用示例
const user: ReadonlyUser = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 30,
  address: "北京市",
  role: "admin",
  createdAt: new Date()
};

// 以下操作会报错，因为属性是只读的
// user.name = "李四";

// ==================== Record<K, T> ====================

// Record<K, T> - 构造一个类型，其属性名的类型为K，属性值的类型为T
type UserRoles = Record<string, User[]>;

// 使用示例
const usersByRole: UserRoles = {
  admin: [
    { id: 1, name: "管理员1", email: "admin1@example.com", age: 35, address: "北京", role: "admin", createdAt: new Date() }
  ],
  user: [
    { id: 2, name: "用户1", email: "user1@example.com", age: 28, address: "上海", role: "user", createdAt: new Date() },
    { id: 3, name: "用户2", email: "user2@example.com", age: 32, address: "广州", role: "user", createdAt: new Date() }
  ],
  guest: [
    { id: 4, name: "访客1", email: "guest1@example.com", age: 25, address: "深圳", role: "guest", createdAt: new Date() }
  ]
};

// ==================== Pick<T, K> ====================

// Pick<T, K> - 从类型T中选择属性K
type UserBasicInfo = Pick<User, "id" | "name" | "email">;

// 使用示例
function displayUserBasicInfo(user: UserBasicInfo) {
  console.log(`用户基本信息: ID=${user.id}, 姓名=${user.name}, 邮箱=${user.email}`);
}

displayUserBasicInfo({ id: 1, name: "张三", email: "zhangsan@example.com" });

// ==================== Omit<T, K> ====================

// Omit<T, K> - 从类型T中排除属性K
type UserWithoutSensitiveInfo = Omit<User, "id" | "email" | "createdAt">;

// 使用示例
function displayPublicUserInfo(user: UserWithoutSensitiveInfo) {
  console.log(`用户公开信息: 姓名=${user.name}, 年龄=${user.age}, 地址=${user.address}, 角色=${user.role}`);
}

// ==================== Exclude<T, U> ====================

// Exclude<T, U> - 从类型T中排除可以赋值给类型U的类型
type AdminOrUser = Exclude<User["role"], "guest">;

// 使用示例
function hasHigherPrivileges(role: AdminOrUser) {
  console.log(`角色 ${role} 具有较高权限`);
  return true;
}

// ==================== Extract<T, U> ====================

// Extract<T, U> - 从类型T中提取可以赋值给类型U的类型
type GuestRole = Extract<User["role"], "guest">;

// 使用示例
function hasLimitedAccess(role: GuestRole) {
  console.log(`角色 ${role} 具有有限访问权限`);
  return true;
}

// ==================== NonNullable<T> ====================

// NonNullable<T> - 从类型T中排除null和undefined
type UserName = NonNullable<string | null | undefined>;

// 使用示例
function greetUser(name: UserName) {
  console.log(`你好, ${name}!`);
}

// ==================== ReturnType<T> ====================

// ReturnType<T> - 获取函数类型的返回类型
function getUserInfo(id: number): User {
  return {
    id,
    name: "张三",
    email: "zhangsan@example.com",
    age: 30,
    address: "北京市",
    role: "user",
    createdAt: new Date()
  };
}

type UserInfoReturnType = ReturnType<typeof getUserInfo>;

// 使用示例
function processUserInfo(user: UserInfoReturnType) {
  console.log(`处理用户信息: ${user.name}`);
}

// ==================== Parameters<T> ====================

// Parameters<T> - 获取函数类型的参数类型
type UserInfoParams = Parameters<typeof getUserInfo>;

// 使用示例
function callGetUserInfo(...args: UserInfoParams) {
  return getUserInfo(...args);
}

// ==================== InstanceType<T> ====================

// InstanceType<T> - 获取构造函数类型的实例类型
class UserManager {
  private users: User[] = [];
  
  addUser(user: User) {
    this.users.push(user);
  }
  
  getUsers() {
    return this.users;
  }
}

type UserManagerInstance = InstanceType<typeof UserManager>;

// 使用示例
function createUserManager(): UserManagerInstance {
  return new UserManager();
}

// ==================== ThisType<T> ====================

// ThisType<T> - 用于指定上下文类型
interface UserHandlers {
  getFullName(): string;
  updateEmail(newEmail: string): void;
}

interface UserWithHandlers {
  name: string;
  email: string;
  handlers: UserHandlers & ThisType<UserWithHandlers>;
}

const userWithHandlers: UserWithHandlers = {
  name: "张三",
  email: "zhangsan@example.com",
  handlers: {
    getFullName() {
      return this.name; // 'this' 指向 UserWithHandlers
    },
    updateEmail(newEmail: string) {
      this.email = newEmail; // 'this' 指向 UserWithHandlers
    }
  }
};

// ==================== 自定义工具类型 ====================

// 自定义工具类型 - 可选属性
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 使用示例
type UserWithOptionalAge = Optional<User, "age" | "address">;

// 自定义工具类型 - 深度部分
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 使用示例
interface NestedObject {
  a: {
    b: {
      c: string;
      d: number;
    };
    e: boolean;
  };
  f: string;
}

type DeepPartialNested = DeepPartial<NestedObject>;

// 导出模块
export {
  User,
  PartialUser,
  RequiredUser,
  ReadonlyUser,
  UserRoles,
  UserBasicInfo,
  UserWithoutSensitiveInfo,
  AdminOrUser,
  GuestRole,
  UserName,
  UserInfoReturnType,
  UserInfoParams,
  UserManagerInstance,
  UserWithHandlers,
  Optional,
  DeepPartial
};