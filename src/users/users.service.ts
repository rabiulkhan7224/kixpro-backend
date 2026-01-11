import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * Controller class for '/users' API endpoint
 */

@Injectable()
export class UsersService {
  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */

  constructor(
    /**
     * Injecting userRepository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  /**
   * createUser
   */
  public async createUser(createUserDto: CreateUserDto) {
    // check is user exists with some email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle exception

    // Create a new user

    let newUser = this.userRepository.create(createUserDto);

    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    return [
      {
        firstName: 'rabiul',
        lastName: 'hasan',
        email: 'rabiul@gmail.com',
      },
      {
        firstName: 'jone',
        lastName: 'dos',
        email: 'jone@gmail.com',
      },
    ];
  }
}
