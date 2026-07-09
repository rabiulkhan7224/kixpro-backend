import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from './email.service';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job) {
    const { name, data } = job;
    console.log(`Processing job ${job.id} of type ${job.name}`);

    switch (name) {
      case 'email-verification':
        await this.emailService.sendEmailVerification(data.to, data.otp);
        break;

      case 'password-reset':
        await this.emailService.sendPasswordResetEmail(data.to, data.resetLink);
        break;
      default:
        console.warn(`Unknown email job type: ${name}`);
    }
  }
}
