// ai-dashboard/components/settings/BusinessSettings.tsx

'use client';

import { Button, Col, Form, Input, Row, message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessSchema, BusinessFormData } from '@/schemas/business.schema';
import { apiClient } from '@/lib/apiClient';

export default function BusinessSettings() {
  const { control, handleSubmit } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: '',
      contactPerson: '',
      phoneNumber: '',
      email: '',
      location: '',
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    try {
      await apiClient('/api/client-bot', {
        method: 'POST',
        body: JSON.stringify({
          userCollectionName: 'yantracore',
          businessInfo: data,
        }),
      });

      message.success('Business info updated');
    } catch {
      message.error('Failed to save business info');
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item label="Business Name">
            <Controller name="businessName" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Contact Person">
            <Controller name="contactPerson" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Phone Number">
            <Controller name="phoneNumber" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Email">
            <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item label="Location">
            <Controller name="location" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Button type="primary" htmlType="submit">
            Save Business Info
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
