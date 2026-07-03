import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'firstName cannot be empty.' })
  @MinLength(3)
  @MaxLength(96)
  firstName: string;
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  email: string;
  @IsString()
  @IsNotEmpty({ message: 'Password must be required' })
  @MinLength(8)
  password: string;
}
