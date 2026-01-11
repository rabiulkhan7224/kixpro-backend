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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')

export class UsersController {

constructor(
  private readonly usersService: UsersService
){


}

  @Get('/:id/')
  @ApiOperation({
    summary:'Fetches a list of registered users on the application'
  })
   @ApiQuery({
    name:"limit",
    type:"number",
    required:false,
    description:'The number of entries returned per query',
    example:10,
    
   })
    @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
   
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
  ) {
  

    return this.usersService.findAll(getUsersParamDto, limit ,page)
  }


  @Post()
  public createUser(@Body() createUSerDto: CreateUserDto) {
    return this.usersService.createUser(createUSerDto)
  }

  @Patch()
  public updateUser(@Body() updateUserDto:UpdateUserDto){

  }
}
