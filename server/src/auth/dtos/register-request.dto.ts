import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
