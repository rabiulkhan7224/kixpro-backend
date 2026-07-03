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

    /**
     * Inject refreshTokensProvider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

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
}
