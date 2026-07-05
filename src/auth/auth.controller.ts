import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/userResponce.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    /*
     * Injecting Auth Service
     */
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile() {
    // This is just a placeholder. In a real application, you'd use authentication guards to protect this route and return the user's profile.

    return { message: 'This is the user profile endpoint' };
  }
  @Roles(Role.USER) // Example roles, adjust as needed
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user me API',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'Returns the profile of the authenticated user.',
  })
  getMe(@Req() req: any): Promise<UserResponseDto> {
    return this.authService.getMe(req.user?.id);
  }
  // test email
  @Get('test-email')
  getTestEmail() {
    return this.authService.sendTestEmail();
  }
}
