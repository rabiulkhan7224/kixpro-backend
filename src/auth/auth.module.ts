import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService,{
    provide: HashingProvider,
    useClass: BcryptProvider,
  }],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService,HashingProvider]
})
export class AuthModule {}
