import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { UserResponseDto } from 'src/auth/dto/userResponce.dto';
import { plainToInstance } from 'class-transformer';

/**
 * Service handling all business logic for the /users endpoint.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly configService: ConfigService,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  /**
   * Create a new user – delegates to CreateUserProvider.
   */
  public async createUser(createUserDto: CreateUserDto) {
    //
    return await this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Return a paginated list of users, never exposing the password column.
   */
  public async findAll(limit: number, page: number) {
    let users: User[];
    try {
      users = await this.usersRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
    } catch {
      throw new RequestTimeoutException('Unable to process your request at the moment, please try again later.', {
        description: 'Error connecting to the database',
      });
    }

    return {
      data: users,
      meta: { page, limit, count: users.length },
    };
  }

  /**
   * Find a single user by UUID – throws 404 if not found.
   */
  public async findOneById(id: string) {
    let user: User | null;
    try {
      user = await this.usersRepository.findOne({
        where: { id },
        select: { id: true, firstName: true, lastName: true, email: true, role: true },
      });
    } catch {
      throw new RequestTimeoutException('Unable to process your request at the moment, please try again later.', {
        description: 'Error connecting to the database',
      });
    }

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" was not found.`);
    }

    return { data: user };
  }

  /**
   * Update an existing user by ID.
   */
  public async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { data: user } = await this.findOneById(id);

    // Merge changes into entity
    Object.assign(user, updateUserDto);

    try {
      const updated = await this.usersRepository.save(user);
      const { password: _, ...result } = updated as any;
      return { data: result };
    } catch {
      throw new InternalServerErrorException('Error updating user, please try again later.');
    }
  }

  /**
   * Find a user by email – delegates to FindOneUserByEmailProvider.
   */
  public async findOneByEmail(email: string) {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  // getMe is implemented in AuthService since it needs to return the full user profile, including email, and is only accessible to authenticated users.
  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
