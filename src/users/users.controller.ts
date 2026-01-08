import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id/{:optional}')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Param('optional') optional?: number | undefined,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ) {
    console.log(id);
    console.log(limit);
    console.log(optional);

    return 'you sent a user get request users endpoint';
  }

  // @Get("/:id")
  // public getuserbyid(@Param() params:any ,@Query() query:any){
  //     console.log(query);

  //     console.log(params);
  //      return "you sent a user get user by id request users endpoint"
  // }

  @Post()
  public createUser(@Body() createUSerDto: CreateUserDto) {
    console.log(createUSerDto);
    return 'user create successful';
  }
}
