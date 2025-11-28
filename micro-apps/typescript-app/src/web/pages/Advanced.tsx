import { Card, Typography, Collapse, Tag } from 'antd'
import { Layers } from 'lucide-react'

const { Title, Paragraph } = Typography
const { Panel } = Collapse

export default function Advanced() {
  const topics = [
    {
      title: '泛型 (Generics)',
      tag: 'Generic',
      color: 'blue',
      content: `泛型允许你创建可重用的组件，这些组件可以支持多种类型。`,
      example: `function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");`,
    },
    {
      title: '类型守卫 (Type Guards)',
      tag: 'Guard',
      color: 'green',
      content: `类型守卫是一些表达式，它们在运行时检查以确保在某个作用域里的类型。`,
      example: `function isString(value: any): value is string {
  return typeof value === 'string';
}`,
    },
    {
      title: '装饰器 (Decorators)',
      tag: 'Decorator',
      color: 'purple',
      content: `装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。`,
      example: `function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
}`,
    },
    {
      title: '实用工具类型 (Utility Types)',
      tag: 'Utility',
      color: 'orange',
      content: `TypeScript 提供了许多实用工具类型来帮助进行常见的类型转换。`,
      example: `// Partial<T> - 将所有属性变为可选
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;

// Pick<T, K> - 选择特定属性
type UserName = Pick<User, 'name'>;`,
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <Title level={3} className="flex items-center gap-2">
          <Layers size={28} className="text-purple-600" />
          TypeScript 高级特性
        </Title>
        <Paragraph className="text-gray-600">
          深入学习 TypeScript 的高级功能，提升代码质量和开发效率
        </Paragraph>
      </div>

      <Collapse accordion className="mb-6">
        {topics.map((topic, index) => (
          <Panel
            header={
              <div className="flex items-center gap-3">
                <Tag color={topic.color}>{topic.tag}</Tag>
                <span className="font-semibold">{topic.title}</span>
              </div>
            }
            key={index}
          >
            <Paragraph>{topic.content}</Paragraph>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mt-3">
              <code className="text-sm">{topic.example}</code>
            </pre>
          </Panel>
        ))}
      </Collapse>

      <Card className="bg-purple-50">
        <Title level={4}>🚀 进阶学习</Title>
        <Paragraph>
          这些高级特性是 TypeScript 的核心优势。掌握它们可以让你编写更加类型安全、可维护的代码。
          建议结合实际项目进行练习，加深理解。
        </Paragraph>
      </Card>
    </div>
  )
}
