import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class TokensResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class ProfileResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'John Doe' })
  name?: string;

  @ApiProperty()
  created_at: number;

  @ApiProperty()
  updated_at: number;
}
