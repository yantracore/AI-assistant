'use client';

import { Card, Row, Col, Statistic, Typography } from 'antd';
import { UserOutlined, MessageOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function AdminDashboardPage() {
  return (
    <div>
      <Title level={2}>Admin Dashboard</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={1248}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Messages"
              value={5432}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Events"
              value={24}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Welcome, Admin!</Title>
        <p>This is your admin dashboard where you can manage the entire system.</p>
      </Card>
    </div>
  );
}