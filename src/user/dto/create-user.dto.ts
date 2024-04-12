import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  privateKey: string;

  @IsString()
  senha: string;

  @IsString()
  acessType: string;
}
