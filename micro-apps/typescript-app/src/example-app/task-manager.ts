/**
 * 任务管理器应用
 *
 * 这个示例应用整合了TypeScript的多种知识点，包括：
 * - 基础类型和变量声明
 * - 接口和类型别名
 * - 类和面向对象编程
 * - 泛型
 * - 高级类型
 * - 装饰器
 * - 模块化
 * - 工具类型
 */

// ==================== 类型定义 ====================

// 使用字面量联合类型定义任务优先级
type Priority = 'low' | 'medium' | 'high' | 'critical';

// 使用字面量联合类型定义任务状态
type Status = 'pending' | 'in-progress' | 'completed' | 'cancelled';

// 使用接口定义任务结构
interface Task {
    id: string;
    title: string;
    description?: string; // 可选属性
    priority: Priority;
    status: Status;
    dueDate?: Date;
    createdAt: Date;
    tags: string[];
}

// 使用类型别名和泛型定义响应结构
type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

// ==================== 装饰器 ====================

// 方法装饰器：日志记录
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`[${new Date().toISOString()}] 调用方法: ${propertyKey}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// 类装饰器：版本标记
function version(ver: string) {
    return function (constructor: Function) {
        constructor.prototype.version = ver;
        console.log(`TaskManager 版本: ${ver}`);
    };
}

// 属性装饰器：只读标记
function readonly(target: any, key: string) {
    const privateKey = Symbol(key);

    Object.defineProperty(target, key, {
        get(this: any) {
            return this[privateKey];
        },
        set(this: any, value: any) {
            if (Object.prototype.hasOwnProperty.call(this, privateKey)) {
                throw new Error(`Cannot assign to read only property '${key}'`);
            }
            Object.defineProperty(this, privateKey, {
                value,
                writable: false,
                configurable: false,
                enumerable: false
            });
        },
        enumerable: true,
        configurable: true
    });
}

// ==================== 工具函数 ====================

// 生成唯一ID
function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

// ==================== 任务管理器类 ====================

@version('1.0.0')
class TaskManager {
    @readonly private name: string = 'Task Manager';
    private tasks: Map<string, Task> = new Map();

    // 使用访问器
    private _lastUpdated: Date = new Date();

    get lastUpdated(): Date {
        return this._lastUpdated;
    }

    set lastUpdated(value: Date) {
        this._lastUpdated = value;
    }

    // 使用方法装饰器
    @log
    addTask(taskData: Omit<Task, 'id' | 'createdAt'>): ApiResponse<Task> {
        try {
            const id = generateId();
            const newTask: Task = {
                ...taskData,
                id,
                createdAt: new Date()
            };

            this.tasks.set(id, newTask);
            this.lastUpdated = new Date();

            return {
                success: true,
                data: newTask
            };
        } catch (error) {
            return {
                success: false,
                error: `添加任务失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    @log
    getTask(id: string): ApiResponse<Task> {
        const task = this.tasks.get(id);

        if (!task) {
            return {
                success: false,
                error: `任务ID ${id} 不存在`
            };
        }

        return {
            success: true,
            data: task
        };
    }

    @log
    updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): ApiResponse<Task> {
        try {
            const existingTask = this.tasks.get(id);

            if (!existingTask) {
                return {
                    success: false,
                    error: `任务ID ${id} 不存在`
                };
            }

            const updatedTask: Task = {
                ...existingTask,
                ...updates
            };

            this.tasks.set(id, updatedTask);
            this.lastUpdated = new Date();

            return {
                success: true,
                data: updatedTask
            };
        } catch (error) {
            return {
                success: false,
                error: `更新任务失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    @log
    deleteTask(id: string): ApiResponse<boolean> {
        if (!this.tasks.has(id)) {
            return {
                success: false,
                error: `任务ID ${id} 不存在`
            };
        }

        const deleted = this.tasks.delete(id);
        this.lastUpdated = new Date();

        return {
            success: deleted,
            data: deleted
        };
    }

    @log
    getAllTasks(): ApiResponse<Task[]> {
        return {
            success: true,
            data: Array.from(this.tasks.values())
        };
    }

    // 使用泛型和高级类型进行任务过滤
    @log
    filterTasks<K extends keyof Task>(
        property: K,
        value: Task[K]
    ): ApiResponse<Task[]> {
        try {
            const filteredTasks = Array.from(this.tasks.values())
                .filter(task => task[property] === value);

            return {
                success: true,
                data: filteredTasks
            };
        } catch (error) {
            return {
                success: false,
                error: `过滤任务失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    // 使用函数重载
    // typescript
    // 重载签名（无装饰器）
    searchTasks(term: string): ApiResponse<Task[]>;
    searchTasks(tags: string[]): ApiResponse<Task[]>;

    // 在实现上使用装饰器
    @log
    searchTasks(criteria: string | string[]): ApiResponse<Task[]> {
        try {
            let results: Task[];

            if (typeof criteria === 'string') {
                const searchTerm = criteria.toLowerCase();
                results = Array.from(this.tasks.values()).filter(task =>
                    task.title.toLowerCase().includes(searchTerm) ||
                    (task.description && task.description.toLowerCase().includes(searchTerm))
                );
            } else {
                results = Array.from(this.tasks.values()).filter(task =>
                    criteria.some(tag => task.tags.includes(tag))
                );
            }

            return {
                success: true,
                data: results
            };
        } catch (error) {
            return {
                success: false,
                error: `搜索任务失败: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }


    // 使用元组类型返回统计信息
    @log
    getStatistics(): [number, number, number, number] {
        const tasks = Array.from(this.tasks.values());
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in-progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const cancelled = tasks.filter(t => t.status === 'cancelled').length;

        return [pending, inProgress, completed, cancelled];
    }
}

// ==================== 使用示例 ====================

// 创建任务管理器实例
const taskManager = new TaskManager();

// 添加任务
console.log('添加任务:');
const task1 = taskManager.addTask({
    title: '完成TypeScript学习项目',
    description: '创建一个包含所有TypeScript知识点的项目',
    priority: 'high',
    status: 'in-progress',
    tags: ['typescript', 'learning', 'project']
});
console.log(task1);

const task2 = taskManager.addTask({
    title: '学习装饰器',
    description: '深入理解TypeScript装饰器的使用方法',
    priority: 'medium',
    status: 'pending',
    dueDate: new Date(2023, 11, 31),
    tags: ['typescript', 'decorators']
});
console.log(task2);

// 获取任务
if (task1.success && task1.data) {
    console.log('\n获取任务:');
    const getResult = taskManager.getTask(task1.data.id);
    console.log(getResult);
}

// 更新任务
if (task2.success && task2.data) {
    console.log('\n更新任务:');
    const updateResult = taskManager.updateTask(task2.data.id, {
        status: 'in-progress',
        priority: 'high'
    });
    console.log(updateResult);
}

// 过滤任务
console.log('\n过滤高优先级任务:');
const highPriorityTasks = taskManager.filterTasks('priority', 'high');
console.log(highPriorityTasks);

// 搜索任务
console.log('\n搜索包含"TypeScript"的任务:');
const searchResults = taskManager.searchTasks('typescript');
console.log(searchResults);

console.log('\n按标签搜索任务:');
const tagSearchResults = taskManager.searchTasks(['decorators']);
console.log(tagSearchResults);

// 获取统计信息
console.log('\n任务统计:');
const [pending, inProgress, completed, cancelled] = taskManager.getStatistics();
console.log(`待处理: ${pending}, 进行中: ${inProgress}, 已完成: ${completed}, 已取消: ${cancelled}`);

// 获取所有任务
console.log('\n所有任务:');
const allTasks = taskManager.getAllTasks();
console.log(allTasks);

// 导出模块
export {
    Task,
    Priority,
    Status,
    ApiResponse,
    TaskManager
};