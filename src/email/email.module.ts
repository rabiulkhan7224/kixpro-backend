import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  providers: [EmailService],
  exports: [EmailService, BullModule],
})
export class EmailModule {}
