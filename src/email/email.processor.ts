import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  async process(job: Job, token?: string): Promise<any> {
    console.log(`Processing job ${job.id} of type ${job.name}`);
    // Your email sending logic here
    // await this.emailService.send(...)
  }
}
