import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import OrderConfirmation from './templates/order-confirmation';
import { render } from '@react-email/components';

@Injectable()
export class EmailService {
  private resend: Resend;
  private fromEmail: string;
  private appName: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('appConfig.resend_apikey'));
    this.fromEmail = this.configService.get<string>('appConfig.resend_from_email', 'noreply');
    this.appName = this.configService.get<string>('appConfig.app_name', 'kixpro');
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      throw error;
    }
  }

  async sendOrderConfirmation(to: string, orderId: string, total: number) {
    const html = await render(OrderConfirmation({ orderId, total }));

    const { data, error } = await this.resend.emails.send({
      from: process.env.MAIL_FROM || 'Resend <onboarding@resend.dev>',
      to,
      subject: `Order #${orderId} confirmed`,
      html,
    });
    if (error) throw error;
    return data;
  }
}
