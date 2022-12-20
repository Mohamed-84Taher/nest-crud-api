import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  country: string;
}
export class UserUpdateDto {
  @IsOptional()
  fullName: string;

  @IsOptional()
  email: string;

  @IsOptional()
  age: number;

  @IsOptional()
  country: string;
}
