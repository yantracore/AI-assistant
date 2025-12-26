'use client';

import { Card, Button, Row, Col, Drawer, Form, Input, DatePicker, Upload, Typography, message } from 'antd';
import { PlusOutlined, CalendarOutlined, EnvironmentOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const { Title, Text } = Typography;
const { TextArea } = Input;

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.any(),
  location: z.string().min(1, 'Location is required'),
  details: z.string().min(1, 'Details are required'),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  details: string;
  image?: string;
}

export default function EventsPage() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Product Launch Event',
      date: '2024-12-30',
      location: 'Convention Center, New York',
      details: 'Join us for the launch of our latest AI-powered assistant features.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      title: 'Customer Appreciation Day',
      date: '2025-01-15',
      location: 'Main Office, San Francisco',
      details: 'Special event to thank our valued customers with exclusive offers.',
      image: 'https://via.placeholder.com/300x200',
    },
  ]);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const handleAddNew = () => {
    setSelectedEvent(null);
    reset({
      title: '',
      date: null,
      location: '',
      details: '',
    });
    setDrawerVisible(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    reset({
      title: event.title,
      location: event.location,
      details: event.details,
    });
    setDrawerVisible(true);
  };

  const onSubmit = (data: EventFormData) => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id 
          ? { ...e, ...data, date: data.date?.format('YYYY-MM-DD') }
          : e
      ));
      message.success('Event updated successfully!');
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...data,
        date: data.date?.format('YYYY-MM-DD'),
      };
      setEvents([...events, newEvent]);
      message.success('Event created successfully!');
    }
    setDrawerVisible(false);
  };

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
        <Title level={2} style={{ margin: 0 }}>Events</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add New Event
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {events.map((event) => (
          <Col xs={24} sm={12} lg={8} key={event.id}>
            <Card
              hoverable
              cover={
                event.image ? (
                  <img alt={event.title} src={event.image} style={{ height: 200, objectFit: 'cover' }} />
                ) : null
              }
              onClick={() => handleEventClick(event)}
              style={{ height: '100%' }}
            >
              <Card.Meta
                title={<span style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}>{event.title}</span>}
                description={
                  <div style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
                    <Text><CalendarOutlined /> {event.date}</Text>
                    <br />
                    <Text><EnvironmentOutlined /> {event.location}</Text>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title={selectedEvent ? 'Edit Event' : 'Create New Event'}
        width="min(500px, 100vw)"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Event Image">
                <Upload listType="picture-card" maxCount={1}>
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item 
                label="Event Title" 
                validateStatus={errors.title ? 'error' : ''}
                help={errors.title?.message}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Enter event title" />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item 
                label="Event Date/Time"
                validateStatus={errors.date ? 'error' : ''}
                help={errors.date?.message}
              >
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker {...field} showTime style={{ width: '100%' }} />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item 
                label="Event Location"
                validateStatus={errors.location ? 'error' : ''}
                help={errors.location?.message}
              >
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Enter location" />}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item 
                label="Event Details"
                validateStatus={errors.details ? 'error' : ''}
                help={errors.details?.message}
              >
                <Controller
                  name="details"
                  control={control}
                  render={({ field }) => (
                    <TextArea {...field} rows={4} placeholder="Enter event details" />
                  )}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}