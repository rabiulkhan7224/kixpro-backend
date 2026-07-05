import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components';

interface OrderConfirmationProps {
  orderId: string;
  total: number;
}

export default function OrderConfirmation({ orderId, total }: OrderConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderId} has been confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for your purchase!</Heading>
          <Text style={text}>
            Your order <strong>#{orderId}</strong> has been confirmed.
          </Text>
          <Text style={text}>
            Total: <strong>${total.toFixed(2)}</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  margin: '24px 0',
};
