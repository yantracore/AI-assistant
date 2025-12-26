'use client';

import { Layout, Menu, Avatar, Button, Dropdown, Space, message } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BulbOutlined,
  BulbFilled,
  DownOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { useAuthStore } from '@/lib/store/auth-store';

const { Sider, Content, Header } = Layout;

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout, isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin()) {
      router.push('/admin-login');
    }
  }, [isAuthenticated, isAdmin, router]);

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    router.push('/admin-login');
  };

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/admin/dashboard/users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '/admin/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (!isAuthenticated || !isAdmin()) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        theme={theme === 'dark' ? 'dark' : 'light'} 
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: `1px solid ${theme === 'dark' ? '#303030' : '#f0f0f0'}`,
            gap: 8,
          }}
        >
          <SafetyOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />
          <span style={{
            color: '#ff4d4f',
            fontWeight: 600,
            fontSize: 18,
          }}>
            Admin Panel
          </span>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0, height: 'calc(100vh - 64px)' }}
        />
      </Sider>

      <Layout style={{ marginLeft: 250 }}>
        <Header
          style={{
            padding: '0 24px',
            background: theme === 'dark' ? '#141414' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme === 'dark' ? '#303030' : '#f0f0f0'}`,
            position: 'sticky',
            top: 0,
            zIndex: 998,
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 600 }}>Admin Dashboard</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              type="text"
              icon={theme === 'dark' ? <BulbFilled style={{ color: '#fadb14' }} /> : <BulbOutlined />}
              onClick={toggleTheme}
              size="large"
            />
            
            <Dropdown 
              menu={{ items: userMenuItems }} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} src={user?.avatar} />
                <span style={{ fontWeight: 500 }}>{user?.name}</span>
                <DownOutlined style={{ fontSize: 12 }} />
              </Space>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: '24px', minHeight: 'calc(100vh - 88px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}