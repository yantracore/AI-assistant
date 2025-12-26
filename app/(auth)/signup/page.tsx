'use client';

import { Form, Input, Button, Card, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '@/lib/auth/validation';
import { useAuth } from '@/lib/auth/use-auth';
import { useTheme } from '@/components/ThemeProvider';

export default function SignupPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const { signup } = useAuth();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        message.success('Account created successfully!');
        router.push('/login');
      } else {
        message.error(result.message || 'Signup failed');
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
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
          <UserAddOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <h2 style={{ 
            margin: '16px 0 8px',
            fontSize: 'clamp(20px, 5vw, 28px)'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#666', margin: 0 }}>Sign up to get started</p>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="Full Name"
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                />
              )}
            />
          </Form.Item>

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
                  prefix={<MailOutlined />}
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
                  placeholder="Create a password"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword ? 'error' : ''}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Confirm your password"
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
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Already have an account?</Divider>

        <div style={{ textAlign: 'center' }}>
          <Link href="/login">
            <Button type="link">Sign in instead</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}