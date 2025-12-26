'use client';

import {
  Card,
  Typography,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const { Title, Text } = Typography;

/* -------------------- Schemas -------------------- */

const emailSchema = z.object({
  email: z.string().email('Invalid email'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const phoneSchema = z.object({
  phone: z.string().min(10, 'Invalid phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password required'),
    newPassword: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

/* -------------------- Types -------------------- */

type EmailForm = z.infer<typeof emailSchema>;
type PhoneForm = z.infer<typeof phoneSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

type ModalType = 'email' | 'phone' | 'password' | null;

/* -------------------- Page -------------------- */

export default function AccountPage() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // 🔥 This should come from auth store / API later
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+977 9842334567',
  };

  /* -------------------- Forms -------------------- */

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const phoneForm = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  /* -------------------- Handlers -------------------- */

  const closeModal = () => {
    setActiveModal(null);
    emailForm.reset();
    phoneForm.reset();
    passwordForm.reset();
  };

  const updateEmail = async (data: EmailForm) => {
    console.log('EMAIL:', data);
    message.success('Email updated successfully');
    closeModal();
  };

  const updatePhone = async (data: PhoneForm) => {
    console.log('PHONE:', data);
    message.success('Phone number updated successfully');
    closeModal();
  };

  const updatePassword = async (data: PasswordForm) => {
    console.log('PASSWORD:', data);
    message.success('Password updated successfully');
    closeModal();
  };

  /* -------------------- UI -------------------- */

  return (
    <div>
      <Title level={2}>Account</Title>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Name */}
          <InfoRow
            label="Full Name"
            value={user.name}
            icon={<UserOutlined />}
          />

          {/* Email */}
          <InfoRow
            label="Login Email"
            value={user.email}
            icon={<MailOutlined />}
            action="Change Email"
            onClick={() => setActiveModal('email')}
          />

          {/* Phone */}
          <InfoRow
            label="Contact Number"
            value={user.phone}
            icon={<PhoneOutlined />}
            action="Change Number"
            onClick={() => setActiveModal('phone')}
          />

          {/* Password */}
          <InfoRow
            label="Password"
            value="••••••••"
            icon={<LockOutlined />}
            action="Change Password"
            onClick={() => setActiveModal('password')}
          />
        </Space>
      </Card>

      {/* -------------------- Modals -------------------- */}

      {/* Email */}
      <Modal
        open={activeModal === 'email'}
        title="Change Email"
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={emailForm.handleSubmit(updateEmail)} layout="vertical">
          <Form.Item
            label="New Email"
            validateStatus={emailForm.formState.errors.email && 'error'}
            help={emailForm.formState.errors.email?.message}
          >
            <Controller
              name="email"
              control={emailForm.control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="OTP"
            validateStatus={emailForm.formState.errors.otp && 'error'}
            help={emailForm.formState.errors.otp?.message}
          >
            <Controller
              name="otp"
              control={emailForm.control}
              render={({ field }) => <Input maxLength={6} {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Verify & Update
          </Button>
        </Form>
      </Modal>

      {/* Phone */}
      <Modal
        open={activeModal === 'phone'}
        title="Change Phone Number"
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={phoneForm.handleSubmit(updatePhone)} layout="vertical">
          <Form.Item
            label="New Phone Number"
            validateStatus={phoneForm.formState.errors.phone && 'error'}
            help={phoneForm.formState.errors.phone?.message}
          >
            <Controller
              name="phone"
              control={phoneForm.control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="OTP"
            validateStatus={phoneForm.formState.errors.otp && 'error'}
            help={phoneForm.formState.errors.otp?.message}
          >
            <Controller
              name="otp"
              control={phoneForm.control}
              render={({ field }) => <Input maxLength={6} {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Verify & Update
          </Button>
        </Form>
      </Modal>

      {/* Password */}
      <Modal
        open={activeModal === 'password'}
        title="Change Password"
        onCancel={closeModal}
        footer={null}
      >
        <Form
          onFinish={passwordForm.handleSubmit(updatePassword)}
          layout="vertical"
        >
          <PasswordField
            label="Old Password"
            name="oldPassword"
            form={passwordForm}
          />

          <PasswordField
            label="New Password"
            name="newPassword"
            form={passwordForm}
          />

          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            form={passwordForm}
          />

          <Button type="primary" htmlType="submit" block>
            Update Password
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

/* -------------------- Reusable Components -------------------- */

function InfoRow({
  label,
  value,
  icon,
  action,
  onClick,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div>
      <Text type="secondary">{label}</Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 6,
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <Text strong>
          {icon} {value}
        </Text>
        {action && (
          <Button type="link" onClick={onClick}>
            {action}
          </Button>
        )}
      </div>
    </div>
  );
}

function PasswordField({
  label,
  name,
  form,
}: {
  label: string;
  name: keyof PasswordForm;
  form: ReturnType<typeof useForm<PasswordForm>>;
}) {
  return (
    <Form.Item
      label={label}
      validateStatus={form.formState.errors[name] && 'error'}
      help={form.formState.errors[name]?.message}
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => <Input.Password {...field} />}
      />
    </Form.Item>
  );
}
