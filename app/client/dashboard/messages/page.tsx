'use client';

import { List, Avatar, Typography, Drawer, Input, Button, Space, Badge } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Array<{
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
  }>;
}

export default function MessagesPage() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const mockMessages: Message[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hi, I need help with my appointment',
      timestamp: '2 min ago',
      unread: 2,
      messages: [
        { id: '1', sender: 'user', text: 'Hi, I need help with my appointment', timestamp: '10:30 AM' },
        { id: '2', sender: 'assistant', text: 'Hello! I\'d be happy to help you with your appointment. What would you like to know?', timestamp: '10:31 AM' },
      ],
    },
    {
      id: '2',
      name: 'Sarah Smith',
      lastMessage: 'Thank you for the information!',
      timestamp: '15 min ago',
      unread: 0,
      messages: [
        { id: '1', sender: 'user', text: 'What are your business hours?', timestamp: '9:45 AM' },
        { id: '2', sender: 'assistant', text: 'We are open Monday to Friday, 9 AM to 6 PM.', timestamp: '9:46 AM' },
        { id: '3', sender: 'user', text: 'Thank you for the information!', timestamp: '9:47 AM' },
      ],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'Can I reschedule my booking?',
      timestamp: '1 hour ago',
      unread: 1,
      messages: [
        { id: '1', sender: 'user', text: 'Can I reschedule my booking?', timestamp: '8:30 AM' },
      ],
    },
  ];

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setDrawerVisible(true);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Messages</Title>

      <List
        itemLayout="horizontal"
        dataSource={mockMessages}
        renderItem={(item) => (
          <List.Item
            style={{
              cursor: 'pointer',
              padding: 'clamp(12px, 2vw, 16px)',
              backgroundColor: 'var(--ant-color-bg-container)',
              marginBottom: 8,
              borderRadius: 8,
              border: '1px solid var(--ant-color-border)',
            }}
            onClick={() => handleMessageClick(item)}
          >
            <List.Item.Meta
              avatar={
                <Badge count={item.unread}>
                  <Avatar size={48} icon={<UserOutlined />} src={item.avatar} />
                </Badge>
              }
              title={<Text strong style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>{item.name}</Text>}
              description={
                <div>
                  <Paragraph 
                    ellipsis={{ rows: 1 }} 
                    style={{ 
                      margin: 0, 
                      color: '#666',
                      fontSize: 'clamp(12px, 1.5vw, 14px)'
                    }}
                  >
                    {item.lastMessage}
                  </Paragraph>
                  <Text type="secondary" style={{ fontSize: 'clamp(11px, 1.5vw, 12px)' }}>
                    {item.timestamp}
                  </Text>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Drawer
        title={selectedMessage?.name}
        placement="right"
        width="min(500px, 100vw)"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedMessage && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 16 }}>
              {selectedMessage.messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: 'clamp(10px, 2vw, 12px) clamp(14px, 2vw, 16px)',
                      borderRadius: 12,
                      backgroundColor: msg.sender === 'user' ? 'var(--ant-color-fill-tertiary)' : '#1890ff',
                      color: msg.sender === 'user' ? 'inherit' : '#fff',
                    }}
                  >
                    <Paragraph 
                      style={{ 
                        margin: 0, 
                        color: 'inherit',
                        fontSize: 'clamp(13px, 2vw, 14px)',
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.text}
                    </Paragraph>
                    <Text
                      style={{
                        fontSize: 'clamp(10px, 1.5vw, 11px)',
                        color: msg.sender === 'user' ? '#999' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {msg.timestamp}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            <Space.Compact style={{ width: '100%' }}>
              <TextArea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                onPressEnter={(e) => {
                  if (e.shiftKey) return;
                  e.preventDefault();
                  handleSendReply();
                }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendReply}
                style={{ height: 'auto' }}
              >
                Send
              </Button>
            </Space.Compact>
          </div>
        )}
      </Drawer>
    </div>
  );
}