
// ai-dashboard/app/client/dashboard/settings/page.tsx
'use client';

import { Card, Form, Input, Button, Select, Checkbox, Upload, Modal, Typography, Space, message, Row, Col } from 'antd';
import { UploadOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const { Title } = Typography;
const { TextArea } = Input;

const businessInfoSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email'),
  location: z.string().min(1, 'Location is required'),
});

const assistantSettingsSchema = z.object({
  tone: z.string().min(1, 'Tone is required'),
  greeting: z.string().min(1, 'Greeting is required'),
  emailNotifications: z.boolean(),
});

type BusinessInfoData = z.infer<typeof businessInfoSchema>;
type AssistantSettingsData = z.infer<typeof assistantSettingsSchema>;

export default function SettingsPage() {
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const businessForm = useForm<BusinessInfoData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: 'My Business',
      contactPerson: 'John Doe',
      phoneNumber: '+977 9842334567',
      email: 'business@example.com',
      location: 'Kathmandu, Nepal',
    },
  });

  const assistantForm = useForm<AssistantSettingsData>({
    resolver: zodResolver(assistantSettingsSchema),
    defaultValues: {
      tone: 'professional',
      greeting: 'Hello! How can I assist you today?',
      emailNotifications: true,
    },
  });

  const onBusinessInfoSubmit = (data: BusinessInfoData) => {
    console.log('Business Info:', data);
    message.success('Business information updated successfully!');
  };

  const onAssistantSettingsSubmit = (data: AssistantSettingsData) => {
    console.log('Assistant Settings:', data);
    message.success('Assistant settings updated successfully!');
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Settings</Title>

      <Card title="Public Business Info" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={businessForm.handleSubmit(onBusinessInfoSubmit)}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item 
                label="Business Name"
                validateStatus={businessForm.formState.errors.businessName ? 'error' : ''}
                help={businessForm.formState.errors.businessName?.message}
              >
                <Controller
                  name="businessName"
                  control={businessForm.control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item 
                label="Contact Person"
                validateStatus={businessForm.formState.errors.contactPerson ? 'error' : ''}
                help={businessForm.formState.errors.contactPerson?.message}
              >
                <Controller
                  name="contactPerson"
                  control={businessForm.control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item 
                label="Phone Number"
                validateStatus={businessForm.formState.errors.phoneNumber ? 'error' : ''}
                help={businessForm.formState.errors.phoneNumber?.message}
              >
                <Controller
                  name="phoneNumber"
                  control={businessForm.control}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item 
                label="Email"
                validateStatus={businessForm.formState.errors.email ? 'error' : ''}
                help={businessForm.formState.errors.email?.message}
              >
                <Controller
                  name="email"
                  control={businessForm.control}
                  render={({ field }) => <Input {...field} type="email" />}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item 
                label="Location"
                validateStatus={businessForm.formState.errors.location ? 'error' : ''}
                help={businessForm.formState.errors.location?.message}
              >
                <Controller
                  name="location"
                  control={businessForm.control}
                  render={({ field }) => (
                    <Input {...field} suffix={<EnvironmentOutlined />} placeholder="Enter exact location" />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Button type="primary" htmlType="submit">
                Save Business Info
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="Business Files" style={{ marginBottom: 24 }}>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Business Files</Button>
        </Upload>
      </Card>

      <Card title="Assistant Settings" style={{ marginBottom: 24 }}>
        <Form layout="vertical" onFinish={assistantForm.handleSubmit(onAssistantSettingsSubmit)}>
          <Form.Item 
            label="Default Assistant Tone"
            validateStatus={assistantForm.formState.errors.tone ? 'error' : ''}
            help={assistantForm.formState.errors.tone?.message}
          >
            <Controller
              name="tone"
              control={assistantForm.control}
              render={({ field }) => (
                <Select {...field}>
                  <Select.Option value="professional">Professional</Select.Option>
                  <Select.Option value="friendly">Friendly</Select.Option>
                  <Select.Option value="casual">Casual</Select.Option>
                  <Select.Option value="formal">Formal</Select.Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item 
            label="Greeting Message"
            validateStatus={assistantForm.formState.errors.greeting ? 'error' : ''}
            help={assistantForm.formState.errors.greeting?.message}
          >
            <Controller
              name="greeting"
              control={assistantForm.control}
              render={({ field }) => (
                <TextArea {...field} rows={3} placeholder="Enter greeting message" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Controller
              name="emailNotifications"
              control={assistantForm.control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value}>
                  Send me an email when new message from customer
                </Checkbox>
              )}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Save Assistant Settings
          </Button>
        </Form>
      </Card>

      <Card 
        title="Active Assistants" 
        extra={<Button icon={<EditOutlined />} onClick={() => setUpdateModalVisible(true)}>Update</Button>}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div><strong>WhatsApp:</strong> +977 9842334567</div>
          <div><strong>Instagram:</strong> @mybusiness</div>
          <div><strong>Facebook:</strong> @mybusiness</div>
        </Space>
      </Card>

      <Modal
        title="Update Assistant Handles"
        open={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setUpdateModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => {
            message.success('Handles updated! Setup cost: $10');
            setUpdateModalVisible(false);
          }}>
            Update ($10)
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="WhatsApp Number">
            <Input placeholder="+977 9842334567" />
          </Form.Item>
          <Form.Item label="Instagram Handle">
            <Input placeholder="@mybusiness" />
          </Form.Item>
          <Form.Item label="Facebook Handle">
            <Input placeholder="@mybusiness" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}