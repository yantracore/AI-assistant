'use client';

import { Form, Input, Button, Card, message, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/auth/validation';
import { useAuth } from '@/lib/auth/use-auth';
import { useTheme } from '@/components/ThemeProvider';

export default function AdminLoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { login } = useAuth();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);

      if (result.success) {
        // Check if user is actually admin
        if (result.user.role === 'admin') {
          message.success('Admin login successful!');
          router.push('/admin/dashboard');
        } else {
          message.error('You do not have admin privileges');
        }
      } else {
        message.error(result.message || 'Login failed');
      }
    } catch (error) {
      message.error('An unexpected error occurred');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{ 
          width: '100%',
          maxWidth: 450,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <SafetyOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
          <h2 style={{ 
            margin: '16px 0 8px',
            fontSize: 'clamp(20px, 5vw, 28px)',
            color: '#ff4d4f'
          }}>
            Admin Portal
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Restricted Access - Admins Only</p>
        </div>

        <Alert
          message="Admin Access Required"
          description="This area is restricted to authorized administrators only."
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="Admin Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Enter admin email"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Admin Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Enter admin password"
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              block
              loading={isSubmitting}
              danger
            >
              Admin Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Not an admin?</Divider>

        <div style={{ textAlign: 'center' }}>
          <Link href="/login">
            <Button type="link">Go to Client Login</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}