'use client';

import { Card, Button, Row, Col } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <h1 style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 'clamp(32px, 6vw, 48px)',
          marginBottom: '40px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Welcome to AI Assistant
        </h1>
        
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={24} md={12} lg={10}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}
              bodyStyle={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                padding: 'clamp(16px, 4vw, 32px)'
              }}
            >
              <UserOutlined style={{ 
                fontSize: 'clamp(48px, 10vw, 64px)', 
                color: '#ff4d4f', 
                marginBottom: '20px' 
              }} />
              <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>Admin Portal</h2>
              <p style={{ 
                color: '#666', 
                marginBottom: '30px',
                fontSize: 'clamp(14px, 2vw, 16px)'
              }}>
                Access administrative features and manage the system
              </p>
              <Button
                type="primary"
                size="large"
                danger
                onClick={() => router.push('/admin-login')}
                style={{ 
                  width: '100%',
                  maxWidth: '200px',
                  margin: '0 auto',
                  height: 'auto',
                  padding: '12px 24px'
                }}
              >
                Admin Login
              </Button>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12} lg={10}>
            <Card
              hoverable
              style={{
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
              }}
              bodyStyle={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                padding: 'clamp(16px, 4vw, 32px)'
              }}
            >
              <TeamOutlined style={{ 
                fontSize: 'clamp(48px, 10vw, 64px)', 
                color: '#1890ff', 
                marginBottom: '20px' 
              }} />
              <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)' }}>Client Portal</h2>
              <p style={{ 
                color: '#666', 
                marginBottom: '30px',
                fontSize: 'clamp(14px, 2vw, 16px)'
              }}>
                Access your account and manage your AI assistant
              </p>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                alignItems: 'center'
              }}>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => router.push('/login')}
                  style={{ 
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    padding: '12px 24px'
                  }}
                >
                  Client Login
                </Button>
                <Button
                  size="large"
                  onClick={() => router.push('/signup')}
                  style={{ 
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    padding: '12px 24px'
                  }}
                >
                  Create Account
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}