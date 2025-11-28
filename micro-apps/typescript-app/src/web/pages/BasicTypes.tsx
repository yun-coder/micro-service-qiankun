import { Card, Typography, Divider, Tag } from 'antd'
import { Code2 } from 'lucide-react'

const { Title, Paragraph, Text } = Typography

export default function BasicTypes() {
  const types = [
    { name: 'string', example: 'let name: string = "TypeScript"', color: 'blue' },
    { name: 'number', example: 'let age: number = 25', color: 'green' },
    { name: 'boolean', example: 'let isActive: boolean = true', color: 'purple' },
    { name: 'array', example: 'let list: number[] = [1, 2, 3]', color: 'orange' },
    { name: 'tuple', example: 'let tuple: [string, number] = ["hello", 10]', color: 'red' },
    { name: 'enum', example: 'enum Color {Red, Green, Blue}', color: 'cyan' },
    { name: 'any', example: 'let notSure: any = 4', color: 'magenta' },
    { name: 'void', example: 'function log(): void { console.log("hi") }', color: 'geekblue' },
  ]

  return (
    <div>
      <div className="mb-6">
        <Title level={3} className="flex items-center gap-2">
          <Code2 size={28} className="text-blue-600" />
          TypeScript 基础类型
        </Title>
        <Paragraph className="text-gray-600">
          TypeScript 提供了丰富的类型系统，帮助你在编译时捕获错误
        </Paragraph>
      </div>

      <div className="space-y-4">
        {types.map((type, index) => (
          <Card key={index} hoverable className="transition-all hover:shadow-md">
            <div className="flex items-start gap-4">
              <Tag color={type.color} className="text-lg px-3 py-1">
                {type.name}
              </Tag>
              <div className="flex-1">
                <pre className="bg-gray-50 p-3 rounded-lg overflow-x-auto">
                  <code className="text-sm">{type.example}</code>
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Divider />

      <Card className="bg-blue-50">
        <Title level={4}>💡 提示</Title>
        <Paragraph>
          使用明确的类型注解可以让你的代码更加健壮和易于维护。TypeScript 的类型检查会在编译时帮你发现潜在的错误。
        </Paragraph>
      </Card>
    </div>
  )
}
