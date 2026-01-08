import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from './dtos/get-users-param.dto';

@Injectable()
export class UsersService {
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
