import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Card, Menu, Typography, Tabs } from 'antd'
import { Code2, BookOpen, Layers } from 'lucide-react'
import Home from './pages/Home'
import BasicTypes from './pages/BasicTypes'
import Advanced from './pages/Advanced'

const { Title } = Typography

function App() {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <BookOpen size={18} />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/basic',
      icon: <Code2 size={18} />,
      label: <Link to="/basic">基础类型</Link>,
    },
    {
      key: '/advanced',
      icon: <Layers size={18} />,
      label: <Link to="/advanced">高级特性</Link>,
    },
  ]

  const getCurrentKey = () => {
    if (location.pathname === '/basic') return '/basic'
    if (location.pathname === '/advanced') return '/advanced'
    return '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <Card className="max-w-7xl mx-auto shadow-lg">
        <div className="mb-6">
          <Title level={2} className="flex items-center gap-3 !mb-2">
            <Code2 className="text-blue-600" size={32} />
            TypeScript 学习中心
          </Title>
          <p className="text-gray-600">探索 TypeScript 的强大类型系统</p>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          items={menuItems}
          className="mb-6"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basic" element={<BasicTypes />} />
          <Route path="/advanced" element={<Advanced />} />
        </Routes>
      </Card>
    </div>
  )
}

export default App
