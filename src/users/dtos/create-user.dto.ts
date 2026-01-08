import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, minLength, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;
}
