import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

/**
 * Controller class for '/users' API endpoint
 */

@Injectable()
export class UsersService {
    /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
    public findAll(
        getUsersParamDto:GetUsersParamDto,
        limit:number,
        page:number){
        return [
            {
                 firstName:"rabiul",
                 lastName: "hasan",
                  email:"rabiul@gmail.com"
            },
            {
                 firstName:"jone",
                 lastName: "dos",
                  email:"jone@gmail.com"
            }
        ]
    }
}
