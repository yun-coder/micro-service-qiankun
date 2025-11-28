import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Card, Button, Space, Statistic, Row, Col } from 'antd'
import { Home, BarChart3, Users, Settings } from 'lucide-react'

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">仪表盘</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<Users className="inline mr-2" size={20} />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={9320}
              prefix={<BarChart3 className="inline mr-2" size={20} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="新增用户"
              value={1960}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="转化率"
              value={82.5}
              suffix="%"
              precision={1}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

function About() {
  return (
    <Card className="shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">关于 React 微应用</h2>
      <div className="space-y-4 text-gray-600">
        <p>这是一个基于 React 18 构建的微前端应用。</p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">技术栈：</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>React 18 + TypeScript</li>
            <li>React Router v6</li>
            <li>Ant Design 5</li>
            <li>TailwindCSS</li>
            <li>Vite 5</li>
            <li>Lucide Icons</li>
          </ul>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">特性：</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>支持独立运行和微前端模式</li>
            <li>热模块替换 (HMR)</li>
            <li>TypeScript 类型安全</li>
            <li>现代化 UI 组件</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Home className="text-blue-600" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">React 微应用</h1>
            </div>
            <Space>
              <Link to="/">
                <Button type="primary" icon={<Home size={16} />}>
                  首页
                </Button>
              </Link>
              <Link to="/about">
                <Button icon={<Settings size={16} />}>关于</Button>
              </Link>
            </Space>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">计数器示例</h3>
              <div className="text-5xl font-bold mb-4">{count}</div>
              <Space>
                <Button size="large" onClick={() => setCount(count + 1)}>
                  增加
                </Button>
                <Button size="large" onClick={() => setCount(count - 1)}>
                  减少
                </Button>
                <Button size="large" onClick={() => setCount(0)}>
                  重置
                </Button>
              </Space>
            </div>
          </Card>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
