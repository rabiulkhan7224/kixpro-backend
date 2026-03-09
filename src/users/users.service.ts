import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
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
    private usersRepository: Repository<User>,

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

  /**
   * Public method used to find one user using the ID of the user
   */
  public async findOneById(id: string) {
   
let user
    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    /**
     * Handle the user does not exist
     */
    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }

    return user;
  }
    // Finds one user by email
  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

}
