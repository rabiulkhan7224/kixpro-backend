import { BadRequestException, forwardRef, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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

  // logger
  private readonly logger = new Logger(AuthService.name);
  // ==================== OTP Email Verification ====================
  private generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
  // ==================== Forgot Password & Reset ====================
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // signin
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }
  // refresh tokens
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
  // signup
  public async signUp(createAuthDto: CreateUserDto) {
    // 1. Create the user
    const user = await this.usersService.createUser(createAuthDto);

    // 2. Send OTP for email verification (after successful registration)
    try {
      await this.sendEmailVerificationOtp(user.email);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          // ... other safe fields (exclude password)
        },
        message: 'User registered successfully. Please verify your email with the OTP sent.',
        requiresVerification: true,
      };
    } catch (error) {
      this.logger.warn(`Failed to send OTP to ${user.email}`, error);

      return {
        success: true,
        user: { id: user.id, email: user.email },
        message: 'Account created, but failed to send verification email. Please contact support.',
        requiresVerification: true,
      };
    }
  }
  // get me
  public async getMe(userId: string): Promise<UserResponseDto> {
    return await this.usersService.getUserById(userId);
  }
  // validate jwt user
  async validateJwtUser(userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id, role: user.role as Role };
    return currentUser;
  }
  // send otp email
  async sendEmailVerificationOtp(email: string) {
    const otp = this.generateOtp();
    const ttl = 5 * 60; // 5 minutes in seconds

    await this.redisService.set(`otp:email:${email}`, otp, ttl);

    await this.emailQueue.add(
      'email-verification',
      {
        to: email,
        otp,
      },
      {
        attempts: 3,

        backoff: { type: 'exponential', delay: 2000 },
      },
    );

    return { message: 'Verification OTP sent to your email', expiresIn: ttl };
  }
  // verify email otp
  async verifyEmailOtp(email: string, otp: string) {
    const storedOtp = await this.redisService.get(`otp:email:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new UnauthorizedException('OTP has expired or is invalid.');
    }
    // make user as verified
    await this.usersService.markEmailAsVerified(email);
    await this.redisService.del(`otp:email:${email}`);
    return { message: 'Email verified successfully' };
  }

  // forgot password
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists (security)
      return { message: 'If an account with that email exists, a reset link has been sent.' };
    }

    const resetToken = this.generateResetToken();
    const ttl = 60 * 60; // 1 hour

    await this.redisService.set(`reset:token:${resetToken}`, user.id, ttl);

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await this.emailQueue.add(
      'password-reset',
      {
        to: email,
        resetLink,
        subject: 'Reset Your Password',
      },
      { attempts: 3 },
    );

    return { message: 'Password reset link sent to your email' };
  }

  // reset password
  async resetPassword(resetToken: string, newPassword: string) {
    const userId = await this.redisService.get(`reset:token:${resetToken}`);

    if (!userId) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    await this.usersService.updatePassword(userId, newPassword);

    // Invalidate token
    await this.redisService.del(`reset:token:${resetToken}`);

    return { message: 'Password reset successfully' };
  }

  async sendTestEmail() {
    // testign email sending functionality
    return this.emailService.sendOrderConfirmation('mdrabiulkhanbabo@gmail.com', '12345', 99.99);
  }
}
