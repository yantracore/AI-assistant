// ai-dashboard/components/settings/AssistantSettings.tsx

'use client';

import { Button, Checkbox, Col, Form, Row, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assistantSchema, AssistantSettingsData } from '@/schemas/assistant.schema';
import { apiClient } from '@/lib/apiClient';

export default function AssistantSettings() {
  const { control, handleSubmit } = useForm<AssistantSettingsData>({
    resolver: zodResolver(assistantSchema),
    defaultValues: {
      tone: 'professional',
      greeting: '',
      emailNotifications: true,
    },
  });

  const onSubmit = async (data: AssistantSettingsData) => {
    try {
      await apiClient('/api/client-bot/settings/set', {
        method: 'POST',
        body: JSON.stringify({
          userCollectionName: 'yantracore',
          key: 'email_enabled',
          value: {
            feedback: data.emailNotifications,
            contact_us: false,
            project_onboarding: true,
          },
        }),
      });

      await apiClient('/api/client-bot', {
        method: 'POST',
        body: JSON.stringify({
          userCollectionName: 'yantracore',
          title: 'YantraBot',
          systemPrompt: data.greeting,
          tone: data.tone,
        }),
      });

      message.success('Assistant settings updated');
    } catch {
      message.error('Failed to update assistant settings');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item label="Assistant Tone">
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <Select.Option value="professional">Professional</Select.Option>
                  <Select.Option value="friendly">Friendly</Select.Option>
                  <Select.Option value="casual">Casual</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item>
            <Controller
              name="emailNotifications"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  Enable email notifications
                </Checkbox>
              )}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Greeting Message">
            <Controller
              name="greeting"
              control={control}
              render={({ field }) => <TextArea rows={3} {...field} />}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Button type="primary" htmlType="submit">
            Save Assistant Settings
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
