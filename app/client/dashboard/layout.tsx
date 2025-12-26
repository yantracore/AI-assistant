'use client';

import { Layout, Menu, Badge, Avatar, Button, Drawer, Dropdown, Space, message } from 'antd';
import {
  BarChartOutlined,
  MessageOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
  RobotOutlined,
  MenuOutlined,
  BulbOutlined,
  BulbFilled,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/theme-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { useUIStore } from '@/lib/store/ui-store';

const { Sider, Content, Header } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { 
    sidebarCollapsed, 
    mobileDrawerOpen, 
    isMobile,
    setSidebarCollapsed,
    setMobileDrawerOpen,
    setIsMobile 
  } = useUIStore();

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileDrawerOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isAuthenticated, router, setIsMobile, setMobileDrawerOpen]);

  const handleLogout = () => {
    logout();
    message.success('Logged out successfully');
    router.push('/login');
  };

  const menuItems = [
    {
      key: '/client/dashboard/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/client/dashboard/messages',
      icon: <MessageOutlined />,
      label: 'Messages',
    },
    {
      key: '/client/dashboard/events',
      icon: <CalendarOutlined />,
      label: 'Events',
    },
    {
      key: '/client/dashboard/conversation-history',
      icon: <HistoryOutlined />,
      label: 'Conversation History',
    },
    {
      key: '/client/dashboard/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: '/client/dashboard/account',
      icon: <UserOutlined />,
      label: 'Account',
    },
  ];

  const handleMenuClick = (key: string) => {
    router.push(key);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/client/dashboard/account'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/client/dashboard/settings'),
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

  const SidebarContent = () => (
    <>
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${theme === 'dark' ? '#303030' : '#f0f0f0'}`,
          gap: 8,
          padding: '0 16px',
        }}
      >
        <Badge count={<RobotOutlined style={{ color: '#1890ff' }} />}>
          <Avatar
            size={sidebarCollapsed && !isMobile ? 32 : 40}
            style={{ backgroundColor: '#1890ff' }}
            icon={<RobotOutlined />}
          />
        </Badge>
        {(!sidebarCollapsed || isMobile) && (
          <span style={{ 
            fontSize: 16, 
            fontWeight: 600, 
            color: '#1890ff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            AI-ASSISTANT
          </span>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        style={{ borderRight: 0, height: 'calc(100vh - 64px)', overflowY: 'auto' }}
      />
    </>
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
          theme={theme === 'dark' ? 'dark' : 'light'}
          width={250}
          breakpoint="lg"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 999,
          }}
        >
          <SidebarContent />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setMobileDrawerOpen(false)}
          open={mobileDrawerOpen}
          styles={{ body: { padding: 0 } }}
          width={250}
        >
          <SidebarContent />
        </Drawer>
      )}

      <Layout 
        style={{ 
          marginLeft: isMobile ? 0 : (sidebarCollapsed ? 80 : 250), 
          transition: 'margin-left 0.2s',
          minHeight: '100vh',
        }}
      >
        <Header
          style={{
            padding: '0 clamp(12px, 3vw, 24px)',
            background: theme === 'dark' ? '#141414' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme === 'dark' ? '#303030' : '#f0f0f0'}`,
            position: 'sticky',
            top: 0,
            zIndex: 998,
            height: 64,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerOpen(true)}
                size="large"
              />
            )}
            <h2 style={{ 
              margin: 0, 
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: 600,
            }}>
              Dashboard
            </h2>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)' }}>
            <Button
              type="text"
              icon={theme === 'dark' ? <BulbFilled style={{ color: '#fadb14' }} /> : <BulbOutlined />}
              onClick={toggleTheme}
              size="large"
              style={{ fontSize: 18 }}
            />
            
            <Dropdown 
              menu={{ items: userMenuItems }} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar 
                  icon={<UserOutlined />} 
                  src={user?.avatar}
                  size={isMobile ? 32 : 40}
                />
                {!isMobile && (
                  <>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{user?.name}</span>
                    <DownOutlined style={{ fontSize: 12 }} />
                  </>
                )}
              </Space>
            </Dropdown>
            
            {isMobile && (
              <Button
                type="text"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                size="large"
              />
            )}
          </div>
        </Header>

        <Content 
          style={{ 
            margin: 'clamp(12px, 3vw, 24px)',
            minHeight: 'calc(100vh - 88px)',
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}