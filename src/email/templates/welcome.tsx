import { Html, Head, Body, Container, Text } from '@react-email/components';

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'sans-serif' }}>
        <Container style={{ margin: '40px auto', padding: '20px' }}>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Welcome to Our Platform, ${name}!</Text>
          <Text>Thank you for joining us.</Text>
        </Container>
      </Body>
    </Html>
  );
}
