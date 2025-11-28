import { Card, Typography, Row, Col } from 'antd'
import { Code2, BookOpen, Layers, Zap } from 'lucide-react'

const { Title, Paragraph } = Typography

export default function Home() {
  const features = [
    {
      icon: <Code2 className="text-blue-600" size={40} />,
      title: '基础类型',
      description: '学习 TypeScript 的基本类型系统，包括 string、number、boolean 等',
    },
    {
      icon: <Layers className="text-purple-600" size={40} />,
      title: '高级特性',
      description: '掌握泛型、装饰器、类型守卫等高级 TypeScript 特性',
    },
    {
      icon: <BookOpen className="text-green-600" size={40} />,
      title: '实战示例',
      description: '通过实际代码示例深入理解 TypeScript 的应用场景',
    },
    {
      icon: <Zap className="text-orange-600" size={40} />,
      title: '最佳实践',
      description: '学习 TypeScript 开发中的最佳实践和设计模式',
    },
  ]

  return (
    <div>
      <div className="text-center mb-8">
        <Title level={3}>欢迎来到 TypeScript 学习中心</Title>
        <Paragraph className="text-lg text-gray-600">
          从基础到高级，全面掌握 TypeScript 的类型系统
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} key={index}>
            <Card
              hoverable
              className="h-full transition-all hover:shadow-lg"
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph className="text-gray-600">
                  {feature.description}
                </Paragraph>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <Title level={4}>开始学习</Title>
        <Paragraph>
          点击顶部菜单开始探索 TypeScript 的世界。从基础类型开始，逐步深入到高级特性。
        </Paragraph>
      </Card>
    </div>
  )
}
