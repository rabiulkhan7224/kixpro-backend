import * as React from 'react';
import { Html, Head, Body, Container, Text, Section, Button } from '@react-email/components';

interface EmailVerificationProps {
  otp: string;
}

export default function EmailVerification({ otp }: EmailVerificationProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '40px auto', padding: '20px' }}>
          <Section>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Verify Your Email</Text>
            <Text>Your verification code is:</Text>
            <Text
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                letterSpacing: '8px',
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
              }}
            >
              {otp}
            </Text>
            <Text>This code will expire in 5 minutes.</Text>
            <Text>If you didn’t request this, please ignore this email.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
