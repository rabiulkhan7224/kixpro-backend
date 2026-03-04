import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

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

     /**
      * Injecting config service
      */
     private configService: ConfigService,

       /**
     * Inject Create Users Provider
     */
     private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject Find One User By Email Provider
      */
     private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
     
  ) {}

  
 /**
   * Method to create a new user
   */
  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const environment = this.configService.get('PORT');
    console.log('Current PORT:', environment);
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
    // Finds one user by email
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

}
