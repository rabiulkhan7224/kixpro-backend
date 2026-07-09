import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { render } from '@react-email/components';

// Import your React Email templates
import OrderConfirmation from './templates/order-confirmation';
import EmailVerification from './templates/email-verification';
import PasswordReset from './templates/password-reset';
import WelcomeEmail from './templates/welcome'; // optional

@Injectable()
export class EmailService {
  private resend: Resend;
  private fromEmail: string;
  private appName: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('appConfig.resend_apikey'));
    this.fromEmail = this.configService.get<string>('appConfig.resend_from_email', 'onboarding@resend.dev');
    this.appName = this.configService.get<string>('appConfig.app_name', 'kixpro');
  }

  // ==================== Generic Send Method ====================
  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: `${this.appName} <${this.fromEmail}>`,
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent to ${to} | Subject: "${subject}"`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${error.message}`);
      throw error;
    }
  }

  // ==================== New Template-Based Methods ====================

  async sendEmailVerification(to: string, otp: string) {
    const html = await render(EmailVerification({ otp }));

    await this.sendEmail(to, 'Verify Your Email Address', html);
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const html = await render(PasswordReset({ resetLink }));

    await this.sendEmail(to, 'Reset Your Password', html);
  }

  async sendWelcomeEmail(to: string, name: string = 'User') {
    const html = await render(WelcomeEmail({ name }));

    await this.sendEmail(to, `Welcome to ${this.appName}!`, html);
  }

  // Keep your existing method (slightly cleaned)
  async sendOrderConfirmation(to: string, orderId: string, total: number) {
    const html = await render(OrderConfirmation({ orderId, total }));

    await this.sendEmail(to, `Order #${orderId} Confirmed`, html);
  }
}
