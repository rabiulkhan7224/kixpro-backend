import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserResponseDto } from './dto/userResponce.dto';
import { CurrentUser } from './types/current-user';
import { Role } from 'src/common/enums/roles.enum';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/common/redis/redis.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,

    private readonly emailService: EmailService,

    /**
     * Inject refreshTokensProvider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,

    private readonly redisService: RedisService,
    @InjectQueue('email')
    private readonly emailQueue: Queue,
  ) {}

  // ==================== OTP Email Verification ====================
  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
  // ==================== Forgot Password & Reset ====================
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  async sendOtpEmail(email: string) {
    const otp = this.generateOtp();
    const ttl = 5 * 60; // 5 minutes in seconds

    await this.redisService.set(`otp:email:${email}`, otp, ttl);

    await this.emailQueue.add(
      'email-verification',
      {
        to: email,
        otp,
        subject: 'Verify Your Email Address',
      },
      { attempts: 3 },
    );

    return { message: 'Verification OTP sent to your email', expiresIn: ttl };
  }

  async verifyOtpEmail(email: string, otp: string) {
    const storedOtp = await this.redisService.get(`otp:email:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('OTP has expired or is invalid.');
    }
    // make user as verified
    await this.usersService.markEmailAsVerified(email);
    await this.redisService.del(`otp:email:${email}`);
    return { message: 'Email verified successfully' };
  }

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  public async signUp(createAuthDto: CreateUserDto) {
    return await this.usersService.createUser(createAuthDto);
  }

  public async getMe(userId: string): Promise<UserResponseDto> {
    return await this.usersService.getUserById(userId);
  }

  async validateJwtUser(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id, role: user.role as Role };
    return currentUser;
  }

  async sendTestEmail() {
    // testign email sending functionality
    return this.emailService.sendOrderConfirmation('mdrabiulkhanbabo@gmail.com', '12345', 99.99);
  }
}
