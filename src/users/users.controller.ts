import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

constructor(
  private readonly usersService: UsersService
){


}

  @Get('/:id/')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
   
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
  

    return this.usersService.findAll(getUsersParamDto, limit ,page)
  }


  @Post()
  public createUser(@Body() createUSerDto: CreateUserDto) {
    console.log(createUSerDto);
    return 'user create successful';
  }

  @Patch()
  public updateUser(@Body() updateUserDto:UpdateUserDto){

  }
}
