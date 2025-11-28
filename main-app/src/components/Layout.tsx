import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout as AntLayout, Menu, theme } from 'antd'
import { Home, Menu as MenuIcon, X } from 'lucide-react'
import { menuItems } from '../config/microApps'

const { Header, Content, Sider } = AntLayout

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const getCurrentKey = () => {
    const path = location.pathname
    if (path.startsWith('/react')) return '/react'
    if (path.startsWith('/vue')) return '/vue'
    if (path.startsWith('/typescript')) return '/typescript'
    return '/'
  }

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center gap-3">
          <Home className="text-white" size={28} />
          <h1 className="text-white text-xl font-bold m-0">Qiankun 微前端架构</h1>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="lg:hidden text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {collapsed ? <MenuIcon size={24} /> : <X size={24} />}
        </button>
      </Header>
      <AntLayout>
        <Sider
          width={200}
          style={{ background: colorBgContainer }}
          breakpoint="lg"
          collapsedWidth="0"
          trigger={null}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            mode="inline"
            selectedKeys={[getCurrentKey()]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <AntLayout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {location.pathname === '/' ? (
              <div className="text-center py-20">
                <Home className="mx-auto mb-6 text-blue-600" size={80} />
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  欢迎使用 Qiankun 微前端架构
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  基于最新技术栈构建的稳定微服务架构
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                  <div className="p-6 bg-blue-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3 text-blue-700">技术栈</h3>
                    <ul className="text-left space-y-2 text-gray-700">
                      <li>• React 18 + TypeScript</li>
                      <li>• Vue 3 + Composition API</li>
                      <li>• Vite 5 构建工具</li>
                      <li>• Qiankun 2.10 微前端框架</li>
                      <li>• Ant Design 5 + TailwindCSS</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-3 text-purple-700">特性</h3>
                    <ul className="text-left space-y-2 text-gray-700">
                      <li>• 独立开发部署</li>
                      <li>• 样式隔离</li>
                      <li>• 应用预加载</li>
                      <li>• 沙箱隔离</li>
                      <li>• 路由管理</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div id="subapp-container" />
            )}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
