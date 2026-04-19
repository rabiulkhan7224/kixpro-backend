import { BcryptProvider } from './../../auth/providers/bcrypt.provider';
import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Inject BCrypt Provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * Inject mailService
     */
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;
    try {
      // Check if the user already exists
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
        description: 'Error connecting to the database',
      });
    }

    // Handle exception
    if (existingUser) {
      throw new BadRequestException('The user already exists, please check your email.');
    }

    let newUser: User;
    try {
      // Create a new user
      newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password),
      });
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while creating user profile');
    }

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
        description: 'Error connecting to the database',
      });
    }

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
  }
}
