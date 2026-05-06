import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'The email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ description: 'The password of the user' })
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
