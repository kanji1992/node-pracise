import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @Matches(
    /^[a-z\d!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/,
  )
  email: string;

  @IsString()
  @MaxLength(20)
  @MinLength(8)
  @IsNotEmpty()
  @Matches(
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    {
      message:
        'password too weak, we need at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Email max length 50.' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
