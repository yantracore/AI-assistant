'use client';

import { Card, Row, Col, Statistic, Select, Typography, Table, Tag } from 'antd';
import {
  UserOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
  FacebookOutlined,
  MessageOutlined,
  FileTextOutlined,
  AudioOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

interface Appointment {
  key: string;
  name: string;
  email: string;
  phone: string;
  preferredTime: string;
  additionalInfo: string;
  status: string;
}

export default function ReportsPage() {
  const [timeFilter, setTimeFilter] = useState('today');

  const customerStats = [
    { title: 'Total Customers', value: 1248, icon: <UserOutlined /> },
    { title: 'WhatsApp', value: 856, icon: <WhatsAppOutlined style={{ color: '#25D366' }} /> },
    { title: 'Instagram', value: 234, icon: <InstagramOutlined style={{ color: '#E4405F' }} /> },
    { title: 'Facebook', value: 158, icon: <FacebookOutlined style={{ color: '#1877F2' }} /> },
  ];

  const messageStats = [
    { title: 'Total Messages', value: 5432, icon: <MessageOutlined /> },
    { title: 'Text Messages', value: 4521, icon: <FileTextOutlined /> },
    { title: 'Audio Messages', value: 623, icon: <AudioOutlined /> },
    { title: 'Image Messages', value: 288, icon: <PictureOutlined /> },
  ];

  const platformMessages = [
    { title: 'WhatsApp Messages', value: 3245, icon: <WhatsAppOutlined style={{ color: '#25D366' }} /> },
    { title: 'Instagram Messages', value: 1456, icon: <InstagramOutlined style={{ color: '#E4405F' }} /> },
    { title: 'Facebook Messages', value: 731, icon: <FacebookOutlined style={{ color: '#1877F2' }} /> },
  ];

  const appointments: Appointment[] = [
    {
      key: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+977 9841234567',
      preferredTime: '2024-12-25 10:00 AM',
      additionalInfo: 'Need consultation for AI assistant setup',
      status: 'upcoming',
    },
    {
      key: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+977 9842345678',
      preferredTime: '2024-12-20 02:00 PM',
      additionalInfo: 'Follow-up meeting',
      status: 'overdue',
    },
    {
      key: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      phone: '+977 9843456789',
      preferredTime: '2024-12-26 03:00 PM',
      additionalInfo: 'Demo request',
      status: 'upcoming',
    },
  ];

  const appointmentColumns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
      responsive: ['md'] as const,
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email',
      responsive: ['lg'] as const,
    },
    { 
      title: 'Phone', 
      dataIndex: 'phone', 
      key: 'phone',
      responsive: ['lg'] as const,
    },
    { 
      title: 'Preferred Time', 
      dataIndex: 'preferredTime', 
      key: 'preferredTime',
      render: (time: string, record: Appointment) => {
        const isPast = new Date(time) < new Date() && record.status !== 'complete';
        return <span style={{ color: isPast ? 'red' : 'inherit' }}>{time}</span>;
      },
    },
    { 
      title: 'Info', 
      dataIndex: 'additionalInfo', 
      key: 'additionalInfo',
      responsive: ['xl'] as const,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Appointment) => {
        const isPast = new Date(record.preferredTime) < new Date() && status !== 'complete';
        const displayStatus = isPast && status !== 'complete' ? 'overdue' : status;
        return (
          <Select
            value={displayStatus}
            style={{ width: '100%', minWidth: 100 }}
            onChange={(value) => console.log('Status changed to:', value)}
          >
            <Select.Option value="overdue">
              <Tag color="red">Overdue</Tag>
            </Select.Option>
            <Select.Option value="upcoming">
              <Tag color="blue">Upcoming</Tag>
            </Select.Option>
            <Select.Option value="cancelled">
              <Tag color="default">Cancelled</Tag>
            </Select.Option>
            <Select.Option value="complete">
              <Tag color="green">Complete</Tag>
            </Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <Title level={2} style={{ margin: 0 }}>Reports</Title>
        <Select
          value={timeFilter}
          onChange={setTimeFilter}
          style={{ width: '100%', maxWidth: 200 }}
          options={[
            { value: 'last-hour', label: 'Last Hour' },
            { value: 'today', label: 'Today' },
            { value: 'this-week', label: 'This Week' },
            { value: 'this-month', label: 'This Month' },
            { value: 'this-year', label: 'This Year' },
            { value: 'all-time', label: 'All Time' },
            { value: 'date-range', label: 'Date Range' },
          ]}
        />
      </div>

      <Title level={4}>Customers</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {customerStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: '#3f8600', fontSize: 'clamp(20px, 4vw, 24px)' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4}>Messages</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {messageStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: '#1890ff', fontSize: 'clamp(20px, 4vw, 24px)' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {platformMessages.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ fontSize: 'clamp(20px, 4vw, 24px)' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4}>Conversations Summary</Title>
      <Card style={{ marginBottom: 32 }}>
        <Paragraph style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.8 }}>
          During <strong>{timeFilter === 'today' ? 'today' : timeFilter}</strong>, your AI assistant handled{' '}
          <strong>5,432 messages</strong> across all platforms. The most active platform was WhatsApp with{' '}
          <strong>3,245 messages</strong>, showing a 23% increase from the previous period. Your customer base 
          grew to <strong>1,248 users</strong>, with the majority engaging through WhatsApp. The assistant 
          maintained an average response time of under 2 seconds and successfully resolved 87% of inquiries 
          without human intervention.
        </Paragraph>
      </Card>

      <Title level={4}>Appointments</Title>
      <Table
        columns={appointmentColumns}
        dataSource={appointments}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}