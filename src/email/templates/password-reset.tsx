import * as React from 'react';
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

interface PasswordResetProps {
  resetLink: string;
}

export default function PasswordReset({ resetLink }: PasswordResetProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'sans-serif' }}>
        <Container>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Reset Your Password</Text>
          <Text>Click the button below to reset your password:</Text>

          <Button
            href={resetLink}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            Reset Password
          </Button>

          <Text style={{ marginTop: '20px' }}>This link will expire in 1 hour.</Text>
          <Text>If you didn’t request this, please ignore this email.</Text>
        </Container>
      </Body>
    </Html>
  );
}
