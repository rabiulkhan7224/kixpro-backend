import { IsEmail, IsEmpty, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
