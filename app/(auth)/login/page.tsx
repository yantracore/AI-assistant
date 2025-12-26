'use client';

import { Form, Input, Button, Card, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/auth/validation';
import { useAuthStore } from '@/lib/store';
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });



  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data);
  
    if (result.success && result.user) {
      message.success('Login successful');
  
      if (result.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/client/dashboard');
      }
    } else {
      message.error(result.message || 'Login failed');
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
          <LoginOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <h2 style={{ 
            margin: '16px 0 8px',
            fontSize: 'clamp(20px, 5vw, 28px)'
          }}>
            Welcome Back
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Sign in to your account</p>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="Email"
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
                  placeholder="Enter your email"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password"
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
                  placeholder="Enter your password"
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
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>New here?</Divider>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link href="/signup">
            <Button type="link">Create an account</Button>
          </Link>
        </div>

        <Divider plain>Or</Divider>

        <div style={{ textAlign: 'center' }}>
          <Link href="/admin-login">
            <Button type="link">Admin Login</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}