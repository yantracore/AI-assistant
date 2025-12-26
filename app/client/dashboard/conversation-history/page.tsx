'use client';

import { Table, Typography, Tag, Input, Space, Button } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

interface Conversation {
  key: string;
  customer: string;
  platform: string;
  date: string;
  duration: string;
  messages: number;
  status: string;
}

export default function ConversationHistoryPage() {
  const [searchText, setSearchText] = useState('');

  const data: Conversation[] = [
    {
      key: '1',
      customer: 'John Doe',
      platform: 'WhatsApp',
      date: '2024-12-24 10:30 AM',
      duration: '5 min',
      messages: 12,
      status: 'Resolved',
    },
    {
      key: '2',
      customer: 'Sarah Smith',
      platform: 'Instagram',
      date: '2024-12-24 09:45 AM',
      duration: '3 min',
      messages: 8,
      status: 'Resolved',
    },
    {
      key: '3',
      customer: 'Mike Johnson',
      platform: 'Facebook',
      date: '2024-12-23 04:20 PM',
      duration: '7 min',
      messages: 15,
      status: 'Pending',
    },
    {
      key: '4',
      customer: 'Emily Davis',
      platform: 'WhatsApp',
      date: '2024-12-23 02:15 PM',
      duration: '4 min',
      messages: 10,
      status: 'Resolved',
    },
  ];

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      filteredValue: [searchText],
      onFilter: (value: any, record: Conversation) =>
        record.customer.toLowerCase().includes(value.toLowerCase()),
      responsive: ['sm'] as const,
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform: string) => {
        const colors: Record<string, string> = {
          WhatsApp: 'green',
          Instagram: 'magenta',
          Facebook: 'blue',
        };
        return <Tag color={colors[platform]}>{platform}</Tag>;
      },
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      responsive: ['md'] as const,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      responsive: ['lg'] as const,
    },
    {
      title: 'Messages',
      dataIndex: 'messages',
      key: 'messages',
      responsive: ['lg'] as const,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Resolved' ? 'success' : 'warning'}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" icon={<EyeOutlined />} size="small">
          View
        </Button>
      ),
      responsive: ['md'] as const,
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
        <Title level={2} style={{ margin: 0 }}>Conversation History</Title>
        <Space>
          <Input
            placeholder="Search customer"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '100%', minWidth: 200 }}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
      />
    </div>
  );
}