import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users — paginated list of users
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fetch a paginated list of registered users' })
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'Number of results per page', example: 10 })
  @ApiQuery({ name: 'page', type: 'number', required: false, description: 'Page number to return', example: 1 })
  @ApiResponse({ status: 200, description: 'Returns paginated list of users.' })
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  /**
   * GET /users/:id — single user by UUID
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fetch a single user by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the user', type: 'string' })
  @ApiResponse({ status: 200, description: 'Returns the user with matching ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id);
  }

  /**
   * POST /users — create a new user
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'User with this email already exists.' })
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * PATCH /users/:id — update a user
   */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an existing user by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the user', type: 'string' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
